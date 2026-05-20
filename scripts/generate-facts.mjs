import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const configPath = path.join(rootDir, 'config', 'project.config.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function exists(filePath) {
  return fs.existsSync(filePath)
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function listDirs(dirPath) {
  if (!exists(dirPath)) return []
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
}

function listFilesRecursive(dirPath, matcher = () => true) {
  if (!exists(dirPath)) return []
  const results = []

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (matcher(fullPath)) {
        results.push(fullPath)
      }
    }
  }

  walk(dirPath)
  return results.sort()
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/')
}

function relativePosix(basePath, targetPath) {
  return toPosix(path.relative(basePath, targetPath))
}

function inferStack(pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  return {
    framework: deps.vue ? 'Vue 3' : null,
    language: deps.typescript ? 'TypeScript' : null,
    bundler: deps.vite ? 'Vite' : null,
    state: deps.pinia ? 'Pinia' : null,
    router: deps['vue-router'] ? 'Vue Router 4' : null,
    i18n: deps['vue-i18n'] ? 'Vue I18n' : null,
    ui: [
      deps['element-plus'] ? 'Element Plus' : null,
      deps['@nutui/nutui'] ? 'NutUI' : null
    ].filter(Boolean)
  }
}

function extractAlias(viteConfigText) {
  const match = viteConfigText.match(/['"]\/@['"]\s*:\s*pathResolve\(['"]\.\/src\/['"]\)/)
  return match ? '/@ -> src/' : 'unknown'
}

function collectBusinessDomains(repoPath) {
  const bizViewsRoot = path.join(repoPath, 'src', 'biz', 'views')
  const bizApiRoot = path.join(repoPath, 'src', 'biz', 'api')
  const domains = listDirs(bizViewsRoot)
  const domainApiOverrides = {
    invoice: ['src/biz/api/financial/invoice.ts']
  }

  return domains.map(domain => {
    const domainViewRoot = path.join(bizViewsRoot, domain)
    const pageDirs = listDirs(domainViewRoot)
    const apiFiles = listFilesRecursive(path.join(bizApiRoot, domain), filePath => filePath.endsWith('.ts'))
    const overrideFiles = (domainApiOverrides[domain] ?? [])
      .map(relativePath => path.join(repoPath, relativePath))
      .filter(exists)

    return {
      domain,
      pageCount: pageDirs.length,
      pages: pageDirs,
      apiFiles: [...new Set([...apiFiles, ...overrideFiles])].map(filePath => relativePosix(repoPath, filePath))
    }
  })
}

function collectFrameworkComponents(repoPath) {
  const root = path.join(repoPath, 'src', 'framework', 'components')
  return listDirs(root)
}

function collectFrameworkHooks(repoPath) {
  const root = path.join(repoPath, 'src', 'framework', 'hooks')
  return listFilesRecursive(root, filePath => filePath.endsWith('.ts')).map(filePath => path.basename(filePath, '.ts'))
}

function buildFacts() {
  const config = readJson(configPath)
  const repoPath = config.sourceRepoPath
  const outputDir = path.resolve(rootDir, config.outputDir)

  ensureDir(outputDir)

  const packageJsonPath = path.join(repoPath, 'package.json')
  const viteConfigPath = path.join(repoPath, 'vite.config.ts')
  const mainTsPath = path.join(repoPath, 'src', 'main.ts')
  const appVuePath = path.join(repoPath, 'src', 'App.vue')
  const routeTsPath = path.join(repoPath, 'src', 'framework', 'router', 'route.ts')
  const routerIndexPath = path.join(repoPath, 'src', 'framework', 'router', 'index.ts')
  const backEndRouterPath = path.join(repoPath, 'src', 'framework', 'router', 'backEnd.ts')
  const bizRoutePath = path.join(repoPath, 'src', 'biz', 'route', 'index.ts')
  const existingSkillPath = path.join(repoPath, '.cursor', 'skills', 'project-navigator', 'SKILL.md')

  const pkg = readJson(packageJsonPath)
  const viteConfigText = readText(viteConfigPath)
  const mainTsText = readText(mainTsPath)
  const routerIndexText = readText(routerIndexPath)
  const backEndRouterText = readText(backEndRouterPath)
  const bizRouteText = readText(bizRoutePath)

  const businessDomains = collectBusinessDomains(repoPath)
  const frameworkComponents = collectFrameworkComponents(repoPath)
  const frameworkHooks = collectFrameworkHooks(repoPath)
  const frameworkApiFiles = listFilesRecursive(
    path.join(repoPath, 'src', 'framework', 'api'),
    filePath => filePath.endsWith('.ts')
  ).map(filePath => relativePosix(repoPath, filePath))
  const bizApiFiles = listFilesRecursive(
    path.join(repoPath, 'src', 'biz', 'api'),
    filePath => filePath.endsWith('.ts')
  ).map(filePath => relativePosix(repoPath, filePath))
  const frameworkStoreFiles = listFilesRecursive(
    path.join(repoPath, 'src', 'framework', 'stores'),
    filePath => filePath.endsWith('.ts')
  ).map(filePath => relativePosix(repoPath, filePath))
  const apiTopLevelDomains = listDirs(path.join(repoPath, 'src', 'biz', 'api'))
  const viewTopLevelDomains = businessDomains.map(domain => domain.domain)
  const apiOnlyDomains = apiTopLevelDomains.filter(domain => !viewTopLevelDomains.includes(domain))

  const facts = {
    generatedAt: new Date().toISOString(),
    projectName: config.projectName,
    repoPath,
    stack: inferStack(pkg),
    scripts: pkg.scripts,
    alias: extractAlias(viteConfigText),
    entryFiles: [
      relativePosix(repoPath, mainTsPath),
      relativePosix(repoPath, appVuePath),
      relativePosix(repoPath, routeTsPath),
      relativePosix(repoPath, routerIndexPath),
      relativePosix(repoPath, backEndRouterPath),
      relativePosix(repoPath, bizRoutePath)
    ],
    architecture: {
      frameworkDir: 'src/framework',
      bizDir: 'src/biz',
      description: 'framework provides platform capabilities, biz provides business modules'
    },
    counts: {
      bizDomains: businessDomains.length,
      bizApiFiles: bizApiFiles.length,
      frameworkApiFiles: frameworkApiFiles.length,
      frameworkStoreFiles: frameworkStoreFiles.length,
      frameworkComponents: frameworkComponents.length,
      frameworkHooks: frameworkHooks.length
    },
    startup: {
      usesPinia: mainTsText.includes('app.use(pinia)'),
      usesRouter: mainTsText.includes('app.use(router)'),
      usesGlobalComponents: mainTsText.includes('app.use(Components)'),
      usesI18n: mainTsText.includes('app.use(i18n)'),
      initializesScreenSize: mainTsText.includes('initScreenSize'),
      initializesSystemSetting: mainTsText.includes('setSysMsg')
    },
    routing: {
      hashHistory: routerIndexText.includes('createWebHashHistory'),
      hasRouterGuard: routerIndexText.includes('router.beforeEach'),
      initializesBackendRoutes: routerIndexText.includes('initBackEndControlRoutes'),
      usesBackendMenu: backEndRouterText.includes('getAdminMenu'),
      bizRoutesEmpty: /export const bizRoutes:\s*Array<any>\s*=\s*\[\]/.test(bizRouteText),
      notes: [
        'login is static',
        'main business routes are initialized after auth',
        'backend menu maps to framework and biz views'
      ]
    },
    businessDomains,
    apiOnlyDomains,
    framework: {
      components: frameworkComponents,
      hooks: frameworkHooks,
      apiFiles: frameworkApiFiles,
      storeFiles: frameworkStoreFiles
    },
    existingAiAssets: {
      hasProjectNavigatorSkill: exists(existingSkillPath),
      projectNavigatorSkill: exists(existingSkillPath)
        ? relativePosix(repoPath, existingSkillPath)
        : null
    }
  }

  return { facts, outputDir }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

function renderOverview(facts) {
  const domainLines = facts.businessDomains
    .map(domain => `- \`${domain.domain}\`: ${domain.pageCount} pages, ${domain.apiFiles.length} api files`)
    .join('\n')

  return `# ${facts.projectName} project overview

Generated at: ${facts.generatedAt}

## Stack

- Framework: ${facts.stack.framework}
- Language: ${facts.stack.language}
- Bundler: ${facts.stack.bundler}
- State: ${facts.stack.state}
- Router: ${facts.stack.router}
- I18n: ${facts.stack.i18n}
- UI: ${facts.stack.ui.join(', ')}

## Core structure

- Framework layer: \`${facts.architecture.frameworkDir}\`
- Business layer: \`${facts.architecture.bizDir}\`
- Alias: \`${facts.alias}\`

## Counts

- Business domains: ${facts.counts.bizDomains}
- Business API files: ${facts.counts.bizApiFiles}
- Framework API files: ${facts.counts.frameworkApiFiles}
- Framework store files: ${facts.counts.frameworkStoreFiles}
- Framework components: ${facts.counts.frameworkComponents}
- Framework hooks: ${facts.counts.frameworkHooks}

## Key entry files

${facts.entryFiles.map(file => `- \`${file}\``).join('\n')}

## Business domains

${domainLines}

## API-only domains

${facts.apiOnlyDomains.map(domain => `- \`${domain}\``).join('\n')}

## Existing AI assets

- Project navigator skill present: ${facts.existingAiAssets.hasProjectNavigatorSkill ? 'yes' : 'no'}
- Skill path: \`${facts.existingAiAssets.projectNavigatorSkill ?? 'n/a'}\`
`
}

function renderStartupAndRouting(facts) {
  return `# Startup and routing

## Startup chain

1. \`src/main.ts\` creates the Vue app.
2. Pinia is mounted: ${facts.startup.usesPinia ? 'yes' : 'no'}.
3. Router is mounted: ${facts.startup.usesRouter ? 'yes' : 'no'}.
4. Global components are mounted: ${facts.startup.usesGlobalComponents ? 'yes' : 'no'}.
5. I18n is mounted: ${facts.startup.usesI18n ? 'yes' : 'no'}.
6. Screen size initialization runs: ${facts.startup.initializesScreenSize ? 'yes' : 'no'}.
7. System settings initialization runs: ${facts.startup.initializesSystemSetting ? 'yes' : 'no'}.

## Routing characteristics

- Hash history: ${facts.routing.hashHistory ? 'yes' : 'no'}
- Router guard present: ${facts.routing.hasRouterGuard ? 'yes' : 'no'}
- Backend route initialization: ${facts.routing.initializesBackendRoutes ? 'yes' : 'no'}
- Backend menu source: ${facts.routing.usesBackendMenu ? 'yes' : 'no'}
- Biz route file currently empty: ${facts.routing.bizRoutesEmpty ? 'yes' : 'no'}

## Working mental model for newcomers

1. Static login route exists first.
2. After authentication, the app initializes backend-controlled routes.
3. Backend menu items are mapped to files under \`src/framework/views\` and \`src/biz/views\`.
4. The business route file is not the main source of truth right now.

## Suggested files to read first

- \`src/main.ts\`
- \`src/App.vue\`
- \`src/framework/router/index.ts\`
- \`src/framework/router/route.ts\`
- \`src/framework/router/backEnd.ts\`
- \`src/framework/layout/index.vue\`
- \`src/framework/utils/request.ts\`
`
}

function renderModuleIndex(facts) {
  const frameworkComponents = facts.framework.components.map(name => `- \`${name}\``).join('\n')
  const frameworkHooks = facts.framework.hooks.map(name => `- \`${name}\``).join('\n')
  const domainSections = facts.businessDomains
    .map(domain => {
      const pages = domain.pages.length ? domain.pages.map(page => `  - \`${page}\``).join('\n') : '  - none detected'
      const apiFiles = domain.apiFiles.length
        ? domain.apiFiles.map(file => `  - \`${file}\``).join('\n')
        : '  - none detected'
      return `## ${domain.domain}

Page directories:
${pages}

API files:
${apiFiles}
`
    })
    .join('\n')

  return `# Module index

## Framework components

${frameworkComponents}

## Framework hooks

${frameworkHooks}

## API-only domains

${facts.apiOnlyDomains.map(domain => `- \`${domain}\``).join('\n')}

## Business domains

${domainSections}
`
}

const { facts, outputDir } = buildFacts()

writeFile(path.join(outputDir, 'project-facts.json'), JSON.stringify(facts, null, 2))
writeFile(path.join(outputDir, 'project-overview.md'), renderOverview(facts))
writeFile(path.join(outputDir, 'startup-and-routing.md'), renderStartupAndRouting(facts))
writeFile(path.join(outputDir, 'module-index.md'), renderModuleIndex(facts))

console.log(`Generated onboarding facts in ${outputDir}`)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getConfig, writeGeneratedFacts } from './generate-facts.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function writeText(filePath, text) {
  fs.writeFileSync(filePath, text, 'utf8')
}

function fileExists(filePath) {
  return fs.existsSync(filePath)
}

function loadFacts() {
  const config = getConfig()
  const generatedDir = path.resolve(rootDir, config.outputDir)
  const factsPath = path.join(generatedDir, 'project-facts.json')
  if (!fileExists(factsPath)) {
    const { facts } = writeGeneratedFacts()
    return facts
  }
  return readJson(factsPath)
}

function buildDocs() {
  const facts = loadFacts()
  const config = getConfig()
  const generatedDir = path.resolve(rootDir, config.outputDir)
  const learningPath = readText(path.join(rootDir, 'docs', 'newcomer-learning-path.md'))
  const overview = readText(path.join(generatedDir, 'project-overview.md'))
  const startup = readText(path.join(generatedDir, 'startup-and-routing.md'))
  const moduleIndex = readText(path.join(generatedDir, 'module-index.md'))

  const handbook = `# ${facts.projectName} onboarding handbook

This handbook is generated from the local onboarding scaffold.

## How to read this handbook

1. Start from the project overview.
2. Continue with startup and routing.
3. Then move to the newcomer learning path.
4. Use the module index when you need a domain-specific entry.

---

${overview}

---

${startup}

---

${learningPath}

---

${moduleIndex}
`

  const editGuide = `# Common edit entry guide

## When adding a search field to a list page

Typical order:

1. find the target page \`src/biz/views/.../index.vue\`
2. locate the search form area or \`SearchSet\` usage
3. update the page query form
4. update the matching API request params if needed
5. verify the table refresh path

## When adding a table column

Typical order:

1. update table columns in the page \`index.vue\`
2. check whether a formatter, dict, or preview component is needed
3. confirm the backend field exists in the API response

## When adding a new popup or drawer

Typical order:

1. check whether the page already has a \`modules/\` folder
2. add or extend a child component in \`modules/\`
3. open it from the main page
4. wire the action to the matching API file

## When changing route behavior

Typical order:

1. confirm whether the route is static or backend-driven
2. inspect \`src/framework/router/route.ts\`
3. inspect \`src/framework/router/index.ts\`
4. inspect \`src/framework/router/backEnd.ts\`
5. inspect backend menu mapping assumptions before editing

## When exploring a business module for the first time

Recommended order:

1. \`generated/module-index.md\`
2. target page \`src/biz/views/[domain]/[page]/index.vue\`
3. target API file under \`src/biz/api\`
4. child components under \`modules/\`
5. framework hooks/components used by that page
`

  writeText(path.join(generatedDir, 'project-handbook.md'), handbook)
  writeText(path.join(generatedDir, 'edit-entry-guide.md'), editGuide)
  return { facts, generatedDir }
}

function hasAny(text, keywords) {
  return keywords.some(keyword => text.includes(keyword))
}

function detectType(question) {
  const q = question.toLowerCase()
  if (hasAny(q, ['学习', '新人', '第一天', '路线', '路径', '计划', 'onboarding'])) return 'learning'
  if (hasAny(q, ['启动', 'main.ts', '渲染', 'app.vue'])) return 'startup'
  if (hasAny(q, ['路由', 'router', '登录', 'login', '动态'])) return 'routing'
  if (hasAny(q, ['改', '修改', '新增', '筛选', '搜索条件', '弹窗', '表格列', '接口参数', '入口'])) return 'edit'
  return 'overview'
}

function detectDomain(question, facts) {
  const q = question.toLowerCase()
  const aliases = {
    customer: ['customer', '客户'],
    financial: ['financial', '财务', '账单', '授信', '预警'],
    invoice: ['invoice', '发票', '开票'],
    supplier: ['supplier', '供应商'],
    supplierFinance: ['supplierfinance', '供应商账单', '供应商发票', '核销'],
    approve: ['approve', '审批'],
    rules: ['rules', '规则', '费率'],
    cardlibrary: ['cardlibrary', '卡库', '投诉', '网关'],
    xnumber: ['xnumber', '号码', 'x号码'],
    vos: ['vos', 'cdr', '话单', '通话'],
    reportStatistics: ['reportstatistics', '报表', '流速', 'pdd'],
    recharge: ['recharge', '冲销', '核销记录'],
    speech: ['speech', '报备', '话术']
  }

  for (const domain of facts.businessDomains) {
    const keys = aliases[domain.domain] ?? [domain.domain.toLowerCase()]
    if (hasAny(q, keys)) return domain
  }
  return null
}

function formatDocPath(relativePath) {
  return path.join(rootDir, relativePath)
}

function answerQuestion(question) {
  const facts = loadFacts()
  const config = getConfig()
  const repoPath = config.sourceRepoPath
  const type = detectType(question)
  const domain = detectDomain(question, facts)

  const commonDocs = [
    formatDocPath('generated/project-overview.md'),
    formatDocPath('generated/startup-and-routing.md'),
    formatDocPath('generated/module-index.md')
  ]

  const lines = []
  lines.push(`# Onboarding answer`)
  lines.push('')
  lines.push(`Question: ${question}`)
  lines.push('')

  if (type === 'startup') {
    lines.push(`结论：这个问题优先从应用启动链路看，入口是 \`src/main.ts\`，再经过 \`App.vue\` 和框架层注册。`)
    lines.push('')
    lines.push(`优先看这些文档：`)
    lines.push(`- ${formatDocPath('generated/startup-and-routing.md')}`)
    lines.push(`- ${formatDocPath('generated/project-overview.md')}`)
    lines.push('')
    lines.push(`优先看这些源码：`)
    lines.push(`- ${path.join(repoPath, 'src/main.ts')}`)
    lines.push(`- ${path.join(repoPath, 'src/App.vue')}`)
    lines.push(`- ${path.join(repoPath, 'src/framework/layout/index.vue')}`)
  } else if (type === 'routing') {
    lines.push(`结论：这个项目的业务页面主要不是手写静态路由，而是登录后由后端菜单驱动动态初始化。`)
    lines.push('')
    lines.push(`优先看这些文档：`)
    lines.push(`- ${formatDocPath('generated/startup-and-routing.md')}`)
    lines.push(`- ${formatDocPath('generated/project-handbook.md')}`)
    lines.push('')
    lines.push(`优先看这些源码：`)
    lines.push(`- ${path.join(repoPath, 'src/framework/router/route.ts')}`)
    lines.push(`- ${path.join(repoPath, 'src/framework/router/index.ts')}`)
    lines.push(`- ${path.join(repoPath, 'src/framework/router/backEnd.ts')}`)
    lines.push(`- ${path.join(repoPath, 'src/biz/route/index.ts')}`)
  } else if (type === 'learning') {
    lines.push(`结论：这个问题更适合按“框架心智模型 -> 典型业务链路 -> 改动入口”三段来学。`)
    lines.push('')
    lines.push(`优先看这些文档：`)
    lines.push(`- ${formatDocPath('docs/newcomer-learning-path.md')}`)
    lines.push(`- ${formatDocPath('generated/project-overview.md')}`)
    lines.push(`- ${formatDocPath('generated/startup-and-routing.md')}`)
    if (domain) {
      lines.push('')
      lines.push(`如果你想先看一个具体模块，当前问题最接近的业务域是 \`${domain.domain}\`。`)
      lines.push(`推荐入口页面：`)
      for (const page of domain.pages.slice(0, 3)) {
        lines.push(`- ${path.join(repoPath, 'src/biz/views', domain.domain, page, 'index.vue')}`)
      }
    }
  } else if (type === 'edit') {
    lines.push(`结论：这类问题应该先找“页面主文件 -> modules 子组件 -> API 文件”的改动链路。`)
    lines.push('')
    lines.push(`优先看这些文档：`)
    lines.push(`- ${formatDocPath('generated/edit-entry-guide.md')}`)
    lines.push(`- ${formatDocPath('generated/module-index.md')}`)
    if (domain) {
      lines.push('')
      lines.push(`当前问题最接近的业务域是 \`${domain.domain}\`。`)
      lines.push(`建议先看：`)
      for (const page of domain.pages.slice(0, 3)) {
        lines.push(`- ${path.join(repoPath, 'src/biz/views', domain.domain, page, 'index.vue')}`)
      }
      for (const apiFile of domain.apiFiles.slice(0, 3)) {
        lines.push(`- ${path.join(repoPath, apiFile)}`)
      }
    } else {
      lines.push('')
      lines.push(`如果还没有明确模块，先从目标页面的 \`index.vue\` 和对应 \`modules/\` 找入口。`)
    }
  } else {
    lines.push(`结论：这是一个项目总览类问题，优先建立 \`framework\` 和 \`biz\` 的分层心智模型。`)
    lines.push('')
    lines.push(`优先看这些文档：`)
    for (const doc of commonDocs) {
      lines.push(`- ${doc}`)
    }
    lines.push(`- ${formatDocPath('docs/newcomer-learning-path.md')}`)
  }

  if (domain && !['edit', 'learning'].includes(type)) {
    lines.push('')
    lines.push(`识别到业务域：\`${domain.domain}\``)
    lines.push(`推荐先看这些页面：`)
    for (const page of domain.pages.slice(0, 3)) {
      lines.push(`- ${path.join(repoPath, 'src/biz/views', domain.domain, page, 'index.vue')}`)
    }
    lines.push(`对应 API：`)
    for (const apiFile of domain.apiFiles.slice(0, 3)) {
      lines.push(`- ${path.join(repoPath, apiFile)}`)
    }
  }

  lines.push('')
  lines.push(`下一步建议：`)
  if (type === 'overview') {
    lines.push(`- 先读 project overview 和 startup/routing 文档。`)
    lines.push(`- 再选择一个典型业务模块开始读。`)
  } else if (type === 'routing') {
    lines.push(`- 先按顺序读 router 三个核心文件。`)
    lines.push(`- 再去业务页面验证后端菜单是如何映射到真实视图的。`)
  } else if (type === 'startup') {
    lines.push(`- 先确认 main.ts 挂载了哪些基础能力。`)
    lines.push(`- 再看 App.vue 和 layout 如何接住 router-view。`)
  } else if (type === 'learning') {
    lines.push(`- 先按 3 天路径建立全局地图。`)
    lines.push(`- 第二天开始挑一个典型列表页深读。`)
  } else {
    lines.push(`- 先锁定目标页面。`)
    lines.push(`- 再从页面、模块、接口三层做最小改动链路定位。`)
  }

  return lines.join('\n')
}

function printHelp() {
  console.log(`voice-admin-web onboarding agent CLI

Usage:
  npm run scan
  npm run docs
  npm run ask -- "你的问题"
`)
}

const command = process.argv[2]

if (!command || ['-h', '--help', 'help'].includes(command)) {
  printHelp()
  process.exit(0)
}

if (command === 'scan') {
  const { outputDir } = writeGeneratedFacts()
  console.log(`Generated onboarding facts in ${outputDir}`)
  process.exit(0)
}

if (command === 'docs') {
  const { generatedDir } = buildDocs()
  console.log(`Generated onboarding docs in ${generatedDir}`)
  process.exit(0)
}

if (command === 'ask') {
  const question = process.argv.slice(3).join(' ').trim()
  if (!question) {
    console.error('Please provide a question, for example: npm run ask -- "这个项目怎么启动"')
    process.exit(1)
  }
  console.log(answerQuestion(question))
  process.exit(0)
}

console.error(`Unknown command: ${command}`)
printHelp()
process.exit(1)

# voice-admin-web onboarding agent

This project is the Phase 1 + Phase 2 + Phase 3 scaffold for a frontend onboarding agent focused on:

1. understanding the `voice-admin-web` repo,
2. generating onboarding-friendly project facts,
3. preparing a later skill/runtime integration for Codex, Claude Code, or Cursor.

## Current scope

The current version does not try to be a full autonomous coding agent. It focuses on:

1. project facts,
2. startup and routing chain,
3. module index,
4. reusable scan script,
5. a project-specific onboarding skill for coding runtimes,
6. a local CLI for scan / docs / ask flows.

## Project layout

```text
config/
  project.config.json        Agent target project config
docs/
  cli-usage.md               How to use the local CLI
  how-to-use.md              How this scaffold is meant to be used
  example-prompts.md         Example prompts for Codex / Claude Code / Cursor
  newcomer-learning-path.md  Suggested 3-day reading path for newcomers
  phase-1-scope.md           What Phase 1 delivers
generated/
  edit-entry-guide.md        Common frontend change entry guide
  project-facts.json         Structured repo facts
  project-handbook.md        Consolidated onboarding handbook
  project-overview.md        Human-readable project summary
  startup-and-routing.md     Startup and dynamic route explanation
  module-index.md            Module/domain index
scripts/
  cli.mjs                    Local command entry
  generate-facts.mjs         Repo analyzer for Phase 1
skills/
  README.md                  Skills overview
  frontend-onboarding/       Project onboarding skill
```

## Commands

```bash
npm run scan
npm run docs
npm run ask -- "登录后路由怎么生成"
```

## Target repo

The default target repo is configured in [config/project.config.json](./config/project.config.json).

## What to do next

1. Keep refreshing the generated facts after important code changes.
2. Use the `frontend-onboarding` skill in Codex, Claude Code, or Cursor.
3. Use the CLI locally for quick onboarding answers.
4. Extend the skill with more domain-level walkthroughs in later phases.

# voice-admin-web onboarding agent

This project is the Phase 1 scaffold for a frontend onboarding agent focused on:

1. understanding the `voice-admin-web` repo,
2. generating onboarding-friendly project facts,
3. preparing a later skill/runtime integration for Codex, Claude Code, or Cursor.

## Current scope

Phase 1 does not try to be a full autonomous coding agent. It focuses on the fact layer:

1. project facts,
2. startup and routing chain,
3. module index,
4. reusable scan script.

## Project layout

```text
config/
  project.config.json        Agent target project config
docs/
  how-to-use.md              How this scaffold is meant to be used
  phase-1-scope.md           What Phase 1 delivers
generated/
  project-facts.json         Structured repo facts
  project-overview.md        Human-readable project summary
  startup-and-routing.md     Startup and dynamic route explanation
  module-index.md            Module/domain index
scripts/
  generate-facts.mjs         Repo analyzer for Phase 1
skills/
  README.md                  Placeholder for future project skill
```

## Commands

```bash
npm run scan
```

## Target repo

The default target repo is configured in [config/project.config.json](./config/project.config.json).

## What to do next

1. Keep refreshing the generated facts after important code changes.
2. Add a project-specific onboarding skill in Phase 2/3.
3. Hook this scaffold into Codex, Claude Code, or Cursor as a project-level agent package.

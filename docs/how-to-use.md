# How to use this scaffold

This scaffold is designed to be used in three possible ways.

## 1. As a project helper in Codex / Claude Code / Cursor

1. Open the `voice-admin-web` repo in your coding agent runtime.
2. Keep the generated files from `generated/` nearby.
3. Ask onboarding questions against the repo and generated docs together.

Example questions:

1. How does login routing work in this project?
2. What is the difference between `src/framework` and `src/biz`?
3. Which files should a newcomer read on day one?

## 2. As a local documentation generator

Run:

```bash
npm run scan
```

This refreshes the generated onboarding facts after code changes.

## 3. As the base for a later project skill

The `skills/` directory is intentionally reserved for a later dedicated onboarding skill.

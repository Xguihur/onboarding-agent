# How to use this scaffold

This scaffold is designed to be used in three possible ways.

## 1. As a project helper in Codex / Claude Code / Cursor

1. Open the `voice-admin-web` repo in your coding agent runtime.
2. Keep the generated files from `generated/` nearby.
3. Load or reference the skill under `skills/frontend-onboarding/`.
4. Ask onboarding questions against the repo and generated docs together.

Example questions:

1. How does login routing work in this project?
2. What is the difference between `src/framework` and `src/biz`?
3. Which files should a newcomer read on day one?
4. If I want to add a filter to a list page, where do I usually edit?
5. Explain the customer module in newcomer-friendly language.

## 2. As a local documentation generator

Run:

```bash
npm run scan
```

This refreshes the generated onboarding facts after code changes.

## 3. As the base for a later project skill

The project now includes a first onboarding skill under `skills/frontend-onboarding/`.

Suggested runtime workflow:

1. refresh facts with `npm run scan`,
2. open the target repo,
3. ask questions using the example prompts from `docs/example-prompts.md`,
4. extend the skill as the project evolves.

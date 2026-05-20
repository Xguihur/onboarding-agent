# CLI usage

This project now includes a local CLI flow for the onboarding agent.

## Commands

### 1. Refresh repo facts

```bash
npm run scan
```

This updates:

1. `generated/project-facts.json`
2. `generated/project-overview.md`
3. `generated/startup-and-routing.md`
4. `generated/module-index.md`

### 2. Build handbook-style docs

```bash
npm run docs
```

This updates:

1. `generated/project-handbook.md`
2. `generated/edit-entry-guide.md`

### 3. Ask a local onboarding question

```bash
npm run ask -- "这个项目怎么启动"
```

```bash
npm run ask -- "customer 模块应该先看哪些文件"
```

```bash
npm run ask -- "如果我要给列表页加一个筛选条件，一般先改哪里"
```

## What `ask` can do now

The current version is a local helper, not a full remote LLM chat system.

It can:

1. route common questions to the right generated docs,
2. identify likely business domains,
3. suggest source files to read first,
4. explain common edit entry patterns.

## What `ask` does not do yet

It does not yet:

1. run semantic retrieval,
2. call a hosted model,
3. rewrite answers based on deep source inspection in real time.

That can be added in a later phase.

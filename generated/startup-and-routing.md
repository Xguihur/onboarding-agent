# Startup and routing

## Startup chain

1. `src/main.ts` creates the Vue app.
2. Pinia is mounted: yes.
3. Router is mounted: yes.
4. Global components are mounted: yes.
5. I18n is mounted: yes.
6. Screen size initialization runs: yes.
7. System settings initialization runs: yes.

## Routing characteristics

- Hash history: yes
- Router guard present: yes
- Backend route initialization: yes
- Backend menu source: yes
- Biz route file currently empty: yes

## Working mental model for newcomers

1. Static login route exists first.
2. After authentication, the app initializes backend-controlled routes.
3. Backend menu items are mapped to files under `src/framework/views` and `src/biz/views`.
4. The business route file is not the main source of truth right now.

## Suggested files to read first

- `src/main.ts`
- `src/App.vue`
- `src/framework/router/index.ts`
- `src/framework/router/route.ts`
- `src/framework/router/backEnd.ts`
- `src/framework/layout/index.vue`
- `src/framework/utils/request.ts`

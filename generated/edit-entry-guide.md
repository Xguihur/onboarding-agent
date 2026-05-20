# Common edit entry guide

## When adding a search field to a list page

Typical order:

1. find the target page `src/biz/views/.../index.vue`
2. locate the search form area or `SearchSet` usage
3. update the page query form
4. update the matching API request params if needed
5. verify the table refresh path

## When adding a table column

Typical order:

1. update table columns in the page `index.vue`
2. check whether a formatter, dict, or preview component is needed
3. confirm the backend field exists in the API response

## When adding a new popup or drawer

Typical order:

1. check whether the page already has a `modules/` folder
2. add or extend a child component in `modules/`
3. open it from the main page
4. wire the action to the matching API file

## When changing route behavior

Typical order:

1. confirm whether the route is static or backend-driven
2. inspect `src/framework/router/route.ts`
3. inspect `src/framework/router/index.ts`
4. inspect `src/framework/router/backEnd.ts`
5. inspect backend menu mapping assumptions before editing

## When exploring a business module for the first time

Recommended order:

1. `generated/module-index.md`
2. target page `src/biz/views/[domain]/[page]/index.vue`
3. target API file under `src/biz/api`
4. child components under `modules/`
5. framework hooks/components used by that page

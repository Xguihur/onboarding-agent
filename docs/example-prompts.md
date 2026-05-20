# Example prompts

These prompts are intended for Codex, Claude Code, Cursor, or similar coding runtimes.

## 项目总览类

1. 请用新人能听懂的方式介绍这个项目的整体结构，并区分 `framework` 和 `biz`。
2. 这个项目怎么启动？从 `main.ts` 到页面渲染的主链路是什么？
3. 我刚接手这个项目，第一天应该先看哪些文件？

## 路由与框架类

1. 登录后路由是怎么初始化的？请按执行顺序解释。
2. 为什么 `src/biz/route/index.ts` 里几乎没有路由，但页面还是能打开？
3. 这个项目的动态路由是后端怎么控制前端页面的？

## 业务模块类

1. 请带我读一遍 `customer` 模块，告诉我先看哪几个文件。
2. `financial/customer` 这一块的页面和 API 是怎么对应起来的？
3. `invoice` 模块为什么页面在 `biz/views/invoice`，接口却主要在 `biz/api/financial/invoice.ts`？

## 改动入口类

1. 如果我要给某个列表页加一个搜索条件，一般先改哪里？
2. 如果我要新增一个弹窗，一般会放在什么目录？
3. 如果我想改一个页面里的表格列、搜索条件和接口参数，典型改动链路是什么？

## 学习路径类

1. 给我一个 3 天熟悉 `voice-admin-web` 的学习计划。
2. 如果我是刚入职前端，应该从哪个业务模块开始读最合适？
3. 请给我一个“先理解框架，再理解业务”的阅读顺序。

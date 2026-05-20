---
name: frontend-onboarding
description: 面向 `voice-admin-web` 新人的前端带教技能。适用于理解项目结构、启动链路、动态路由、模块入口、典型改动链路，以及输出 1-3 天学习路径。优先使用本 agent 项目的 generated 文档作为事实入口，再按需回到源码核对。
---

# voice-admin-web 前端新人带教

## 适用场景

当用户的问题属于下面这些类型时，使用这个 skill：

1. “这个项目怎么启动？”
2. “`framework` 和 `biz` 有什么区别？”
3. “登录后的路由是怎么生成的？”
4. “某个业务模块应该先看哪些文件？”
5. “如果我要改一个列表页/弹窗/接口，一般从哪里入手？”
6. “给我一个新人 3 天学习路径”

如果问题更偏某个业务域的深度功能细节，可以结合源项目已有的 `project-navigator` 资料一起使用。

## 项目路径

### 1. Agent scaffold 根目录

当前 skill 所在项目的关键路径：

1. `../../generated/project-overview.md`
2. `../../generated/startup-and-routing.md`
3. `../../generated/module-index.md`
4. `../../generated/project-facts.json`
5. `../../docs/newcomer-learning-path.md`
6. `../../docs/example-prompts.md`

### 2. 源代码仓路径

默认源代码仓为：

`/Users/xiaolongxia/Desktop/shuoruan/project/voice-admin-web`

如果以后仓库位置变化，以 `../../config/project.config.json` 为准。

## 工作流

收到问题后，按下面顺序工作。

### 第一步：先判断问题类型

优先归类为以下 5 类之一：

1. `项目总览`
2. `启动/路由`
3. `模块导读`
4. `改动入口`
5. `学习路径`

如果一个问题同时涉及多类，优先回答用户最直接的目标。

### 第二步：先读 generated 文档，再回源码

默认先读：

1. `../../generated/project-overview.md`
2. `../../generated/startup-and-routing.md`
3. `../../generated/module-index.md`

然后根据问题类型再决定回源码看哪些文件。

### 第三步：按问题类型选择源码入口

#### A. 项目总览

优先看：

1. `src/main.ts`
2. `src/App.vue`
3. `src/framework/layout/index.vue`

#### B. 启动/路由

优先看：

1. `src/framework/router/route.ts`
2. `src/framework/router/index.ts`
3. `src/framework/router/backEnd.ts`
4. `src/biz/route/index.ts`

#### C. 模块导读

先看：

1. `../../generated/module-index.md`

再看对应：

1. `src/biz/views/[模块]/[页面]/index.vue`
2. `src/biz/views/[模块]/[页面]/modules/`
3. `src/biz/api/...`

#### D. 改动入口

优先帮助用户建立“改动链路”，通常按顺序排查：

1. 页面主文件 `index.vue`
2. 子组件 `modules/`
3. 对应 API 文件
4. 如果涉及公共能力，再查 `framework/components` 或 `framework/hooks`

#### E. 学习路径

优先读：

1. `../../docs/newcomer-learning-path.md`
2. `../../generated/project-overview.md`
3. `../../generated/startup-and-routing.md`

### 第四步：必要时结合源项目现有导航资料

如果问题明显属于深业务域，比如：

1. 客户账单
2. 发票
3. 供应商
4. 审批
5. 规则

那么可以继续参考源项目里的：

1. `/Users/xiaolongxia/Desktop/shuoruan/project/voice-admin-web/.cursor/skills/project-navigator/SKILL.md`
2. `/Users/xiaolongxia/Desktop/shuoruan/project/voice-admin-web/.cursor/skills/project-navigator/framework-reference.md`
3. `/Users/xiaolongxia/Desktop/shuoruan/project/voice-admin-web/.cursor/skills/project-navigator/modules-reference.md`

## 回答规则

### 1. 优先讲“结构角色”，再讲实现细节

不要一上来就解释代码片段。  
优先回答：

1. 这个文件在系统里干什么
2. 它处于 `framework` 还是 `biz`
3. 它和上下游文件怎么连接

### 2. 面向新人，默认用“整体 -> 局部 -> 改动入口”顺序

回答尽量按这个顺序组织：

1. 一句话结论
2. 整体结构
3. 关键文件
4. 如果要改，先改哪里

### 3. 尽量引用真实文件路径

尤其是下面这些问题必须带路径：

1. “代码在哪？”
2. “从哪里改？”
3. “这个模块先看什么？”

### 4. 明确区分“框架通识”和“本项目特例”

例如：

1. 动态路由是通用概念
2. 但这个项目用后端菜单驱动 `framework/views` 和 `biz/views`，这是本项目特例

### 5. 不确定时明确说不确定

如果仅从 generated 文档和已读源码无法确认，不要猜。  
应该说：

> “根据当前读到的代码，我可以确认 A、B，但 C 还需要继续看某个文件。”

## 常见输出模板

### 模板 1：项目总览

1. 先一句话说明项目性质
2. 再解释 `framework` / `biz`
3. 再给新人第一批阅读文件

### 模板 2：启动/路由

1. 先给执行顺序
2. 再解释静态路由和动态路由的分工
3. 再指出关键文件

### 模板 3：模块导读

1. 先说明这个模块属于哪个业务域
2. 再给推荐阅读顺序
3. 再说明典型页面 + API + 子组件关系

### 模板 4：改动入口

1. 先判断是页面层、组件层还是接口层问题
2. 再给典型改动链路
3. 再列出优先查看的文件

## 特别提醒

1. 不要把 generated 文档当成最终真相，它只是事实入口
2. 真正有争议的地方，必须回源码确认
3. 遇到业务域细节，优先结合现有 `project-navigator` 资料
4. 你的目标不是炫技，而是降低新人看代码的焦虑

# voice-admin-web onboarding handbook

This handbook is generated from the local onboarding scaffold.

## How to read this handbook

1. Start from the project overview.
2. Continue with startup and routing.
3. Then move to the newcomer learning path.
4. Use the module index when you need a domain-specific entry.

---

# voice-admin-web project overview

Generated at: 2026-05-20T08:26:12.880Z

## Stack

- Framework: Vue 3
- Language: TypeScript
- Bundler: Vite
- State: Pinia
- Router: Vue Router 4
- I18n: Vue I18n
- UI: Element Plus, NutUI

## Core structure

- Framework layer: `src/framework`
- Business layer: `src/biz`
- Alias: `/@ -> src/`

## Counts

- Business domains: 13
- Business API files: 35
- Framework API files: 9
- Framework store files: 10
- Framework components: 12
- Framework hooks: 4

## Key entry files

- `src/main.ts`
- `src/App.vue`
- `src/framework/router/route.ts`
- `src/framework/router/index.ts`
- `src/framework/router/backEnd.ts`
- `src/biz/route/index.ts`

## Business domains

- `approve`: 3 pages, 3 api files
- `cardlibrary`: 3 pages, 3 api files
- `customer`: 5 pages, 4 api files
- `financial`: 4 pages, 7 api files
- `invoice`: 4 pages, 1 api files
- `recharge`: 1 pages, 1 api files
- `reportStatistics`: 2 pages, 2 api files
- `rules`: 5 pages, 2 api files
- `speech`: 1 pages, 1 api files
- `supplier`: 3 pages, 3 api files
- `supplierFinance`: 5 pages, 2 api files
- `vos`: 1 pages, 1 api files
- `xnumber`: 2 pages, 1 api files

## API-only domains

- `callmanagement`
- `common`

## Existing AI assets

- Project navigator skill present: yes
- Skill path: `.cursor/skills/project-navigator/SKILL.md`


---

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


---

# 新人学习路径

这是一份面向 `voice-admin-web` 新人的 3 天入门路线，目标不是让人立刻掌握全部业务，而是先建立正确的项目地图。

## 第一天：先建立框架心智模型

目标：

1. 知道项目怎么启动
2. 知道页面是怎么渲染出来的
3. 知道 `framework` 和 `biz` 的职责边界

建议阅读顺序：

1. `generated/project-overview.md`
2. `generated/startup-and-routing.md`
3. `src/main.ts`
4. `src/App.vue`
5. `src/framework/layout/index.vue`
6. `src/framework/router/route.ts`
7. `src/framework/router/index.ts`
8. `src/framework/router/backEnd.ts`

当天要回答出来的问题：

1. 为什么这个项目的业务路由不是手写在一个大路由文件里？
2. 登录后页面为什么能根据后端菜单显示不同内容？
3. `framework` 里的代码为什么不能简单当成业务页面去改？

## 第二天：读一条典型业务链路

目标：

1. 理解业务页面、API、公共组件之间怎么配合
2. 找到“一个功能一般改哪些文件”的模式

推荐先读的模块：

1. `customer/list`
2. `customer/account`
3. `supplier/supplierlist`

建议阅读顺序：

1. 先看 `generated/module-index.md`
2. 再看对应 `biz/views/.../index.vue`
3. 再看对应 `biz/api/...`
4. 如果页面用了公共组件或 Hook，再去看 `framework/components` 或 `framework/hooks`

当天要回答出来的问题：

1. 一个典型列表页有哪些组成部分？
2. 搜索、表格、分页、弹窗通常分别落在哪些文件？
3. 哪些能力是页面自己写的，哪些是框架层复用的？

## 第三天：带着修改目标去看代码

目标：

1. 不只是“能看懂”，而是能找到改动入口
2. 能把问题拆成页面、组件、接口三层

推荐练习：

1. 找一个列表页，定位“新增一个搜索项”要改哪里
2. 找一个页面，定位“新增一个操作弹窗”要改哪里
3. 找一个接口，定位它在页面里是怎么被调用的

推荐问题：

1. 如果我要给某个列表页加一个筛选条件，改动链路是什么？
2. 如果我要新增详情弹窗，一般放在 `modules/` 下的哪个文件？
3. 如果接口字段改了，除了 API 文件，还可能影响哪些页面和子组件？

## 学习原则

1. 先理解整体结构，再钻具体业务
2. 先学“在哪改”，再学“为什么这样写”
3. 优先挑典型页面读，不要一开始就扎进最复杂模块
4. 遇到不懂的业务词，先问清它属于哪个业务域，再回到代码定位


---

# Module index

## Framework components

- `BatchInput`
- `CityCascader`
- `DatePicker`
- `DictTag`
- `DrawerTab`
- `IconSelector`
- `Pagination`
- `Preview`
- `SearchSet`
- `SelectHttp`
- `SvgIcon`
- `Upload`

## Framework hooks

- `dict`
- `message`
- `screenSize`
- `table`

## API-only domains

- `callmanagement`
- `common`

## Business domains

## approve

Page directories:
  - `customer`
  - `deduction`
  - `unsubscribeapplication`

API files:
  - `src/biz/api/approve/customer.ts`
  - `src/biz/api/approve/deduction.ts`
  - `src/biz/api/approve/unsubscribeapplication.ts`

## cardlibrary

Page directories:
  - `complaint`
  - `customerGatewayManagement`
  - `list`

API files:
  - `src/biz/api/cardlibrary/callComplaint.ts`
  - `src/biz/api/cardlibrary/customerGatewayManagement.ts`
  - `src/biz/api/cardlibrary/list.ts`

## customer

Page directories:
  - `account`
  - `consumptionlist`
  - `list`
  - `menu`
  - `role`

API files:
  - `src/biz/api/customer/account.ts`
  - `src/biz/api/customer/list.ts`
  - `src/biz/api/customer/menu.ts`
  - `src/biz/api/customer/role.ts`

## financial

Page directories:
  - `credit`
  - `customer`
  - `deduction`
  - `warn`

API files:
  - `src/biz/api/financial/credit.ts`
  - `src/biz/api/financial/customer.ts`
  - `src/biz/api/financial/customerRefund.ts`
  - `src/biz/api/financial/deduction.ts`
  - `src/biz/api/financial/index.ts`
  - `src/biz/api/financial/invoice.ts`
  - `src/biz/api/financial/report.ts`

## invoice

Page directories:
  - `customerApplyForInvoicing`
  - `customerInvoiceAccount`
  - `customerInvoiceApply`
  - `partnerInvoicing`

API files:
  - `src/biz/api/financial/invoice.ts`

## recharge

Page directories:
  - `writeOffRecord`

API files:
  - `src/biz/api/recharge/writeOffRecord.ts`

## reportStatistics

Page directories:
  - `calleePddChart`
  - `orderFlowChart`

API files:
  - `src/biz/api/reportStatistics/calleePddChart.ts`
  - `src/biz/api/reportStatistics/orderFlowChart.ts`

## rules

Page directories:
  - `customer`
  - `customer-mediator`
  - `mediator`
  - `supplier`
  - `virtual-operator`

API files:
  - `src/biz/api/rules/app.ts`
  - `src/biz/api/rules/index.ts`

## speech

Page directories:
  - `filing`

API files:
  - `src/biz/api/speech/filing.ts`

## supplier

Page directories:
  - `paymentapproval`
  - `supplierlist`
  - `suppliermanagement`

API files:
  - `src/biz/api/supplier/paymentapproval.ts`
  - `src/biz/api/supplier/supplierlist.ts`
  - `src/biz/api/supplier/suppliermanage.ts`

## supplierFinance

Page directories:
  - `bill`
  - `billDetail`
  - `invoiceAccount`
  - `invoiceAccountDetail`
  - `invoiceApproval`

API files:
  - `src/biz/api/supplierFinance/bill.ts`
  - `src/biz/api/supplierFinance/supplierInvoice.ts`

## vos

Page directories:
  - `cdr`

API files:
  - `src/biz/api/vos/cdr.ts`

## xnumber

Page directories:
  - `xlist`
  - `xnumberlist`

API files:
  - `src/biz/api/xnumber/xlist.ts`



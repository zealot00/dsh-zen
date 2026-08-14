# dsh-zen — 禅模式插件

DeepSeek Harness (dsh) WebUI 的**禅模式**：把 Agent 的复杂性隔离在系统内部，把人的注意力留给事情本身。不是"极简 UI"，而是 **Minimal User Decisions**。

> 📐 完整设计哲学见 [docs/DESIGN.md](./docs/DESIGN.md)（委托模型 · 三视觉层级 · 打扰预算 · 方向盘 · Artifact 交付）

> 与 dsh-pet 联动：禅模式激活时，**桌面宠物自动隐藏**（监听 `dsh-zen-change` 事件），退出后恢复。

## 功能

- **一键沉浸**：浮动"禅"按钮（右上角）或快捷键 **Ctrl+Shift+Z** 切换；
- **切回默认皮肤**：激活时移除皮肤作用域属性（鲸鱼娘等皮肤整体失效），退出时完整恢复；
- **工作台 HUD**：左上任务名 · 右上状态（`● Working` 状态句 / `▲ 需要你` / `✓ Done`，呼吸圆点）；
- **过程摘要**：点状态展开 Level 1 面板（任务/耗时/过程增量）；
- **动态建议**：输入框上方按上下文出现（继续研究 / 整理成文章 / 核对来源 / 查看争议 / 暂停）；
- **暂停**：运行时出现"暂停"，点击原生停止（队列与进度保留）；
- **命令式输入**：占位符「接下来做什么？」；
- **呼吸动画**：工作区 7s 轻微脉动，暗示"有东西在干活"；
- **宠物联动**：激活时派发 `dsh-zen-change` 事件，dsh-pet 监听后自动隐藏；
- **暗色适配**：按钮自动适配明暗主题。

## 安装

```bash
./install.sh && dsh web
```

## 使用

- 点左上角 **"禅"** 按钮，或按 **Ctrl+Shift+Z** 进入/退出禅模式；
- 禅模式中按钮变绿（**"出"**），点击或再按快捷键退出；
- 禅模式下宠物（若安装 dsh-pet）自动隐藏，退出后恢复。

## 项目结构

```
dsh-zen/
├── package.json      # dsh.client + dsh.bundle.patch
├── cordis.patch.yml  # bundle patch
├── lib/
│   ├── index.js      # host 半部（占位，预留设置）
│   └── client.js     # 浏览器半部：按钮/快捷键/探测隐藏/事件
├── install.sh
└── README.md
```

## 工作原理

- 纯前端：`findChrome()` 运行时探测 fixed 定位元素（左侧窄高条=侧边栏、顶部矮条=顶栏），隐藏并记录原 display；
- 退出时还原；`window.dispatchEvent(new CustomEvent("dsh-zen-change", {detail:{active}}))` 通知外部（宠物等）；
- `dsh.bundle.patch` 声明，未来可 `dsh plugin add`。

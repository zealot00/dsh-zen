# dsh-zen — 禅模式插件

DeepSeek Harness (dsh) WebUI 的**禅模式**（沉浸专注）：一键隐藏侧边栏/顶栏等界面元素，只保留极简聊天流——像 VSCode 的 Zen Mode。

> 与 dsh-pet 联动：禅模式激活时，**桌面宠物自动隐藏**（监听 `dsh-zen-change` 事件），退出后恢复。

## 功能

- **一键沉浸**：浮动"禅"按钮（左上角）或快捷键 **Ctrl+Shift+Z** 切换；
- **隐藏界面杂物**：运行时探测并隐藏固定定位的侧边栏/顶栏（聊天流和输入框保留）；
- **宠物联动**：激活时派发 `dsh-zen-change` 事件，dsh-pet 监听后自动隐藏；
- **淡入淡出**：body 加 `dsh-zen-active` class，界面过渡切换；
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

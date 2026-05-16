# ID 封面页（多人绑定）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在刷视频开始前增加封面页输入 ID，并将点赞/收藏/人格历史按 ID 分桶存储；人格三页可回看并显示当前 ID。

**Architecture:** 在 index.html 里增加 cover overlay，用户确认 ID 后再初始化刷视频与存储；用 `dy_active_user_v1` 保存当前用户，业务存储 key 统一按 `baseKey + "::" + userId` 分桶；人格三页读取 active user 的分桶 key。

**Tech Stack:** 静态 HTML/CSS/原生 JS；localStorage 持久化。

---

## Files to Touch

- Modify: [index.html](file:///g:/hks/%E6%8A%96%E9%9F%B3%E7%9F%AD%E8%A7%86%E9%A2%91%E5%BA%94%E7%94%A8%E8%AE%BE%E8%AE%A1/index.html)
- Modify: [current.html](file:///g:/hks/%E6%8A%96%E9%9F%B3%E7%9F%AD%E8%A7%86%E9%A2%91%E5%BA%94%E7%94%A8%E8%AE%BE%E8%AE%A1/current.html)
- Modify: [daily.html](file:///g:/hks/%E6%8A%96%E9%9F%B3%E7%9F%AD%E8%A7%86%E9%A2%91%E5%BA%94%E7%94%A8%E8%AE%BE%E8%AE%A1/daily.html)
- Modify: [timeline.html](file:///g:/hks/%E6%8A%96%E9%9F%B3%E7%9F%AD%E8%A7%86%E9%A2%91%E5%BA%94%E7%94%A8%E8%AE%BE%E8%AE%A1/timeline.html)

---

### Task 1: 定义“当前用户”与分桶 key 规则

**Files:**
- Modify: index.html / current.html / daily.html / timeline.html

- [ ] **Step 1: 定义 active user key + userId 校验**

在每个页面脚本中加入并复用（按页面已有工具函数风格写）：

```js
var STORAGE_ACTIVE_USER = "dy_active_user_v1";
var BASE_INTERACTIONS = "dy_interactions_v1";
var BASE_PERSONA = "dy_persona_v1";

function normalizeUserId(s) {
  var v = String(s || "").trim();
  if (!v) return "";
  if (v.length > 20) return "";
  if (!/^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]{1,20}$/.test(v)) return "";
  return v;
}

function loadActiveUser() {
  var obj = loadJSON(STORAGE_ACTIVE_USER, null);
  return obj && obj.userId ? String(obj.userId) : "";
}

function saveActiveUser(userId) {
  saveJSON(STORAGE_ACTIVE_USER, { userId: userId, setAt: Date.now() });
}

function keyFor(base, userId) {
  return base + "::" + userId;
}
```

- [ ] **Step 2: 加入旧存储迁移（一次性复制）**

在 index.html 的 “开始刷视频” 流程里做迁移（其它页面只读）：

```js
function migrateLegacyIfNeeded(userId) {
  var newInterKey = keyFor(BASE_INTERACTIONS, userId);
  var newPersonaKey = keyFor(BASE_PERSONA, userId);

  if (!localStorage.getItem(newInterKey)) {
    var legacyInter = loadJSON(BASE_INTERACTIONS, null);
    if (legacyInter && typeof legacyInter === "object") saveJSON(newInterKey, legacyInter);
  }

  if (!localStorage.getItem(newPersonaKey)) {
    var legacyPersona = loadJSON(BASE_PERSONA, null);
    if (legacyPersona && typeof legacyPersona === "object") saveJSON(newPersonaKey, legacyPersona);
  }
}
```

- [ ] **Step 3: 仅做静态检查**

检查所有页面的脚本无语法错误：

```bash
node -c index.html
node -c current.html
node -c daily.html
node -c timeline.html
```

（Windows 环境如不支持 `node -c`，用浏览器打开并检查 Console 无报错）

---

### Task 2: index.html 加封面页（cover overlay）并延迟初始化

**Files:**
- Modify: index.html

- [ ] **Step 1: 增加 cover DOM（遮罩层）**

在 `.phone` 内增加 cover 容器（默认显示）：

```html
<div class="cover" id="cover" aria-hidden="false">
  <div class="cover-card">
    <div class="cover-title">今天用哪个ID刷出你的潜在人格？</div>
    <div class="cover-sub">输入ID后，点赞/收藏/人格历史会与ID绑定，下次还能在当日测评与时间轴找到自己。</div>
    <label class="cover-label" for="userIdInput">你的ID</label>
    <input class="cover-input" id="userIdInput" autocomplete="off" spellcheck="false" />
    <div class="cover-actions">
      <button class="cover-btn primary" id="startBtn" type="button">开始刷视频</button>
      <button class="cover-btn" id="randomBtn" type="button">随机一个ID</button>
    </div>
    <div class="cover-hint">支持中英文/数字/_/-，最多20个字</div>
  </div>
</div>
```

- [ ] **Step 2: 增加 cover CSS（不影响既有样式）**

新增 `.cover` 样式为全屏遮罩、玻璃拟态卡片、微动效（仅 CSS）。

- [ ] **Step 3: 将原本“立即初始化”的逻辑改为 start() 后执行**

把 index.html 脚本拆为两段：

1) 页面加载时：
   - 读取 active user → 填充 input
   - 展示 cover
2) 用户点击开始：
   - normalizeUserId 校验
   - saveActiveUser + migrateLegacyIfNeeded
   - 用该 userId 计算 `interactionsKey/personaKey`
   - 读取 liked/saved/persona
   - 生成本轮 data（含“过滤已赞/藏”逻辑）
   - 进入刷视频（调用原来的 applyItem/enterView）

- [ ] **Step 4: random ID 行为**

随机生成短 ID（例如 `u` + 6 位数字），写入 input 不直接开始。

---

### Task 3: index.html 将 interactions/persona 全部改为“按 userId 分桶”

**Files:**
- Modify: index.html

- [ ] **Step 1: 抽象本页运行时 key**

用运行时变量替代固定常量：

```js
var interactionsKey = "";
var personaKey = "";
```

在 start(userId) 中设置：

```js
interactionsKey = keyFor(BASE_INTERACTIONS, userId);
personaKey = keyFor(BASE_PERSONA, userId);
```

- [ ] **Step 2: 持久化读写全部指向分桶 key**

把以下逻辑的 key 全部改为 `interactionsKey/personaKey`：

- 恢复 liked/saved
- 点赞/收藏写回
- openModal 的“一天中各时段仅一次”读取/写入 persona store

- [ ] **Step 3: “过滤已赞/藏视频”基于当前用户**

生成本轮 roundFiles 时基于 `liked/saved` 过滤（按现有兜底规则：过滤后不足则回退 buildRound）。

- [ ] **Step 4: cover 关闭后更新右上角入口状态**

保留右上角“进入人格页”图标；当当前时段已测评时给图标增加 `.has` 外观。

---

### Task 4: 人格三页按 active user 读取 persona，并显示当前 ID

**Files:**
- Modify: current.html / daily.html / timeline.html

- [ ] **Step 1: 三页增加 active user 读取**

复用：

```js
var STORAGE_ACTIVE_USER = "dy_active_user_v1";
var BASE_PERSONA = "dy_persona_v1";
function personaKeyForActiveUser() {
  var u = loadJSON(STORAGE_ACTIVE_USER, null);
  var id = u && u.userId ? String(u.userId) : "";
  return id ? BASE_PERSONA + "::" + id : BASE_PERSONA;
}
```

- [ ] **Step 2: 替换 STORAGE_PERSONA 为 personaKeyForActiveUser()**

原来读 `dy_persona_v1` 的地方改为：

```js
var store = loadJSON(personaKeyForActiveUser(), null);
```

（若没有 active user，则回退旧 key，避免空白）

- [ ] **Step 3: 页面展示当前 ID**

在每页顶部区域插入一个小文本节点（不改变布局层级，只占一行或角落）：

- `ID：xxxx`
- 如果没有 active user，显示 `ID：未设置`

---

### Task 5: 手工验证清单

- [ ] **Step 1: 封面流程**
  - 打开 index.html → 必出现封面
  - 输入合法 ID → 点开始 → 进入刷视频
  - 刷新 index.html → 封面仍出现且自动填充上次 ID

- [ ] **Step 2: 多人隔离**
  - 用 ID=A 点赞/收藏若干，刷完 10 条出人格
  - 返回封面输入 ID=B → 点赞/收藏应为全新状态；人格历史与 A 不互相影响
  - 进入 daily/timeline，能看到各自的历史仅属于当前 ID

- [ ] **Step 3: 过滤已赞/藏**
  - 在 ID=A 点赞某个视频
  - 回到封面再进入（同一 ID=A）→ 本轮随机列表不应出现该视频（如无法凑满，回退兜底）

---

## Self-Review

- 覆盖 spec：封面每次出现、多人隔离、ID 绑定历史、旧数据迁移、三页联动读取。
- 无占位符：所有关键函数/键名/流程都明确。
- 命名一致：`dy_active_user_v1`、`dy_interactions_v1::<id>`、`dy_persona_v1::<id>`。

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-17-id-cover-onboarding-plan.md`. Two execution options:

1. **Subagent-Driven (recommended)** — 分 task 派发子任务实现，逐步验收
2. **Inline Execution** — 在本会话直接按任务实现并验证

Which approach?


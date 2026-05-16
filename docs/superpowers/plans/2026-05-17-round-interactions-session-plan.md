# Round 内互动显示为“初始空、点了才亮” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 点赞/评论/收藏/分享四个数字在每次开始刷 10 条时都为初始空；只在当前 Round 内点了才亮；进入人格页再返回刷新后再次回到初始空。人格判定只看 Round 内的点赞/收藏。

**Architecture:**
- 将互动数据拆成两层：
  - `historyLiked/historySaved`：按 ID 分桶持久化（`localStorage`），只用于“抽取 10 类视频时优先避开已赞/藏内容”
  - `roundLiked/roundSaved`：仅本轮 10 条会话内（内存），用于 UI 显示与人格判定（确保“初始空、点了才亮”）
- 评论/分享继续保持会话内（`commented/shared`），不参与人格判定

**Tech Stack:** 纯静态 HTML + CSS + 原生 JS；数据存储使用 `localStorage`

---

### Task 1: 拆分点赞/收藏为历史层与 Round 层

**Files:**
- Modify: [index.html](file:///g:/hks/抖音短视频应用设计/index.html)

- [ ] **Step 1: 新增变量**

在脚本变量区新增：
- `var historyLiked = Object.create(null);`
- `var historySaved = Object.create(null);`
- `var roundLiked = Object.create(null);`
- `var roundSaved = Object.create(null);`

- [ ] **Step 2: `startForUser(userId)` 只加载历史层，并强制清空 Round 层**

把当前：
```js
var persisted = loadJSON(interactionsKey, { liked: {}, saved: {} });
liked = (persisted && persisted.liked) || Object.create(null);
saved = (persisted && persisted.saved) || Object.create(null);
var roundFiles = buildRoundFiltered(files, liked, saved);
```

替换为：
```js
var persisted = loadJSON(interactionsKey, { liked: {}, saved: {} });
historyLiked = (persisted && persisted.liked) || Object.create(null);
historySaved = (persisted && persisted.saved) || Object.create(null);
roundLiked = Object.create(null);
roundSaved = Object.create(null);
var roundFiles = buildRoundFiltered(files, historyLiked, historySaved);
```

- [ ] **Step 3: 抽取逻辑继续使用历史层**

确认 `buildRoundFiltered(files, likedMap, savedMap)` 的调用点只传入 `historyLiked/historySaved`。

---

### Task 2: UI 显示与人格判定只依赖 Round 层

**Files:**
- Modify: [index.html](file:///g:/hks/抖音短视频应用设计/index.html)

- [ ] **Step 1: `applyInteractions(item)` 改为读取 `roundLiked/roundSaved`**

把：
```js
likeBtn.classList.toggle("on", !!liked[item.id]);
saveBtn.classList.toggle("on", !!saved[item.id]);
likeCount.textContent = liked[item.id] ? "1" : "";
shareCount.textContent = saved[item.id] ? "1" : "";
```

替换为：
```js
likeBtn.classList.toggle("on", !!roundLiked[item.id]);
saveBtn.classList.toggle("on", !!roundSaved[item.id]);
likeCount.textContent = roundLiked[item.id] ? "1" : "";
shareCount.textContent = roundSaved[item.id] ? "1" : "";
```

- [ ] **Step 2: `buildRoundInteractions()` 改为只统计 Round 层**

把循环里 `liked[it.id] / saved[it.id]` 改为 `roundLiked[it.id] / roundSaved[it.id]`。

---

### Task 3: 点赞/收藏点击行为同时更新 Round 层与历史层

**Files:**
- Modify: [index.html](file:///g:/hks/抖音短视频应用设计/index.html)

- [ ] **Step 1: 点赞点击**

将点击逻辑从 `liked[id]=!liked[id]` 改为：
- 切换 `roundLiked[id]`
- 同步更新 `historyLiked[id]`（若取消则 `delete historyLiked[id]`）
- `saveJSON(interactionsKey, { liked: historyLiked, saved: historySaved })`

- [ ] **Step 2: 收藏点击**

同上逻辑，分别使用 `roundSaved/historySaved`。

---

### Task 4: 手工验证（关键场景）

- [ ] **Case A: 新输入一个从未用过的 ID**
  - 进入刷视频后四个数字全为空
  - 点赞/收藏后只在当前 Round 内显示 `1`
- [ ] **Case B: 同一 Round 内回滑回到点过的那条**
  - 该条仍然亮起并显示 `1`
- [ ] **Case C: 进入人格页再返回（触发刷新）**
  - 再次开始刷视频时四个数字恢复为空（即使历史上点过）
  - 但抽取视频时仍优先避开历史上点过赞/藏的内容（每类都点过则回退保证 10 类齐全）


# 刷视频右侧四个数字“默认空、点了才亮”实现计划

> **Goal:** 刷视频页右侧“点赞/评论/收藏/分享”四个数字初始都不显示；玩家点击对应按钮后才高亮并显示 `1`。人格判定仍只与点赞/收藏相关。

**Architecture:**
- UI 数字显示由 `applyInteractions(item)` 统一渲染：未互动为空字符串，已互动显示 `1`
- 点赞/收藏沿用现有 `localStorage`（按用户 ID 分桶）持久化
- 评论/分享新增“轻量互动态”：仅在当前会话内按视频 id 记录，不写入 `localStorage`，不参与人格判定

**Tech Stack:** 纯静态 HTML + CSS + 原生 JS；数据存储使用 `localStorage`

---

### Task 1: 清空评论/分享初始数字

**Files:**
- Modify: [index.html](file:///g:/hks/抖音短视频应用设计/index.html)

- [ ] **Step 1: HTML 中将 `commentCount` 与 `shareCount2` 的默认内容置空**

预期：首次进入刷视频页（封面后开始）四个数字都为空。

---

### Task 2: 增加评论/分享“点击才亮”交互态

**Files:**
- Modify: [index.html](file:///g:/hks/抖音短视频应用设计/index.html)

- [ ] **Step 1: 增加 `commentBtn` / `shareBtn` DOM 引用**
- [ ] **Step 2: 新增 `commented` / `shared` 两个会话内 Map（按视频 id）**
- [ ] **Step 3: 在 `resetSession()` 中重置这两个 Map**
- [ ] **Step 4: 在 `applyInteractions(item)` 中渲染评论/分享按钮 `.on` 与数字显示**
- [ ] **Step 5: 为评论/分享按钮绑定点击事件（切换 `.on`，更新数字为 `1`）**

预期：在同一条视频内点击评论/分享后对应数字出现且按钮高亮；切换视频后保持该视频的互动态（仅本轮会话）。

---

### Task 3: 增加通用 `.btn.on` 高亮样式（不影响赞/藏）

**Files:**
- Modify: [index.html](file:///g:/hks/抖音短视频应用设计/index.html)

- [ ] **Step 1: CSS 新增 `.btn.on` 规则**

预期：评论/分享按钮在 `.on` 状态下有可见高亮；点赞/收藏仍走各自的专属颜色样式（`.btn.like.on` / `.btn.save.on`）。

---

### Task 4: 验证

**Manual Check:**
- [ ] 进入刷视频页后，四个数字均为空
- [ ] 点赞后：点赞按钮变色、点赞数字显示 `1`
- [ ] 收藏后：收藏按钮变色、收藏数字显示 `1`
- [ ] 点评论后：评论按钮高亮、评论数字显示 `1`
- [ ] 点分享后：分享按钮高亮、分享数字显示 `1`
- [ ] 人格判定逻辑不变：仍只读取点赞/收藏（不引入评论/分享）


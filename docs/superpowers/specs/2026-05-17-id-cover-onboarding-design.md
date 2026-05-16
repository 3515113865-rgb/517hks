## 背景

当前项目为纯静态 HTML + CSS + JS 的刷视频体验：刷完 10 条后基于点赞/收藏/停留/滑动等行为计算人格，并在人格页（此刻的你 / 当日测评 / 时间轴）联动展示。

新增诉求：

- 刷视频开始前增加一个“有意思的封面”，引导用户输入自己的 ID。
- 同一台设备支持多人：不同 ID 的点赞/收藏/人格历史互不影响。
- 下次进入还能在当日测评与时间轴里找到自己（即：历史按 ID 归档可回溯）。
- 每次进入 index.html 先显示封面（默认填充上次 ID），点击开始进入刷视频。

## 目标与非目标

目标：

- index.html 增加封面层（overlay cover），不破坏现有刷视频 UI、交互、判定规则与“每时段仅一次测评机会”的机制。
- 引入“当前用户 ID”概念，并用该 ID 对所有存储进行分桶隔离（interactions/persona）。
- 人格三页（current/daily/timeline）展示当前用户 ID，并读取当前用户对应的人格历史。
- 兼容旧存储（未分 ID 的历史）并在首次进入某个 ID 时自动迁移一次。

非目标：

- 不新增网络依赖；不引入 npm/构建工具；不引入后端。
- 不改变现有 persona 规则、文案与图片映射（只改数据读取来源与入口流程）。

## 数据模型与存储键

新增：

- `dy_active_user_v1`：当前活跃用户对象
  - `{ userId: string, setAt: number }`

按用户分桶（新增 key 规则）：

- `dy_interactions_v1::<userId>`
  - `{ liked: Record<videoId,string|boolean>, saved: Record<videoId,string|boolean> }`
- `dy_persona_v1::<userId>`
  - `{ latest: PersonaResult|null, history: PersonaResult[] }`

迁移策略（一次性）：

- 若检测到旧 key `dy_interactions_v1` 且新 key 不存在，则复制到 `dy_interactions_v1::<userId>` 并保留旧 key（不删除，避免误伤）。
- 若检测到旧 key `dy_persona_v1` 且新 key 不存在，则复制到 `dy_persona_v1::<userId>` 并保留旧 key（不删除）。

## UI/交互设计（封面）

页面：index.html

- 初始状态：显示 cover overlay，遮住刷视频主界面。
- Cover 内容：
  - 标题（趣味文案）
  - 输入框：ID（1–20 字符，允许中英文/数字/下划线/短横线；自动 trim）
  - 主按钮：“开始刷视频”
  - 次要按钮：“随机一个ID”（可选，若实现则生成短 ID）
  - 小提示：ID 会绑定人格与历史，可在当日测评/时间轴回看
- 默认填充：从 `dy_active_user_v1.userId` 取上次 ID 自动填充。
- 点击开始：
  - 校验 ID 合法
  - 写入 `dy_active_user_v1`
  - 执行迁移（若需要）
  - 关闭 cover overlay
  - 以该用户 ID 初始化本轮刷视频：读取对应 interactions/persona；执行“过滤已赞/藏视频”的本轮抽样；启动播放

右上角入口：

- 维持现有“头像图标进入人格页”的入口，不显示具体人格文本。

## 业务逻辑改动点

### 1) index.html

- 启动流程改为“等待用户输入 ID”后再初始化：
  - 之前：脚本立即 buildRound / load storage / applyItem
  - 之后：页面加载 → 展示 cover → 用户确认 ID → 初始化
- localStorage 读写全部换成“按当前 userId 计算 key”。
- “每时段仅一次测评机会”仍基于 `dy_persona_v1::<userId>.history` 判断。
- “不显示曾点赞/收藏内容”的过滤，基于 `dy_interactions_v1::<userId>`。

### 2) current.html / daily.html / timeline.html

- 读取 `dy_active_user_v1` 获取 userId
- 所有 persona 读取从 `dy_persona_v1` 改为 `dy_persona_v1::<userId>`
- 页面上显示一个轻量 ID 提示（不改主体布局）

## 验收标准

- 打开 index.html 时必定先出现封面，输入 ID 后开始刷视频。
- 同一设备输入不同 ID：
  - 点赞/收藏互不影响
  - 人格 latest/history 互不影响
  - time line 中只看到该 ID 的历史
- 从人格页返回 index.html：
  - 页面刷新重抽视频
  - 不出现该 ID 之前已赞/藏的视频（若无法凑满 10 条，按现有兜底策略回退）。
- 不引入任何网络依赖，双击可用。


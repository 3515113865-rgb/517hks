# 视频流置入 20 个本地视频 Spec

## Why
当前首页刷视频流使用图片缩略图模拟，无法播放真实视频。需要在首页刷视频页面置入 20 个可播放的视频，提升“抖音刷视频”的真实感。

## What Changes
- 首页刷视频页面从“图片缩略图”改为“播放本地视频文件（20条）”
- mock 视频数据由 10 条扩展为 20 条，并为每条增加本地视频路径字段
- 仅当前视频自动播放；切换视频时暂停上一条并播放当前条
- 本地视频资源约定放置在 `public/videos/` 下（由使用方提供文件）

## Impact
- Affected specs: 首页刷视频体验、资源管理（本地视频）
- Affected code: [VideoFeed.tsx](file:///g:/hks/抖音短视频应用设计/src/app/pages/VideoFeed.tsx), [mockData.ts](file:///g:/hks/抖音短视频应用设计/src/app/data/mockData.ts)

## ADDED Requirements
### Requirement: 本地视频列表
系统 SHALL 支持首页刷视频页面展示并播放 20 个本地视频条目。

#### Scenario: 成功展示 20 条
- **WHEN** 用户打开应用首页（`/`）
- **THEN** 页面显示刷视频交互，并且总数为 20 条（UI 显示 `1 / 20`，可上滑直到 `20 / 20`）

### Requirement: 本地视频资源约定
系统 SHALL 支持从 `public/videos/` 路径加载视频文件作为视频源。

#### Scenario: 资源放置与引用
- **WHEN** 使用方将 20 个视频文件放入 `public/videos/`
- **THEN** 页面可通过形如 `/videos/<filename>.mp4` 的路径加载并播放

### Requirement: 自动播放与切换行为
系统 SHALL 在当前条目可见时自动播放视频，并在切换条目时停止上一条播放。

#### Scenario: 上滑切换
- **WHEN** 用户上滑切换到下一条视频
- **THEN** 上一条视频停止播放并重置到开头（允许实现为暂停+seek到0），下一条视频自动开始播放

#### Scenario: 下滑切换
- **WHEN** 用户下滑回到上一条视频
- **THEN** 当前视频停止播放并重置，上一条视频自动开始播放

## MODIFIED Requirements
### Requirement: 首页视频渲染方式
系统 SHALL 在首页刷视频页面使用 `<video>` 播放内容，保留现有的点赞/收藏/评论/分享等交互 UI 布局与手势滚动切换逻辑。

#### Scenario: 保留现有交互
- **WHEN** 用户点赞/收藏当前视频
- **THEN** 行为与当前实现一致（仅影响当前条目展示状态），且切换视频不丢失已点赞/已收藏集合

## REMOVED Requirements
### Requirement: 仅用缩略图模拟视频
**Reason**: 需要真实视频播放而非静态图片模拟
**Migration**: 保留 `thumbnail` 作为视频 poster（若实现采用），并新增 `src`（本地视频路径）作为主要播放资源

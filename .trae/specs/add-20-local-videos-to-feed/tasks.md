# Tasks
- [x] Task 1: 定义 20 条本地视频 mock 数据
  - [x] 在 `mockData.ts` 的 `VideoItem` 中新增本地视频路径字段（如 `src`）
  - [x] 将 `mockVideos` 扩展为 20 条，并为每条填充 `/videos/<filename>.mp4` 路径（文件由使用方提供）
- [x] Task 2: 首页刷视频改为播放本地视频
  - [x] 将 `VideoFeed` 的媒体渲染从 `<img>` 改为 `<video>`
  - [x] 切换视频时暂停并重置上一条，自动播放当前条（含触摸/滚轮切换）
  - [x] 保持现有按钮布局、动效与计数展示
- [x] Task 3: 基础验证
  - [x] 本地放置 20 个视频文件时，首页可从 1 刷到 20 并正常播放
  - [x] 切换视频不会同时多条播放

# Task Dependencies
- Task 2 depends on Task 1

import { TimePeriod } from '../utils/timeUtils';

export interface PersonalityCard {
  id: string;
  period: TimePeriod;
  periodLabel: string;
  title: string;
  insight: string;
  description: string;
  timestamp: Date;
  isRare?: boolean;
  image?: string;
}

export interface VideoItem {
  id: string;
  thumbnail: string;
  src: string;
  title: string;
  caption: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
}

export const mockVideos: VideoItem[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-01.mp4',
    title: '山间静坐',
    caption: '找到内心的平静时刻',
    tags: ['#冥想', '#自然', '#治愈'],
    likes: 12400,
    comments: 892,
    shares: 543
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-02.mp4',
    title: '渐变美学',
    caption: '每个情绪都有它的色彩',
    tags: ['#情绪', '#美学', '#艺术'],
    likes: 18900,
    comments: 1203,
    shares: 876
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1611416457332-946853cc75d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-03.mp4',
    title: '城市夜色',
    caption: '夜晚是情绪最真实的时刻',
    tags: ['#夜晚', '#城市', '#情绪'],
    likes: 24300,
    comments: 1567,
    shares: 1234
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1526724038726-3007ffb8025f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-04.mp4',
    title: '海边瑜伽',
    caption: '身心合一的练习',
    tags: ['#瑜伽', '#海边', '#平静'],
    likes: 15600,
    comments: 987,
    shares: 654
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1684139517679-032b7213ad2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-05.mp4',
    title: '流动色彩',
    caption: '情绪如水般流动',
    tags: ['#流动', '#色彩', '#情绪'],
    likes: 21700,
    comments: 1432,
    shares: 987
  },
  {
    id: '6',
    thumbnail: 'https://images.unsplash.com/photo-1541588007165-da26f41a1996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-06.mp4',
    title: '岩石冥想',
    caption: '在大自然中找到自己',
    tags: ['#冥想', '#自然', '#独处'],
    likes: 13200,
    comments: 765,
    shares: 432
  },
  {
    id: '7',
    thumbnail: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-07.mp4',
    title: '光影交织',
    caption: '情绪的层次感',
    tags: ['#光影', '#情绪', '#艺术'],
    likes: 19800,
    comments: 1198,
    shares: 854
  },
  {
    id: '8',
    thumbnail: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-08.mp4',
    title: '水中静心',
    caption: '让思绪沉淀',
    tags: ['#静心', '#水', '#沉淀'],
    likes: 16500,
    comments: 934,
    shares: 723
  },
  {
    id: '9',
    thumbnail: 'https://images.unsplash.com/photo-1588312744377-2adfb7b8578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-09.mp4',
    title: '夜幕降临',
    caption: '夜晚的情绪释放',
    tags: ['#夜晚', '#情绪', '#释放'],
    likes: 22400,
    comments: 1543,
    shares: 1098
  },
  {
    id: '10',
    thumbnail: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-10.mp4',
    title: '柔和渐变',
    caption: '温柔对待每一种情绪',
    tags: ['#温柔', '#渐变', '#情绪'],
    likes: 17900,
    comments: 1087,
    shares: 765
  },
  {
    id: '11',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-11.mp4',
    title: '晨光漫步',
    caption: '把今天交给慢一点的呼吸',
    tags: ['#清晨', '#散步', '#放松'],
    likes: 14150,
    comments: 812,
    shares: 506
  },
  {
    id: '12',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-12.mp4',
    title: '森林回声',
    caption: '把焦虑交给树叶的沙沙声',
    tags: ['#森林', '#治愈', '#白噪音'],
    likes: 20680,
    comments: 1231,
    shares: 934
  },
  {
    id: '13',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-13.mp4',
    title: '山风来信',
    caption: '风把烦恼吹走也带来勇气',
    tags: ['#山', '#风', '#情绪'],
    likes: 17320,
    comments: 984,
    shares: 677
  },
  {
    id: '14',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-14.mp4',
    title: '海浪节拍',
    caption: '跟着浪声重新对齐心跳',
    tags: ['#海浪', '#节奏', '#平静'],
    likes: 25840,
    comments: 1677,
    shares: 1289
  },
  {
    id: '15',
    thumbnail: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-15.mp4',
    title: '街角微光',
    caption: '小小的光也能照亮一段路',
    tags: ['#城市', '#微光', '#治愈'],
    likes: 19410,
    comments: 1109,
    shares: 803
  },
  {
    id: '16',
    thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-16.mp4',
    title: '咖啡缓冲',
    caption: '给自己一个暂停的理由',
    tags: ['#咖啡', '#松弛', '#日常'],
    likes: 16230,
    comments: 905,
    shares: 612
  },
  {
    id: '17',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-17.mp4',
    title: '星空慢放',
    caption: '宇宙很大，烦恼就小一点',
    tags: ['#星空', '#安静', '#情绪'],
    likes: 28990,
    comments: 1764,
    shares: 1542
  },
  {
    id: '18',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-18.mp4',
    title: '日落余温',
    caption: '把一天的疲惫交给晚霞',
    tags: ['#日落', '#晚霞', '#治愈'],
    likes: 27110,
    comments: 1622,
    shares: 1397
  },
  {
    id: '19',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-19.mp4',
    title: '雨夜电台',
    caption: '雨声像一首没人打扰的歌',
    tags: ['#雨夜', '#白噪音', '#独处'],
    likes: 23180,
    comments: 1498,
    shares: 1120
  },
  {
    id: '20',
    thumbnail: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    src: '/videos/video-20.mp4',
    title: '情绪整理术',
    caption: '把复杂的心情折叠收好',
    tags: ['#情绪', '#整理', '#自愈'],
    likes: 20350,
    comments: 1310,
    shares: 998
  }
];

export const allPersonalityCards: PersonalityCard[] = [
  // 06:00-11:00 人类重启区 - 普通人格
  {
    id: 'm1',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '今天一定重新做人型',
    insight: '早晨突然想改变人生',
    description: '正在进入人生重启模式',
    timestamp: new Date('2026-05-16T07:00:00'),
    isRare: false
  },
  {
    id: 'm2',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '起床失败学家',
    insight: '人醒了但魂没醒',
    description: '大脑还没正式开机',
    timestamp: new Date('2026-05-16T07:30:00'),
    isRare: false
  },
  {
    id: 'm3',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '通勤失神者',
    insight: '通勤时机械刷视频',
    description: '进入自动驾驶模式',
    timestamp: new Date('2026-05-16T08:00:00'),
    isRare: false
  },
  {
    id: 'm4',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '今日份元气演员',
    insight: '努力让自己看起来很积极',
    description: '主动维持外在好状态',
    timestamp: new Date('2026-05-16T09:00:00'),
    isRare: false
  },
  {
    id: 'm5',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '缓慢启动者',
    insight: '慢慢找回一天的状态',
    description: '循序渐进融入今日节奏',
    timestamp: new Date('2026-05-16T09:30:00'),
    isRare: false
  },
  {
    id: 'm6',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '假装积极型',
    insight: '刻意表现振作与元气',
    description: '表演式恢复日常状态',
    timestamp: new Date('2026-05-16T10:00:00'),
    isRare: false
  },
  // 06:00-11:00 隐藏稀有人格
  {
    id: 'm7',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '五分钟改变人生者',
    insight: '一时上头想立刻蜕变',
    description: '短时逆袭上头模式',
    timestamp: new Date('2026-05-16T06:30:00'),
    isRare: true
  },
  {
    id: 'm8',
    period: 'morning',
    periodLabel: '人类重启区',
    title: '闹钟逃亡者',
    insight: '一醒来就躲进短视频',
    description: '晨起逃避现实模式',
    timestamp: new Date('2026-05-16T06:45:00'),
    isRare: true
  },

  // 12:00-18:00 精神下班区 - 普通人格
  {
    id: 'a1',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '工位灵魂出窍者',
    insight: '身体在岗，灵魂早已出走',
    description: '精神开始逃离现实',
    timestamp: new Date('2026-05-16T14:00:00'),
    isRare: false
  },
  {
    id: 'a2',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '电子榨菜狂炫者',
    insight: '靠高刺激内容快速回血',
    description: '开启多巴胺急救模式',
    timestamp: new Date('2026-05-16T14:30:00'),
    isRare: false
  },
  {
    id: 'a3',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '精神下班者',
    insight: '人还在工位，心已经下班',
    description: '开始幻想逃离当下生活',
    timestamp: new Date('2026-05-16T15:00:00'),
    isRare: false
  },
  {
    id: 'a4',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '午后麻木者',
    insight: '什么都看不进去、提不起兴趣',
    description: '注意力过载陷入放空',
    timestamp: new Date('2026-05-16T15:30:00'),
    isRare: false
  },
  {
    id: 'a5',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '摸鱼行为艺术家',
    insight: '一边上班一边碎片化刷视频',
    description: '半工作半逃避松弛状态',
    timestamp: new Date('2026-05-16T16:00:00'),
    isRare: false
  },
  {
    id: 'a6',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '人类电量1%者',
    insight: '靠温柔慢内容补充能量',
    description: '低电量缓慢自愈恢复',
    timestamp: new Date('2026-05-16T16:30:00'),
    isRare: false
  },
  // 12:00-18:00 隐藏稀有人格
  {
    id: 'a7',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '已读人生但不想回复者',
    insight: '看透日常只想安静逃离',
    description: '消极避世沉浸式放空',
    timestamp: new Date('2026-05-16T13:00:00'),
    isRare: true
  },
  {
    id: 'a8',
    period: 'afternoon',
    periodLabel: '精神下班区',
    title: '多巴胺急救模式',
    insight: '狂刷快节奏无脑内容',
    description: '极致感官短暂逃避',
    timestamp: new Date('2026-05-16T17:00:00'),
    isRare: true
  },

  // 19:00-24:00 终于轮到我了区 - 普通人格
  {
    id: 'e1',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '白天装正常的人',
    insight: '到了晚上才做真实的自己',
    description: '卸下伪装回归本我',
    timestamp: new Date('2026-05-16T20:00:00'),
    isRare: false
  },
  {
    id: 'e2',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '兴趣续命玩家',
    insight: '沉浸在自己真正热爱的内容',
    description: '进入真实兴趣沉浸模式',
    timestamp: new Date('2026-05-16T20:30:00'),
    isRare: false
  },
  {
    id: 'e3',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '今天辛苦了老板者',
    insight: '夜晚想好好犒劳安慰自己',
    description: '自我补偿温柔治愈模式',
    timestamp: new Date('2026-05-16T21:00:00'),
    isRare: false
  },
  {
    id: 'e4',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '夜间人格上线',
    insight: '入夜之后整个人状态大变',
    description: '专属夜间人格正式激活',
    timestamp: new Date('2026-05-16T21:30:00'),
    isRare: false
  },
  {
    id: 'e5',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '情绪散热中',
    insight: '慢慢卸下白天所有压力',
    description: '安静释放一整天情绪',
    timestamp: new Date('2026-05-16T22:00:00'),
    isRare: false
  },
  {
    id: 'e6',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '互联网夜游神',
    insight: '深夜漫无目的刷内容探索',
    description: '夜间好奇漫游闲逛模式',
    timestamp: new Date('2026-05-16T22:30:00'),
    isRare: false
  },
  // 19:00-24:00 隐藏稀有人格
  {
    id: 'e7',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '白天那个不是我',
    insight: '白天自律克制，晚上完全反差',
    description: '昼夜人格割裂反差感',
    timestamp: new Date('2026-05-16T19:30:00'),
    isRare: true
  },
  {
    id: 'e8',
    period: 'evening',
    periodLabel: '终于轮到我了区',
    title: '奖励自己综合征',
    insight: '一到晚上就想消费取悦自己',
    description: '补偿式放松上头模式',
    timestamp: new Date('2026-05-16T23:00:00'),
    isRare: true
  },

  // 00:00-04:00 真实面暴露区 - 普通人格
  {
    id: 'n1',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: 'emo潜水艇',
    insight: '深夜陷入安静细腻情绪',
    description: '沉入情绪独处深水区',
    timestamp: new Date('2026-05-16T01:00:00'),
    isRare: false
  },
  {
    id: 'n2',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '赛博陪睡需求者',
    insight: '深夜渴望线上安静陪伴',
    description: '寻找无声陪睡氛围感',
    timestamp: new Date('2026-05-16T01:30:00'),
    isRare: false
  },
  {
    id: 'n3',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '凌晨突然想通人生',
    insight: '深夜容易冒出人生感悟',
    description: '深夜理想主义悄悄上线',
    timestamp: new Date('2026-05-16T02:00:00'),
    isRare: false
  },
  {
    id: 'n4',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '舍不得睡星人',
    insight: '拖延入睡，不愿结束今天',
    description: '贪恋当下抗拒一天收尾',
    timestamp: new Date('2026-05-16T02:30:00'),
    isRare: false
  },
  {
    id: 'n5',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '回忆无限重播',
    insight: '反复回看同类情绪内容',
    description: '陷入回忆与情绪循环',
    timestamp: new Date('2026-05-16T03:00:00'),
    isRare: false
  },
  {
    id: 'n6',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '世界静音观察员',
    insight: '慢节奏静静旁观世间百态',
    description: '进入独处安静静音模式',
    timestamp: new Date('2026-05-16T03:30:00'),
    isRare: false
  },
  // 00:00-04:00 隐藏稀有人格
  {
    id: 'n7',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '凌晨两点互联网遗民',
    insight: '深夜留守互联网不愿入睡',
    description: '深夜网络留守专属人格',
    timestamp: new Date('2026-05-16T02:15:00'),
    isRare: true
  },
  {
    id: 'n8',
    period: 'midnight',
    periodLabel: '真实面暴露区',
    title: '全世界请小声一点者',
    insight: '只想安静独处、不被打扰',
    description: '极致内向沉静独处模式',
    timestamp: new Date('2026-05-16T03:45:00'),
    isRare: true
  }
];

// 用于当前展示的简化版本
export const mockPersonalityCards: PersonalityCard[] = [
  allPersonalityCards.find(c => c.id === 'm4')!,
  allPersonalityCards.find(c => c.id === 'a1')!,
  allPersonalityCards.find(c => c.id === 'e1')!,
  allPersonalityCards.find(c => c.id === 'n1')!,
];

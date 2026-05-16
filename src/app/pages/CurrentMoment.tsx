import { motion } from 'motion/react';
import { getCurrentTimePeriod } from '../utils/timeUtils';
import { mockPersonalityCards } from '../data/mockData';
import BottomNav from '../components/BottomNav';
import CircularProgress from '../components/CircularProgress';
import { Sparkles, TrendingUp, Heart, Target, BookOpen } from 'lucide-react';
import { getPersonaImageUrl } from '../utils/imageMap';

export default function CurrentMoment() {
  const periodInfo = getCurrentTimePeriod();
  const currentCard = mockPersonalityCards.find(
    card => card.period === periodInfo.period
  ) || mockPersonalityCards[0];
  const personaImageUrl = getPersonaImageUrl(currentCard.id);

  const personalityTraits = [
    { label: '专注力', value: periodInfo.period === 'morning' ? 87 : periodInfo.period === 'afternoon' ? 45 : periodInfo.period === 'evening' ? 68 : 32 },
    { label: '情绪稳定', value: periodInfo.period === 'morning' ? 72 : periodInfo.period === 'afternoon' ? 58 : periodInfo.period === 'evening' ? 54 : 38 },
    { label: '能量值', value: periodInfo.period === 'morning' ? 89 : periodInfo.period === 'afternoon' ? 41 : periodInfo.period === 'evening' ? 63 : 28 },
  ];

  const behaviorPreferences = [
    { label: '社交意愿', value: periodInfo.period === 'morning' ? 42 : periodInfo.period === 'afternoon' ? 38 : periodInfo.period === 'evening' ? 73 : 15 },
    { label: '创造力', value: periodInfo.period === 'morning' ? 65 : periodInfo.period === 'afternoon' ? 51 : periodInfo.period === 'evening' ? 82 : 91 },
    { label: '决策力', value: periodInfo.period === 'morning' ? 76 : periodInfo.period === 'afternoon' ? 49 : periodInfo.period === 'evening' ? 61 : 28 },
    { label: '行动力', value: periodInfo.period === 'morning' ? 84 : periodInfo.period === 'afternoon' ? 37 : periodInfo.period === 'evening' ? 55 : 22 },
  ];

  const recommendations = periodInfo.period === 'morning'
    ? [
        { icon: '🧘', title: '晨间冥想', description: '正念练习' },
        { icon: '🥗', title: '营养早餐', description: '能量补充' },
        { icon: '📖', title: '晨读计划', description: '开启思考' },
        { icon: '🎵', title: '轻音乐', description: '舒缓启动' },
      ]
    : periodInfo.period === 'afternoon'
    ? [
        { icon: '🎧', title: '放松音乐', description: '恢复专注' },
        { icon: '☕', title: '能量小食', description: '快速充电' },
        { icon: '🚶', title: '短暂散步', description: '换个环境' },
        { icon: '💤', title: '小憩片刻', description: '10分钟' },
      ]
    : periodInfo.period === 'evening'
    ? [
        { icon: '📝', title: '情绪日记', description: '记录感受' },
        { icon: '📚', title: '睡前阅读', description: '治愈书单' },
        { icon: '🎨', title: '创作时光', description: '自由表达' },
        { icon: '🌙', title: '冥想放松', description: '释放压力' },
      ]
    : [
        { icon: '🌊', title: '助眠音频', description: '白噪音' },
        { icon: '📖', title: '心理文章', description: '理解情绪' },
        { icon: '💭', title: '深夜树洞', description: '倾诉平台' },
        { icon: '🌟', title: '正念呼吸', description: '平复心情' },
      ];

  return (
    <div
      className={`min-h-screen ${periodInfo.className} pb-20`}
      style={{
        maxWidth: '375px',
        margin: '0 auto',
        backgroundColor: 'var(--period-bg)',
      }}
    >
      <div className="px-4 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div
                className="inline-block px-4 py-2 rounded-full mb-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span style={{ color: 'var(--period-text)' }} className="text-sm">
                  {periodInfo.label} · {periodInfo.description}
                </span>
              </div>
              <h1 style={{ color: 'var(--period-text)' }}>
                {currentCard.title}
              </h1>
              <p style={{ color: 'var(--period-text)' }} className="opacity-75 mt-1 text-sm">
                {currentCard.insight}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl p-6 mb-4"
            style={{
              background: `linear-gradient(135deg, var(--period-gradient-from), var(--period-gradient-to))`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center justify-center mb-4">
              {personaImageUrl ? (
                <img
                  src={personaImageUrl}
                  alt={currentCard.title}
                  className="w-32 h-auto rounded-2xl"
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Sparkles className="w-12 h-12" style={{ color: 'var(--period-text)' }} />
                </div>
              )}
            </div>
            <p style={{ color: 'var(--period-text)' }} className="text-center text-sm opacity-90">
              {currentCard.description}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: 'var(--period-text)' }} className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              人格画像
            </h3>
            <span style={{ color: 'var(--period-text)' }} className="text-xs opacity-60">
              实时数据
            </span>
          </div>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="grid grid-cols-3 gap-4" style={{ color: 'var(--period-text)' }}>
              {personalityTraits.map((trait, index) => (
                <CircularProgress
                  key={trait.label}
                  value={trait.value}
                  label={trait.label}
                  color="var(--period-primary)"
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <h3 style={{ color: 'var(--period-text)' }} className="mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            行为偏好
          </h3>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="grid grid-cols-4 gap-4">
              {behaviorPreferences.map((pref, index) => {
                const icons = ['💬', '🎨', '⚡', '🎯'];
                const colors = ['#FF9D6E', '#87CEEB', '#FF6B9D', '#FFB84D'];
                return (
                  <motion.div
                    key={pref.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        backgroundColor: colors[index],
                      }}
                    >
                      {icons[index]}
                    </div>
                    <span
                      style={{ color: 'var(--period-text)' }}
                      className="text-xs opacity-75"
                    >
                      {pref.label}
                    </span>
                    <span
                      style={{ color: 'var(--period-text)' }}
                      className="font-medium"
                    >
                      {pref.value}%
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <h3 style={{ color: 'var(--period-text)' }} className="mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            人格解读
          </h3>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ color: 'var(--period-text)' }} className="text-sm opacity-90 leading-relaxed space-y-3">
              {periodInfo.period === 'morning' && (
                <>
                  <p>
                    晨间的你正处于「社会启动期」，这是从私人空间向公共空间过渡的缓冲时段。你的身体已经醒来，但心理状态还停留在半梦半醒之间——这种错位感是完全正常的生理现象。
                  </p>
                  <p>
                    此刻的你像一台正在预热的机器，系统正在逐步加载运行。不要急于进入高强度工作，你需要给大脑和情绪系统一个适应的过程。这个时段不适合做重大决策，因为你的判断力还未完全上线。
                  </p>
                  <p>
                    观察你此刻的状态：如果感到轻微的焦虑或抗拒，那是因为你正在从舒适区向外推进。接纳这种不适，它会在20-30分钟后自然消退。晨间的元气感不是天生的，而是你允许自己慢慢启动后的副产品。
                  </p>
                </>
              )}
              {periodInfo.period === 'afternoon' && (
                <>
                  <p>
                    午后的你进入了「能量消耗期」，这是一天中最容易被误解的时段。你会发现注意力开始分散，思维变得迟缓，甚至产生一种「我怎么什么都做不好」的自我怀疑——但这并非你能力的问题，而是正常的生理节律。
                  </p>
                  <p>
                    此刻的你就像手机电量从80%滑落到40%的过程，不是坏了，只是需要充电。很多人会在这个时段强迫自己保持高效，反而加剧了内耗。真正的智慧是识别这个状态，允许自己「摸鱼」——这不是偷懒，而是必要的休整。
                  </p>
                  <p>
                    观察你的身体信号：如果感到眼睛疲劳、思绪飘忽、频繁看手机，说明你的大脑在主动寻求休息。与其对抗，不如顺应。15分钟的放空能让你恢复的效率，远超1小时的硬撑。午后的松弛感不是堕落，而是可持续工作的必要节奏。
                  </p>
                </>
              )}
              {periodInfo.period === 'evening' && (
                <>
                  <p>
                    夜晚的你进入了「自我回归期」，这是一天中最接近真实自我的时刻。白天为了适应社会角色而压抑的情绪，此刻开始慢慢浮现——可能是委屈、疲惫，也可能是被忽略的渴望。这些情绪不是突然产生的，只是白天没有空间让它们被看见。
                  </p>
                  <p>
                    此刻的你像一个卸下盔甲的战士，终于可以承认「我也会累」「我也有脆弱」。夜晚的温柔在于，它允许你放下伪装，不必再强撑。很多人会在这个时段感到莫名的emo，其实是白天的情绪账单在集中结算。
                  </p>
                  <p>
                    观察你的内心状态：如果感到一种淡淡的忧伤或空洞感，不要急于否定它。这是你的内在在提醒你「嘿，我还在这里，我需要被关注」。夜晚是与自己和解的好时机，写下感受、听音乐、或者就这样静静发呆，都是在滋养那个真实的自己。
                  </p>
                </>
              )}
              {periodInfo.period === 'midnight' && (
                <>
                  <p>
                    凌晨的你处于「情绪暴露期」，这是一天中最赤裸也最脆弱的时刻。所有白天精心维系的平衡感在此刻瓦解，你会发现自己对情绪的控制力大幅下降——小事会被放大，负面想法会像潮水一样涌来。但请记住：深夜会扭曲你的视角。
                  </p>
                  <p>
                    此刻的你像一个失去滤镜的镜头，看到的都是最粗粝的真实。很多人会在凌晨做出冲动决定、发送后悔的消息、或陷入无尽的自我否定。这不是因为你真的那么糟糕，而是深夜的生理机制在作祟——褪黑素分泌、皮质醇失衡，都在影响你的情绪阈值。
                  </p>
                  <p>
                    观察你此刻的念头：如果充满悲观、绝望或冲动，先按下暂停键。凌晨的情绪是真实的，但它的强度是被放大的。不要在深夜做决定，不要在深夜审判自己。你需要的不是解决问题，而是等到天亮——明天的阳光会让一切看起来不同，这不是自欺，而是生理规律。
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-4"
        >
          <h3 style={{ color: 'var(--period-text)' }} className="mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            情感解读
          </h3>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90 leading-relaxed">
              {periodInfo.period === 'morning' &&
                '晨间的你正在缓慢启动模式中。身体已经醒来，但意识还在适应新的一天。这个时段不适合做重大决策，给自己一点时间慢慢进入状态。'
              }
              {periodInfo.period === 'afternoon' &&
                '午后的你处于能量消耗期，注意力开始分散。这是正常的生理节律，不要苛责自己。适当的休息和放松能帮你恢复状态。'
              }
              {periodInfo.period === 'evening' &&
                '夜晚的你进入了自我回归期，白天被压抑的情绪开始浮现。这是与自己对话的好时机，允许真实的感受流动。'
              }
              {periodInfo.period === 'midnight' &&
                '凌晨的你处于情绪暴露期，所有伪装都被黑夜溶解。深夜会放大情绪，此刻的感受不代表全部真相，记得这一点。'
              }
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h3 style={{ color: 'var(--period-text)' }} className="mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            今日建议
          </h3>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="space-y-3">
              {periodInfo.period === 'morning' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      慢慢启动，给自己15分钟缓冲时间
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      尝试深呼吸或简单的伸展运动
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      从简单的任务开始，逐步进入工作状态
                    </p>
                  </div>
                </>
              )}

              {periodInfo.period === 'afternoon' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      适当摸鱼是必要的，不要有负罪感
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      喝杯水，起来走走，换个环境
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      小憩10分钟能有效恢复注意力
                    </p>
                  </div>
                </>
              )}

              {periodInfo.period === 'evening' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      允许情绪流动，不要压抑真实感受
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      写下今天的感受，或与信任的人聊聊
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      做一些让你放松的事，为睡眠做准备
                    </p>
                  </div>
                </>
              )}

              {periodInfo.period === 'midnight' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      深夜会放大负面情绪，不要做重大决定
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      如果可以，试着让自己休息
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--period-primary)' }} />
                    <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90">
                      明天的阳光会让一切看起来不同
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h3 style={{ color: 'var(--period-text)' }} className="mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            内容推荐
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl p-4 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="text-3xl mb-1">{rec.icon}</div>
                  <div style={{ color: 'var(--period-text)' }}>
                    <div className="font-medium mb-1 text-sm">{rec.title}</div>
                    <div className="text-xs opacity-75">{rec.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

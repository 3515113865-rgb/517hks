import { motion } from 'motion/react';
import { useState } from 'react';
import { getCurrentTimePeriod, getPeriodByHour, TimePeriod } from '../utils/timeUtils';
import { allPersonalityCards } from '../data/mockData';
import BottomNav from '../components/BottomNav';
import { getPersonaImageUrl } from '../utils/imageMap';

export default function DailyAssessment() {
  const currentPeriodInfo = getCurrentTimePeriod();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(currentPeriodInfo.period);

  const periods = [
    { period: 'morning' as TimePeriod, label: '晨间', time: '06:00-11:00' },
    { period: 'afternoon' as TimePeriod, label: '午后', time: '12:00-18:00' },
    { period: 'evening' as TimePeriod, label: '夜晚', time: '19:00-24:00' },
    { period: 'midnight' as TimePeriod, label: '凌晨', time: '00:00-04:00' },
  ];

  const selectedPeriodInfo = getPeriodByHour(
    selectedPeriod === 'morning' ? 8 :
    selectedPeriod === 'afternoon' ? 14 :
    selectedPeriod === 'evening' ? 21 : 2
  );

  const currentCard = allPersonalityCards.find(
    card => card.period === selectedPeriod && !card.isRare
  ) || allPersonalityCards[0];
  const personaImageUrl = getPersonaImageUrl(currentCard.id);

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.random() * 60 + 20
  }));

  const detailedDescriptions = {
    morning: '晨间的你正处于「人类重启区」，这是从私人空间向公共空间过渡的缓冲时段。你的身体已经醒来，但心理状态还停留在半梦半醒之间——这种错位感是完全正常的生理现象。此刻的你像一台正在预热的机器，系统正在逐步加载运行。不要急于进入高强度工作，你需要给大脑和情绪系统一个适应的过程。',
    afternoon: '午后的你进入了「精神下班区」，这是一天中最容易被误解的时段。你会发现注意力开始分散，思维变得迟缓，甚至产生一种「我怎么什么都做不好」的自我怀疑——但这并非你能力的问题，而是正常的生理节律。此刻的你就像手机电量从80%滑落到40%的过程，不是坏了，只是需要充电。',
    evening: '夜晚的你进入了「终于轮到我了区」，这是一天中最接近真实自我的时刻。白天为了适应社会角色而压抑的情绪，此刻开始慢慢浮现——可能是委屈、疲惫，也可能是被忽略的渴望。这些情绪不是突然产生的，只是白天没有空间让它们被看见。',
    midnight: '凌晨的你处于「真实面暴露区」，这是一天中最赤裸也最脆弱的时刻。所有白天精心维系的平衡感在此刻瓦解，你会发现自己对情绪的控制力大幅下降——小事会被放大，负面想法会像潮水一样涌来。但请记住：深夜会扭曲你的视角。'
  };

  const tags = {
    morning: ['#缓启动', '#适应中', '#预热', '#渐入'],
    afternoon: ['#能量低', '#摸鱼', '#放空', '#充电'],
    evening: ['#真实', '#释放', '#回归', '#自我'],
    midnight: ['#情绪', '#脆弱', '#真实', '#深夜']
  };

  return (
    <div
      className={`min-h-screen ${selectedPeriodInfo.className} pb-20`}
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
          <h1 style={{ color: 'var(--period-text)' }} className="mb-2">
            当日测评
          </h1>
          <p style={{ color: 'var(--period-text)' }} className="opacity-75 text-sm">
            基于你今天在每个时段的观察行为定向
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {periods.map((period) => {
              const isSelected = selectedPeriod === period.period;
              return (
                <motion.button
                  key={period.period}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPeriod(period.period)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap"
                  style={{
                    backgroundColor: isSelected ? 'var(--period-primary)' : 'rgba(255, 255, 255, 0.1)',
                    color: isSelected ? 'var(--period-bg)' : 'var(--period-text)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {period.label} {period.time}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          key={selectedPeriod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full text-xs mb-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'var(--period-text)',
              }}
            >
              {selectedPeriodInfo.label} {selectedPeriodInfo.description}
            </div>

            {personaImageUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={personaImageUrl}
                  alt={currentCard.title}
                  className="w-32 h-auto rounded-2xl"
                />
              </div>
            )}

            <h2 style={{ color: 'var(--period-text)' }} className="mb-2">
              {currentCard.title}
            </h2>

            <p style={{ color: 'var(--period-text)' }} className="opacity-90 mb-4">
              {currentCard.insight}
            </p>

            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-90 leading-relaxed">
                {detailedDescriptions[selectedPeriod]}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags[selectedPeriod].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'var(--period-text)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 style={{ color: 'var(--period-text)' }} className="mb-3">
            今日节奏
          </h3>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-end justify-between h-32 gap-1">
              {hourlyData.map((data, index) => (
                <motion.div
                  key={data.hour}
                  initial={{ height: 0 }}
                  animate={{ height: `${data.value}%` }}
                  transition={{ delay: 0.5 + index * 0.02, duration: 0.3 }}
                  className="flex-1 rounded-t"
                  style={{
                    backgroundColor: 'var(--period-primary)',
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between mt-2">
              <span style={{ color: 'var(--period-text)' }} className="text-xs opacity-60">
                00
              </span>
              <span style={{ color: 'var(--period-text)' }} className="text-xs opacity-60">
                06
              </span>
              <span style={{ color: 'var(--period-text)' }} className="text-xs opacity-60">
                12
              </span>
              <span style={{ color: 'var(--period-text)' }} className="text-xs opacity-60">
                18
              </span>
              <span style={{ color: 'var(--period-text)' }} className="text-xs opacity-60">
                24
              </span>
            </div>

            <p
              style={{ color: 'var(--period-text)' }}
              className="text-xs opacity-60 mt-4 text-center"
            >
              ↑节奏数据基于刷30min / 停留5min+ / 内容标签合格率（业务预研）
            </p>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

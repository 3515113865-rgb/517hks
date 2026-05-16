import { motion } from 'motion/react';
import { getCurrentTimePeriod } from '../utils/timeUtils';
import { allPersonalityCards } from '../data/mockData';
import BottomNav from '../components/BottomNav';
import { getPersonaImageUrl } from '../utils/imageMap';

export default function Timeline() {
  const periodInfo = getCurrentTimePeriod();

  const timelineEntries = [
    {
      date: new Date(),
      label: '今天',
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date().getDay()],
      card: allPersonalityCards.find(c => c.id === 'n1'),
      behavior: '凌晨刷了 47 条视频，停留在深夜独白话题最久。'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      label: '05-15',
      weekday: '周四',
      card: allPersonalityCards.find(c => c.id === 'e5'),
      behavior: '夜晚被一段幸福短片打动，反复观看两次。'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      label: '05-14',
      weekday: '周三',
      card: allPersonalityCards.find(c => c.id === 'a3'),
      behavior: '午后高频切换轻知识与旅行内容。'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      label: '05-13',
      weekday: '周二',
      card: allPersonalityCards.find(c => c.id === 'm1'),
      behavior: '清晨集中观看了 6 条早餐 vlog。'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 4)),
      label: '05-12',
      weekday: '周一',
      card: allPersonalityCards.find(c => c.id === 'e5'),
      behavior: '睡前长时间停留在城市夜景。'
    },
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
          <h1 style={{ color: 'var(--period-text)' }} className="mb-2">
            时间轴
          </h1>

          <p style={{ color: 'var(--period-text)' }} className="opacity-75 text-sm">
            你过去 7 天的人格切片
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-[13px] top-8 bottom-0 w-[2px]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />

          <div className="space-y-8">
            {timelineEntries.map((entry, index) => {
              const isToday = index === 0;
              return (
                <motion.div
                  key={entry.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 border-2 z-10"
                      style={{
                        backgroundColor: isToday ? 'var(--period-primary)' : 'var(--period-bg)',
                        borderColor: 'var(--period-primary)',
                      }}
                    />

                    <div className="flex-1 -mt-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          style={{ color: 'var(--period-text)' }}
                          className={isToday ? 'font-medium' : ''}
                        >
                          {entry.label}
                        </span>
                        <span
                          style={{ color: 'var(--period-text)' }}
                          className="text-sm opacity-60"
                        >
                          {entry.weekday}
                        </span>
                      </div>

                      {entry.card && (
                        <div
                          className="rounded-2xl p-5"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <div className="flex items-start gap-4 mb-2">
                            <img
                              src={getPersonaImageUrl(entry.card.id)}
                              alt={entry.card.title}
                              className="w-16 h-auto rounded-xl flex-shrink-0"
                            />
                            <h3
                              style={{ color: 'var(--period-primary)' }}
                              className="leading-snug"
                            >
                              {entry.card.title}
                            </h3>
                          </div>
                          <p
                            style={{ color: 'var(--period-text)' }}
                            className="text-sm opacity-75"
                          >
                            {entry.behavior}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

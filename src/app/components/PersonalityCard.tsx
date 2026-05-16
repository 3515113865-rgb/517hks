import { motion } from 'motion/react';
import { PersonalityCard as PersonalityCardType } from '../data/mockData';
import { getPeriodByHour } from '../utils/timeUtils';

interface PersonalityCardProps {
  card: PersonalityCardType;
  index?: number;
}

export default function PersonalityCard({ card, index = 0 }: PersonalityCardProps) {
  const periodInfo = getPeriodByHour(card.timestamp.getHours());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${periodInfo.className} rounded-3xl p-6 mb-4`}
      style={{
        background: `linear-gradient(135deg, var(--period-gradient-from), var(--period-gradient-to))`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {card.image && (
        <div className="flex justify-center mb-4">
          <img
            src={`/src/imports/${card.image}`}
            alt={card.title}
            className="w-32 h-auto rounded-2xl"
          />
        </div>
      )}

      <div className="mb-3">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs mb-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: 'var(--period-text)',
          }}
        >
          {periodInfo.label} · {card.timestamp.getHours()}:{String(card.timestamp.getMinutes()).padStart(2, '0')}
        </div>

        <h3 style={{ color: 'var(--period-text)' }} className="mb-2">
          {card.title}
        </h3>

        <p style={{ color: 'var(--period-text)' }} className="opacity-90 mb-2">
          {card.insight}
        </p>

        <p style={{ color: 'var(--period-text)' }} className="text-sm opacity-75">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

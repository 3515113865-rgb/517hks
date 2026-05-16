import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getCurrentTimePeriod } from '../utils/timeUtils';
import { mockPersonalityCards } from '../data/mockData';
import { getPersonaImageUrl } from '../utils/imageMap';

interface PersonalityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalityModal({ isOpen, onClose }: PersonalityModalProps) {
  const navigate = useNavigate();
  const periodInfo = getCurrentTimePeriod();

  const currentCard = mockPersonalityCards.find(
    card => card.period === periodInfo.period
  ) || mockPersonalityCards[0];
  const personaImageUrl = getPersonaImageUrl(currentCard.id);

  const handleEnterSpace = () => {
    navigate('/current');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ maxWidth: '375px', height: '812px', margin: '0 auto' }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
            }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`relative ${periodInfo.className} rounded-3xl p-8 max-w-sm w-full`}
            style={{
              background: `linear-gradient(135deg, var(--period-gradient-from), var(--period-gradient-to))`,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            <motion.div
              animate={
                periodInfo.period === 'midnight'
                  ? { scale: [1, 1.02, 1] }
                  : {}
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-6 text-center">
                <div
                  className="inline-block px-4 py-1 rounded-full mb-4"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span style={{ color: 'var(--period-text)' }} className="text-sm">
                    {periodInfo.label} · {periodInfo.description}
                  </span>
                </div>

                {personaImageUrl && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={personaImageUrl}
                      alt={currentCard.title}
                      className="w-40 h-auto rounded-2xl"
                    />
                  </div>
                )}

                <h2
                  style={{ color: 'var(--period-text)' }}
                  className="mb-4"
                >
                  {currentCard.title}
                </h2>

                <p
                  style={{ color: 'var(--period-text)' }}
                  className="opacity-90 mb-4"
                >
                  {currentCard.insight}
                </p>

                <p
                  style={{ color: 'var(--period-text)' }}
                  className="text-sm opacity-75"
                >
                  {currentCard.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnterSpace}
                  className="w-full py-3 rounded-2xl"
                  style={{
                    backgroundColor: 'var(--period-text)',
                    color: 'var(--period-bg)',
                  }}
                >
                  进入我的专属空间
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--period-text)',
                  }}
                >
                  暂时忽略
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

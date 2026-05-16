import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockVideos } from '../data/mockData';
import PersonalityModal from '../components/PersonalityModal';

export default function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const currentVideo = mockVideos[currentIndex];
  const isLiked = liked.has(currentVideo.id);
  const isBookmarked = bookmarked.has(currentVideo.id);

  useEffect(() => {
    if (viewCount === 10) {
      setShowPersonalityModal(true);
    }
  }, [viewCount]);

  useEffect(() => {
    return () => {
      const el = videoRefs.current.get(currentIndex);
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
    };
  }, [currentIndex]);

  const pauseAndReset = (index: number) => {
    const el = videoRefs.current.get(index);
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    if (!el) {
      videoRefs.current.delete(index);
      return;
    }

    videoRefs.current.set(index, el);

    if (index === currentIndex) {
      el.currentTime = 0;
      const playPromise = el.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < mockVideos.length - 1) {
      pauseAndReset(currentIndex);
      setCurrentIndex(prev => prev + 1);
      setViewCount(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      pauseAndReset(currentIndex);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      handleSwipe('up');
    } else if (isDownSwipe) {
      handleSwipe('down');
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleSwipe('up');
    } else if (e.deltaY < 0) {
      handleSwipe('down');
    }
  };

  const toggleLike = () => {
    setLiked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentVideo.id)) {
        newSet.delete(currentVideo.id);
      } else {
        newSet.add(currentVideo.id);
      }
      return newSet;
    });
  };

  const toggleBookmark = () => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentVideo.id)) {
        newSet.delete(currentVideo.id);
      } else {
        newSet.add(currentVideo.id);
      }
      return newSet;
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{ maxWidth: '375px', height: '812px', margin: '0 auto' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <video
              ref={setVideoRef(currentIndex)}
              src={currentVideo.src}
              poster={currentVideo.thumbnail}
              autoPlay
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

            <div className="absolute right-3 bottom-24 flex flex-col gap-5 items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleLike}
                className="flex flex-col items-center gap-1"
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center ${
                    isLiked ? 'bg-red-500' : 'bg-white/20'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isLiked ? 'text-white fill-white' : 'text-white'}`}
                  />
                </motion.div>
                <span className="text-white text-xs">
                  {((currentVideo.likes + (isLiked ? 1 : 0)) / 1000).toFixed(1)}k
                </span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs">{currentVideo.comments}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleBookmark}
                className="flex flex-col items-center gap-1"
              >
                <motion.div
                  animate={isBookmarked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center ${
                    isBookmarked ? 'bg-yellow-500' : 'bg-white/20'
                  }`}
                >
                  <Bookmark
                    className={`w-6 h-6 ${isBookmarked ? 'text-white fill-white' : 'text-white'}`}
                  />
                </motion.div>
                <span className="text-white text-xs">{currentVideo.shares}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
              </motion.button>
            </div>

            <div className="absolute bottom-6 left-3 right-20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white" />
                <span className="text-white">@情绪观察者</span>
              </div>
              <p className="text-white mb-2">{currentVideo.caption}</p>
              <div className="flex gap-2 flex-wrap">
                {currentVideo.tags.map((tag, index) => (
                  <span key={index} className="text-white text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="text-white/80 text-sm">
                {currentIndex + 1} / {mockVideos.length}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <PersonalityModal
        isOpen={showPersonalityModal}
        onClose={() => setShowPersonalityModal(false)}
      />
    </div>
  );
}

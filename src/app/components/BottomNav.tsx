import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, CalendarDays, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/current', label: '此刻的你', icon: Sparkles },
    { path: '/daily', label: '当日测评', icon: CalendarDays },
    { path: '/timeline', label: '时间轴', icon: Clock },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200">
        <div className="flex items-center justify-between px-2 py-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl flex items-center gap-2 text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </motion.button>

          <div className="flex gap-1 flex-1 justify-end">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.path}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(tab.path)}
                  className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

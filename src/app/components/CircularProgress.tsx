import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CircularProgressProps {
  value: number;
  label: string;
  color: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}

export default function CircularProgress({
  value,
  label,
  color,
  size = 80,
  strokeWidth = 6,
  delay = 0
}: CircularProgressProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: mounted ? offset : circumference }}
            transition={{ duration: 1, delay, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color }}
        >
          <span className="font-medium">{value}%</span>
        </div>
      </div>
      <span className="text-xs opacity-90">{label}</span>
    </div>
  );
}

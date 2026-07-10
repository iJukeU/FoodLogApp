import { motion, AnimatePresence } from 'motion/react';
import { Play, Square } from 'lucide-react';
import type { FoodPost } from '../data/mockData';

interface TimelinePlayerProps {
  isPlaying: boolean;
  currentRecord: FoodPost | null;
  totalCount: number;
  currentIndex: number;
  onPlay: () => void;
  onStop: () => void;
}

/** 地圖底部的 Timeline Replay 播放器 */
export function TimelinePlayer({
  isPlaying,
  currentRecord,
  totalCount,
  currentIndex,
  onPlay,
  onStop,
}: TimelinePlayerProps) {
  const progress = isPlaying && totalCount > 0 ? (currentIndex + 1) / totalCount : 0;

  return (
    <div className="soft-panel absolute bottom-[112px] left-5 right-5 z-[1000] rounded-[22px] p-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={isPlaying ? onStop : onPlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-black transition active:scale-90"
          aria-label={isPlaying ? 'Stop replay' : 'Play replay'}
        >
          {isPlaying ? (
            <Square size={18} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-0.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="mono-label text-[#8d8d92]">Timeline Replay</span>
            {isPlaying && (
              <span className="font-mono text-[11px] font-bold text-primary">
                {currentIndex + 1}/{totalCount}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {isPlaying && currentRecord ? (
              <motion.p
                key={currentRecord.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-1 truncate text-[15px] font-black text-white"
              >
                {currentRecord.icon} {currentRecord.food}
                <span className="ml-2 text-[11px] font-bold text-[#8d8d92]">
                  {currentRecord.date}
                </span>
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-[13px] font-bold text-[#a0a1a5]"
              >
                重播你的美食足跡（{totalCount} 站）
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isPlaying && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
    </div>
  );
}

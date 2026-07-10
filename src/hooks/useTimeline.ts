import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { FoodPost } from '../data/mockData';

/** 每一站停留的毫秒數（含 flyTo 動畫時間） */
const STEP_MS = 2400;

/**
 * Timeline Replay 播放邏輯：
 * 依 timestamp 由舊到新排序，play(onStep) 會每隔 STEP_MS 前進一站，
 * 並把當站紀錄丟給 onStep（MapScreen 用它來 flyTo）。
 */
export function useTimeline(records: FoodPost[]) {
  const sortedRecords = useMemo(
    () =>
      [...records].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      ),
    [records],
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stop = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentIndex(-1);
  }, []);

  const play = useCallback(
    (onStep?: (record: FoodPost) => void) => {
      if (sortedRecords.length === 0) return;
      clearTimer();
      setIsPlaying(true);

      let index = 0;
      setCurrentIndex(0);
      onStep?.(sortedRecords[0]);

      timerRef.current = window.setInterval(() => {
        index += 1;
        if (index >= sortedRecords.length) {
          clearTimer();
          setIsPlaying(false);
          setCurrentIndex(-1);
          return;
        }
        setCurrentIndex(index);
        onStep?.(sortedRecords[index]);
      }, STEP_MS);
    },
    [sortedRecords],
  );

  // 離開畫面時停止播放
  useEffect(() => clearTimer, []);

  const currentRecord = currentIndex >= 0 ? sortedRecords[currentIndex] : null;

  return { isPlaying, currentRecord, sortedRecords, currentIndex, play, stop };
}

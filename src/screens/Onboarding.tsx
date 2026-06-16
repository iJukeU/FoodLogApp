import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../components/Button';
import { foodPosts } from '../data/mockData';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: 'FoodLog',
    subtitle: '用一張照片，完成今天的生存報備。',
    image: foodPosts[0].image,
  },
  {
    id: 2,
    title: '堆出食物塔',
    subtitle: '每次分享都會變成塔上的一層，和朋友一起累積日常。',
    image: foodPosts[1].image,
  },
  {
    id: 3,
    title: '回顧你的月份',
    subtitle: '月曆牆、Recap 與數據卡，幫你看見吃過的生活軌跡。',
    image: foodPosts[3].image,
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const currentSlide = slides[step];

  const nextStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
      return;
    }

    onComplete();
  };

  return (
    <div className="flex h-full flex-col bg-background px-6 pb-12 pt-10">
      <div className="flex min-h-10 justify-end">
        {step > 0 && (
          <button
            onClick={onComplete}
            className="rounded-full border border-outline px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-secondary"
          >
            Skip
          </button>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -18 }}
            transition={{ duration: 0.35 }}
            className="flex h-72 w-72 items-center justify-center rounded-[32px] border border-outline bg-surface p-8"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="max-h-full max-w-full object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentSlide.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="min-h-28"
          >
            <h1 className="font-display text-3xl font-bold">{currentSlide.title}</h1>
            <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-secondary">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mb-7 mt-2 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`h-2 rounded-full transition-all ${
                index === step ? 'w-7 bg-primary' : 'w-2 bg-surface-bright'
              }`}
            />
          ))}
        </div>

        <Button fullWidth onClick={nextStep}>
          {step === slides.length - 1 ? '開始使用' : '下一步'}
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

import { ElementType } from 'react';
import { motion } from 'motion/react';
import { BarChart3, CalendarDays, Home, MessageSquare } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onChange: (screen: Screen) => void;
}

export function BottomNav({ activeScreen, onChange }: BottomNavProps) {
  const navItems: { id: Screen; icon: ElementType; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calendar', icon: CalendarDays, label: 'Calendar' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <nav className="absolute bottom-7 left-1/2 z-50 flex w-[340px] -translate-x-1/2 items-center justify-between rounded-[34px] border border-white/10 bg-[#171719]/88 px-9 py-5 shadow-2xl backdrop-blur-xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`relative flex h-8 w-8 items-center justify-center transition-colors ${
              isActive ? 'text-primary' : 'text-[#77787d]'
            }`}
            aria-label={item.label}
          >
            <Icon size={24} strokeWidth={isActive ? 2.6 : 2.2} />
            {isActive && (
              <motion.span
                layoutId="nav-dot"
                className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

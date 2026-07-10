import { useState } from 'react';
import { Screen } from './types';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { FoodTower } from './screens/FoodTower';
import { MapScreen } from './screens/Map';
import { CalendarView } from './screens/Calendar';
import { Stats } from './screens/Stats';
import { ChatList } from './screens/ChatList';
import { ChatDetail } from './screens/ChatDetail';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <Home onGoToTower={() => setCurrentScreen('food-tower')} />;
      case 'food-tower':
        return <FoodTower onBack={() => setCurrentScreen('home')} />;
      case 'map':
        return <MapScreen />;
      case 'calendar':
        return <CalendarView />;
      case 'stats':
        return <Stats />;
      case 'chat':
        return <ChatList onSelectChat={() => setCurrentScreen('chat-detail')} />;
      case 'chat-detail':
        return <ChatDetail onBack={() => setCurrentScreen('chat')} />;
      default:
        return <Home onGoToTower={() => setCurrentScreen('food-tower')} />;
    }
  };

  const showBottomNav = !['onboarding', 'chat-detail'].includes(currentScreen);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black sm:p-8">
      {/* Mobile Simulator Frame */}
      <div 
        className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] bg-background sm:rounded-[40px] overflow-hidden relative sm:shadow-[0_0_50px_rgba(255,107,0,0.05)] sm:border border-outline flex flex-col"
      >
        <div className="flex-1 overflow-hidden relative">
          {renderScreen()}
        </div>
        
        {showBottomNav && (
          <BottomNav 
            activeScreen={currentScreen === 'food-tower' ? 'home' : currentScreen} 
            onChange={(screen) => setCurrentScreen(screen)} 
          />
        )}
      </div>
    </div>
  );
}

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { foodPosts, monthlySummary, type FoodPost } from '../data/mockData';

// ── 全域狀態型別 ─────────────────────────────────────────────
interface AppState {
  /** 動態牆的食物紀錄列表（最新在最前面） */
  meals: FoodPost[];
  /** 食物塔當前高度（對應後端 food_towers.current_height） */
  towerHeight: number;
  /** 食物塔等級（對應後端 food_towers.level） */
  towerLevel: number;
  /** 累計總餐數（對應後端 food_towers.total_meals_count） */
  totalMealsCount: number;
  /** 拍照發布中的 Loading 旗標，防止重複點擊 */
  isPublishing: boolean;
}

interface AppContextValue extends AppState {
  /** 發布一筆新的食物紀錄 → POST /api/meals → 同步更新全域狀態 */
  publishMeal: (mealData: {
    user_id: number;
    group_id: number;
    photo_url: string;
    caption: string;
  }) => Promise<void>;
}

// ── Context 建立 ─────────────────────────────────────────────
const AppContext = createContext<AppContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<FoodPost[]>(foodPosts);
  const [towerHeight, setTowerHeight] = useState(monthlySummary.towerHeight);
  const [towerLevel, setTowerLevel] = useState(1);
  const [totalMealsCount, setTotalMealsCount] = useState(monthlySummary.mealsLogged);
  const [isPublishing, setIsPublishing] = useState(false);

  const publishMeal = useCallback(
    async (mealData: {
      user_id: number;
      group_id: number;
      photo_url: string;
      caption: string;
    }) => {
      if (isPublishing) return;      // 防止重複送出
      setIsPublishing(true);

      try {
        const res = await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mealData),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail ?? `HTTP ${res.status}`);
        }

        const data = await res.json() as {
          meal: {
            id: number;
            user_id: number;
            group_id: number;
            photo_url: string;
            caption: string | null;
            created_at: string;
          };
          food_tower: {
            id: number;
            group_id: number;
            current_height: number;
            total_meals_count: number;
            level: number;
            updated_at: string;
            leveled_up: boolean;
          };
        };

        // ── 1. 將新 meal 插入 meals 陣列最前面 ───────────────
        const newPost: FoodPost = {
          id: data.meal.id,
          friend: '我',
          handle: 'me',
          food: data.meal.caption ?? '新的食物紀錄',
          note: data.meal.caption ?? '',
          time: 'Just now',
          date: new Date(data.meal.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }).toUpperCase(),
          calendarDay: new Date(data.meal.created_at).getDate(),
          calories: 0,
          place: '',
          category: '其他',
          image: data.meal.photo_url,
          icon: '🍽️',
          // 後端 meals 尚未儲存座標，先以台北市中心附近的假座標讓紀錄能顯示在地圖上
          latitude: 25.0418 + ((data.meal.id % 7) - 3) * 0.004,
          longitude: 121.5359 + ((data.meal.id % 5) - 2) * 0.005,
          address: '台北市',
          timestamp: data.meal.created_at,
        };
        setMeals((prev) => [newPost, ...prev]);

        // ── 2. 同步更新食物塔狀態 ────────────────────────────
        setTowerHeight(data.food_tower.current_height);
        setTowerLevel(data.food_tower.level);
        setTotalMealsCount(data.food_tower.total_meals_count);
      } catch (err) {
        console.error('[publishMeal] failed:', err);
        throw err;                   // 讓呼叫端決定要不要顯示錯誤 UI
      } finally {
        setIsPublishing(false);
      }
    },
    [isPublishing],
  );

  return (
    <AppContext.Provider
      value={{
        meals,
        towerHeight,
        towerLevel,
        totalMealsCount,
        isPublishing,
        publishMeal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ── Custom Hook ──────────────────────────────────────────────
export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within <AppProvider>');
  }
  return ctx;
}

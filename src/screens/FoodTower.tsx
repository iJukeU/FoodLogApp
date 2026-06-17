import { useMemo, useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type TowerMode = 'personal' | 'group';

export function FoodTower({ onBack: _onBack }: { onBack?: () => void }) {
  const { meals, towerHeight, towerLevel } = useAppContext();
  const [mode, setMode] = useState<TowerMode>('personal');
  const towerItems = useMemo(
    () => (mode === 'personal' ? meals.slice(0, 9) : meals.slice(0, 10)),
    [mode, meals],
  );

  return (
    <div className="h-full overflow-y-auto bg-background pb-40 text-white no-scrollbar">
      <header className="relative px-8 pt-[84px] text-center">
        <h1 className="text-[34px] font-light tracking-tight">FOOD TOWER</h1>
        <button className="absolute right-8 top-[70px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white/10 text-white">
          <UserCircle size={29} />
        </button>
      </header>

      <section className="mt-16 text-center">
        <p className="text-base font-bold text-[#8d8d92]">{'高度'}</p>
        <div className="mt-2 flex items-end justify-center gap-2 text-primary">
          <span className="text-[56px] font-light leading-none">{towerHeight}</span>
          <span className="mb-2 text-[25px] font-bold">{'個'}</span>
        </div>
        <p className="mt-1 font-mono text-xs font-black text-[#8d8d92]">LEVEL {towerLevel}</p>
      </section>

      <section className="mx-auto mt-14 grid w-[310px] grid-cols-2 rounded-full bg-[#1a1b1e] p-2">
        {(['personal', 'group'] as TowerMode[]).map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={`rounded-full py-3.5 font-mono text-[14px] font-black tracking-wide ${
              mode === item ? 'bg-primary text-white' : 'text-[#aaaab0]'
            }`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </section>

      <section className="relative mx-auto mt-20 w-[340px] max-w-[88%]">
        <div className="pointer-events-none absolute left-0 right-0 top-[245px] flex items-center gap-5">
          <span className="h-px flex-1 bg-primary/70" />
          <span className="text-2xl">🧳</span>
          <span className="h-px flex-1 bg-primary/70" />
        </div>
        <div className="pointer-events-none absolute left-0 right-0 top-[620px] flex items-center gap-5">
          <span className="h-px flex-1 bg-primary/70" />
          <span className="text-2xl">🧳</span>
          <span className="h-px flex-1 bg-primary/70" />
        </div>

        <div className="flex flex-col items-center">
          {towerItems.map((item, index) => (
            <div
              key={item.id}
              className="grid w-full grid-cols-[1fr_104px_1fr] items-center"
              style={{ marginTop: index === 0 ? 0 : -6, zIndex: 100 - index }}
            >
              <div className="pr-3 text-right">
                <p className="text-[14px] font-black leading-tight">{item.food}</p>
                <p className="mt-1 font-mono text-[11px] font-black text-[#85858a]">{item.date}</p>
              </div>
              <div className="relative flex h-[86px] items-center justify-center">
                <img
                  src={item.image}
                  alt={item.food}
                  className="max-h-[96px] max-w-[96px] object-contain drop-shadow-[0_16px_16px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="pl-3">
                <p className="font-mono text-[13px] font-black text-primary">{item.calories} KCAL</p>
                <p className="mt-1 font-mono text-[10px] font-black text-[#78797f]">{item.place}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

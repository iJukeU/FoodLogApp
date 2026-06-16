import { Heart, History, Utensils } from 'lucide-react';
import { monthlySummary } from '../data/mockData';

export function Stats() {
  return (
    <div className="h-full overflow-y-auto bg-background pb-36 text-white no-scrollbar">
      <header className="border-b border-white/5 px-0 pb-6 pt-7">
        <h1 className="text-[25px] font-black tracking-tight">STATISTICS</h1>
      </header>

      <main className="pt-6">
        <section className="mb-7">
          <h2 className="text-[23px] font-black">Your Statistics</h2>
          <p className="mt-3 text-[15px] font-semibold text-[#d0d0d3]">
            Monthly overview and nutritional tracking.
          </p>
        </section>

        <section className="space-y-3">
          <div className="soft-panel rounded-[10px] p-6">
            <div className="mb-3 flex items-start justify-between">
              <p className="mono-label text-[#bdbdc2]">TOTAL CALORIES</p>
              <span className="rounded-full bg-[#27282c] px-4 py-2 font-mono text-xs font-black text-white">
                🦐 12%
              </span>
            </div>
            <div className="inline-flex items-end gap-2 rounded-xl bg-white px-5 py-3 text-black">
              <span className="text-[30px] font-black leading-none">
                {monthlySummary.totalCalories.toLocaleString()}
              </span>
              <span className="text-[17px] font-black text-primary">kcal</span>
            </div>
            <div className="mt-8 flex justify-between font-mono text-xs font-black text-[#cfcfd3]">
              <span>Monthly Goal</span>
              <span>50,000 kcal</span>
            </div>
            <div className="mt-3 h-1.5 bg-[#3a3b3f]">
              <div className="h-full w-[86%] bg-primary" />
            </div>
          </div>

          <div className="soft-panel rounded-[10px] p-6">
            <div className="mb-8 flex items-center justify-between">
              <p className="mono-label text-[#bdbdc2]">SAVED PLACES</p>
              <Heart size={24} className="text-[#8f9096]" />
            </div>
            <div className="inline-flex rounded-xl bg-white px-5 py-3 text-black">
              <span className="text-[30px] font-black leading-none">{monthlySummary.savedPlaces}</span>
            </div>
            <p className="mt-5 text-[15px] font-semibold text-[#cfcfd3]">+3 this week</p>
          </div>

          <div className="soft-panel rounded-[10px] p-6">
            <div className="mb-8 flex items-center justify-between">
              <p className="mono-label text-[#bdbdc2]">CUISINE DIVERSITY</p>
              <Utensils size={24} className="text-[#8f9096]" />
            </div>
            <div className="inline-flex items-end gap-2 rounded-xl bg-white px-5 py-3 text-black">
              <span className="text-[30px] font-black leading-none">{monthlySummary.diversity}</span>
              <span className="text-[17px] font-black text-[#bcbcc0]">types</span>
            </div>
            <div className="mt-7 flex gap-2">
              {['Italian', 'Japanese', 'Mexican', '...'].map((item) => (
                <span
                  key={item}
                  className={`rounded-full border px-4 py-2 font-mono text-xs font-black ${
                    item === 'Japanese' ? 'border-primary text-primary' : 'border-white/10 text-white'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="soft-panel rounded-[10px] p-6">
            <div className="mb-7 flex items-center justify-between">
              <p className="mono-label text-[#bdbdc2]">RECENT LOGGING</p>
              <History size={23} className="text-[#8f9096]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#34353a] text-white">
                  ₹
                </span>
                <span className="text-[16px] font-bold">Cyber Noodle Bar</span>
              </div>
              <span className="font-mono text-xs font-black text-primary">850 kcal</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

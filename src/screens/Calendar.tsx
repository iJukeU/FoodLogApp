import { Bell, Printer, UserCircle } from 'lucide-react';
import { foodPosts, monthlySummary } from '../data/mockData';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const loggedDays = new Map(foodPosts.map((post) => [post.calendarDay, post]));
const loggedSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 20, 22, 25]);

function MonthGrid({ preview = false }: { preview?: boolean }) {
  const days = Array.from({ length: 35 }, (_, index) => {
    const startOffset = preview ? 3 : 0;
    const day = index - startOffset + 1;
    return day > 0 && day <= 31 ? day : null;
  });

  return (
    <div className="soft-panel rounded-[18px] px-4 py-4">
      <div className="mb-3 grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div key={`${day}-${index}`} className="text-center font-mono text-[13px] font-black text-[#85858a]">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const post = day ? loggedDays.get(day) : undefined;
          const hasLog = !!day && (loggedSet.has(day) || !!post) && !preview;
          const active = day === 5 && !preview;

          return (
            <div
              key={`${preview ? 'nov' : 'oct'}-${day}-${index}`}
              className={`relative aspect-square overflow-hidden rounded-[10px] border ${
                active ? 'border-[3px] border-primary' : 'border-white/10'
              } bg-[#17181b]`}
            >
              {hasLog && post && (
                <img src={post.image} alt={post.food} className="h-full w-full object-contain p-1" />
              )}
              {hasLog && !post && (
                <div className="flex h-full w-full items-center justify-center text-base opacity-80">🍽️</div>
              )}
              {hasLog && <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />}
              {day && (
                <span
                  className={`absolute bottom-0.5 right-1.5 font-mono text-[13px] font-black ${
                    hasLog || active ? 'text-white' : 'text-[#5f6065]'
                  }`}
                >
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarView() {
  return (
    <div className="h-full overflow-y-auto bg-background pb-32 text-white no-scrollbar">
      <header className="relative px-6 pt-8">
        <button className="absolute left-5 top-7 flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/10 bg-white/10 text-[#c8c8cc]">
          <UserCircle size={28} />
        </button>
        <h1 className="px-12 pt-2 text-center text-[30px] font-black tracking-tight">PHOTO CALENDAR</h1>
        <button className="absolute right-5 top-8 text-[#d4d4d7]">
          <Bell size={27} />
        </button>
      </header>

      <main className="px-5 pt-8">
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[30px] font-black leading-none">October</h2>
              <p className="mt-2 font-mono text-[13px] font-black tracking-[0.16em] text-[#bdbdc2]">
                2023 REVIEW
              </p>
            </div>
            <button className="mb-0.5 flex shrink-0 items-center gap-2 rounded-full border-2 border-primary px-4 py-2.5 font-mono text-[13px] font-black tracking-[0.12em] text-primary">
              <Printer size={18} />
              RECAP
            </button>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="soft-panel rounded-[14px] p-4">
              <p className="mono-label text-[9px] text-[#bdbdc2]">MEALS LOGGED</p>
              <div className="mt-8 flex items-end gap-1.5">
                <span className="text-[34px] font-black leading-none">{monthlySummary.mealsLogged}</span>
                <span className="text-[18px] font-bold text-primary">/31</span>
              </div>
            </div>
            <div className="soft-panel rounded-[14px] p-4">
              <p className="mono-label text-[9px] text-[#bdbdc2]">TOP TAG</p>
              <div className="mt-8 flex items-center gap-2">
                <span className="text-[20px] text-primary">🔥</span>
                <span className="text-[28px] font-black">Spicy</span>
              </div>
            </div>
          </div>

          <MonthGrid />
        </section>

        <section className="mt-9">
          <h2 className="text-[30px] font-black leading-none">November</h2>
          <p className="mt-2 font-mono text-[13px] font-black tracking-[0.16em] text-[#bdbdc2]">
            2023 PREVIEW
          </p>
          <div className="mt-5 opacity-70">
            <MonthGrid preview />
          </div>
        </section>
      </main>
    </div>
  );
}

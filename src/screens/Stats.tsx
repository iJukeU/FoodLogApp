import { Activity, AlertTriangle, BarChart3, Leaf, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { foodPosts, monthlySummary } from '../data/mockData';

const text = {
  subtitle: '\u5854\u7684\u71df\u990a\u7d44\u6210\u5206\u6790',
  diversity: '\u98df\u7269\u591a\u6a23\u6027',
  weeklyTypes: '\u672c\u9031 AI \u8fa8\u8b58\u98df\u7269\u7a2e\u985e',
  composition: '\u672c\u6708\u71df\u990a\u7d44\u6210',
  insight: '\u4f60\u7684\u5854\u4e4b\u6240\u4ee5\u9019\u9ebc\u9ad8\uff0c\u662f\u56e0\u70ba\u98ef\u985e\u8207\u9eb5\u98df\u5c64\u6578\u504f\u591a\u3002',
  towerRecord: '\u5854\u9ad8\u7d00\u9304',
  lastMonth: '\u4e0a\u500b\u6708',
  thisMonth: '\u9019\u500b\u6708',
  density: '\u71b1\u91cf\u5bc6\u5ea6\u6307\u6578',
  densityDesc: '\u5e73\u5747\u6bcf\u5c64\u6a13\u7684\u71b1\u91cf',
  traffic: '\u5065\u5eb7\u5100\u8868\u677f',
  fried: '\u6cb9\u70b8\u7269\u5b89\u5168\u5269\u9918\u91cf',
  sugar: '\u7cd6\u5206\u984d\u5ea6',
  purification: '\u6de8\u5316\u7d00\u9304',
  purificationDesc: '\u4eca\u65e5\u852c\u679c\u8207\u86cb\u767d\u8cea\u5e6b\u4f60\u62b5\u6d88\u4e86\u4e00\u90e8\u5206\u6cb9\u70b8 / \u7cd6\u5206\u8ca0\u64d4\u3002',
};

const nutrition = [
  { label: 'CARBS', value: 46, color: '#ffbe3d', images: [foodPosts[0].image, foodPosts[10].image] },
  { label: 'PROTEIN', value: 22, color: '#ff6b00', images: [foodPosts[2].image, foodPosts[11].image] },
  { label: 'FAT', value: 24, color: '#f05a28', images: [foodPosts[6].image, foodPosts[1].image] },
  { label: 'OTHER', value: 8, color: '#8f9096', images: [foodPosts[4].image, foodPosts[5].image] },
];

const trafficMetrics = [
  { label: text.fried, value: 34, color: '#ffbe3d', image: foodPosts[6].image, status: 'YELLOW' },
  { label: text.sugar, value: 58, color: '#7ddf64', image: foodPosts[8].image, status: 'GREEN' },
];

const purificationItems = [
  { label: '\u852c\u679c', value: 36, image: foodPosts[5].image },
  { label: '\u86cb\u767d\u8cea', value: 24, image: foodPosts[2].image },
  { label: '\u6c34\u5206 / \u5176\u4ed6', value: 12, image: foodPosts[7].image },
];

export function Stats() {
  const currentTower = monthlySummary.towerHeight;
  const previousTower = 9;
  const towerDelta = currentTower - previousTower;
  const avgCaloriesPerLayer = Math.round(monthlySummary.totalCalories / 88);
  const featuredFoods = foodPosts.slice(0, 6);

  return (
    <div className="h-full overflow-y-auto bg-background pb-36 text-white no-scrollbar">
      <header className="border-b border-white/5 px-5 pb-5 pt-7">
        <p className="font-mono text-[10px] font-black tracking-[0.18em] text-primary">TOWER SCAN</p>
        <h1 className="mt-1 text-[28px] font-black tracking-tight">STATISTICS</h1>
        <p className="mt-2 text-sm font-semibold text-[#a7a8ad]">{text.subtitle}</p>
      </header>

      <main className="space-y-4 px-5 pt-5">
        <section className="soft-panel overflow-hidden rounded-[18px] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mono-label text-[#bdbdc2]">DIVERSITY</p>
              <h2 className="mt-2 text-[22px] font-black">{text.diversity}</h2>
              <p className="mt-1 text-xs font-semibold text-[#8f9096]">{text.weeklyTypes}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-black">
              <span className="text-[30px] font-black leading-none">{monthlySummary.diversity}</span>
              <span className="ml-1 text-xs font-black text-[#8b8c91]">types</span>
            </div>
          </div>

          <div className="mt-5 flex justify-between">
            {featuredFoods.map((food, index) => (
              <div
                key={food.id}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111214]"
                style={{ transform: `translateY(${index % 2 === 0 ? 0 : 8}px)` }}
              >
                <img src={food.image} alt={food.food} className="max-h-11 max-w-11 object-contain" />
              </div>
            ))}
          </div>
        </section>

        <section className="soft-panel rounded-[18px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mono-label text-[#bdbdc2]">COMPOSITION</p>
              <h2 className="mt-2 text-[21px] font-black">{text.composition}</h2>
            </div>
            <BarChart3 size={25} className="text-primary" />
          </div>

          <div className="space-y-4">
            {nutrition.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {item.images.map((image) => (
                        <span key={image} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#232429] bg-[#111214]">
                          <img src={image} alt="" className="max-h-6 max-w-6 object-contain" />
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs font-black text-white">{item.label}</span>
                  </div>
                  <span className="font-mono text-xs font-black" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#2b2c30]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-[#4b3617] bg-[#21180d] p-4">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-[#ffbe3d]" />
              <p className="text-sm font-bold leading-6 text-[#f5d99a]">{text.insight}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-[1.05fr_0.95fr] gap-3">
          <div className="soft-panel rounded-[18px] p-5">
            <p className="mono-label text-[#bdbdc2]">HEIGHT</p>
            <h2 className="mt-2 text-[20px] font-black">{text.towerRecord}</h2>
            <div className="mt-5 flex items-end justify-around">
              <TowerBar label={text.lastMonth} value={previousTower} height={72} dim />
              <TowerBar label={text.thisMonth} value={currentTower} height={104} />
            </div>
            <p className="mt-4 text-center font-mono text-xs font-black text-primary">
              +{towerDelta} layers vs last month
            </p>
          </div>

          <div className="soft-panel rounded-[18px] p-5">
            <Scale size={23} className="text-[#ffbe3d]" />
            <p className="mt-4 mono-label text-[#bdbdc2]">DENSITY</p>
            <h2 className="mt-2 text-[19px] font-black leading-6">{text.density}</h2>
            <div className="mt-5 inline-flex items-end gap-1 rounded-xl bg-white px-3 py-2 text-black">
              <span className="text-[30px] font-black leading-none">{avgCaloriesPerLayer}</span>
              <span className="text-xs font-black text-primary">kcal</span>
            </div>
            <p className="mt-3 text-xs font-semibold leading-5 text-[#9b9ca1]">{text.densityDesc}</p>
          </div>
        </section>

        <section className="soft-panel rounded-[18px] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mono-label text-[#bdbdc2]">TRAFFIC LIGHT</p>
              <h2 className="mt-2 text-[21px] font-black">{text.traffic}</h2>
            </div>
            <AlertTriangle size={25} className="text-[#ffbe3d]" />
          </div>

          <div className="space-y-4">
            {trafficMetrics.map((item) => (
              <div key={item.label} className="rounded-2xl bg-[#111214] p-4">
                <div className="mb-3 flex items-center gap-3">
                  <img src={item.image} alt="" className="h-12 w-12 object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black">{item.label}</p>
                    <p className="mt-1 font-mono text-[10px] font-black" style={{ color: item.color }}>
                      {item.status} / {item.value}% LEFT
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-[#2b2c30]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="soft-panel rounded-[18px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mono-label text-[#bdbdc2]">PURIFICATION</p>
              <h2 className="mt-2 text-[21px] font-black">{text.purification}</h2>
            </div>
            <ShieldCheck size={25} className="text-[#7ddf64]" />
          </div>
          <p className="text-sm font-semibold leading-6 text-[#a9aaae]">{text.purificationDesc}</p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {purificationItems.map((item) => (
              <div key={item.label} className="rounded-2xl bg-[#111214] p-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d241b]">
                  <img src={item.image} alt={item.label} className="max-h-12 max-w-12 object-contain" />
                </div>
                <p className="mt-3 text-xs font-black">{item.label}</p>
                <p className="mt-1 font-mono text-xs font-black text-[#7ddf64]">+{item.value}%</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#152015] p-4">
            <Leaf size={21} className="shrink-0 text-[#7ddf64]" />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex justify-between font-mono text-[11px] font-black text-[#d9f2d3]">
                <span>TODAY CLEAN RATE</span>
                <span>42%</span>
              </div>
              <div className="h-2 rounded-full bg-[#263326]">
                <div className="h-full w-[42%] rounded-full bg-[#7ddf64]" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TowerBar({ label, value, height, dim = false }: { label: string; value: number; height: number; dim?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-12 items-end justify-center rounded-t-xl bg-[#111214] px-2 pb-1" style={{ height }}>
        <div className={`h-full w-full rounded-t-lg ${dim ? 'bg-[#55565c]' : 'bg-primary'}`} />
      </div>
      <p className="mt-2 font-mono text-[10px] font-black text-[#8f9096]">{label}</p>
      <p className={`font-mono text-sm font-black ${dim ? 'text-[#9b9ca1]' : 'text-primary'}`}>{value}</p>
    </div>
  );
}

import { ArrowLeft, Check, MoreVertical, PlusCircle, Send, UserCircle } from 'lucide-react';

interface ChatDetailProps {
  onBack: () => void;
}

export function ChatDetail({ onBack }: ChatDetailProps) {
  return (
    <div className="relative flex h-full flex-col bg-background text-white">
      <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#ffb083]" aria-label="Back">
            <ArrowLeft size={22} />
          </button>
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-white/10 bg-[#222328] text-white">
            <UserCircle size={26} />
          </span>
          <div>
            <p className="text-[24px] font-black leading-none">Chef Alex</p>
            <p className="mt-1 font-mono text-[12px] font-black tracking-[0.18em] text-[#b8b8bd]">
              Online
            </p>
          </div>
        </div>
        <button className="text-[#b7b7bc]">
          <MoreVertical size={22} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-6 no-scrollbar">
        <div className="mb-7 flex justify-center">
          <span className="rounded-xl bg-[#25262a] px-5 py-2 text-sm font-black text-[#b7b7bc]">Today</span>
        </div>

        <Incoming text="欸你今天拍那家好吃嗎" time="10:42 AM" />
        <Outgoing text="還不錯" time="10:45 AM" />
        <Incoming text="吃大餐不糾" time="11:00 AM" />
        <Outgoing text="揪了你會到嗎" time="11:01 AM" />

        <div className="mt-8 flex items-center gap-2">
          <Avatar />
          <div className="rounded-full border border-white/10 bg-[#1e1f24] px-5 py-3 text-[#aaaab0]">
            • • •
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-background px-4 pb-5 pt-4">
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#1d1e23] px-5 py-4">
          <PlusCircle size={22} className="text-[#d6d6da]" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[16px] font-bold text-white outline-none placeholder:text-[#d0d0d4]"
            placeholder="Message..."
          />
          <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-black">
            <Send size={24} fill="currentColor" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function Avatar() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#222328] text-[#d0d0d3]">
      <UserCircle size={20} />
    </span>
  );
}

function Incoming({ text, time }: { text: string; time: string }) {
  return (
    <div className="mb-7 flex max-w-[78%] items-start gap-2">
      <Avatar />
      <div>
        <div className="rounded-2xl rounded-tl-none border border-white/10 bg-[#1f2025] px-4 py-4">
          <p className="text-[16px] font-bold leading-6">{text}</p>
        </div>
        <p className="mt-2 pl-2 font-mono text-[12px] font-black tracking-[0.14em] text-[#aaaab0]">{time}</p>
      </div>
    </div>
  );
}

function Outgoing({ text, time }: { text: string; time: string }) {
  return (
    <div className="mb-7 ml-auto flex max-w-[78%] items-start justify-end gap-2">
      <div>
        <div className="rounded-2xl rounded-tr-none bg-primary px-5 py-4 text-black">
          <p className="text-[16px] font-bold leading-6">{text}</p>
        </div>
        <p className="mt-2 flex items-center justify-end gap-1 font-mono text-[12px] font-black tracking-[0.14em] text-[#aaaab0]">
          {time} <Check size={13} />
        </p>
      </div>
      <Avatar />
    </div>
  );
}

import { MessageSquarePlus, Search, UserCircle } from 'lucide-react';
import { friends } from '../data/mockData';

interface ChatListProps {
  onSelectChat: () => void;
}

export function ChatList({ onSelectChat }: ChatListProps) {
  return (
    <div className="h-full overflow-y-auto bg-background pb-36 text-white no-scrollbar">
      <header className="flex items-center justify-between border-b border-white/5 px-0 pb-7 pt-7">
        <h1 className="text-[26px] font-black tracking-tight">CHAT</h1>
        <button className="text-primary">
          <MessageSquarePlus size={22} />
        </button>
      </header>

      <div className="flex h-[66px] items-center gap-5 border-b border-white/10 bg-[#151619] px-3">
        <Search size={18} className="text-primary" />
        <span className="font-mono text-[14px] font-black tracking-wide text-[#dedee2]">
          SEARCH CONVERSATIONS...
        </span>
      </div>

      <section className="pt-8">
        {friends.map((friend) => (
          <button
            key={friend.id}
            onClick={onSelectChat}
            className="relative flex w-full items-center gap-6 px-0 py-5 text-left"
          >
            <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-[#2b2c30] text-[#87888d]">
              <UserCircle size={30} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[18px] font-black leading-tight">{friend.name}</span>
              <span className="mt-2 block truncate text-[16px] font-bold text-[#8f9095]">
                {friend.message}
              </span>
            </span>
            {friend.unread && (
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#0a8cff]" />
            )}
          </button>
        ))}
      </section>
    </div>
  );
}

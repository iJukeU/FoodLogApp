import { useState } from 'react';
import { Bookmark, Image, RefreshCw, Search, Send, UserCircle, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { foodPosts, friends } from '../data/mockData';
import curryHero from '../../FoodImages/S__12189701.jpg';

interface HomeProps {
  onGoToTower: () => void;
}

const reactions = ['\uD83E\uDD5A', '\uD83C\uDF54', '\uD83C\uDF55', '\uD83C\uDF2E', '\uD83E\uDD24'];

export function Home({ onGoToTower }: HomeProps) {
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(friends[0].id);
  const [captureBurst, setCaptureBurst] = useState(false);
  const post = foodPosts[0];

  const captureMeal = () => {
    setCaptureBurst(true);
    window.setTimeout(() => setCaptureBurst(false), 1100);
  };

  return (
    <div className="relative h-full bg-background text-white">
      <div className="h-full overflow-y-auto pb-36 no-scrollbar">
        <header className="mx-7 flex h-[112px] items-center justify-between border-b border-white/8">
          <div className="flex items-center gap-3">
            <Users size={23} className="text-primary" fill="currentColor" />
            <span className="text-[21px] font-black tracking-wide">12 FRIENDS</span>
          </div>
          <button className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/10 bg-white/10 text-[#b6b6ba]">
            <UserCircle size={31} />
          </button>
        </header>

        <main className="px-8 pt-14">
          <section className="relative">
            <div className="relative overflow-hidden rounded-[25px] border border-[#5b2d13] bg-[#111214] p-3">
              <div className="relative h-[315px] overflow-hidden rounded-[19px] bg-[#1a1b1e]">
                <img
                  src={curryHero}
                  alt={post.food}
                  className="absolute inset-0 h-full w-full object-cover opacity-95"
                />
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-[#2a2a2c]/85 py-1.5 pl-1.5 pr-4 backdrop-blur">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-[#3a3a3c] text-[#a9a9ad]">
                    <UserCircle size={19} />
                  </span>
                  <span className="text-[15px] font-bold">Alex · {post.time}</span>
                </div>
                <button className="absolute right-3 top-3 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#3a3a3c]/90 text-primary">
                  <Bookmark size={23} />
                </button>
                <div className="absolute bottom-4 left-1/2 max-w-[74%] -translate-x-1/2 rounded-full bg-[#2f2f31]/88 px-5 py-2.5 text-center text-[17px] font-bold shadow-xl backdrop-blur">
                  {post.food}
                </div>
              </div>
            </div>

            <button
              onClick={onGoToTower}
              className="absolute -right-7 top-[188px] flex h-[82px] w-[43px] items-center justify-center rounded-l-[18px] bg-[#232429] text-primary shadow-2xl"
              aria-label="Food tower"
            >
              <span className="text-4xl leading-none">›</span>
            </button>
          </section>

          <section className="mt-9 flex items-center justify-between rounded-full border border-white/8 bg-[#17181b] px-4 py-2.5">
            {reactions.map((reaction) => (
              <button key={reaction} className="text-[25px] transition active:scale-90">
                {reaction}
              </button>
            ))}
            <button
              onClick={() => setShowSendModal(true)}
              className="ml-1 flex h-[46px] w-[46px] items-center justify-center rounded-full border border-primary/40 bg-[#301b10] text-primary"
              aria-label="Send"
            >
              <Send size={25} fill="currentColor" />
            </button>
          </section>

          <section className="mt-12 flex items-center justify-center gap-10">
            <button className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/8 bg-[#1a1b1e] text-[#8b8c91]">
              <Image size={22} />
            </button>
            <button
              onClick={captureMeal}
              className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[4px] border-primary bg-background p-2.5"
              aria-label="Capture"
            >
              <span className="h-full w-full rounded-full bg-primary" />
            </button>
            <button className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/8 bg-[#1a1b1e] text-[#8b8c91]">
              <RefreshCw size={22} />
            </button>
          </section>

          <div className="mt-9 flex justify-center gap-4 text-[13px] font-bold text-[#77787d]">
            <span>
              {'\u98df\u7269\u7a2e\u985e'}: <span className="text-primary">{post.category}</span>
            </span>
            <span>|</span>
            <span>{'\u5361\u8def\u91cc'}: ---</span>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {captureBurst && (
          <motion.div
            initial={{ left: '50%', top: '75%', scale: 0.4, opacity: 0 }}
            animate={{
              left: ['50%', '72%', '96%'],
              top: ['75%', '50%', '36%'],
              scale: [0.4, 1, 0.6],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.05 }}
            className="pointer-events-none absolute z-[60] text-5xl"
          >
            {post.icon}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSendModal && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSendModal(false)}
              className="absolute inset-0 z-[70] bg-black/70 backdrop-blur-md"
              aria-label="Close"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 z-[80] rounded-t-[18px] bg-[#1d1e22]/96 pb-8 pt-3 shadow-2xl"
            >
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#77787d]" />
              <div className="mx-5 mb-5 flex items-center gap-3 rounded-xl bg-[#26272b] px-4 py-4 text-[#c9c9cc]">
                <Search size={18} />
                <span className="text-sm font-bold">{'\u641c\u5c0b\u500b\u4eba\u6a94\u6848'}</span>
              </div>
              <div className="flex gap-6 overflow-x-auto px-6 pb-28 no-scrollbar">
                {friends.map((friend) => {
                  const selected = selectedFriend === friend.id;
                  return (
                    <button
                      key={friend.id}
                      onClick={() => setSelectedFriend(friend.id)}
                      className="w-20 shrink-0 text-center"
                    >
                      <span
                        className={`mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full border ${
                          selected ? 'border-primary bg-[#242529]' : 'border-transparent bg-[#2a2b2f]'
                        } text-[#c7c7ca]`}
                      >
                        <UserCircle size={30} />
                      </span>
                      <span className="mt-2 block truncate text-[11px] font-bold text-white">
                        {friend.handle}
                      </span>
                      <span className="block truncate text-[11px] text-[#b9b9bd]">{friend.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/8 bg-[#141519] px-5 pb-6 pt-5">
                <p className="mb-4 text-sm font-bold text-[#a0a1a5]">{'\u8a0a\u606f'}......</p>
                <button
                  onClick={() => setShowSendModal(false)}
                  className="h-14 w-full rounded-xl bg-primary text-lg font-black text-black"
                >
                  {'\u767c\u9001'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

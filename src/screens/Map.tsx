import { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

import { FoodMarker } from '../components/FoodMarker';
import { TimelinePlayer } from '../components/TimelinePlayer';
import { useAppContext } from '../context/AppContext';
import { useTimeline } from '../hooks/useTimeline';
import type { FoodPost } from '../data/mockData';

// 台北中心點
const TAIPEI_CENTER: [number, number] = [25.0448, 121.5359];

export function MapScreen() {
  const mapRef = useRef<LeafletMap | null>(null);
  const { meals } = useAppContext();
  const [selectedItem, setSelectedItem] = useState<FoodPost | null>(null);

  const { isPlaying, currentRecord, sortedRecords, currentIndex, play, stop } =
    useTimeline(meals);

  // Timeline 播放時自動 fly to 當站
  const handleTimelineStep = useCallback((record: FoodPost) => {
    mapRef.current?.flyTo([record.latitude, record.longitude], 15, { duration: 1 });
    setSelectedItem(record);
  }, []);

  const handleStop = useCallback(() => {
    stop();
    setSelectedItem(null);
    mapRef.current?.flyTo(TAIPEI_CENTER, 12, { duration: 1 });
  }, [stop]);

  const handleMarkerPress = useCallback((item: FoodPost) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  }, []);

  return (
    // isolate：把 Leaflet 內部的 z-index 關在這層，避免蓋過外面的 BottomNav
    <div className="relative isolate h-full bg-background">
      {/* 地圖 */}
      <MapContainer
        ref={mapRef}
        center={TAIPEI_CENTER}
        zoom={12}
        zoomControl={false}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {meals.map((item) => (
          <FoodMarker
            key={item.id}
            item={item}
            isSelected={selectedItem?.id === item.id}
            onPress={() => handleMarkerPress(item)}
          />
        ))}
      </MapContainer>

      {/* 頁頭 */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex items-start justify-between bg-gradient-to-b from-black/75 to-transparent px-6 pb-10 pt-6"
      >
        <h1 className="font-display text-[22px] font-black tracking-wide text-white">
          Food Map
        </h1>
        <span className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-[#171719]/85 px-3 py-1.5 backdrop-blur">
          <MapPin size={12} className="text-primary" />
          <span className="text-[11px] font-bold text-white">{meals.length} spots</span>
        </span>
      </motion.header>

      {/* 底部資訊卡（點擊 Marker 或播放到站時） */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-[212px] left-5 right-5 z-[1000] rounded-[22px] border border-white/10 bg-[#1d1e22]/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.food}
                  className="h-11 w-11 object-contain"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-black text-white">
                  {selectedItem.icon} {selectedItem.food}
                </p>
                <p className="mt-0.5 text-[11px] font-bold text-[#8d8d92]">
                  {new Date(selectedItem.timestamp).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' · '}
                  {selectedItem.place}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-[#a0a1a5]">
                  {selectedItem.address}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Player */}
      <TimelinePlayer
        isPlaying={isPlaying}
        currentRecord={currentRecord}
        totalCount={sortedRecords.length}
        currentIndex={currentIndex}
        onPlay={() => play(handleTimelineStep)}
        onStop={handleStop}
      />
    </div>
  );
}

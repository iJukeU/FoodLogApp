import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import type { FoodPost } from '../data/mockData';

interface FoodMarkerProps {
  item: FoodPost;
  isSelected: boolean;
  onPress: () => void;
}

/** 地圖上的食物標記：圓形圖片 chip，選取時放大並亮起橘色外框（樣式在 index.css 的 .food-marker） */
export function FoodMarker({ item, isSelected, onPress }: FoodMarkerProps) {
  const icon = useMemo(() => {
    const size = isSelected ? 58 : 44;
    return L.divIcon({
      className: '',
      html: `
        <div class="food-marker ${isSelected ? 'food-marker--selected' : ''}">
          <img src="${item.image}" alt="${item.food}" draggable="false" />
        </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }, [item.image, item.food, isSelected]);

  return (
    <Marker
      position={[item.latitude, item.longitude]}
      icon={icon}
      zIndexOffset={isSelected ? 1000 : 0}
      eventHandlers={{ click: onPress }}
    />
  );
}

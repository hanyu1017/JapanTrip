import React from 'react';
import { Route, ArrowRight, MapPin, Clock } from 'lucide-react';

/**
 * 路線視覺化組件
 * 顯示當日所有地點的順序和路線
 */
export const RouteVisualization = ({ items }) => {
  // 過濾出有地點的非交通項目
  const locationItems = items.filter(item =>
    item.location && item.type !== 'transport'
  );

  if (locationItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#faf8f3] to-[#f5f1e8] rounded-xl p-6 mb-6 border-2 border-[#c9a884] shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Route className="text-[#8b6f47]" size={20} />
        <h3 className="text-lg font-bold text-[#5d4037] font-serif">本日のルート</h3>
        <span className="ml-auto text-xs text-[#8d6e63] font-mono bg-white px-2 py-1 rounded-full">
          {locationItems.length} 箇所
        </span>
      </div>

      {/* 水平滾動的路線圖 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {locationItems.map((item, idx) => (
          <React.Fragment key={item.id}>
            {/* 地點卡片 */}
            <div className="flex flex-col items-center flex-shrink-0 group cursor-pointer">
              {/* 序號圓圈 */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b6f47] to-[#6d5436] text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                {/* 地點類型圖標 */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow border border-[#c9a884]">
                  {item.type === 'meal' ? '🍱' :
                   item.type === 'hotel' ? '🏨' :
                   item.type === 'spot' ? '📸' : '📍'}
                </div>
              </div>

              {/* 地點名稱 */}
              <div className="mt-2 text-xs text-center max-w-[90px] text-[#5d4037] font-medium line-clamp-2 group-hover:text-[#c44569] transition-colors">
                {item.title}
              </div>

              {/* 時間標記 */}
              <div className="flex items-center gap-1 text-[10px] text-[#8d6e63] mt-1">
                <Clock size={10} />
                <span className="font-mono">{item.time}</span>
              </div>
            </div>

            {/* 箭頭連接 */}
            {idx < locationItems.length - 1 && (
              <div className="flex flex-col items-center flex-shrink-0 px-3">
                <ArrowRight className="text-[#c9a884]" size={20} />
                <span className="text-[9px] text-[#8d6e63] mt-1 font-mono">
                  移動
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 總覽統計 */}
      <div className="mt-4 pt-4 border-t border-[#c9a884]/30 flex justify-between text-xs">
        <div className="flex items-center gap-2 text-[#8d6e63]">
          <MapPin size={14} className="text-[#8b6f47]" />
          <span>開始: <strong className="text-[#5d4037]">{locationItems[0]?.location}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-[#8d6e63]">
          <MapPin size={14} className="text-[#c44569]" />
          <span>終了: <strong className="text-[#5d4037]">{locationItems[locationItems.length - 1]?.location}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default RouteVisualization;

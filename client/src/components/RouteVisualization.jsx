import React from 'react';
import { Home, MapPin, Utensils, Camera } from 'lucide-react';

/**
 * 本日概要組件
 * 顯示當日飯店及行程概要
 */
export const RouteVisualization = ({ items }) => {
  // 找出飯店
  const hotel = items.find(item => item.type === 'hotel');

  // 過濾出景點和餐飲
  const spots = items.filter(item => item.type === 'spot');
  const meals = items.filter(item => item.type === 'meal');

  // 計算行程數量
  const totalActivities = spots.length + meals.length;

  return (
    <div className="bg-white rounded-lg p-4 mb-6 border border-[#E0DDD5] shadow-sm">
      <h3 className="text-sm font-bold text-[#2C2C2C] mb-3 flex items-center gap-2">
        📋 本日の概要
      </h3>

      <div className="space-y-3">
        {/* 飯店資訊 */}
        {hotel && (
          <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded border border-[#E8E4DC]">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8B7355] text-white flex-shrink-0">
              <Home size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#8B7355] mb-0.5">宿泊先</div>
              <div className="font-medium text-sm text-[#2C2C2C] truncate">{hotel.title}</div>
              {hotel.location && (
                <div className="text-xs text-[#5A5A5A] mt-1 flex items-center gap-1">
                  <MapPin size={10} />
                  <span className="truncate">{hotel.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 行程概要 */}
        <div className="grid grid-cols-2 gap-2">
          {/* 觀光景點 */}
          <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded border border-[#E8E4DC]">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFB7C5] text-white flex-shrink-0">
              <Camera size={14} />
            </div>
            <div>
              <div className="text-[10px] text-[#5A5A5A]">観光</div>
              <div className="text-base font-bold text-[#2C2C2C]">{spots.length} 箇所</div>
            </div>
          </div>

          {/* 餐飲 */}
          <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded border border-[#E8E4DC]">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F39C6B] text-white flex-shrink-0">
              <Utensils size={14} />
            </div>
            <div>
              <div className="text-[10px] text-[#5A5A5A]">食事</div>
              <div className="text-base font-bold text-[#2C2C2C]">{meals.length} 回</div>
            </div>
          </div>
        </div>

        {/* 開始和結束地點 */}
        {totalActivities > 0 && (
          <div className="pt-2 border-t border-[#E8E4DC] text-xs text-[#5A5A5A] flex justify-between">
            <span className="flex items-center gap-1">
              <span className="text-[#8B7355]">●</span>
              {items.find(i => i.type !== 'transport' && i.location)?.location || '未設定'}
            </span>
            <span>→</span>
            <span className="flex items-center gap-1">
              {items.filter(i => i.type !== 'transport' && i.location).slice(-1)[0]?.location || '未設定'}
              <span className="text-[#8B7355]">●</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteVisualization;

# 🎨 UI組件整合指南

本指南將幫助你將新的UI組件整合到現有應用中。

## 📦 新組件

我們創建了兩個獨立的組件：

1. **ImageUpload.jsx** - 圖片上傳組件
2. **RouteVisualization.jsx** - 路線視覺化組件

## 🚀 整合步驟

### 步驟 1：創建 components 目錄

```bash
mkdir -p client/src/components
```

組件已經創建在 `client/src/components/` 目錄中。

### 步驟 2：在 App.jsx 中導入組件

在 `client/src/App.jsx` 文件頂部添加：

```jsx
import { ImageUpload } from './components/ImageUpload';
import { RouteVisualization } from './components/RouteVisualization';
```

### 步驟 3：使用 ImageUpload 組件

在 `EditModal` 組件中，找到圖片相關的部分，替換為：

```jsx
<div>
  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
    画像
  </label>
  <ImageUpload
    currentImage={formData.imageUrl}
    onImageChange={(imageData) => setFormData({...formData, imageUrl: imageData})}
  />
</div>
```

### 步驟 4：使用 RouteVisualization 組件

在 `ItineraryView` 組件中，在日標題之後添加：

```jsx
<div className="p-4 max-w-2xl mx-auto">
  {/* 日標題 */}
  <div className="flex justify-between items-end mb-6 mt-2">
    {/* ... 現有代碼 ... */}
  </div>

  {/* 添加路線視覺化 */}
  <RouteVisualization items={currentDayData.items} />

  {/* 時間軸 */}
  <div className="relative space-y-6">
    {/* ... 現有代碼 ... */}
  </div>
</div>
```

### 步驟 5：更新 EditModal 處理 imageUrl

確保 `handleEditSave` 函數包含 imageUrl：

```jsx
const handleEditSave = async (updatedItem) => {
  try {
    setSaving(true);
    const itemData = {
      id: updatedItem.id,
      day: currentDay,
      time: updatedItem.time,
      type: updatedItem.type,
      title: updatedItem.title,
      location: updatedItem.location,
      desc: updatedItem.desc,
      detail: updatedItem.detail,
      from: updatedItem.from,
      to: updatedItem.to,
      method: updatedItem.method,
      duration: updatedItem.duration,
      imageUrl: updatedItem.imageUrl  // 添加這一行
    };

    await axios.post(`${API_URL}/itinerary/item`, itemData);
    // ... 其餘代碼
  }
};
```

### 步驟 6：更新顯示圖片

在行程卡片中，將圖片源改為使用 `item.imageUrl`：

```jsx
const imageUrl = item.imageUrl || DEFAULT_IMAGE;

<img src={imageUrl} alt={item.title} ... />
```

## 🎨 增強的日式風格

### 更新配色方案

在你的 `index.css` 或組件中應用新的配色：

```css
/* 主色調 - 茶褐色 */
--primary: #8b6f47;
--primary-dark: #6d5436;

/* 強調色 - 櫻花粉紅 */
--accent: #c44569;
--accent-dark: #a83551;

/* 輔助色 - 金黃色 */
--secondary: #f6b93b;
--secondary-dark: #f39c12;

/* 背景色 - 米色 */
--bg-light: #faf8f3;
--bg-dark: #f5f1e8;

/* 邊框色 */
--border: #c9a884;

/* 文字色 */
--text-primary: #5d4037;
--text-secondary: #8d6e63;
```

### 更新漸變背景

將主要容器的背景改為：

```jsx
<div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#e8dfd6]">
```

### 更新按鈕樣式

將按鈕改為漸變樣式：

```jsx
<button className="bg-gradient-to-r from-[#8b6f47] to-[#6d5436] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
  ボタン
</button>
```

### 更新卡片樣式

使用毛玻璃效果和邊框：

```jsx
<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#c9a884] shadow-lg">
  {/* 內容 */}
</div>
```

## ⏰ 增強時間軸設計

### 更新時間軸線條

找到時間軸的垂直線，改為漸變：

```jsx
<div className="absolute left-[19px] top-4 bottom-4 w-1 bg-gradient-to-b from-[#c44569] via-[#c9a884] to-[#8b6f47] rounded-full shadow-md"></div>
```

### 更新時間點樣式

改進時間點圓圈：

```jsx
<div className={`relative w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold
  ${isTransport ? 'bg-gradient-to-br from-[#6d5436] to-[#8b6f47]' :
    item.type === 'meal' ? 'bg-gradient-to-br from-[#f6b93b] to-[#f39c12]' :
    'bg-gradient-to-br from-[#c44569] to-[#a83551]'} text-white shadow-lg
`}>
  <div className="text-center">
    <div className="text-xs leading-none font-black">{item.time.split(':')[0]}</div>
    <div className="text-[8px] leading-none mt-0.5 opacity-80">:{item.time.split(':')[1]}</div>
  </div>
</div>
```

## 🖼️ 圖片顯示增強

### 添加裝飾性覆蓋層

在圖片上添加漸變和效果：

```jsx
<div className="relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 border-white">
  <img src={imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />

  {/* 漸變覆蓋 */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

  {/* 日式圖案效果 */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#c44569]/20 via-transparent to-[#8b6f47]/20"></div>

  {/* 內容 */}
  <div className="absolute inset-0 p-5 flex flex-col justify-end">
    {/* ... */}
  </div>
</div>
```

## 📱 完整範例

這裡是一個完整的整合範例，展示如何在 EditModal 中使用新組件：

```jsx
const EditModal = ({ isOpen, onClose, item, onSave, onDelete, saving }) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
      <div className="bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] w-full max-w-md rounded-2xl p-6 shadow-2xl border-t-4 border-[#c44569] max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-black mb-6 text-[#5d4037] flex items-center gap-2 font-serif border-b-2 border-[#c9a884] pb-3">
          {item.id ? <Edit size={24} /> : <Plus size={24} />}
          {item.id ? '行程を編集' : '行程を追加'}
        </h3>

        <div className="space-y-5">
          {/* 圖片上傳 - 使用新組件 */}
          <div>
            <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> 画像
            </label>
            <ImageUpload
              currentImage={formData.imageUrl}
              onImageChange={(imageData) => setFormData({...formData, imageUrl: imageData})}
            />
          </div>

          {/* 其他表單欄位 */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};
```

## 🎯 測試清單

完成整合後，測試以下功能：

- [ ] 圖片上傳和預覽正常
- [ ] 路線視覺化顯示正確
- [ ] 時間軸樣式已更新
- [ ] 配色方案已應用
- [ ] 漸變和效果正常
- [ ] 響應式設計正常
- [ ] 圖片保存到資料庫
- [ ] 圖片從API正確載入

## 💡 進階自定義

### 添加動畫效果

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}
```

### 添加日式圖案

```jsx
<div className="absolute inset-0 opacity-5" style={{
  backgroundImage: 'radial-gradient(circle, #c44569 1px, transparent 1px)',
  backgroundSize: '20px 20px'
}}>
</div>
```

## 🐛 常見問題

### 問題：圖片不顯示

確保：
1. `imageUrl` 正確傳遞給組件
2. 後端API返回 `imageUrl` 欄位
3. base64 字符串完整

### 問題：路線視覺化為空

確保：
1. Items 有 `location` 屬性
2. 過濾邏輯正確
3. 至少有一個非交通項目

### 問題：樣式不生效

確保：
1. Tailwind CSS 配置正確
2. 自定義顏色在 `tailwind.config.js` 中定義
3. 重啟開發伺服器

## 📚 相關資源

- [Tailwind CSS 文檔](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React 文檔](https://react.dev)

---

**完成整合後，你將擁有一個專業且美觀的日式風格旅行規劃應用！** 🎌✨

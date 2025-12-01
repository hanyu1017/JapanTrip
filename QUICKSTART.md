# ⚡ 快速開始指南

這是一個 5 分鐘快速開始指南，讓你快速啟動 Japan Trip Planner。

## 📋 前提條件

確保已安裝：
- Node.js 18+
- PostgreSQL 12+
- Git

## 🚀 5 分鐘部署到 Railway

### 1️⃣ 推送到 GitHub (已完成 ✅)

代碼已經在這個分支上：`claude/travel-itinerary-app-019iL5YqS6xZHfNHECBgfy7w`

### 2️⃣ 連接 Railway

1. 前往 [railway.app](https://railway.app) 並登入
2. 點擊 **"New Project"**
3. 選擇 **"Deploy from GitHub repo"**
4. 選擇 `JapanTrip` repository
5. 選擇分支 `claude/travel-itinerary-app-019iL5YqS6xZHfNHECBgfy7w`

### 3️⃣ 添加資料庫

1. 在專案頁面點擊 **"New"**
2. 選擇 **"Database" → "PostgreSQL"**
3. 等待資料庫創建完成

### 4️⃣ 配置環境變數

在專案的 Variables 頁面添加：

```bash
NODE_ENV=production
CLIENT_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

### 5️⃣ 初始化資料庫

等待首次部署完成後，在 Railway Dashboard 執行：

**方法 A：使用 CLI**
```bash
railway run cd server && npm run seed
```

**方法 B：創建新部署**
1. Settings → Create New Deployment
2. Run Command: `cd server && npm run seed`

### 6️⃣ 訪問你的應用

在 Railway Dashboard 的 Settings → Domains 找到你的公開網址！

🎉 完成！你的旅行規劃應用已經上線了！

---

## 💻 本地開發（可選）

如果你想在本地測試：

### 1️⃣ 克隆專案
```bash
git clone https://github.com/hanyu1017/JapanTrip.git
cd JapanTrip
git checkout claude/travel-itinerary-app-019iL5YqS6xZHfNHECBgfy7w
```

### 2️⃣ 安裝依賴
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3️⃣ 設定環境變數
```bash
# 在 server/ 目錄建立 .env
cat > server/.env << 'EOF'
DATABASE_URL=postgresql://username:password@localhost:5432/japantrip
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
EOF
```

### 4️⃣ 建立並初始化資料庫
```bash
# 建立資料庫
createdb japantrip

# 初始化資料
cd server
npm run seed
cd ..
```

### 5️⃣ 啟動開發伺服器
```bash
# 在根目錄
npm run dev
```

訪問：
- 前端：http://localhost:5173
- 後端：http://localhost:5000

---

## 📱 功能測試清單

部署完成後，測試以下功能：

### 行程管理
- [ ] 查看 7 天行程
- [ ] 切換不同天數
- [ ] 點擊行程查看詳情
- [ ] 編輯現有行程
- [ ] 新增新行程
- [ ] 刪除行程
- [ ] 使用 Google Maps 導航

### 費用管理
- [ ] 查看公積金餘額
- [ ] 新增支出記錄
- [ ] 查看支出列表
- [ ] 刪除支出
- [ ] 查看預算使用進度

### UI/UX
- [ ] 響應式設計（手機、平板、桌面）
- [ ] 圖片正常載入
- [ ] 動畫流暢
- [ ] 模態框正常開關

---

## 🆘 遇到問題？

### Railway 部署失敗
```bash
# 檢查日誌
railway logs
```

### 資料庫連接失敗
```bash
# 驗證資料庫連接
railway run psql $DATABASE_URL
```

### 前端空白
確認已執行種子腳本：
```bash
railway run cd server && npm run seed
```

---

## 📚 更多資訊

- 📖 完整文檔：[README.md](./README.md)
- 🚀 詳細部署指南：[DEPLOY.md](./DEPLOY.md)
- 🐛 問題回報：[GitHub Issues](https://github.com/hanyu1017/JapanTrip/issues)

---

**快樂旅行規劃！🎌✈️**

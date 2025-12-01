# ⛩️ 京阪奈冬之旅 | Japan Trip Planner

一個專業的全端旅行行程規劃應用，支援行程管理、費用記帳、實時同步等功能。使用 React + Express + PostgreSQL 打造，部署於 Railway 平台。

![Japan Trip](https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80)

## ✨ 功能特色

### 🗺️ 行程管理
- 📅 多日行程規劃，按時間軸呈現
- 🖼️ 每個景點配有精美圖片（Unsplash API）
- 🚅 詳細交通資訊與轉乘指引
- 📍 Google Maps 導航整合
- ✏️ 即時編輯、新增、刪除行程

### 💰 費用管理
- 💳 公積金追蹤系統
- 📊 即時計算剩餘預算
- 👥 多人分帳支援
- 📈 視覺化預算使用進度
- 🗑️ 輕鬆管理支出記錄

### 🎨 設計特色
- 📱 響應式設計，支援各種螢幕尺寸
- 🌸 日式美學風格界面
- ⚡ 流暢的動畫效果
- 🎭 專業的視覺層次
- 🖼️ 豐富的圖像內容

## 🛠️ 技術架構

### 前端
- **React 18** - 現代化 UI 框架
- **Vite** - 快速開發建置工具
- **Tailwind CSS** - 實用優先的 CSS 框架
- **Lucide React** - 精美的圖標庫
- **Axios** - HTTP 請求處理

### 後端
- **Node.js & Express** - RESTful API 服務器
- **PostgreSQL** - 關聯式資料庫
- **node-pg** - PostgreSQL 客戶端
- **CORS** - 跨域請求處理

### 部署
- **Railway** - 現代化部署平台
- **Nixpacks** - 自動建置工具
- **PostgreSQL Plugin** - Railway 資料庫服務

## 📁 專案結構

```
JapanTrip/
├── client/                 # React 前端應用
│   ├── public/
│   ├── src/
│   │   ├── App.jsx        # 主應用組件
│   │   ├── main.jsx       # 應用入口
│   │   └── index.css      # 全域樣式
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                 # Express 後端 API
│   ├── index.js           # API 服務器主檔
│   ├── db.js              # 資料庫連接與初始化
│   ├── seed.js            # 資料庫種子資料
│   ├── package.json
│   ├── .env.example
│   └── .env.production.example
│
├── package.json           # 根專案配置
├── railway.json           # Railway 部署配置
├── nixpacks.toml          # Nixpacks 建置配置
├── .gitignore
└── README.md
```

## 🚀 本地開發設定

### 前置需求
- Node.js 18+
- npm 或 yarn
- PostgreSQL 12+

### 1. 克隆專案
```bash
git clone <your-repo-url>
cd JapanTrip
```

### 2. 安裝依賴
```bash
# 安裝根目錄依賴
npm install

# 安裝前端依賴
cd client
npm install

# 安裝後端依賴
cd ../server
npm install
cd ..
```

### 3. 設定環境變數
在 `server/` 目錄建立 `.env` 檔案：
```bash
# server/.env
DATABASE_URL=postgresql://username:password@localhost:5432/japantrip
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 4. 初始化資料庫
```bash
# 進入 server 目錄
cd server

# 執行種子資料腳本
npm run seed
```

### 5. 啟動開發伺服器
```bash
# 在根目錄
npm run dev
```

這將同時啟動：
- 前端開發伺服器：http://localhost:5173
- 後端 API 伺服器：http://localhost:5000

## 🌐 部署到 Railway

### 方法一：使用 Railway CLI（推薦）

#### 1. 安裝 Railway CLI
```bash
npm install -g @railway/cli
```

#### 2. 登入 Railway
```bash
railway login
```

#### 3. 初始化專案
```bash
railway init
```

#### 4. 添加 PostgreSQL 資料庫
```bash
railway add postgresql
```

#### 5. 設定環境變數
在 Railway 儀表板中設定以下變數：
- `NODE_ENV=production`
- `PORT` (Railway 自動提供)
- `DATABASE_URL` (PostgreSQL plugin 自動提供)

#### 6. 部署應用
```bash
railway up
```

#### 7. 初始化資料庫（首次部署）
```bash
# 在 Railway 儀表板中執行
railway run npm run seed --workspace=server
```

### 方法二：使用 GitHub 整合

#### 1. 推送到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. 連接 Railway
1. 前往 [Railway](https://railway.app)
2. 點擊 "New Project"
3. 選擇 "Deploy from GitHub repo"
4. 選擇你的儲存庫

#### 3. 添加 PostgreSQL
1. 在專案中點擊 "New"
2. 選擇 "Database" → "Add PostgreSQL"

#### 4. 設定環境變數
在 Railway 專案設定中添加：
```
NODE_ENV=production
CLIENT_URL=https://your-app.railway.app
```

#### 5. 初始化資料庫
部署完成後，在 Railway 控制台執行：
```bash
cd server && npm run seed
```

## 📡 API 端點

### 行程管理
- `GET /api/itinerary` - 獲取所有行程
- `GET /api/itinerary/:day` - 獲取特定天行程
- `POST /api/itinerary/item` - 新增或更新行程項目
- `DELETE /api/itinerary/item/:id` - 刪除行程項目

### 費用管理
- `GET /api/expenses` - 獲取所有支出
- `POST /api/expenses` - 新增支出
- `DELETE /api/expenses/:id` - 刪除支出

### 設定
- `GET /api/settings/:key` - 獲取設定值
- `POST /api/settings` - 更新設定

### 健康檢查
- `GET /api/health` - 伺服器狀態檢查

## 🗄️ 資料庫結構

### itinerary_days
```sql
id              SERIAL PRIMARY KEY
day             INTEGER NOT NULL UNIQUE
date            VARCHAR(50) NOT NULL
title           TEXT NOT NULL
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### itinerary_items
```sql
id              VARCHAR(100) PRIMARY KEY
day_id          INTEGER REFERENCES itinerary_days(id)
time            VARCHAR(10) NOT NULL
type            VARCHAR(50) NOT NULL
title           TEXT NOT NULL
location        TEXT
description     TEXT
detail          TEXT
from_location   TEXT
to_location     TEXT
method          TEXT
duration        TEXT
sort_order      INTEGER DEFAULT 0
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### expenses
```sql
id              SERIAL PRIMARY KEY
payer           VARCHAR(100) NOT NULL
amount          INTEGER NOT NULL
description     TEXT NOT NULL
expense_date    DATE NOT NULL
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### settings
```sql
id              SERIAL PRIMARY KEY
key             VARCHAR(100) UNIQUE NOT NULL
value           TEXT NOT NULL
updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🎯 使用說明

### 瀏覽行程
1. 點擊頂部的 Day 按鈕切換不同天數
2. 點擊任何行程卡片查看詳細資訊
3. 在詳細頁面可以使用導航功能直接前往 Google Maps

### 編輯行程
1. 點擊行程卡片進入詳細頁面
2. 點擊「編輯」按鈕
3. 修改資訊後點擊「儲存」

### 新增行程
1. 在任何一天的行程頁面點擊「新增」按鈕
2. 填寫行程資訊
3. 點擊「儲存」

### 管理費用
1. 切換到「費用」分頁
2. 選擇付款人、輸入金額和項目
3. 點擊「記帳」按鈕
4. 查看公積金餘額和使用進度

## 🔧 開發指令

```bash
# 根目錄
npm run install:all    # 安裝所有依賴
npm run dev            # 啟動開發環境（前端+後端）
npm run build          # 建置前端
npm start              # 啟動生產環境

# 前端（client/）
npm run dev            # 啟動開發伺服器
npm run build          # 建置生產版本
npm run preview        # 預覽建置結果

# 後端（server/）
npm run dev            # 啟動開發伺服器（nodemon）
npm start              # 啟動生產伺服器
npm run seed           # 初始化資料庫資料
```

## 🐛 常見問題

### 1. 資料庫連接失敗
確認 `.env` 檔案中的 `DATABASE_URL` 設定正確，格式為：
```
postgresql://username:password@host:port/database
```

### 2. 前端無法連接後端
檢查 `client/.env` 中的 `VITE_API_URL` 設定，或確認 vite proxy 配置正確。

### 3. Railway 部署後資料庫為空
執行種子腳本初始化資料：
```bash
railway run npm run seed --workspace=server
```

### 4. 圖片無法顯示
確認圖片 URL 可以正常訪問，Unsplash 圖片需要網路連接。

## 📝 待辦事項
- [ ] 添加用戶認證系統
- [ ] 支援多個旅行計畫
- [ ] 匯出行程為 PDF
- [ ] 天氣資訊整合
- [ ] 即時協作功能
- [ ] 離線模式支援

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 👥 作者

建立於 2025 年，用於京阪奈冬季旅行規劃。

---

**祝你旅途愉快！🎌✈️🗾**
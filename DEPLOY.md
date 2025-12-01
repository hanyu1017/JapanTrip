# 🚀 Railway 部署完整指南

本指南將引導你一步步將 Japan Trip Planner 部署到 Railway 平台。

## 📋 前置準備

### 必要帳號
1. **GitHub 帳號** - 用於儲存程式碼
2. **Railway 帳號** - 前往 [railway.app](https://railway.app) 註冊（可用 GitHub 登入）

### 本地環境
- Git 已安裝
- Node.js 18+ 已安裝

## 🎯 部署步驟

### 步驟 1：推送代碼到 GitHub

```bash
# 1. 確認在專案根目錄
cd /path/to/JapanTrip

# 2. 初始化 git（如果還沒初始化）
git init

# 3. 添加所有檔案
git add .

# 4. 建立第一次提交
git commit -m "feat: initial commit - full-stack Japan trip planner"

# 5. 在 GitHub 上建立新的 repository
# 前往 https://github.com/new 建立一個名為 "JapanTrip" 的 repository

# 6. 添加遠端倉庫並推送
git remote add origin https://github.com/YOUR_USERNAME/JapanTrip.git
git branch -M main
git push -u origin main
```

### 步驟 2：在 Railway 建立專案

#### 2.1 連接 GitHub Repository
1. 登入 [Railway Dashboard](https://railway.app/dashboard)
2. 點擊 **"New Project"**
3. 選擇 **"Deploy from GitHub repo"**
4. 如果是第一次使用，會要求授權 GitHub
5. 選擇你的 **JapanTrip** repository

#### 2.2 添加 PostgreSQL 資料庫
1. 在專案頁面，點擊 **"New"**
2. 選擇 **"Database"**
3. 選擇 **"Add PostgreSQL"**
4. Railway 會自動創建並連接資料庫

### 步驟 3：配置環境變數

#### 3.1 自動配置的變數
Railway 會自動設定以下變數（無需手動設定）：
- `DATABASE_URL` - PostgreSQL 連接字串
- `PORT` - 應用程式端口

#### 3.2 需要手動設定的變數
在 Railway 專案設定中添加：

1. 點擊你的服務（通常叫 "JapanTrip"）
2. 切換到 **"Variables"** 標籤
3. 點擊 **"New Variable"** 並添加：

```
NODE_ENV=production
CLIENT_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

💡 `${{RAILWAY_PUBLIC_DOMAIN}}` 會自動替換為你的應用網址

### 步驟 4：等待自動部署

Railway 會自動：
1. ✅ 檢測到你的專案
2. ✅ 安裝依賴
3. ✅ 建置前端
4. ✅ 啟動後端伺服器

你可以在 **"Deployments"** 標籤查看部署日誌。

### 步驟 5：初始化資料庫

部署成功後，需要初始化資料庫：

#### 方法 A：使用 Railway Dashboard（推薦）

1. 點擊你的服務
2. 切換到 **"Settings"** 標籤
3. 找到 **"Service"** 區域
4. 點擊 **"Create New Deployment"**
5. 選擇 **"Run Command"**
6. 輸入：
```bash
cd server && npm run seed
```
7. 點擊 **"Deploy"**

#### 方法 B：使用 Railway CLI

```bash
# 安裝 Railway CLI
npm install -g @railway/cli

# 登入
railway login

# 連接到你的專案
railway link

# 執行種子腳本
railway run npm run seed --workspace=server
```

### 步驟 6：驗證部署

#### 6.1 獲取你的應用網址
1. 在 Railway Dashboard 的 **"Settings"** 標籤
2. 找到 **"Domains"** 區域
3. 複製公開網址（例如：`your-app.up.railway.app`）

#### 6.2 測試應用
訪問你的網址並測試以下功能：
- ✅ 首頁可以正常載入
- ✅ 可以看到 7 天的旅行行程
- ✅ 點擊任何行程卡片可以查看詳情
- ✅ 可以新增、編輯行程
- ✅ 費用記帳功能正常運作
- ✅ 圖片正常顯示

#### 6.3 檢查 API 健康狀態
訪問：`https://your-app.up.railway.app/api/health`

應該看到：
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🔧 進階配置

### 自訂域名

如果你有自己的域名：

1. 在 Railway 的 **"Settings" → "Domains"**
2. 點擊 **"Custom Domain"**
3. 輸入你的域名（例如：`trip.yourdomain.com`）
4. 在你的 DNS 提供商添加 CNAME 記錄：
   ```
   CNAME trip CNAME-VALUE-FROM-RAILWAY
   ```

### 自動部署設定

Railway 預設會在你推送到 GitHub 時自動部署。

要修改觸發條件：
1. 在專案設定中找到 **"Deploy Triggers"**
2. 可以指定特定分支（如 `production`）
3. 或設定為手動部署

### 環境變數管理

為不同環境設定不同的變數：

**開發環境** (`.env.local`)：
```bash
DATABASE_URL=postgresql://localhost/japantrip_dev
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**生產環境** (Railway Variables)：
```bash
NODE_ENV=production
CLIENT_URL=${{RAILWAY_PUBLIC_DOMAIN}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

## 🐛 故障排除

### 問題 1：部署失敗 - "Build failed"

**可能原因**：依賴安裝失敗

**解決方法**：
1. 檢查 `package.json` 中的依賴版本
2. 確認 Node.js 版本兼容（Railway 使用 Node 20）
3. 查看部署日誌中的具體錯誤信息

### 問題 2：應用啟動失敗 - "Application failed to respond"

**可能原因**：
- 資料庫連接失敗
- 環境變數設定錯誤

**解決方法**：
```bash
# 檢查資料庫連接
railway run psql $DATABASE_URL

# 檢查環境變數
railway variables
```

### 問題 3：前端顯示空白 - 無資料

**可能原因**：資料庫未初始化

**解決方法**：
```bash
# 執行種子腳本
railway run cd server && npm run seed
```

### 問題 4：CORS 錯誤

**可能原因**：`CLIENT_URL` 設定不正確

**解決方法**：
在 Railway Variables 中確認：
```
CLIENT_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

或直接設定為你的網址：
```
CLIENT_URL=https://your-app.up.railway.app
```

### 問題 5：圖片無法載入

**可能原因**：
- Unsplash API 被封鎖
- 網路連接問題

**解決方法**：
圖片使用的是 Unsplash 的公開 CDN，通常不需要 API key。
如果持續失敗，可以：
1. 檢查瀏覽器控制台的錯誤訊息
2. 確認網路可以訪問 `images.unsplash.com`

## 📊 監控和日誌

### 查看實時日誌
```bash
# 使用 Railway CLI
railway logs

# 或在 Dashboard 的 "Deployments" 標籤查看
```

### 監控資源使用
在 Railway Dashboard 可以查看：
- CPU 使用率
- 記憶體使用量
- 網路流量
- 資料庫大小

### 設定警報
Railway Pro 計畫支援：
- 資源使用警報
- 部署失敗通知
- 健康檢查失敗警報

## 💰 成本估算

Railway 採用用量計費模式：

**Hobby Plan**（免費開發）：
- $5 免費額度 / 月
- 適合個人專案和測試

**Pro Plan**（$20/月）：
- $20 額度（超出付費）
- 適合生產環境
- 更多資源和功能

**預估成本**（此專案）：
- 小型應用 + PostgreSQL：約 $3-5/月
- 中等流量：約 $8-12/月

## 🔄 更新部署

每次更新代碼後：

```bash
# 1. 提交更改
git add .
git commit -m "feat: add new feature"

# 2. 推送到 GitHub
git push origin main

# 3. Railway 會自動檢測並部署
```

## 🎓 下一步

部署完成後，你可以：

1. ⭐ 添加用戶認證（Firebase Auth, Auth0）
2. 📧 設定電子郵件通知
3. 📱 創建 PWA 版本
4. 🌍 添加多語言支援
5. 📈 整合分析工具（Google Analytics）

## 📚 相關資源

- [Railway 官方文檔](https://docs.railway.app)
- [Node.js on Railway](https://docs.railway.app/guides/nodejs)
- [PostgreSQL on Railway](https://docs.railway.app/databases/postgresql)
- [Railway CLI 文檔](https://docs.railway.app/develop/cli)

---

**部署遇到問題？** 歡迎在 GitHub Issues 中提問！

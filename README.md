# 🧙‍♂️ Insightful

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-blue.svg" alt="React Version">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/AI-Powered-purple.svg" alt="AI Powered">
  <img src="https://img.shields.io/badge/xAI-Grok--3-orange.svg" alt="xAI Grok">
</p>

<p align="center">
  <strong>🌟 Where Information Becomes Understanding 🌟</strong>
</p>

<p align="center">
  <a href="#english">English</a> | <a href="#繁體中文">繁體中文</a>
</p>

---

## English

### 📖 About Insightful

**Insightful** is an AI-powered personalized news and information platform that transforms the overwhelming flow of daily information into meaningful, actionable insights tailored to your specific interests and needs.

Using advanced AI technology through xAI's Grok API, Insightful acts as your personal information wizard, automatically curating, analyzing, and delivering the content that matters most to you.

### ✨ Key Features

- 🧙‍♂️ **AI-Powered Intelligence**: Leverages xAI's Grok-3 for advanced natural language understanding
- 🎯 **Personalized Curation**: Customizable search queries and content preferences
- 📊 **Smart Analytics**: Comprehensive performance metrics and usage tracking
- 🌐 **Multi-Source Integration**: Aggregates from web, news, social media (X), and RSS feeds
- ⚡ **Automated Delivery**: Set-and-forget personalized content experience
- 🔧 **Flexible Configuration**: Granular control over search parameters and sources
- 💾 **Persistent Settings**: Your preferences saved locally for seamless experience
- 🎨 **Beautiful Interface**: Modern, responsive design with intuitive navigation
- 🔄 **Real-time Updates**: Instant refresh capabilities with live status monitoring

### 🚀 Quick Start

#### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser with JavaScript enabled
- xAI API key ([Get one here](https://x.ai/))

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eepson123tw/insightful.git
   cd insightful
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### ⚙️ Configuration

#### API Setup

1. **Get your xAI API Key**
   - Visit [xAI Console](https://console.x.ai/)
   - Create an account and generate an API key
   - Copy your key (format: `xai-...`)

2. **Configure in Insightful**
   - Navigate to Settings page (⚙️ icon)
   - Enter your API key in the "API Settings" section
   - Click "Test Search" to verify connectivity

#### Search Customization

**Custom Search Queries**: Define your own search prompts
```
Example: "Show me the latest developments in sustainable technology and green energy innovations"
```

**Search Sources**: Choose from multiple content sources
- 🌐 Web Search
- 📰 News Articles  
- 🐦 Social Media (X/Twitter)
- 📡 RSS Feeds

**Geographic & Language Settings**
- Country targeting (ISO codes: US, TW, JP, etc.)
- Language preferences
- Date range filtering (1-30 days)

#### Advanced Options

- **Safe Search**: Content filtering controls
- **Excluded Websites**: Block specific domains
- **Social Media Handles**: Target specific X/Twitter accounts
- **RSS Feed URLs**: Custom RSS source integration

### 🎮 Usage

#### First-Time Setup
1. **Configure Settings**: Visit the Settings page to set up your API key and preferences
2. **Customize Queries**: Define what topics and information you're interested in
3. **Choose Sources**: Select which types of content sources to include
4. **Save Configuration**: Your settings are automatically saved locally

#### Daily Usage
1. **Automatic Loading**: Visit the main page and Insightful automatically fetches your personalized content
2. **Browse Insights**: Read AI-curated summaries and analysis
3. **Explore Sources**: Click through to original articles and references
4. **Refresh Content**: Use the refresh button for the latest updates

#### Features Overview

**Main Dashboard**
- Personalized news feed based on your interests
- Performance metrics (response time, token usage, etc.)
- Source attribution and citation tracking
- Expandable content with full/summary views

**Settings Panel**
- API key management with connection testing
- Search query templates and customization
- Multi-source configuration options
- Notification and timing preferences

### 🔧 Development

#### Project Structure
```
insightful/
├── src/
│   ├── components/          # React components
│   ├── services/           # API and utility services
│   ├── pages/              # Main application pages
│   └── styles/             # CSS and styling
├── public/                 # Static assets
├── LICENSE                 # MIT License
└── README.md              # This file
```

#### Built With
- **Frontend**: React 18+, Modern JavaScript (ES6+)
- **Styling**: Tailwind CSS, Lucide Icons
- **AI Integration**: xAI Grok API
- **Storage**: Browser localStorage
- **Build Tool**: Create React App

#### API Integration
The application uses xAI's Grok API for intelligent content curation:
- **Endpoint**: `https://api.x.ai/v1/chat/completions`
- **Model**: `grok-3-latest`
- **Features**: Live search, citations, multi-source aggregation

### 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

#### Ways to Contribute
- 🐛 **Bug Reports**: Found an issue? Let us know!
- ✨ **Feature Requests**: Have ideas for improvements?
- 📚 **Documentation**: Help improve our guides and examples
- 🎨 **UI/UX**: Design enhancements and user experience improvements
- 🔧 **Code**: Bug fixes, optimizations, and new features

#### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- **xAI Team**: For providing the powerful Grok API
- **React Community**: For the excellent framework and ecosystem
- **Open Source Contributors**: For the libraries and tools that make this possible

### 📞 Support

- **Issues**: [GitHub Issues](https://github.com/eepson123tw/insightful/issues)
- **Discussions**: [GitHub Discussions](https://github.com/eepson123tw/insightful/discussions)
- **Email**: [ninocar215@example.com](mailto:ninocar215@example.com)

---

## 繁體中文

### 📖 關於 Insightful

**Insightful** 是一個基於 AI 的個人化新聞與資訊平台，能夠將每日資訊洪流轉化為有意義、可行動的洞察內容，完全根據您的特定興趣和需求量身定制。

透過 xAI 的 Grok API 先進 AI 技術，Insightful 如同您的個人資訊魔法師，自動策展、分析並提供對您最重要的內容。

### ✨ 主要功能

- 🧙‍♂️ **AI 驅動智慧**: 運用 xAI 的 Grok-3 進行先進自然語言理解
- 🎯 **個人化策展**: 可自訂搜尋查詢和內容偏好
- 📊 **智慧分析**: 完整的效能指標和使用追蹤
- 🌐 **多來源整合**: 匯集網頁、新聞、社群媒體 (X) 和 RSS 訂閱源
- ⚡ **自動化傳遞**: 設定後即可享受個人化內容體驗
- 🔧 **彈性配置**: 精細控制搜尋參數和來源設定
- 💾 **持久化設定**: 本地儲存偏好設定，無縫使用體驗
- 🎨 **美觀介面**: 現代化響應式設計與直覺導航
- 🔄 **即時更新**: 即時刷新功能與即時狀態監控

### 🚀 快速開始

#### 系統需求

- Node.js 16+ 和 npm/yarn
- 支援 JavaScript 的現代瀏覽器
- xAI API 金鑰 ([點此取得](https://x.ai/))

#### 安裝步驟

1. **複製儲存庫**
   ```bash
   git clone https://github.com/eepson123tw/insightful.git
   cd insightful
   ```

2. **安裝相依套件**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **啟動開發伺服器**
   ```bash
   npm start
   # 或
   yarn start
   ```

4. **開啟瀏覽器**
   ```
   http://localhost:3000
   ```

### ⚙️ 設定配置

#### API 設定

1. **取得 xAI API 金鑰**
   - 造訪 [xAI Console](https://console.x.ai/)
   - 建立帳戶並產生 API 金鑰
   - 複製您的金鑰 (格式: `xai-...`)

2. **在 Insightful 中配置**
   - 導航至設定頁面 (⚙️ 圖示)
   - 在「API 設定」部分輸入您的 API 金鑰
   - 點擊「測試搜尋」驗證連線

#### 搜尋自訂

**自訂搜尋查詢**: 定義您自己的搜尋提示
```
範例: "為我顯示可持續技術和綠色能源創新的最新發展"
```

**搜尋來源**: 從多種內容來源中選擇
- 🌐 網頁搜尋
- 📰 新聞文章
- 🐦 社群媒體 (X/Twitter)
- 📡 RSS 訂閱源

**地理與語言設定**
- 國家定向 (ISO 代碼: US, TW, JP 等)
- 語言偏好設定
- 日期範圍篩選 (1-30 天)

#### 進階選項

- **安全搜尋**: 內容過濾控制
- **排除網站**: 封鎖特定網域
- **社群媒體帳號**: 針對特定 X/Twitter 帳戶
- **RSS 訂閱源 URL**: 自訂 RSS 來源整合

### 🎮 使用方式

#### 首次設定
1. **配置設定**: 造訪設定頁面以設定您的 API 金鑰和偏好
2. **自訂查詢**: 定義您感興趣的主題和資訊
3. **選擇來源**: 選取要包含的內容來源類型
4. **儲存配置**: 您的設定會自動在本地儲存

#### 日常使用
1. **自動載入**: 造訪主頁面，Insightful 自動擷取您的個人化內容
2. **瀏覽洞察**: 閱讀 AI 策展的摘要和分析
3. **探索來源**: 點擊查看原始文章和參考資料
4. **刷新內容**: 使用刷新按鈕取得最新更新

#### 功能概覽

**主要儀表板**
- 基於您興趣的個人化新聞源
- 效能指標 (回應時間、Token 使用量等)
- 來源歸屬和引用追蹤
- 可展開內容與完整/摘要檢視

**設定面板**
- API 金鑰管理與連線測試
- 搜尋查詢範本和自訂
- 多來源配置選項
- 通知和時間偏好設定

### 🔧 開發資訊

#### 專案結構
```
insightful/
├── src/
│   ├── components/          # React 元件
│   ├── services/           # API 和工具服務
│   ├── pages/              # 主要應用程式頁面
│   └── styles/             # CSS 和樣式
├── public/                 # 靜態資源
├── LICENSE                 # MIT 授權
└── README.md              # 此檔案
```

#### 技術棧
- **前端**: React 18+, 現代 JavaScript (ES6+)
- **樣式**: Tailwind CSS, Lucide Icons
- **AI 整合**: xAI Grok API
- **儲存**: 瀏覽器 localStorage
- **建置工具**: Create React App

#### API 整合
應用程式使用 xAI 的 Grok API 進行智慧內容策展:
- **端點**: `https://api.x.ai/v1/chat/completions`
- **模型**: `grok-3-latest`
- **功能**: 即時搜尋、引用、多來源匯集

### 🤝 貢獻

我們歡迎社群的貢獻！以下是您可以協助的方式:

#### 貢獻方式
- 🐛 **錯誤報告**: 發現問題？讓我們知道！
- ✨ **功能請求**: 有改進的想法嗎？
- 📚 **文件**: 協助改善我們的指南和範例
- 🎨 **UI/UX**: 設計增強和使用者體驗改善
- 🔧 **程式碼**: 錯誤修復、最佳化和新功能

#### 開發流程
1. Fork 此儲存庫
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 進行您的更改
4. 徹底測試
5. 提交您的更改 (`git commit -m 'Add amazing feature'`)
6. 推送到您的分支 (`git push origin feature/amazing-feature`)
7. 開啟 Pull Request

### 📄 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案。

### 🙏 致謝

- **xAI 團隊**: 提供強大的 Grok API
- **React 社群**: 優秀的框架和生態系統
- **開源貢獻者**: 讓此專案成為可能的函式庫和工具

### 📞 支援

- **問題回報**: [GitHub Issues](https://github.com/eepson123tw/insightful/issues)
- **討論**: [GitHub Discussions](https://github.com/eepson123tw/insightful/discussions)
- **電子郵件**: [ninocar215@example.com](mailto:ninocar215@example.com)

---

<p align="center">
  <strong>🌟 用 ❤️ 和 ☕ 製作</strong>
</p>

<p align="center">
  <sub>Insightful - Where Information Becomes Understanding | 讓資訊化為理解</sub>
</p>

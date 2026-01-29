import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// 1. Import các Provider cần thiết
import { AppProvider } from './context/AppContext'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Bọc App trong HelmetProvider để hỗ trợ SEO */}
    <HelmetProvider>
      {/* 3. Bọc tiếp trong AppProvider để quản lý dữ liệu toàn cục */}
      <AppProvider>
        <App />
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
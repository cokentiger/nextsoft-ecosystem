# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
📂 Cấu trúc Dự án: nextsoft-ecosystem
Tổng quan về các thư mục và tập tin quan trọng trong dự án React + Vite + TypeScript.

1. Cấu hình & Môi trường (Root)
Các file nằm ngay thư mục gốc, dùng để thiết lập môi trường phát triển.

📄 .env: Chứa biến môi trường (API Key, Supabase URL).

📄 tailwind.config.js: Cấu hình màu sắc thương hiệu (corporate, product) và font chữ.

📄 postcss.config.js: Plugin hỗ trợ Tailwind CSS.

📄 package.json: Quản lý thư viện (React, Lucide, Router...) và các lệnh chạy (dev, build).

📄 vite.config.ts: Cấu hình Bundler Vite.

📄 tsconfig.json: Cấu hình TypeScript.

📄 index.html: File HTML chính chứa thẻ root.

2. Mã Nguồn (src/)
Nơi chứa toàn bộ logic và giao diện của ứng dụng.

🧱 Cốt lõi (Core)
📄 main.tsx: Điểm khởi chạy ứng dụng, bao bọc AppProvider.

📄 App.tsx: Quản lý định tuyến (Routing) giữa các trang.

📄 index.css: Import Tailwind CSS (@tailwind base, etc.).

📄 supabaseClient.ts: Khởi tạo kết nối đến Supabase.

📄 vite-env.d.ts: Định nghĩa kiểu cho Vite.

🧠 Quản lý Dữ liệu (src/context/ & src/types/)
📂 context/

📄 AppContext.tsx: "Bộ não" quản lý trạng thái toàn cục (Leads, Articles) và hàm xử lý logic (addLead).

📂 types/

📄 index.ts: Định nghĩa các Interface TypeScript dùng chung (Lead, Article, LeadSource...).

🎨 Giao diện (src/pages/)
📂 corporate/ (Web Công ty mẹ)

📄 CorporateHome.tsx: Trang chủ Nextsoft (Tone Vàng - Đỏ - Đen), chứa Landing page, Form liên hệ, Tin tức.

📂 products/ (Web Sản phẩm)

📄 IdentalHome.tsx: Landing page cho sản phẩm Nha khoa (Tone Xanh Teal).

📂 admin/ (Đã quy hoạch folder, chưa có file).

📝 Ghi chú nhanh cho AI (Context Loading)
Khi bạn bắt đầu phiên làm việc mới, cấu trúc này giúp AI hiểu ngay:

Style: Tailwind CSS (Custom Theme).

Routing: React Router DOM.

State: Context API (Custom Hook useAppContext).

Backend: Supabase (Client-side).
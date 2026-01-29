/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme Công ty mẹ (Nextsoft): Vàng - Đỏ - Đen
        corporate: {
          50: '#fffbeb',  // Nền rất nhạt
          100: '#fef3c7', // Nền nhạt
          200: '#fde68a', // Viền nhạt
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#eab308', // Vàng chủ đạo (Primary)
          600: '#ca8a04', // Vàng đậm (Hover)
          700: '#a16207',
          800: '#854d0e',
          900: '#1f2937', // Đen xám (Text chính / Footer)
          950: '#030712', // Đen tuyền (Footer đậm)
          accent: '#dc2626', // Đỏ (Nút CTA phụ)
        },
        // Theme Sản phẩm (iDental): Xanh Teal
        product: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          900: '#134e4a',
        }
      },
      // 👇 CẤU HÌNH FONT CHUẨN (Thêm fallback để không bao giờ bị lỗi font có chân)
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(234, 179, 8, 0.5)', // Hiệu ứng phát sáng
      }
    },
  },
  // 👇 QUAN TRỌNG: Phải kích hoạt plugin này thì nội dung Blog mới đẹp được
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
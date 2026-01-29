import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu cứng (Tạm thời dùng cái này cho nhanh, sau này thích thì đổi sang lấy từ DB sau)
  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products/idental' },
    { name: 'Khách hàng', href: '/customers' },      // 👈 Link mới
    { name: 'Tài nguyên', href: '/resources' },      // 👈 Link mới
    { name: 'Blog', href: '/blog' },
    { name: 'Về chúng tôi', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100 h-16 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link to="/" className="font-black text-2xl tracking-tighter text-slate-900 flex items-center select-none hover:opacity-80 transition">
           NEXTSOFT<span className="text-corporate-600 text-3xl leading-none">.</span>
        </Link>

        {/* 2. DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 lg:gap-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className={`text-sm font-bold transition-colors duration-200 relative group
                  ${isActive(item.href) ? 'text-corporate-600' : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                {item.name}
                {/* Hiệu ứng gạch chân khi hover */}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-corporate-600 transition-all group-hover:w-full ${isActive(item.href) ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </nav>

          <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg shadow-slate-900/20">
            Đăng nhập
          </button>
        </div>

        {/* 3. MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-slate-900 p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
           {isMobileMenuOpen ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
           )}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-fade-in-down">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-bold py-2 ${isActive(item.href) ? 'text-corporate-600' : 'text-slate-600'}`}
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-corporate-600 text-white py-3 rounded-lg font-bold w-full mt-2">
            Đăng nhập hệ thống
          </button>
        </div>
      )}
    </header>
  );
};
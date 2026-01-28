import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface NavItem {
  label: string;
  href: string;
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenuItems] = useState<NavItem[]>([]);

  // Lấy Menu từ Database ngay khi mở web
  useEffect(() => {
    const fetchNav = async () => {
      const { data } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('scope', 'primary_menu') // Chỉ lấy menu chính
        .eq('is_visible', true)
        .order('order_index');
      
      if (data) setMenuItems(data);
    };
    fetchNav();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* --- HEADER (CỐ ĐỊNH) --- */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="font-black text-xl text-corporate-900">NEXTSOFT</div>

          {/* Menu Động lấy từ DB */}
          <nav className="hidden md:flex gap-8">
            {menuItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                className="text-sm font-medium text-slate-600 hover:text-corporate-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Nút Login giả lập */}
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold">
            Đăng nhập
          </button>
        </div>
      </header>

      {/* --- PHẦN THÂN TRANG (THAY ĐỔI THEO TỪNG TRANG) --- */}
      <main className="flex-grow pt-16"> 
        {children}
      </main>

      {/* --- FOOTER (CỐ ĐỊNH) --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          © 2026 Nextsoft Corporation. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
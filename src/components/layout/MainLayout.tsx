import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Footer } from './Footer';

interface NavItem {
  label: string;
  href: string;
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenuItems] = useState<NavItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const { data } = await supabase
          .from('navigation_items')
          .select('*')
          .eq('scope', 'primary_menu')
          .eq('is_visible', true)
          .order('order_index');
        if (data) setMenuItems(data);
      } catch (err) { console.error(err); }
    };
    fetchNav();
  }, []);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* HEADER: Dùng sticky để luôn bám trên cùng */}
      <header className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* 1. LOGO */}
          <a href="/" className="font-black text-2xl tracking-tighter text-slate-900 flex items-center select-none">
             NEXTSOFT<span className="text-corporate-600 text-3xl leading-none">.</span>
          </a>

          {/* 2. MENU & LOGIN (Gom nhóm sang phải) */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8">
              {menuItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  className={`text-sm font-bold transition-colors duration-200
                    ${isActive(item.href) ? 'text-corporate-600' : 'text-slate-500 hover:text-slate-900'}
                  `}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-transform active:scale-95">
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow"> 
        {children}
      </main>

      <Footer />
    </div>
  );
};
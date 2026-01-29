import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Facebook, Linkedin, Youtube, MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavItem {
  id: string;
  scope: string;
  label: string;
  href: string;
}

export const Footer = () => {
  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase
        .from('navigation_items')
        .select('*')
        .like('scope', 'footer_%')
        .eq('is_visible', true)
        .order('order_index');
      
      if (data) setItems(data);
    };
    fetchFooter();
  }, []);

  const getLinks = (scope: string) => items.filter(i => i.scope === scope);

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-20 pb-10 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="lg:flex lg:justify-between gap-12 mb-16">
          
          {/* 1. BRANDING & CONTACT (Nằm bên trái - Chiếm 35%) */}
          <div className="lg:w-[35%] mb-12 lg:mb-0">
            <Link to="/" className="inline-block font-black text-3xl tracking-tighter text-white mb-6">
               NEXTSOFT<span className="text-corporate-500">.</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm text-base">
              Đối tác công nghệ tin cậy, cung cấp nền tảng chuyển đổi số toàn diện cho hơn 1000+ doanh nghiệp Việt Nam.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-corporate-600 transition-colors">
                   <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Trụ sở chính</div>
                  <span className="text-white font-medium">Tòa nhà Nextsoft, 48/23 Nguyễn Trãi, P. Ninh Kiều, TP. Cần Thơ</span>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-corporate-600 transition-colors">
                   <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Hotline tư vấn</div>
                  <span className="text-white font-medium">(+84) 939 616 507</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. NAVIGATION LINKS (Nằm bên phải - Canh phải layout) */}
          <div className="lg:w-[60%] grid grid-cols-2 md:grid-cols-3 gap-8 lg:justify-items-end">
            
            {/* Cột: Về Nextsoft */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
                Về Nextsoft
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-corporate-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {getLinks('footer_company').map(item => (
                  <li key={item.id}>
                    <a href={item.href} className="flex items-center hover:text-white transition-colors group">
                      <ArrowRight className="w-3 h-3 mr-2 text-corporate-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột: Sản phẩm */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
                Giải pháp
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-corporate-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {getLinks('footer_products').map(item => (
                  <li key={item.id}>
                    <a href={item.href} className="flex items-center hover:text-white transition-colors group">
                       <ArrowRight className="w-3 h-3 mr-2 text-corporate-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                       {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột: Hỗ trợ & Social */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
                Kết nối
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-corporate-500 rounded-full"></span>
              </h4>
              <div className="flex gap-3 mb-8">
                {getLinks('footer_social').map(item => {
                  let Icon = Globe;
                  if (item.label.includes('Facebook')) Icon = Facebook;
                  if (item.label.includes('LinkedIn')) Icon = Linkedin;
                  if (item.label.includes('Youtube')) Icon = Youtube;
                  
                  return (
                    <a 
                      key={item.id} 
                      href={item.href}
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-corporate-600 hover:text-white transition-all transform hover:-translate-y-1"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
              
              <h4 className="text-white font-bold text-sm mb-4">Hỗ trợ khách hàng</h4>
              <ul className="space-y-3 text-sm">
                {getLinks('footer_support').map(item => (
                  <li key={item.id}>
                    <a href={item.href} className="hover:text-corporate-400 hover:underline decoration-corporate-500/30 underline-offset-4 transition-all">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© 2026 Nextsoft Corporation. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
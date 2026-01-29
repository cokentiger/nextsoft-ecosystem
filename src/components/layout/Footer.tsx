import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Đảm bảo đường dẫn import đúng với project của bạn
import { Facebook, Linkedin, Youtube, MapPin, Phone, Mail, Globe } from 'lucide-react';

interface NavItem {
  id: string;
  scope: string;
  label: string;
  href: string;
  type: string;
}

export const Footer = () => {
  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase
        .from('navigation_items')
        .select('*')
        .like('scope', 'footer_%') // Lấy tất cả cái gì bắt đầu bằng footer_
        .eq('is_visible', true)
        .order('order_index');
      
      if (data) setItems(data);
    };
    fetchFooter();
  }, []);

  // Hàm lọc helper
  const getLinks = (scope: string) => items.filter(i => i.scope === scope);

  // Hàm render icon MXH
  const renderSocialIcon = (label: string) => {
    const className = "w-5 h-5 hover:text-white transition-colors";
    if (label.includes('Facebook')) return <Facebook className={className} />;
    if (label.includes('LinkedIn')) return <Linkedin className={className} />;
    if (label.includes('Youtube')) return <Youtube className={className} />;
    return <Globe className={className} />;
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* CỘT 1: THÔNG TIN CÔNG TY (TĨNH) */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-black tracking-tight">NEXTSOFT</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              Tiên phong kiến tạo giải pháp phần mềm chiến lược, nâng tầm vị thế doanh nghiệp Việt trong kỷ nguyên số.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-corporate-500 shrink-0" />
                <span>Tòa nhà TechHub, Q. Cầu Giấy, Hà Nội</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-corporate-500 shrink-0" />
                <span>(+84) 987 654 321</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-corporate-500 shrink-0" />
                <span>contact@nextsoft.vn</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: VỀ CHÚNG TÔI (ĐỘNG) */}
          <div>
            <h4 className="text-white font-bold mb-6">Về Nextsoft</h4>
            <ul className="space-y-3 text-sm">
              {getLinks('footer_company').map(item => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-corporate-400 hover:translate-x-1 transition-all inline-block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: SẢN PHẨM (ĐỘNG) */}
          <div>
            <h4 className="text-white font-bold mb-6">Sản phẩm</h4>
            <ul className="space-y-3 text-sm">
              {getLinks('footer_products').map(item => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-corporate-400 hover:translate-x-1 transition-all inline-block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 4: MẠNG XÃ HỘI & HỖ TRỢ (ĐỘNG) */}
          <div>
            <h4 className="text-white font-bold mb-6">Kết nối</h4>
            <div className="flex gap-4 mb-8">
              {getLinks('footer_social').map(item => (
                <a 
                  key={item.id} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-corporate-600 transition-colors"
                >
                  {renderSocialIcon(item.label)}
                </a>
              ))}
            </div>
            
            <h4 className="text-white font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm">
              {getLinks('footer_support').map(item => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-corporate-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© 2026 Nextsoft Corporation. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
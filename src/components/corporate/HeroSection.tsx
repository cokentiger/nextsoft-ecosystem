import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroSection = () => {
  return (
    // GIẢM PADDING: pt-32 -> pt-24, pb-20 -> pb-12
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-white">
      {/* Nền Grid mờ nhẹ nhàng hơn */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* CỘT TRÁI: NỘI DUNG (Chiếm 7 phần) */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-50 border border-corporate-100 text-corporate-800 text-xs font-bold tracking-wide uppercase">
               <span className="w-2 h-2 rounded-full bg-corporate-500 animate-pulse"></span>
               Giải pháp Chuyển đổi số 2026
            </div>

            {/* Font size giảm từ 7xl xuống 5xl/6xl để cân đối */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Nền tảng quản trị <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-600 to-corporate-900">
                Toàn diện cho Doanh nghiệp
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Tối ưu vận hành với hệ sinh thái 9+ phần mềm chuyên biệt: Từ Nha khoa, HRM đến CRM. Hơn 1000+ doanh nghiệp đã tin dùng.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/products/idental" className="flex items-center gap-2 bg-corporate-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-corporate-700 transition shadow-lg shadow-corporate-600/20">
                Dùng thử miễn phí <ArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-2 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition border border-transparent hover:border-slate-200">
                Xem Demo 1:1
              </button>
            </div>
             
             {/* Trust Badges nhỏ gọn bên dưới */}
             <div className="pt-6 border-t border-slate-100 flex items-center gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Triển khai 24h</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Hỗ trợ 24/7</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Bảo mật ISO</span>
             </div>
          </div>

          {/* CỘT PHẢI: ẢNH MINH HỌA (Chiếm 5 phần - Gọn hơn) */}
          <div className="lg:col-span-5 relative hidden lg:block">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50">
                {/* Ảnh Dashboard tỉ lệ 4:3 gọn gàng */}
                <div className="aspect-[4/3] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                      alt="Nextsoft Dashboard" 
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient nhẹ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
             </div>
             {/* Decorative blob nhỏ hơn */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-corporate-100/50 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
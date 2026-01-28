import React from 'react';
import { Calendar, Activity, TrendingUp, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const IdentalHome = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-product-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Nút quay lại trang chủ Nextsoft */}
            <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition">
                <ArrowLeft size={20}/>
            </Link>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-product-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">i</div>
                <span className="text-xl font-bold text-slate-800">Nextsoft <span className="text-product-600">iDental</span></span>
            </div>
          </div>
          <button className="bg-product-600 hover:bg-product-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg transition">
            Dùng thử miễn phí
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-16 pb-24 bg-gradient-to-br from-product-50 to-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold mb-4">#1 PHẦN MỀM NHA KHOA</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Quản lý Phòng khám <br/>
              <span className="text-product-600">Thông minh & Tự động</span>
            </h1>
            <div className="flex gap-4">
              <button className="bg-product-600 text-white font-bold px-8 py-3.5 rounded-lg shadow-xl hover:bg-product-700 transition">Đăng ký ngay</button>
            </div>
          </div>
          
          {/* Mockup */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition duration-500">
             <div className="bg-slate-50 h-64 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                <div className="text-center text-slate-400">
                    <Activity size={48} className="mx-auto mb-2 text-product-300"/>
                    <span>Giao diện Dashboard</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
           <FeatureCard icon={<Calendar/>} title="Lịch hẹn thông minh" desc="Sắp xếp lịch khám khoa học, tự động nhắc lịch." />
           <FeatureCard icon={<Activity/>} title="Bệnh án điện tử" desc="Lưu trữ hình ảnh, phác đồ điều trị chi tiết." />
           <FeatureCard icon={<TrendingUp/>} title="Báo cáo Real-time" desc="Nắm bắt doanh thu mọi lúc mọi nơi." />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition border border-transparent hover:border-product-100 cursor-pointer group">
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-product-600 mb-6 group-hover:bg-product-500 group-hover:text-white transition">
          {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
  </div>
);

// --- DÒNG QUAN TRỌNG NHẤT Ở ĐÂY ---
export default IdentalHome;
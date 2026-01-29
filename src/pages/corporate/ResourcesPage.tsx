import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { MainLayout } from '../../components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';
import { Download, FileText, FileSpreadsheet, FileArchive, Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  file_type: string;
  download_count: number;
  file_url: string;
}

const ResourcesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      // Lấy dữ liệu từ bảng resources
      const { data } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setResources(data);
      setLoading(false);
    };
    fetchResources();
  }, []);

  // Hàm chọn icon dựa theo loại file
  const getIcon = (type: string) => {
    const t = type ? type.toUpperCase() : 'FILE';
    if (t === 'EXCEL' || t === 'XLSX') return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
    if (t === 'ZIP' || t === 'RAR') return <FileArchive className="w-8 h-8 text-yellow-600" />;
    return <FileText className="w-8 h-8 text-blue-600" />; // Mặc định là PDF/Doc
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Thư viện Tài nguyên | Nextsoft Knowledge Hub</title>
        <meta name="description" content="Tải miễn phí Ebook, Biểu mẫu và Công cụ quản trị doanh nghiệp từ chuyên gia Nextsoft." />
      </Helmet>

      {/* HERO HEADER */}
      <div className="bg-slate-900 py-16 border-b border-slate-800 text-center relative overflow-hidden">
         {/* Họa tiết trang trí */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900 opacity-50"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-900/50 border border-corporate-500/30 text-corporate-400 text-xs font-bold uppercase tracking-wider mb-4">
              🎁 Quà tặng doanh nghiệp
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Nextsoft <span className="text-corporate-500">Knowledge Hub</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Kho tri thức quản trị & chuyển đổi số miễn phí. Tải ngay Ebook, Biểu mẫu Excel và Công cụ tính toán.
            </p>
         </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-12">
         
         {loading ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-corporate-600"></div>
            </div>
         ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {resources.map((res) => (
                  <div key={res.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-corporate-400 transition-all group flex flex-col">
                     <div className="flex items-start justify-between mb-4">
                        <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all">
                           {getIcon(res.file_type)}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase tracking-wider border border-slate-200">
                           {res.file_type || 'PDF'}
                        </span>
                     </div>
                     
                     <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-corporate-600 transition-colors line-clamp-2">
                        {res.title}
                     </h3>
                     <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                        {res.description}
                     </p>

                     <div className="mt-auto">
                        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-corporate-600 transition-all shadow-lg shadow-slate-200 hover:shadow-corporate-200 transform active:scale-95">
                           <Download className="w-4 h-4" /> Tải xuống ngay
                        </button>
                        <div className="mt-3 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                           🔥 Đã có <span className="text-slate-700 font-bold">{res.download_count.toLocaleString()}</span> lượt tải
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {/* Empty State */}
         {resources.length === 0 && !loading && (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
               <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
               <p className="text-slate-500 font-medium">Hiện chưa có tài liệu nào.</p>
            </div>
         )}

      </div>
    </MainLayout>
  );
};

export default ResourcesPage;
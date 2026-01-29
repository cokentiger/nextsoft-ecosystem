import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  file_type: string;
  download_count: number;
}

export const ResourceHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const { data } = await supabase.from('resources').select('*').limit(3);
      if (data) setResources(data);
    };
    fetchResources();
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
           {/* Cột trái: Giới thiệu */}
           <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Tài nguyên <span className="text-corporate-500">Miễn phí</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Tải xuống các Ebook, Biểu mẫu và Công cụ tính toán được biên soạn bởi đội ngũ chuyên gia Nextsoft. Giúp bạn quản trị doanh nghiệp hiệu quả hơn ngay hôm nay.
              </p>
              <button className="bg-corporate-600 text-white px-8 py-3 rounded-full font-bold hover:bg-corporate-700 transition">
                Xem kho tài liệu
              </button>
           </div>

           {/* Cột phải: Danh sách tài liệu */}
           <div className="space-y-4">
              {resources.map((res) => (
                <div key={res.id} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 hover:border-corporate-500/50 transition-all group cursor-pointer flex items-center gap-4">
                   <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-corporate-400 group-hover:bg-corporate-600 group-hover:text-white transition-colors shrink-0">
                      {res.file_type === 'EXCEL' ? <FileSpreadsheet /> : <FileText />}
                   </div>
                   <div className="flex-grow">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-corporate-400 transition-colors">{res.title}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-3">
                         <span className="bg-white/10 px-2 py-0.5 rounded uppercase">{res.file_type}</span>
                         <span>{res.download_count.toLocaleString()} lượt tải</span>
                      </div>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                      <Download className="w-5 h-5" />
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};
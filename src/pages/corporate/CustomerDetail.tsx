import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { MainLayout } from '../../components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';

export const CustomerDetail = () => {
  const { slug } = useParams();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from('customers')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (data) setCustomer(data);
      setLoading(false);
    };
    fetchCustomer();
  }, [slug]);

  if (loading) return <MainLayout><div className="py-20 text-center">Đang tải...</div></MainLayout>;
  if (!customer) return <MainLayout><div className="py-20 text-center">Không tìm thấy khách hàng.</div></MainLayout>;

  return (
    <MainLayout>
      <Helmet>
        <title>{customer.name} - Đối tác tiêu biểu của Nextsoft</title>
      </Helmet>

      {/* HEADER BANNER */}
      <div className="relative h-[400px]">
         <img 
           src={customer.detail_image_url || customer.logo_url} 
           alt={customer.name} 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
         <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto text-white">
            <Link to="/customers" className="inline-flex items-center text-sm font-bold text-slate-300 hover:text-white mb-4">
               <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
            </Link>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{customer.name}</h1>
            <div className="flex flex-wrap gap-6 text-sm font-medium">
               <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-corporate-500"/> {customer.province}</span>
               <span className="bg-corporate-600 px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wide">
                 Giải pháp: {customer.product_type}
               </span>
            </div>
         </div>
      </div>

      {/* NỘI DUNG BÀI VIẾT */}
      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
         {/* Cột trái: Nội dung chính */}
         <div className="md:col-span-2 prose prose-lg prose-slate max-w-none">
            {/* Render HTML từ database */}
            <div dangerouslySetInnerHTML={{ __html: customer.content || '<p>Nội dung đang cập nhật...</p>' }} />
         </div>

         {/* Cột phải: Thông tin tóm tắt */}
         <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 sticky top-24">
               <h3 className="font-bold text-slate-900 text-lg mb-4">Thông tin triển khai</h3>
               
               <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">Người đại diện</div>
                    <div className="font-bold text-slate-900">{customer.representative}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Kết quả nổi bật</div>
                    <div className="font-bold text-green-600">"{customer.testimonial}"</div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-corporate-600 transition">
                       Liên hệ {customer.name}
                    </button>
                    <p className="text-xs text-center text-slate-400 mt-2">Kết nối hợp tác kinh doanh</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </MainLayout>
  );
};
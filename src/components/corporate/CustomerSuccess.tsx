import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { MapPin, Quote, Star, Building2, Stethoscope, ShoppingBag } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  logo_url: string;
  testimonial: string;
  representative: string;
  province: string;
  product_type: string;
}

export const CustomerSuccess = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState('all'); // 'all', 'dental', 'hrm', 'pos'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      // Lấy danh sách khách hàng mới nhất lên đầu
      const { data } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setCustomers(data);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  // Logic lọc khách hàng
  const filteredCustomers = filter === 'all' 
    ? customers 
    : customers.filter(c => c.product_type === filter);

  // Danh sách các Tab lọc
  const tabs = [
    { id: 'all', label: 'Tất cả', icon: null },
    { id: 'dental', label: 'Nha khoa', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'hrm', label: 'Doanh nghiệp', icon: <Building2 className="w-4 h-4" /> },
    { id: 'pos', label: 'Bán lẻ & FnB', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  if (loading) return null;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Họa tiết bản đồ chìm (Trang trí) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-4 border border-green-200">
              <MapPin className="w-3 h-3" /> Phủ sóng 34 Tỉnh thành
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
             Được tin dùng bởi <span className="text-corporate-600">1000+ Khách hàng</span>
           </h2>
           <p className="text-slate-500 max-w-2xl mx-auto">
             Từ phòng khám tư nhân đến các tập đoàn đa quốc gia. Nextsoft tự hào đồng hành cùng sự phát triển của doanh nghiệp Việt.
           </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all
                ${filter === tab.id 
                  ? 'bg-slate-900 text-white shadow-lg transform scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
              `}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Customer Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-corporate-200 transition-all duration-300 flex flex-col h-full group">
               
               {/* Quote Icon */}
               <Quote className="w-10 h-10 text-corporate-200 mb-6 group-hover:text-corporate-500 transition-colors" />
               
               {/* Testimonial Text */}
               <p className="text-slate-700 italic text-lg mb-6 leading-relaxed flex-grow">
                 "{customer.testimonial}"
               </p>

               {/* Customer Info */}
               <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  {/* Avatar giả lập bằng chữ cái đầu */}
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm">{customer.representative}</h4>
                     <div className="text-xs text-slate-500 font-semibold uppercase truncate max-w-[150px]">
                       {customer.name}
                     </div>
                  </div>
                  {/* Badge Tỉnh thành */}
                  <div className="ml-auto bg-slate-50 px-2 py-1 rounded text-xs font-bold text-slate-600 flex items-center gap-1 border border-slate-200">
                     <MapPin className="w-3 h-3 text-red-500" /> {customer.province}
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Empty State (Nếu lọc không ra ai) */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-xl">
             <p className="text-slate-500 font-medium">Chưa có dữ liệu khách hàng cho mục này.</p>
          </div>
        )}

      </div>
    </section>
  );
};
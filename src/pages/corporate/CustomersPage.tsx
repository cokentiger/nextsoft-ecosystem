import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { MainLayout } from '../../components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  logo_url: string;
  slug: string;
  testimonial: string;
  representative: string;
  province: string;
  product_type: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterProvince, setFilterProvince] = useState('all'); // Thêm lọc theo Tỉnh (Dropdown)
  const [loading, setLoading] = useState(true);

  // Lấy danh sách Tỉnh thành duy nhất từ data để tạo Dropdown
  const uniqueProvinces = Array.from(new Set(customers.map(c => c.province))).sort();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setCustomers(data);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  // Logic lọc đa tầng (Sản phẩm + Tỉnh thành + Tìm kiếm từ khóa)
  const displayedCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.province.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || c.product_type === filterType;
    const matchesProvince = filterProvince === 'all' || c.province === filterProvince;

    return matchesSearch && matchesType && matchesProvince;
  });

  return (
    <MainLayout>
      <Helmet>
        <title>Khách hàng tiêu biểu | Nextsoft Corporation</title>
      </Helmet>

      {/* 1. HERO SECTION: TƯƠI SÁNG & HIỆN ĐẠI */}
      <div className="relative pt-16 pb-20 bg-gradient-to-b from-corporate-50 via-white to-white overflow-hidden">
        {/* Họa tiết nền mờ */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-corporate-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-corporate-200 text-corporate-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-corporate-500"></span> Niềm tin thương hiệu
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
             Đồng hành cùng <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-600 to-corporate-400">
               1000+ Doanh nghiệp Việt
             </span>
           </h1>
           <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
             Từ các tập đoàn đa quốc gia đến những startup năng động. Nextsoft tự hào mang đến giải pháp chuyển đổi số toàn diện và hiệu quả nhất.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        
        {/* 2. THANH CÔNG CỤ TÌM KIẾM (Nổi bật, bo tròn) */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 -mt-8 relative z-20 flex flex-col md:flex-row gap-2">
           
           {/* Ô tìm kiếm từ khóa */}
           <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-corporate-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm tên công ty, phòng khám..." 
                className="w-full pl-12 pr-4 h-12 md:h-14 bg-transparent rounded-xl focus:outline-none text-slate-900 font-medium placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           {/* Dropdown Tỉnh thành */}
           <div className="relative min-w-[200px] border-l border-slate-100 hidden md:block">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select 
                 className="w-full pl-12 pr-8 h-14 bg-transparent focus:outline-none font-bold text-slate-700 cursor-pointer appearance-none hover:text-corporate-600 transition"
                 value={filterProvince}
                 onChange={(e) => setFilterProvince(e.target.value)}
              >
                 <option value="all">Toàn quốc</option>
                 {uniqueProvinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
           </div>

           {/* Dropdown Sản phẩm */}
           <div className="relative min-w-[200px] border-l border-slate-100 hidden md:block">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select 
                 className="w-full pl-12 pr-8 h-14 bg-transparent focus:outline-none font-bold text-slate-700 cursor-pointer appearance-none hover:text-corporate-600 transition"
                 value={filterType}
                 onChange={(e) => setFilterType(e.target.value)}
              >
                 <option value="all">Tất cả giải pháp</option>
                 <option value="dental">Nha khoa (Dental)</option>
                 <option value="hrm">Nhân sự (HRM)</option>
                 <option value="pos">Bán lẻ (POS)</option>
                 <option value="crm">CRM & Marketing</option>
              </select>
           </div>
           
           {/* Button Search Mobile (Chỉ hiện trang trí) */}
           <button className="bg-slate-900 text-white h-12 md:h-14 px-8 rounded-xl font-bold hover:bg-corporate-600 transition shadow-lg hidden md:block">
              Tìm kiếm
           </button>
        </div>

        {/* Mobile Filters (Hiện khi màn hình nhỏ) */}
        <div className="flex md:hidden gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
           <select 
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
           >
              <option value="all">Tất cả giải pháp</option>
              <option value="dental">Nha khoa</option>
              <option value="hrm">HRM</option>
              <option value="pos">POS</option>
           </select>
           <select 
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
              value={filterProvince}
              onChange={(e) => setFilterProvince(e.target.value)}
           >
              <option value="all">Toàn quốc</option>
              {uniqueProvinces.map(p => <option key={p} value={p}>{p}</option>)}
           </select>
        </div>

        {/* 3. DANH SÁCH KHÁCH HÀNG (GRID) */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCustomers.map((customer) => (
              <Link 
                to={`/customers/${customer.slug || '#'}`}
                key={customer.id} 
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                 {/* Decorative line on top */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-corporate-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                 <div className="flex items-start justify-between mb-6">
                    {/* LOGO CONTAINER: FIX SIZE CHỐNG BỂ */}
                    <div className="w-16 h-16 rounded-xl border border-slate-100 bg-white p-2 flex items-center justify-center shadow-sm shrink-0 group-hover:shadow-md transition-shadow">
                       {customer.logo_url ? (
                         <img 
                           src={customer.logo_url} 
                           alt={customer.name} 
                           className="w-full h-full object-contain" // 👈 KEY: Giữ nguyên tỉ lệ ảnh
                         />
                       ) : (
                         <Building2 className="w-8 h-8 text-slate-300" />
                       )}
                    </div>

                    {/* Badge Sản phẩm */}
                    <span className="text-[10px] font-bold px-3 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-200 uppercase tracking-wide group-hover:bg-corporate-50 group-hover:text-corporate-700 transition-colors">
                       {customer.product_type}
                    </span>
                 </div>
                 
                 {/* Tên & Địa điểm */}
                 <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-corporate-600 transition-colors">
                      {customer.name}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 font-medium">
                       <MapPin className="w-4 h-4 mr-1.5 text-corporate-500" /> 
                       {customer.province}
                    </div>
                 </div>

                 {/* Trích dẫn ngắn */}
                 <div className="relative bg-slate-50 rounded-xl p-4 mb-4 mt-auto">
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 transform rotate-45"></div>
                    <p className="text-slate-600 text-sm italic line-clamp-3 leading-relaxed">
                      "{customer.testimonial}"
                    </p>
                 </div>

                 {/* Footer Card */}
                 <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                         {customer.representative.charAt(0)}
                       </div>
                       <span className="text-xs font-bold text-slate-500">{customer.representative}</span>
                    </div>
                    <div className="text-xs font-bold text-corporate-600 flex items-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                       Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Empty State đẹp hơn */}
        {displayedCustomers.length === 0 && !loading && (
           <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-slate-500 text-center max-w-md mb-6">
                Rất tiếc, không có khách hàng nào phù hợp với từ khóa "{searchTerm}" hoặc bộ lọc hiện tại.
              </p>
              <button 
                onClick={() => {setSearchTerm(''); setFilterType('all'); setFilterProvince('all');}}
                className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition"
              >
                Xóa bộ lọc & Thử lại
              </button>
           </div>
        )}

      </div>
    </MainLayout>
  );
};

export default CustomersPage;
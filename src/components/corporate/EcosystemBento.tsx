import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ArrowRight, Activity, Users, BarChart3, ShoppingBag, Layers, ChevronRight, LayoutGrid } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  landing_page_url: string;
  is_featured: boolean;
}

export const EcosystemBento = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Lấy dữ liệu sản phẩm
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('is_featured', { ascending: false }) // Featured lên đầu để lấy làm Main
        .order('created_at', { ascending: true });
      
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const getIcon = (iconName: string, isSmall = false) => {
    const sizeClass = isSmall ? "w-6 h-6" : "w-8 h-8";
    switch (iconName) {
      case 'dental': return <Activity className={sizeClass} />;
      case 'users': return <Users className={sizeClass} />;
      case 'chart': return <BarChart3 className={sizeClass} />;
      case 'shopping-bag': return <ShoppingBag className={sizeClass} />;
      default: return <Layers className={sizeClass} />;
    }
  };

  if (loading) return null;

  // PHÂN LOẠI SẢN PHẨM
  const mainProduct = products[0]; // Sản phẩm đầu tiên là Main (iDental)
  const coreProducts = products.slice(1, 5); // Lấy 4 sản phẩm tiếp theo làm Core Grid

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Hệ sinh thái Nextsoft</h2>
           <p className="text-slate-500 max-w-2xl mx-auto">
             Giải pháp chuyên sâu cho từng ngành hàng. Tích hợp dữ liệu tập trung (All-in-One).
           </p>
        </div>

        {/* LAYOUT: 1 MAIN + 4 GRID */}
        <div className="space-y-6">
          
          {/* 1. MAIN PRODUCT (FEATURED) - Thiết kế dạng Banner ngang */}
          {mainProduct && (
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-corporate-600/10 skew-x-12 transform origin-top-right"></div>
               
               <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center relative z-10">
                  <div>
                     <div className="inline-flex items-center gap-2 text-corporate-400 font-bold mb-4 uppercase tracking-wider text-xs">
                        <span className="w-2 h-2 rounded-full bg-corporate-500 animate-pulse"></span> Sản phẩm chủ lực
                     </div>
                     <div className="w-16 h-16 bg-corporate-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                        {getIcon(mainProduct.icon_name)}
                     </div>
                     <h3 className="text-3xl md:text-4xl font-black mb-4">{mainProduct.name}</h3>
                     <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md">
                        {mainProduct.description}
                     </p>
                     <Link to={mainProduct.landing_page_url} className="inline-flex items-center bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-corporate-50 transition">
                        Khám phá ngay <ArrowRight className="ml-2 w-4 h-4" />
                     </Link>
                  </div>
                  {/* Ảnh minh họa cho Main Product (Nên thay bằng ảnh thật của iDental sau này) */}
                  <div className="hidden md:block relative h-full min-h-[300px]">
                     <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/50 z-10"></div>
                     <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
                        alt="iDental Interface" 
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] rounded-l-xl shadow-2xl border border-slate-700/50" 
                     />
                  </div>
               </div>
            </div>
          )}

          {/* 2. CORE PRODUCTS GRID (4 Cột đều nhau) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {coreProducts.map((product) => (
               <Link 
                  key={product.id} 
                  to={product.landing_page_url || '#'}
                  className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-corporate-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
               >
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4 text-corporate-600 group-hover:bg-corporate-600 group-hover:text-white transition-colors">
                     {getIcon(product.icon_name, true)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                     {product.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-bold text-corporate-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                     Chi tiết <ChevronRight className="w-4 h-4" />
                  </div>
               </Link>
             ))}
          </div>

          {/* 3. VIEW ALL LINK */}
          <div className="text-center pt-8">
             <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-corporate-600 font-bold transition-colors">
                <LayoutGrid className="w-4 h-4" />
                Xem toàn bộ 9+ giải pháp khác
                <ArrowRight className="w-4 h-4" />
             </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
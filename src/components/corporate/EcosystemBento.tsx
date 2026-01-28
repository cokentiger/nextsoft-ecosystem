import React from 'react';
import { ArrowRight, Database, Globe, Layout, Shield } from 'lucide-react';
import type { BentoConfig } from '../../types/schema';

// Hàm helper để chọn icon dựa trên tên (từ Database gửi về)
const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Database': return <Database className="w-6 h-6" />;
    case 'Globe': return <Globe className="w-6 h-6" />;
    case 'Layout': return <Layout className="w-6 h-6" />;
    default: return <Shield className="w-6 h-6" />; // Icon mặc định
  }
};

export const EcosystemBento = ({ config }: { config: BentoConfig }) => {
  const safeConfig = config || { title: "Hệ sinh thái", items: [] };

  return (
    <section id="ecosystem" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            {safeConfig.title}
          </h2>
          <div className="mt-4 h-1 w-20 bg-corporate-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safeConfig.items.map((item, idx) => (
            <div 
              key={idx}
              className={`group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 ${
                item.variant === 'featured' ? 'md:col-span-2 bg-gradient-to-br from-white to-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl ${item.variant === 'featured' ? 'bg-corporate-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {getIcon(item.icon)}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-corporate-600 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {item.link && (
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center text-corporate-600 font-semibold text-sm">
                  Tìm hiểu thêm <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
              
              {/* Link phủ toàn bộ thẻ (để bấm vào đâu cũng được) */}
              {item.link && <a href={item.link} className="absolute inset-0 z-10"></a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
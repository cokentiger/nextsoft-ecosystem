import React from 'react';
import { ArrowRight } from 'lucide-react';
// Chú ý: Dùng "import type" để chiều lòng chế độ strict mode
import type { HeroConfig } from '../../types/schema';

// Export kiểu Named (có chữ export trước const)
export const HeroSection = ({ config }: { config: HeroConfig }) => {
  const safeConfig = config || {};

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {safeConfig.background_style === 'grid' && (
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:30px_30px] opacity-60"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            {safeConfig.eyebrow && (
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-corporate-50 border border-corporate-100 text-corporate-800 text-sm font-bold">
                 {safeConfig.eyebrow}
               </div>
            )}
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              {safeConfig.headline} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-500 to-red-600">
                {safeConfig.highlight}
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              {safeConfig.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {safeConfig.primaryCTA && (
                <a href={safeConfig.primaryCTA.href} className="flex items-center gap-2 bg-corporate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-xl">
                  {safeConfig.primaryCTA.label} <ArrowRight size={20} />
                </a>
              )}
            </div>
          </div>
          <div className="relative hidden lg:block">
             <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl h-80 flex items-center justify-center text-slate-400 font-bold bg-slate-50">
                🖼️ Khu vực Ảnh Minh Họa
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
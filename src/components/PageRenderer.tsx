import React, { useEffect, useState } from 'react';

// 👇 QUAN TRỌNG: Import bằng dấu ngoặc nhọn { } (Named Import)
import { HeroSection } from './corporate/HeroSection';
import { EcosystemBento } from './corporate/EcosystemBento';
import { getPageData } from '../lib/api';
import { BlogFeedSection } from './corporate/BlogFeedSection';
// Bản đồ ánh xạ: Tên trong Database (trái) -> Component trong Code (phải)
const sectionMap: Record<string, React.FC<any>> = {
  hero: HeroSection,
  ecosystem_bento: EcosystemBento, 
  blog_feed: BlogFeedSection,
};

// 👇 Export kiểu Named (Có chữ export ở đầu)
export const PageRenderer = ({ slug }: { slug: string }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Gọi API lấy dữ liệu trang
      const result = await getPageData(slug);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  // 1. Trạng thái đang tải
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  }

  // 2. Trạng thái lỗi (không tìm thấy trang)
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Lỗi: Không tìm thấy trang (Slug: {slug}) trong Database.
      </div>
    );
  }

  const { sections } = data;

  // 3. Render danh sách các Section
  return (
    <div className="w-full">
      {sections.map((section: any) => {
        // Tìm Component tương ứng trong bản đồ sectionMap
        const Component = sectionMap[section.type];

        // Nếu Database có type lạ mà Code chưa có -> Báo lỗi nhẹ để biết đường sửa
        if (!Component) {
           return (
             <div key={section.id} className="p-8 bg-yellow-50 border-b border-yellow-100 text-center">
               <span className="text-yellow-700 font-medium">
                 ⚠️ System Alert: Chưa có Component xử lý cho type: <strong>{section.type}</strong>
               </span>
             </div>
           );
        }

        // Render Component và truyền config lấy từ Database vào
        return <Component key={section.id} config={section.config} />;
      })}
    </div>
  );
};
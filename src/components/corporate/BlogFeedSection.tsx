import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

// 1. Định nghĩa kiểu dữ liệu khớp với bảng 'posts' trong Supabase
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail_url: string;
  published_at: string;
  tags: string[]; // Mảng chứa các thẻ tag (VD: ['AI', 'Y tế'])
}

export const BlogFeedSection = ({ config }: { config: any }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy cấu hình từ Database (hoặc dùng mặc định nếu thiếu)
  const sectionTitle = config?.title || "Tin tức & Hoạt động";
  const postLimit = config?.limit || 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false }) // Bài mới nhất lên trước
          .limit(postLimit);

        if (error) throw error;
        if (data) setPosts(data);
      } catch (err) {
        console.error("Lỗi lấy bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [postLimit]);

  // 2. Tạo dữ liệu có cấu trúc (JSON-LD) cho SEO Google & AI
  // Giúp Bot hiểu đây là danh sách bài viết
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": sectionTitle,
    "description": "Cập nhật tin tức công nghệ và hoạt động mới nhất từ Nextsoft Corporation",
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.thumbnail_url,
      "datePublished": post.published_at,
      "keywords": post.tags ? post.tags.join(', ') : ""
    }))
  };

  if (loading) return null; // Hoặc có thể return Skeleton Loading nếu muốn
  if (posts.length === 0) return null; // Nếu không có bài nào thì ẩn luôn section

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      {/* Script SEO ẩn (Chỉ Bot nhìn thấy) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER CỦA SECTION --- */}
        <div className="flex justify-between items-end mb-12">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{sectionTitle}</h2>
            <div className="mt-3 h-1.5 w-20 bg-corporate-500 rounded-full"></div>
          </div>
          <a 
            href="/blog" 
            className="hidden md:flex items-center text-sm font-bold text-corporate-600 hover:text-corporate-800 transition-colors group"
          >
            Xem tất cả <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* --- DANH SÁCH BÀI VIẾT (GRID) --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }} // Hiệu ứng xuất hiện lần lượt
            >
              {/* 1. Ảnh bìa & Tags */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.thumbnail_url || 'https://via.placeholder.com/800x500'} 
                  alt={post.title} 
                  className="object-cover w-full h-full transform group-hover:scale-110 transition duration-700"
                />
                
                {/* Overlay gradient nhẹ để chữ dễ đọc nếu cần */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                {/* Hiển thị Tags nổi bật */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {post.tags && post.tags.slice(0, 2).map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-white/95 text-corporate-700 backdrop-blur-sm shadow-sm"
                    >
                      <Tag className="w-3 h-3 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Nội dung bài viết */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-corporate-500" />
                  {new Date(post.published_at).toLocaleDateString('vi-VN')}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-corporate-600 transition-colors line-clamp-2">
                  <a href={`/blog/${post.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-corporate-600 text-sm font-bold mt-auto pt-4 border-t border-slate-100">
                  Đọc chi tiết <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Nút xem thêm cho Mobile (chỉ hiện khi màn hình nhỏ) */}
        <div className="mt-10 text-center md:hidden">
           <a href="/blog" className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition">
             Xem tất cả tin tức
           </a>
        </div>

      </div>
    </section>
  );
};
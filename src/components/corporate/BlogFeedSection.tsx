import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail_url: string;
  published_at: string;
  category: string;
  author: string;
}

// 👇 SỬA Ở ĐÂY: Thêm chữ 'export' vào trước 'const'
export const BlogFeedSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (data) setPosts(data);
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Góc nhìn Nextsoft
            </h2>
            <p className="text-slate-500 max-w-xl text-lg">
              Cập nhật xu hướng công nghệ, chuyển đổi số và bài học khởi nghiệp thực chiến.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="hidden md:flex items-center font-bold text-corporate-600 hover:text-corporate-800 transition-colors"
          >
            Xem tất cả bài viết <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Grid Posts */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-corporate-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={post.thumbnail_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.published_at).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    {post.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-corporate-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm font-bold text-corporate-600 group-hover:text-corporate-700 mt-auto">
                  Đọc chi tiết <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/blog" className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-full font-bold text-slate-700 hover:bg-white hover:border-corporate-500 hover:text-corporate-600 transition w-full">
            Xem tất cả tin tức
          </Link>
        </div>

      </div>
    </section>
  );
};
// ❌ ĐÃ XÓA DÒNG: export default BlogFeedSection;
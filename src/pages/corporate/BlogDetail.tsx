import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { MainLayout } from '../../components/layout/MainLayout';
import { SafeHtml } from '../../components/shared/SafeHtml';
import { Helmet } from 'react-helmet-async';
import { Calendar, TrendingUp, ArrowRight } from 'lucide-react';

// Định nghĩa lại interface cho đầy đủ (tránh lỗi thiếu trường)
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  published_at: string;
  tags: string[];
  category: string;
  author: string;
  view_count: number;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);

      try {
        // 1. Lấy bài viết chính
        const { data: postData, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();
        
        if (error) throw error;

        if (postData) {
          setPost(postData);
          
          // 2. Lấy bài viết liên quan (Sửa lỗi tại đây: lấy '*')
          const { data: related } = await supabase
            .from('posts')
            .select('*') // <--- SỬA: Lấy toàn bộ trường để khớp với type Post[]
            .neq('id', postData.id)
            .limit(4);
            
          if (related) setRelatedPosts(related);
        }
      } catch (err) {
        console.error("Lỗi tải bài viết:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return (
    <MainLayout>
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate-600"></div>
      </div>
    </MainLayout>
  );

  if (!post) return (
    <MainLayout>
      <div className="pt-32 text-center text-slate-500 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p>Bài viết không tồn tại</p>
        <Link to="/blog" className="text-corporate-600 mt-4 hover:underline">Quay về Blog</Link>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <Helmet>
        <title>{post.title} | Nextsoft Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="bg-[#f7f7f7] min-h-screen pb-20">
        
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-6">
           <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Link to="/" className="hover:text-corporate-600">Trang chủ</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-corporate-600">Blog</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">{post.category}</span>
           </div>
        </div>

        {/* Layout 2 cột */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI (Nội dung) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 border border-slate-200">
              
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-6">
                 <span className="font-bold text-corporate-600">{post.author || 'Nextsoft'}</span>
                 <span>•</span>
                 <span className="flex items-center">
                   <Calendar className="w-4 h-4 mr-1"/> 
                   {new Date(post.published_at).toLocaleDateString('vi-VN')}
                 </span>
              </div>

              <p className="text-lg font-bold text-slate-800 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <article className="prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-8
                prose-p:text-justify prose-p:leading-8 prose-p:text-slate-800
                prose-img:rounded-lg prose-img:shadow-md prose-img:w-full
                prose-a:text-corporate-600 prose-a:no-underline hover:prose-a:underline
              ">
                {post.thumbnail_url && (
                   <img src={post.thumbnail_url} alt={post.title} className="mb-8 w-full object-cover rounded-lg max-h-[500px]" />
                )}
                <SafeHtml html={post.content || ''} />
              </article>

              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm hover:bg-slate-200 cursor-pointer transition">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* CỘT PHẢI (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box Tác giả */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                    {post.author?.[0] || 'N'}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{post.author || 'Nextsoft Team'}</div>
                    <div className="text-xs text-slate-500">Chuyên gia công nghệ</div>
                  </div>
               </div>
            </div>

            {/* Box Bài viết nổi bật */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 sticky top-20">
               <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <TrendingUp className="w-5 h-5 text-corporate-600" />
                  <h3 className="font-bold text-slate-900">Đáng chú ý</h3>
               </div>
               
               <div className="flex flex-col gap-4">
                 {relatedPosts.length > 0 ? relatedPosts.map((item, idx) => (
                   // 👇 SỬA LỖI Ở ĐÂY: Dùng Link thay vì a, và item đã đủ dữ liệu
                   <Link key={idx} to={`/blog/${item.slug}`} className="group block">
                     <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-corporate-600 transition-colors mb-1">
                       {item.title}
                     </h4>
                     <span className="text-xs text-slate-400">
                       {new Date(item.published_at).toLocaleDateString('vi-VN')}
                     </span>
                   </Link>
                 )) : (
                   <p className="text-sm text-slate-400 italic">Chưa có bài viết liên quan.</p>
                 )}
               </div>
               
               <Link to="/blog" className="inline-flex items-center text-xs font-bold text-corporate-600 mt-6 hover:underline">
                 Xem tất cả <ArrowRight className="w-3 h-3 ml-1" />
               </Link>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default BlogDetail;
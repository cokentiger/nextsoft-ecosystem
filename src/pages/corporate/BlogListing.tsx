import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { MainLayout } from '../../components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';

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

const BlogListing = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // Lấy tất cả bài viết, sắp xếp mới nhất lên đầu
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const featuredPost = posts[0]; // Bài mới nhất
  const otherPosts = posts.slice(1); // Các bài còn lại

  if (loading) return <MainLayout><div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate-600"></div></div></MainLayout>;

  return (
    <MainLayout>
      <Helmet>
        <title>Blog Nextsoft - Kiến thức Công nghệ & Khởi nghiệp</title>
        <meta name="description" content="Nơi chia sẻ kiến thức về Chuyển đổi số, SaaS và hành trình khởi nghiệp của Nextsoft." />
      </Helmet>

      {/* HEADER TITLE */}
      <div className="bg-slate-50 py-16 border-b border-slate-200 text-center">
         <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Nextsoft Insights</h1>
         <p className="text-slate-500 text-lg max-w-2xl mx-auto">Chia sẻ góc nhìn đa chiều về Công nghệ, Giáo dục và Kinh doanh.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* 1. FEATURED POST (Bài nổi bật nhất) */}
        {featuredPost && (
          <div className="mb-16">
             <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-corporate-600" />
                <span className="text-xs font-bold text-corporate-600 uppercase tracking-widest">Mới nhất</span>
             </div>
             
             <Link to={`/blog/${featuredPost.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
               <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-md border border-slate-100 relative">
                  <img src={featuredPost.thumbnail_url} alt={featuredPost.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
               </div>
               <div>
                  <span className="inline-block bg-corporate-100 text-corporate-800 text-xs font-extrabold px-3 py-1 rounded mb-4 uppercase">
                     {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight group-hover:text-corporate-600 transition-colors">
                     {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 text-lg mb-6 line-clamp-3">
                     {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-bold text-slate-500">
                     <span className="text-slate-900">{featuredPost.author}</span>
                     <span className="mx-2">•</span>
                     <span>{new Date(featuredPost.published_at).toLocaleDateString('vi-VN')}</span>
                  </div>
               </div>
             </Link>
          </div>
        )}

        {/* 2. GRID POSTS (Danh sách bài viết) */}
        <div className="border-t border-slate-200 pt-12">
           <h3 className="text-2xl font-bold text-slate-900 mb-8">Bài viết khác</h3>
           
           <div className="grid md:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <article key={post.id} className="flex flex-col group">
                   <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-xl mb-4 shadow-sm border border-slate-100 aspect-[16/10]">
                      <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                   </Link>
                   
                   <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                         <span className="text-xs font-bold text-corporate-600 uppercase">{post.category}</span>
                         <span className="text-xs font-medium text-slate-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" /> {new Date(post.published_at).toLocaleDateString('vi-VN')}
                         </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-corporate-600 transition-colors">
                         <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                         {post.excerpt}
                      </p>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-bold text-corporate-600 hover:text-corporate-800 mt-auto">
                         Đọc tiếp <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                   </div>
                </article>
              ))}
           </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogListing;
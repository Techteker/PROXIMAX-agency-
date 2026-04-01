import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-600/20 border-t-gold-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <Helmet>
        <title>Blog | PROXIMAX Digital Agency</title>
        <meta name="description" content="Read our latest blogs on GMB, Local SEO, and Lead Generation to grow your business." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Insights & Strategies</h2>
          <h1 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter mb-8">Our Blog</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-sans font-light">
            Expert tips on Google My Business, Local SEO, and Digital Marketing to help you dominate your local market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.slug}`}
              className="group block glass rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-gold-500/20 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={blog.banner} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                <div className="absolute bottom-6 left-8">
                  <span className="px-4 py-1.5 bg-gold-600 text-white text-[10px] font-display font-black uppercase tracking-widest rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 text-[10px] font-display font-black uppercase tracking-widest text-slate-500 mb-6">
                  <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {new Date(blog.date).toLocaleDateString()}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{blog.author}</span>
                </div>
                <h3 className="text-2xl font-serif italic text-white mb-6 group-hover:text-gold-500 transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-slate-400 font-sans font-light leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-2 text-gold-500 text-[10px] font-display font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;

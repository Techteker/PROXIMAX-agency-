import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { Calendar, Users, Sparkles, MessageSquare } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/blog');
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-600/20 border-t-gold-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      <Helmet>
        <title>{blog.seo.title}</title>
        <meta name="description" content={blog.seo.description} />
        <meta name="keywords" content={blog.seo.keywords} />
      </Helmet>

      {/* Premium Banner */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={blog.banner} 
          alt={blog.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-4xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="px-6 py-2 bg-gold-600 text-white text-xs font-display font-black uppercase tracking-[0.3em] rounded-full mb-8 inline-block">
                {blog.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter mb-8 leading-tight">
                {blog.title}
              </h1>
              <div className="flex items-center gap-8 text-xs font-display font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-3"><Calendar className="w-4 h-4 text-gold-500" /> {new Date(blog.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-3"><Users className="w-4 h-4 text-gold-500" /> {blog.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-invert prose-gold max-w-none">
          <div className="markdown-body text-slate-300 font-sans font-light text-lg leading-relaxed space-y-8">
            <Markdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-serif italic text-white mt-16 mb-8" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-serif italic text-white mt-12 mb-6" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-serif italic text-white mt-10 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 mb-8 text-gold-500/80" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                strong: ({node, ...props}) => <strong className="text-gold-500 font-bold" {...props} />,
              }}
            >
              {blog.content}
            </Markdown>
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 glass p-12 md:p-20 rounded-[3rem] border border-gold-500/20 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-8 tracking-tighter relative z-10">
            Want to Dominate Your Local Market?
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-sans font-light relative z-10">
            We help businesses like yours get more leads, calls, and clients using our proven GMB and SEO strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <button 
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-gold-600 text-white px-12 py-6 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Get Free Consultation
            </button>
            <a 
              href="https://wa.me/919341579348"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 text-white border border-white/10 px-12 py-6 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <MessageSquare className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;

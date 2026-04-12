import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, Search, Clock, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

import { SAMPLE_BLOGS } from '../constants';
import { fetchBlogs } from '../services/supabaseService';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [readTimeFilter, setReadTimeFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "newsletter",
          email: newsletterEmail
        })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setNewsletterEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs();
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(SAMPLE_BLOGS);
        }
      } catch (err) {
        console.error("Error fetching blogs from Supabase:", err);
        setBlogs(SAMPLE_BLOGS);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const readTime = blog.readTime || 0;
    const matchesReadTime = readTimeFilter === 'All' || 
      (readTimeFilter === 'Short' && readTime <= 5) ||
      (readTimeFilter === 'Medium' && readTime > 5 && readTime <= 10) ||
      (readTimeFilter === 'Long' && readTime > 10);

    return matchesCategory && matchesSearch && matchesReadTime;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
    return 0;
  });

  const featuredBlog = sortedBlogs.length > 0 ? sortedBlogs[0] : null;
  const isFiltering = activeCategory !== 'All' || searchQuery !== '' || sortBy !== 'newest' || readTimeFilter !== 'All';
  
  const initialBlogs = (isFiltering || !featuredBlog) 
    ? sortedBlogs 
    : sortedBlogs.filter(b => b.id !== featuredBlog.id);

  const displayBlogs = (!showAll && !isFiltering) 
    ? initialBlogs.slice(0, 6) 
    : initialBlogs;

  const hasMore = initialBlogs.length > 6 && !showAll && !isFiltering;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
          <p className="text-gold-500 tracking-luxury animate-pulse">Loading Archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-48 pb-32 relative overflow-hidden">
      <Helmet>
        <title>The Journal | Digital Marketing & SEO Insights | PROXIMAX</title>
        <meta name="description" content="Read the latest insights on Local SEO, GMB optimization, and digital marketing strategies from PROXIMAX. Stay ahead in the Indian digital landscape." />
        <meta name="keywords" content="digital marketing blog, seo insights india, gmb optimization tips, local seo strategies, proximax journal" />
        <meta property="og:title" content="The Journal | Digital Marketing & SEO Insights | PROXIMAX" />
        <meta property="og:description" content="Expert strategies and insights to grow your business online. Explore the PROXIMAX Journal." />
        <link rel="canonical" href="https://proximax.in/blog" />
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="relative mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gold-500" />
            <span className="tracking-luxury text-gold-500">Insights & Strategies</span>
          </motion.div>
          
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10rem] font-serif italic text-white leading-[0.85] tracking-tighter"
            >
              The <span className="text-gradient">Journal</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-text-muted text-xl max-w-md font-sans font-light leading-relaxed mb-4"
            >
              Curated perspectives on digital dominance, local search mastery, and high-performance growth for the modern enterprise.
            </motion.p>
          </div>
        </div>

        {/* Featured Post - Editorial Layout */}
        {featuredBlog && !isFiltering && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-40"
          >
            <Link 
              to={`/blog/${featuredBlog.slug}`}
              className="group relative block"
            >
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
                <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={featuredBlog.banner} 
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-10 left-10 glass-premium px-6 py-3 rounded-full border border-white/20 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
                    <span className="text-[10px] font-display font-black uppercase tracking-luxury text-white">Featured Insight</span>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <span className="text-gold-500 tracking-luxury">{featuredBlog.category}</span>
                    <div className="h-px w-8 bg-white/20" />
                    <span className="text-text-dim tracking-luxury">{new Date(featuredBlog.date).toLocaleDateString()}</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-[0.95] tracking-tighter group-hover:text-gold-400 transition-colors duration-500">
                    {featuredBlog.title}
                  </h2>
                  
                  <p className="text-text-muted text-xl font-sans font-light leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-gold-500 group-hover:gap-8 transition-all duration-500">
                    <span className="tracking-luxury">Read Full Article</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filters & Search - Refined Design */}
        <div className="space-y-12 mb-24 border-b border-white/5 pb-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-display font-black uppercase tracking-luxury text-gold-500 mr-4">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    if (cat === 'All') {
                      setSearchQuery('');
                      setReadTimeFilter('All');
                      setSortBy('newest');
                    }
                  }}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[9px] font-display font-black uppercase tracking-luxury transition-all duration-500 border relative overflow-hidden group/btn",
                    activeCategory === cat 
                      ? 'bg-gold-600 text-white border-gold-600 shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                      : 'bg-white/[0.02] text-text-dim border-white/10 hover:border-gold-500/50 hover:text-white'
                  )}
                >
                  <span className="relative z-10">{cat}</span>
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="activeCat"
                      className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 -z-0"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim group-focus-within:text-gold-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search the archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-8 py-4 text-white text-sm focus:border-gold-500/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-text-dim"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-12">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-display font-black uppercase tracking-luxury text-text-dim">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white text-[10px] font-display font-black uppercase tracking-luxury outline-none cursor-pointer border-b border-white/10 pb-1 focus:border-gold-500 transition-colors"
              >
                <option value="newest" className="bg-[#050505]">Newest First</option>
                <option value="oldest" className="bg-[#050505]">Oldest First</option>
                <option value="alphabetical" className="bg-[#050505]">A - Z</option>
              </select>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[10px] font-display font-black uppercase tracking-luxury text-text-dim">Read Time:</span>
              <div className="flex items-center gap-3">
                {['All', 'Short', 'Medium', 'Long'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setReadTimeFilter(time)}
                    className={cn(
                      "text-[9px] font-display font-black uppercase tracking-luxury transition-colors",
                      readTimeFilter === time ? 'text-gold-500' : 'text-text-dim hover:text-white'
                    )}
                  >
                    {time === 'All' ? 'Any' : time}
                  </button>
                ))}
              </div>
            </div>

            {isFiltering && (
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  setSortBy('newest');
                  setReadTimeFilter('All');
                }}
                className="text-[9px] font-display font-black uppercase tracking-luxury text-gold-500/60 hover:text-gold-500 transition-colors underline underline-offset-4"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Blog Grid - Staggered Layout */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-16"
        >
          <AnimatePresence mode="popLayout">
            {displayBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group",
                  index % 3 === 1 ? "lg:mt-12" : index % 3 === 2 ? "lg:mt-24" : ""
                )}
              >
                <Link 
                  to={`/blog/${blog.slug}`}
                  className="block space-y-8"
                >
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
                    <img 
                      src={blog.banner} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Category Overlay */}
                    <div className="absolute bottom-8 left-8">
                      <div className="glass-premium px-5 py-2 rounded-full border border-white/20">
                        <span className="text-[9px] font-display font-black uppercase tracking-luxury text-white">{blog.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 px-4">
                    <div className="flex items-center gap-4 text-[9px] font-display font-black uppercase tracking-luxury text-text-dim">
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                      <div className="w-1 h-1 bg-gold-500/40 rounded-full" />
                      <span>{blog.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-3xl font-serif italic text-white leading-tight group-hover:text-gold-400 transition-colors duration-500">
                      {blog.title}
                    </h3>
                    
                    <p className="text-text-muted font-sans font-light leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3 text-gold-500 group-hover:gap-6 transition-all duration-500">
                      <span className="tracking-luxury">Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-24 text-center"
          >
            <button 
              onClick={() => setShowAll(true)}
              className="group relative px-12 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white font-display font-black text-xs uppercase tracking-luxury hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative flex items-center gap-4">
                <span>Read More Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </button>
          </motion.div>
        )}

        {filteredBlogs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 text-text-dim">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-4xl font-serif italic text-white mb-6 tracking-tighter">No articles match your search</h3>
            <p className="text-text-muted mb-12 max-w-md mx-auto font-sans font-light">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setReadTimeFilter('All');
                setSortBy('newest');
              }}
              className="bg-gold-600 text-white px-10 py-4 rounded-full tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
            >
              Clear All Filters
            </button>

            {/* Suggested Articles Fallback */}
            <div className="mt-32 pt-32 border-t border-white/5">
              <h4 className="text-2xl font-serif italic text-white mb-12">Suggested Articles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {SAMPLE_BLOGS.slice(0, 3).map((blog) => (
                  <Link 
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group block text-left space-y-6"
                  >
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                      <img src={blog.banner} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <h5 className="text-lg font-serif italic text-white group-hover:text-gold-400 transition-colors">{blog.title}</h5>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Newsletter Section - High Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-60 glass-premium p-16 md:p-32 rounded-[4rem] border border-gold-500/20 relative overflow-hidden text-center group"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] group-hover:bg-gold-600/10 transition-all duration-1000" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-900/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-gold-500 tracking-luxury mb-10">The Newsletter</h2>
            <h3 className="text-6xl md:text-8xl font-serif italic text-white mb-10 tracking-tighter leading-[0.9]">Stay Ahead of <br /> the Digital Curve</h3>
            <p className="text-text-muted text-xl mb-16 font-sans font-light leading-relaxed">
              Subscribe to receive exclusive digital marketing insights, proprietary growth frameworks, and local search strategies directly in your inbox.
            </p>
            
            <form 
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col md:flex-row gap-6 max-w-xl mx-auto"
              name="newsletter"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <input 
                type="email" 
                name="email"
                required
                placeholder="Enter your professional email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-white/[0.03] border border-white/10 rounded-2xl px-10 py-5 text-white focus:border-gold-500 outline-none transition-all placeholder:text-text-dim"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-600 text-white px-12 py-5 rounded-2xl font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join the Elite'}
              </button>
            </form>
            
            {submitStatus === 'success' && (
              <p className="mt-6 text-emerald-500 text-sm">Welcome to the elite circle!</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-6 text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}
            
            <p className="mt-10 text-text-dim text-[10px] tracking-widest uppercase">No spam. Only high-performance insights.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogListPage;


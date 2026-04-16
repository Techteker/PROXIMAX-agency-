import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'motion/react';
import emailjs from '@emailjs/browser';
import Markdown from 'react-markdown';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  ChevronDown, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link as LinkIcon,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsApp';
import { cn } from '../lib/utils';
import { SAMPLE_BLOGS } from '../constants';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setLoading(true);
    // Fetch current blog
    fetch(`/api/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then(data => {
        setBlog(data);
        
        // Extract headings for Table of Contents
        const headings = data.content.match(/^##\s+(.*)/gm) || [];
        const tocItems = headings.map((h: string) => {
          const text = h.replace(/^##\s+/, '');
          const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return { id, text };
        });
        setToc(tocItems);

        // Fetch all blogs to find related ones
        return fetch('/api/blogs')
          .then(res => res.json())
          .then(allBlogsData => {
            const related = (Array.isArray(allBlogsData) ? allBlogsData : [])
              .filter((b: any) => b.slug !== slug && b.category === data.category)
              .slice(0, 3);
            setRelatedBlogs(related);
            setLoading(false);
            window.scrollTo(0, 0);
          });
      })
      .catch(err => {
        console.error("Error fetching blog, trying sample data:", err);
        const sampleBlog = SAMPLE_BLOGS.find(b => b.slug === slug);
        if (sampleBlog) {
          // Mock content for sample blogs if needed, or assume they have it
          const blogWithContent = {
            ...sampleBlog,
            content: sampleBlog.excerpt + "\n\n## Introduction\n\nThis is a sample blog post content.\n\n## Key Strategies\n\n1. Strategy One\n2. Strategy Two\n\n## Conclusion\n\nContact us for more information.",
            faqs: [
              { q: "What is Local SEO?", a: "Local SEO is the process of optimizing your online presence to attract more business from relevant local searches." }
            ]
          };
          setBlog(blogWithContent);
          
          const headings = blogWithContent.content.match(/^##\s+(.*)/gm) || [];
          const tocItems = headings.map((h: string) => {
            const text = h.replace(/^##\s+/, '');
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return { id, text };
          });
          setToc(tocItems);

          const related = SAMPLE_BLOGS
            .filter((b: any) => b.slug !== slug && b.category === sampleBlog.category)
            .slice(0, 3);
          setRelatedBlogs(related);
          setLoading(false);
          window.scrollTo(0, 0);
        } else {
          navigate('/blog');
        }
      });
  }, [slug, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "blog-contact",
          ...formData,
          service: `Blog Inquiry: ${blog.title}`,
          budget: 'N/A',
          email: 'N/A'
        })
      });
      if (response.ok) {
        // Submit to EmailJS
        try {
          const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
          
          if (serviceId && templateId && e.target) {
            await emailjs.sendForm(
              serviceId,
              templateId,
              e.target as HTMLFormElement
            );
          }
        } catch (emailError) {
          console.warn("EmailJS Blog Contact failed:", emailError);
        }

        setSubmitStatus('success');
        setFormData({ name: '', phone: '', business: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readTime = blog ? calculateReadTime(blog.content) : 5;

  return (
    <div className="min-h-screen bg-[#050505]">
      <Helmet>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        <meta name="keywords" content={blog.keywords?.join(', ')} />
      </Helmet>

      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-luxury">Back to Journal</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <span className="tracking-luxury text-slate-500">Currently Reading:</span>
            <span className="tracking-luxury text-gold-500 line-clamp-1 max-w-[300px]">{blog.title}</span>
          </div>
          <button 
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gold-600 text-white px-8 py-2.5 rounded-full tracking-luxury hover:bg-gold-700 transition-all shadow-lg shadow-gold-600/20"
          >
            Consultation
          </button>
        </div>
      </nav>

      {/* Hero Section - Immersive */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src={blog.banner} 
          alt={blog.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-32">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">
                  {blog.category}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-[9rem] font-serif italic text-white tracking-tighter mb-12 leading-[0.85] max-w-5xl">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-16 text-text-dim">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center border border-gold-600/20">
                    <Users className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="tracking-luxury text-[8px] text-slate-500 mb-1">Author</p>
                    <p className="text-white font-serif italic text-lg">{blog.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Calendar className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="tracking-luxury text-[8px] text-slate-500 mb-1">Published</p>
                    <p className="text-white font-serif italic text-lg">{new Date(blog.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Clock className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="tracking-luxury text-[8px] text-slate-500 mb-1">Read Time</p>
                    <p className="text-white font-serif italic text-lg">{readTime} Min</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-40 grid lg:grid-cols-[1fr_320px] gap-24 relative">
        {/* Main Content Area */}
        <div ref={contentRef}>
          <div className="prose prose-invert prose-gold max-w-none">
            <div className="markdown-body text-text-muted font-sans font-light text-xl leading-relaxed space-y-12">
              <Markdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-6xl font-serif italic text-white mt-32 mb-16 tracking-tighter leading-none" {...props} />,
                  h2: ({node, ...props}) => {
                    const text = String(props.children);
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h2 id={id} className="text-5xl font-serif italic text-white mt-24 mb-12 tracking-tighter scroll-mt-40 leading-tight" {...props} />;
                  },
                  h3: ({node, ...props}) => <h3 className="text-4xl font-serif italic text-white mt-20 mb-10 tracking-tighter leading-tight" {...props} />,
                  p: ({node, ...props}) => <p className="mb-10" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-none space-y-8 mb-16 pl-4" {...props} />,
                  li: ({node, ...props}) => (
                    <li className="flex gap-6 items-start group">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold-600 mt-3 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-text-muted transition-colors group-hover:text-white" {...props} />
                    </li>
                  ),
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-2 border-gold-600 pl-12 py-8 italic text-3xl text-white font-serif my-24 bg-white/[0.02] rounded-r-[3rem] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />
                      {props.children}
                    </blockquote>
                  ),
                  strong: ({node, ...props}) => <strong className="text-gold-400 font-bold" {...props} />,
                  a: ({node, ...props}) => {
                    const isCTA = props.children === 'Contact Us Now' || 
                                 props.children === 'Get Free Consultation' || 
                                 props.children === 'Secure Your Consultation';
                    if (isCTA) {
                      return (
                        <button 
                          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                          className="inline-flex items-center gap-4 bg-gold-600 text-white px-10 py-5 rounded-2xl tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 my-12 cursor-pointer group"
                        >
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          {props.children}
                        </button>
                      );
                    }
                    return <a className="text-gold-500 underline decoration-gold-500/30 underline-offset-8 hover:text-gold-400 transition-colors" {...props} />;
                  }
                }}
              >
                {blog.content}
              </Markdown>
            </div>
          </div>

          {/* FAQ Section - Refined Accordion */}
          {blog.faqs && blog.faqs.length > 0 && (
            <div className="mt-48 border-t border-white/5 pt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">Expert Guidance</span>
              </div>
              <h2 className="text-6xl font-serif italic text-white mb-20 tracking-tighter">Common Inquiries</h2>
              <div className="space-y-6">
                {blog.faqs.map((faq: any, index: number) => (
                  <div 
                    key={index} 
                    className={`glass-premium rounded-[2.5rem] border transition-all duration-700 overflow-hidden ${
                      activeFaq === index ? 'border-gold-500/40 bg-gold-500/5' : 'border-white/5'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full px-12 py-10 flex items-center justify-between text-left group"
                    >
                      <span className="text-2xl font-serif italic text-white group-hover:text-gold-400 transition-colors">{faq.q}</span>
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        activeFaq === index ? "bg-gold-600 text-white rotate-180" : "bg-white/5 text-gold-500"
                      )}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: activeFaq === index ? 'auto' : 0, opacity: activeFaq === index ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-12 pb-12 text-text-muted font-sans font-light text-lg leading-relaxed max-w-3xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Editorial Style */}
        <aside className="space-y-20">
          {/* Table of Contents */}
          {toc.length > 0 && (
            <div className="sticky top-40">
              <div className="glass-premium p-10 rounded-[2.5rem] border border-white/10">
                <h4 className="tracking-luxury text-gold-500 mb-10">On this page</h4>
                <nav className="space-y-6">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      className="block text-left text-[10px] font-display font-black uppercase tracking-luxury text-text-dim hover:text-gold-400 transition-all leading-relaxed group flex items-center gap-3"
                    >
                      <div className="w-1 h-1 bg-gold-500/20 rounded-full group-hover:w-4 group-hover:bg-gold-500 transition-all" />
                      {item.text}
                    </button>
                  ))}
                </nav>
                
                <div className="mt-12 pt-12 border-t border-white/5">
                  <p className="tracking-luxury text-[8px] text-slate-600 mb-8">Share Insight</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`, '_blank')}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-gold-600 hover:text-white transition-all"
                    >
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-gold-600 hover:text-white transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleCopyLink}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-gold-600 hover:text-white transition-all relative"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {copied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gold-600 text-white text-[8px] tracking-luxury px-3 py-1.5 rounded-full whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="mt-12 glass-premium p-10 rounded-[2.5rem] border border-gold-500/20 bg-gold-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-600/10 rounded-full blur-3xl" />
                <h4 className="text-2xl font-serif italic text-white mb-6 leading-tight">Ready for a digital transformation?</h4>
                <p className="text-text-muted text-sm mb-10 font-sans font-light">Let's discuss how we can scale your business with precision.</p>
                <button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gold-600 text-white py-4 rounded-2xl tracking-luxury hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20"
                >
                  Book Strategy
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Contact Form Section - High Impact */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        <motion.div 
          id="contact-form"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium p-16 md:p-32 rounded-[4rem] border border-gold-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">Get in Touch</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white mb-10 tracking-tighter leading-[0.9]">
                Let's Build Your <br /> <span className="text-gradient">Legacy.</span>
              </h2>
              <p className="text-text-muted text-xl mb-16 font-sans font-light leading-relaxed max-w-md">
                Ready to dominate your market? Our expert team is here to craft your bespoke growth strategy.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-500 group-hover/item:bg-gold-600 group-hover/item:text-white transition-all duration-500">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="tracking-luxury text-[8px] text-slate-500 mb-1">WhatsApp</p>
                    <a href="https://wa.me/919341579348" className="text-white font-serif italic text-xl hover:text-gold-400 transition-colors">+91 93415 79348</a>
                  </div>
                </div>
              </div>
            </div>

            <form 
              onSubmit={handleSubmit} 
              className="space-y-8 bg-white/[0.02] p-12 rounded-[3rem] border border-white/5"
              name="blog-contact"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="blog-contact" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="tracking-luxury text-[8px] text-slate-500 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-gold-500 outline-none transition-all placeholder:text-text-dim"
                  />
                </div>
                <div className="space-y-3">
                  <label className="tracking-luxury text-[8px] text-slate-500 ml-4">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 ..."
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-gold-500 outline-none transition-all placeholder:text-text-dim"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="tracking-luxury text-[8px] text-slate-500 ml-4">Business Name</label>
                <input 
                  type="text" 
                  placeholder="Your Company Ltd."
                  required
                  value={formData.business}
                  onChange={(e) => setFormData({...formData, business: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-gold-500 outline-none transition-all placeholder:text-text-dim"
                />
              </div>
              <div className="space-y-3">
                <label className="tracking-luxury text-[8px] text-slate-500 ml-4">Your Message</label>
                <textarea 
                  placeholder="Tell us about your goals..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-gold-500 outline-none transition-all resize-none placeholder:text-text-dim"
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-600 text-white py-6 rounded-2xl tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/40 flex items-center justify-center gap-4 disabled:opacity-50 group/btn"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    Secure Your Consultation
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-center tracking-luxury mt-4">Message sent successfully!</motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center tracking-luxury mt-4">Failed to send message.</motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Related Insights */}
      {relatedBlogs.length > 0 && (
        <div className="bg-white/[0.01] py-40 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-24">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px w-12 bg-gold-500" />
                  <span className="tracking-luxury text-gold-500">Continue Reading</span>
                </div>
                <h3 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none">Related Insights</h3>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-4 text-gold-500 hover:gap-8 transition-all tracking-luxury">
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16">
              {relatedBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  to={`/blog/${blog.slug}`}
                  className="group block space-y-8"
                >
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
                    <img 
                      src={blog.banner} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="space-y-6">
                    <span className="tracking-luxury text-gold-500">{blog.category}</span>
                    <h4 className="text-3xl font-serif italic text-white leading-tight group-hover:text-gold-400 transition-colors duration-500">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-3 text-gold-500 group-hover:gap-6 transition-all duration-500">
                      <span className="tracking-luxury">Read Insight</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 1 : 0, scale: scrollYProgress.get() > 0.1 ? 1 : 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-12 right-12 w-16 h-16 rounded-full bg-gold-600 text-white flex items-center justify-center shadow-2xl shadow-gold-600/40 z-[90] hover:bg-gold-700 transition-all group"
      >
        <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};

export default BlogPostPage;


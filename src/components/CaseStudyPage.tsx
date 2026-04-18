import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Zap, 
  BarChart3, 
  MessageSquare,
  Sparkles,
  Quote
} from 'lucide-react';
import { CASE_STUDIES } from '../constants';
import { fetchCaseStudies } from '../services/supabaseService';

const CaseStudyPage = () => {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudies = async () => {
      setLoading(true);
      try {
        const data = await fetchCaseStudies();
        if (data && data.length > 0) {
          // Map snake_case from DB to camelCase used in component
          const mappedData = data.map((s: any) => ({
            id: s.id,
            title: s.title,
            subheadline: s.subheadline,
            clientOverview: s.client_overview,
            problem: s.problem,
            goal: s.goal,
            strategy: s.strategy,
            execution: s.execution,
            results: s.results,
            feedback: s.feedback,
            takeaways: s.takeaways,
            category: s.category
          }));
          setStudies(mappedData);
        } else {
          setStudies(CASE_STUDIES);
        }
      } catch (err) {
        console.error("Error fetching case studies from Supabase:", err);
        setStudies(CASE_STUDIES);
      } finally {
        setLoading(false);
      }
    };
    loadStudies();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen">
      <Helmet>
        <title>Case Studies: Lead Generation & SEO Success Stories | PROXIMAX India</title>
        <meta name="description" content="Discover how PROXIMAX India delivers 10x ROI for clients using advanced SEO, GMB Optimization, and high-performance Lead Generation strategies. Read our success stories." />
        <meta name="keywords" content="digital marketing case studies india, seo results real estate, lead generation success stories, proximax results" />
        <link rel="canonical" href="https://proximax.in/case-studies" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-900/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-500 text-[10px] font-display font-black uppercase tracking-luxury mb-8">
              <TrendingUp className="w-3 h-3" />
              Proven Results & Real Growth
            </div>
            <h1 className="text-6xl md:text-8xl font-serif italic text-white mb-8 tracking-tighter leading-[0.9]">
              Our Success <br /> <span className="text-gold-500">Stories.</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed">
              We don't just promise growth — we deliver it. Explore how our structured marketing systems have transformed businesses across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-gold-600/20 border-t-gold-600 rounded-full animate-spin" />
            </div>
          ) : (
            studies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index % 2 * 0.1 }}
                className="glass-premium rounded-[3rem] border border-white/10 overflow-hidden relative"
              >
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Left Side: Overview & Problem */}
                <div className="lg:col-span-5 p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="inline-block px-4 py-1 rounded-full bg-gold-600/20 text-gold-500 text-[10px] font-display font-black uppercase tracking-widest mb-8">
                    {study.category}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-4 leading-tight">
                    {study.title}
                  </h2>
                  <p className="text-text-muted font-sans font-light mb-12 leading-relaxed">
                    {study.subheadline}
                  </p>

                  <div className="space-y-12">
                    <div>
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-4">Client Overview</p>
                      <p className="text-white font-sans font-medium text-sm leading-relaxed">
                        {study.clientOverview}
                      </p>
                    </div>

                    <div>
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-4">The Problem</p>
                      <ul className="space-y-3">
                        {study.problem.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-text-muted font-sans font-light text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1.5 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-4">The Goal</p>
                      <ul className="space-y-3">
                        {study.goal.map((g, i) => (
                          <li key={i} className="flex items-start gap-3 text-text-muted font-sans font-light text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mt-1.5 shrink-0" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Side: Strategy & Results */}
                <div className="lg:col-span-7 p-10 md:p-16 bg-white/[0.02] flex flex-col">
                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-6 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Our Strategy
                      </p>
                      <ul className="space-y-4 mb-8">
                        {study.strategy.map((s, i) => (
                          <li key={i} className="flex items-center gap-3 text-white font-sans font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-4">Execution</p>
                      <p className="text-text-muted font-sans font-light text-sm leading-relaxed">
                        {study.execution}
                      </p>
                    </div>
                    <div>
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-6 flex items-center gap-2">
                        <BarChart3 className="w-3 h-3" /> The Results
                      </p>
                      <ul className="space-y-4">
                        {study.results.map((r, i) => (
                          <li key={i} className="flex items-center gap-3 text-white font-serif italic text-lg">
                            <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <p className="text-[8px] text-text-dim/50 mt-6 uppercase tracking-widest">Results may vary depending on business and budget.</p>
                    </div>
                  </div>

                  {/* Proof Placeholder */}
                  <div className="mb-16 p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center bg-white/5">
                    <BarChart3 className="w-12 h-12 text-gold-600/20 mb-4" />
                    <p className="text-text-dim text-[10px] uppercase tracking-widest font-black">
                      [ Real-time Data Proof: Leads / Ads / WhatsApp / Analytics ]
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="p-8 rounded-2xl bg-gold-600/5 border border-gold-600/10 italic text-text-muted font-sans font-light relative mb-12">
                      <Quote className="absolute -top-4 -left-4 w-8 h-8 text-gold-600/20" />
                      "{study.feedback}"
                    </div>

                    <div className="pt-8 border-t border-white/10">
                      <p className="text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury mb-4">Key Takeaways</p>
                      <div className="flex flex-wrap gap-4">
                        {study.takeaways.map((t, i) => (
                          <div key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-text-muted uppercase tracking-widest">
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-600/5 -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8 tracking-tighter">
            Want Similar Results <br /> <span className="text-gold-500">For Your Business?</span>
          </h2>
          <p className="text-xl text-text-muted mb-12 font-sans font-light">
            We are currently accepting a limited number of new clients this month. <br />
            Secure your spot and let's build your growth engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.location.href = '/#contact'}
              className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center justify-center gap-3 group"
            >
              Get More Leads Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://wa.me/919341579348"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-premium text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-3"
            >
              <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
          <p className="text-[10px] text-text-dim uppercase tracking-[0.3em] mt-8 font-black">
            Limited client slots available each month
          </p>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyPage;

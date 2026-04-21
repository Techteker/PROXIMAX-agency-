import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Briefcase, 
  Star, 
  Search, 
  Award,
  Clock,
  Check,
  Target,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="card-3d glow-border glass-luxury rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-500/20 relative group mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-serif italic text-text-main group-hover:text-gold-500 transition-colors pr-8">
          {question}
        </span>
        <div className={cn("w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-dim transition-transform duration-500 shrink-0", isOpen && "rotate-45 bg-gold-600 text-white")}>
          <Zap className="w-5 h-5" />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 text-text-muted font-sans font-light leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const CareersPage = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const testimonials = [
    {
      name: "Aman Gupta",
      city: "Delhi",
      text: "I started as a student with zero experience. Within 2 months of joining PROXIMAX as an intern, I learned actual SEO and now I earn through brand deals!",
      role: "SEO Intern",
      rating: 5
    },
    {
      name: "Priya Sharma",
      city: "Mumbai",
      text: "The Influencer Program is a game-changer. I never thought I could make money using just my phone. PROXIMAX handles everything, I just follow the steps.",
      role: "Influencer",
      rating: 5
    },
    {
      name: "Rahul Verma",
      city: "Bangalore",
      text: "Realistic learning and real-world projects. The certificate from PROXIMAX helped me land a full-time job. Best decision for my career.",
      role: "Ads Specialist",
      rating: 5
    },
    {
      name: "Ishita Rao",
      city: "Hyderabad",
      text: "Being a student, managing studies and work was hard. But Proximax's remote culture helped me earn ₹15k while preparing for my exams!",
      role: "Social Media Intern",
      rating: 5
    },
    {
      name: "Vikram Singh",
      city: "Jaipur",
      text: "The GMB optimization strategies I learned here are world-class. I already have two local clients of my own now. Truly empowering!",
      role: "Local SEO Expert",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const stats = [
    { label: "Active Members", value: "15,000+", icon: Users },
    { label: "Monthly Earning", value: "₹50k+", icon: TrendingUp },
    { label: "Successful Campaigns", value: "1,200+", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden pt-32 pb-20 selection:bg-gold-500/30 selection:text-white">
      <Helmet>
        <title>Careers & Opportunities | Earn Money Online | PROXIMAX India</title>
        <meta name="description" content="Join PROXIMAX's Influencer Program or Digital Marketing Internship. Earn while you learn, gain real experience, and secure your future. Perfect for students and beginners." />
        <meta name="keywords" content="digital marketing internship india, influencer program, earn money online students, proximax careers, work from home opportunities" />
      </Helmet>

      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-900/5 rounded-full blur-[150px] animate-drift" />
        <div className="absolute inset-0 bg-grain opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-12"
          >
            <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-display font-black uppercase tracking-[0.3em] text-gold-400 italic">🔥 trending opportunity for students & beginners</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic text-text-main leading-[0.85] tracking-tighter mb-12"
          >
            Start Earning <br /> <span className="text-gradient">Start Growing</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto font-sans font-light leading-relaxed mb-16"
          >
            Join India's fastest-growing digital marketing ecosystem. No experience? No problem. We provide the tools, the training, and the income.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/influencer-apply"
              className="btn-premium w-full sm:w-auto text-white group flex items-center justify-center gap-3"
            >
              Become an Influencer <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/internship"
              className="w-full sm:w-auto px-10 py-5 rounded-full glass-luxury border border-white/10 text-white font-display font-black text-xs uppercase tracking-luxury hover:bg-white/5 transition-all flex items-center justify-center gap-3"
            >
              Apply for Internship <Briefcase className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-3 text-gold-500/60 font-display font-black text-[10px] uppercase tracking-widest"
          >
            <Clock className="w-4 h-4" /> ⚡ Limited Slots: Only 12 positions left this week
          </motion.div>
        </section>

        {/* 2. TRUST + AUTHORITY (Stats) */}
        <section className="mb-40 perspective-2000">
          <div className="glass-premium rounded-[3rem] p-12 border border-white/5 relative overflow-hidden card-3d">
            <div className="absolute inset-0 bg-grain opacity-[0.02]" />
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                { label: "Community Members", value: "15,000+", icon: Users },
                { label: "Avg. Student Earning", value: "₹25,000/mo", icon: TrendingUp },
                { label: "India Presence", value: "28 States", icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-600/10 flex items-center justify-center text-gold-500 mx-auto">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-display font-black text-text-main">{stat.value}</h3>
                  <p className="text-[10px] tracking-luxury text-text-dim uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CHOOSE YOUR PATH (Split Section) */}
        <section className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black underline underline-offset-8 decoration-gold-500/30">Your Journey Starts Here</h2>
            <h3 className="text-5xl md:text-7xl font-serif italic text-text-main tracking-tighter leading-none">Choose Your <span className="text-gold-500">Path.</span></h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 perspective-2000">
            {/* Influencer Path */}
            <motion.div 
              whileHover={{ y: -10, rotateY: -3 }}
              className="group glass-premium p-12 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden card-3d flex flex-col h-full bg-gradient-to-br from-gold-600/5 to-transparent"
            >
              <div className="absolute top-0 right-0 p-12">
                <Users className="w-16 h-16 text-gold-500/20 group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="mb-12">
                <span className="px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-500 text-[10px] font-display font-black uppercase tracking-widest mb-10 inline-block">Best for Creators</span>
                <h4 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Influencer Program</h4>
                <p className="text-text-muted text-lg font-sans font-light leading-relaxed mb-10">
                  Monetize your social media presence. No matter your follower count, we help you connect with brands and earn commission through our affiliate network.
                </p>
                <div className="space-y-4 mb-12">
                  {['Daily Payouts', 'Brand Collaborations', 'Zero Cost Startup', 'Fast Approval'].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80 font-sans font-light">
                      <CheckCircle2 className="w-5 h-5 text-gold-500" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto">
                <Link to="/influencer-apply" className="btn-premium w-full text-center">Join the Program</Link>
              </div>
            </motion.div>

            {/* Internship Path */}
            <motion.div 
              whileHover={{ y: -10, rotateY: 3 }}
              className="group glass-premium p-12 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden card-3d flex flex-col h-full bg-gradient-to-bl from-gold-600/5 to-transparent"
            >
              <div className="absolute top-0 right-0 p-12">
                <Award className="w-16 h-16 text-gold-500/20 group-hover:scale-110 transition-transform" />
              </div>

              <div className="mb-12">
                <span className="px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-500 text-[10px] font-display font-black uppercase tracking-widest mb-10 inline-block">Best for Students</span>
                <h4 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Digital Internship</h4>
                <p className="text-text-muted text-lg font-sans font-light leading-relaxed mb-10">
                  Gain industry-recognized skills. Work on real-time SEO projects, Facebook Ads, and GMB optimization for high-paying Indian & Global clients.
                </p>
                <div className="space-y-4 mb-12">
                  {['Verified Certificates', 'Learn SEO & Ads', 'Real-time Projects', 'Career Mentorship'].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80 font-sans font-light">
                      <CheckCircle2 className="w-5 h-5 text-gold-500" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <Link to="/internship" className="btn-premium w-full text-center">Start Learning</Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. BENEFITS SECTION */}
        <section className="mb-40 py-32 bg-card/10 rounded-[4rem] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-[0.02]" />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-24 tracking-tighter">Why thousands of students <br /> <span className="text-gold-500">choose PROXIMAX.</span></h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { title: "Work From Anywhere", desc: "100% remote. Work from your home, hostel, or even a cafe.", icon: Globe },
                { title: "Earn While Learn", desc: "Don't just spend on courses. Start earning real money from month 1.", icon: Zap },
                { title: "Zero Investment", desc: "No entry fees or hidden costs. Your talent is your investment.", icon: ShieldCheck },
                { title: "Skill Mastery", desc: "Master SEO, Ads, and Content that corporate India is looking for.", icon: Star },
                { title: "Personal Brand", desc: "Learn how to build your own authority in the digital world.", icon: Users },
                { title: "Global Exposure", desc: "Work with brands not just from India, but from across the globe.", icon: Sparkles }
              ].map((benefit, i) => (
                <div key={i} className="text-left space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-500 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-serif italic text-white">{benefit.title}</h4>
                  <p className="text-sm text-text-dim leading-relaxed font-sans font-light">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS */}
        <section className="mb-40 relative">
          <div className="text-center mb-20">
            <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black">Success Stories</h2>
            <h3 className="text-5xl md:text-7xl font-serif italic text-text-main tracking-tighter">Real People, <span className="text-gold-500">Real Income.</span></h3>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative h-[500px] md:h-[450px] perspective-2000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100, rotateY: direction > 0 ? 45 : -45, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100, rotateY: direction > 0 ? -45 : 45, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full glass-premium p-10 md:p-16 rounded-[4rem] border border-white/10 flex flex-col items-center justify-center text-center card-3d shadow-2xl backdrop-blur-3xl overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                  <Quote className="w-40 h-40 text-gold-500" />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex gap-2 justify-center mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>

                  <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-white leading-tight max-w-2xl mx-auto tracking-tight">
                    "{testimonials[activeIndex].text}"
                  </p>

                  <div className="pt-8">
                    <p className="text-2xl font-serif italic text-gold-500 mb-2">{testimonials[activeIndex].name}</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-gold-600/10 border border-gold-500/20 text-gold-500 text-[10px] font-display font-black uppercase tracking-widest leading-none">
                        {testimonials[activeIndex].role}
                      </span>
                      <span className="text-[10px] tracking-widest text-text-dim uppercase font-bold">
                        {testimonials[activeIndex].city}, India
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -left-4 md:-left-20 -translate-y-1/2 z-20">
              <button 
                onClick={prevTestimonial}
                className="w-14 h-14 rounded-full glass-luxury border border-white/10 flex items-center justify-center text-white hover:bg-gold-600 hover:text-white hover:scale-110 transition-all shadow-2xl group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-20 -translate-y-1/2 z-20">
              <button 
                onClick={nextTestimonial}
                className="w-14 h-14 rounded-full glass-luxury border border-white/10 flex items-center justify-center text-white hover:bg-gold-600 hover:text-white hover:scale-110 transition-all shadow-2xl group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "h-1.5 transition-all duration-500 rounded-full",
                    i === activeIndex ? "w-12 bg-gold-500 shadow-glow" : "w-4 bg-white/10 hover:bg-white/20"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 6. HOW IT WORKS */}
        <section className="mb-40 py-20">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-6xl font-serif italic text-white tracking-tighter leading-none mb-10">Step-by-Step to <br /> <span className="text-gold-500">Financial Freedom.</span></h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent -translate-y-1/2 hidden md:block" />
            {[
              { title: "Apply", desc: "Select your path and fill the short 2-minute application form.", step: "01" },
              { title: "Get Approved", desc: "Our team reviews your profile and approves you within 24-48 hours.", step: "02" },
              { title: "Start Earning", desc: "Get access to our dashboard and start your journey towards growth.", step: "03" }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center space-y-6">
                <div className="w-20 h-20 rounded-full glass-luxury border border-white/10 mx-auto flex items-center justify-center text-4xl font-serif italic text-gold-500 shadow-2xl shadow-gold-500/10">
                  {step.step}
                </div>
                <h4 className="text-3xl font-serif italic text-white">{step.title}</h4>
                <p className="text-text-muted max-w-xs mx-auto font-sans font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="mb-40">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-5xl font-serif italic text-white mb-6">Common Doubts</h3>
              <p className="text-text-muted font-sans font-light">Everything a beginner needs to know before starting.</p>
            </div>
            
            <FAQItem 
              question="I have zero experience. Can I still join?" 
              answer="Absolutely! PROXIMAX was built for beginners. We provide step-by-step training and mentorship to help you get started from scratch. All you need is a smartphone and a willingness to learn."
            />
            <FAQItem 
              question="How much can I realistically earn as an Influencer?" 
              answer="Earnings depend on your consistency. Beginners usually start with ₹5k-₹10k in their first month and professional creators earn ₹50k+ through our brand collaborations and high-ticket affiliate programs."
            />
            <FAQItem 
              question="Is the Digital Marketing Internship paid?" 
              answer="We offer both merit-based stipends and performance-based incentives. Our primary focus is providing you with real-world skills and client work that you won't find in any textbook."
            />
            <FAQItem 
              question="Will I get a certificate after my internship?" 
              answer="Yes, every intern receives an official Proximax Internship Completion Certificate, which is highly recognized in the digital marketing industry in India."
            />
            <FAQItem 
              question="How much time do I need to commit daily?" 
              answer="Just 2-3 hours a day is sufficient to see significant results. Since it's remote, you can choose your own working hours."
            />
          </div>
        </section>

        {/* 9. FINAL CTA (VERY STRONG) */}
        <section className="py-32 relative overflow-hidden rounded-[4rem] text-center mb-20">
          <div className="absolute inset-0 bg-gold-600/10 animate-pulse-glow" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-6xl md:text-8xl font-serif italic text-white mb-10 tracking-tighter leading-tight">Your Future <br /> <span className="text-gold-500">Won't Wait.</span></h2>
            <p className="text-2xl text-text-muted font-sans font-light leading-relaxed mb-16">
              Stop thinking, start doing. Join the top 1% of Indian digital earners and learners today. Slots are filling fast for this batch.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link 
                to="/influencer-apply"
                className="btn-premium w-full md:w-auto px-12 py-6 text-[14px]"
              >
                Become Influencer Now 🚀
              </Link>
              <Link 
                to="/internship"
                className="w-full md:w-auto px-12 py-6 rounded-full glass-luxury border-2 border-gold-500 text-gold-500 font-display font-black text-[11px] uppercase tracking-luxury hover:bg-gold-500 hover:text-white transition-all shadow-gold shadow-2xl"
              >
                Apply for Internship 🎓
              </Link>
            </div>
            
            <p className="mt-12 text-sm text-text-dim flex items-center justify-center gap-3 font-display font-black uppercase tracking-luxury">
              <Zap className="w-4 h-4 text-gold-500" /> Fast-track approval active
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CareersPage;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { 
  Search, 
  MapPin, 
  Share2, 
  TrendingUp, 
  Layout, 
  MessageSquare, 
  Target, 
  PenTool, 
  Award,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Check,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  Cpu,
  Briefcase,
  GraduationCap,
  Clock,
  FileText,
  Users,
  HelpCircle,
  Upload
} from 'lucide-react';
import { cn } from './lib/utils';
import { WhatsAppIcon } from './components/icons/WhatsApp';
import { FloatingBubbles } from './components/FloatingBubbles';
import { MagicCursor } from './components/MagicCursor';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import InfluencerApplyPage from './components/InfluencerApplyPage';

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-serif italic text-white mb-6">Something went wrong.</h2>
            <p className="text-text-muted mb-8">We apologize for the inconvenience. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gold-600 text-white px-8 py-3 rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-gold-700 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const LoadingSpinner = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gold-600/20 border-t-gold-600 rounded-full animate-spin" />
  </div>
);

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-900/10 rounded-full blur-[100px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-8 mx-auto">
            <Check className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-white mb-6 tracking-tighter">Thank You!</h1>
          <p className="text-xl text-text-muted font-sans font-light leading-relaxed mb-12">
            Your submission has been received. We appreciate your interest in PROXIMAX and will get back to you shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-premium rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-500/20 relative group">
      {/* Magical Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/0 via-gold-600/0 to-gold-600/0 group-hover:from-gold-600/5 group-hover:via-transparent group-hover:to-gold-600/5 transition-all duration-700 pointer-events-none" />
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <h4 className="text-xl font-serif italic text-white group-hover:text-gold-500 transition-colors flex items-center gap-4">
          <HelpCircle className={cn("w-5 h-5 transition-colors", isOpen ? "text-gold-500" : "text-text-dim")} />
          {question}
        </h4>
        <div className={cn("w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-dim transition-transform duration-500", isOpen && "rotate-180 bg-gold-600 text-white")}>
          <ChevronRight className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8 pt-0">
              <div className="h-px w-full bg-white/5 mb-8" />
              <p className="text-text-muted font-sans font-light leading-relaxed pl-9">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InternshipPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    year: '1st',
    skills: '',
    motivation: '',
    resume: null as File | null
  });

  const roles = [
    { title: "Digital Marketing Intern", icon: Target, desc: "Master SEO, GMB, and performance marketing on real client projects." },
    { title: "Lead Generation Intern", icon: Briefcase, desc: "Learn the art of finding and qualifying high-value prospects." },
    { title: "Sales Intern", icon: ArrowRight, desc: "Develop persuasive communication and closing skills." },
    { title: "Social Media Manager", icon: Instagram, desc: "Build brand presence and engagement across all platforms." },
    { title: "Web Development Intern", icon: Cpu, desc: "Create high-converting landing pages and business websites." }
  ];

  const learningPoints = [
    "Google Business Profile (GMB) Mastery",
    "High-Quality Lead Generation Strategies",
    "Professional Client Handling & Communication",
    "SEO & Content Optimization Techniques",
    "Social Media Growth & Automation",
    "Performance Marketing & Ad Campaigns"
  ];

  const benefits = [
    { title: "Official Certificate", icon: Award },
    { title: "Real Project Experience", icon: Target },
    { title: "Letter of Recommendation", icon: FileText },
    { title: "Performance Stipend", icon: Sparkles },
    { title: "Job Opportunities", icon: Briefcase }
  ];

  const faqs = [
    { q: "Is this a paid internship?", a: "We offer performance-based stipends to top performers who deliver exceptional results for our clients." },
    { q: "Will I get a certificate?", a: "Yes, every intern receives an official internship completion certificate from PROXIMAX." },
    { q: "What are the timings?", a: "We offer flexible timings to accommodate students. You can choose your working hours." },
    { q: "How are interns selected?", a: "Selection is based on your application, motivation, and a short introductory interview." }
  ];

  return (
    <div className="bg-[#050505]">
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
            <h1 className="text-6xl md:text-8xl font-serif italic text-white mb-8 tracking-tighter leading-[0.9]">
              Digital Marketing <br /> <span className="text-gold-500">Internship Program</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed">
              Launch your career with the best digital marketing agency. Gain real-world experience in SEO, GMB, and performance marketing with an official certificate.
            </p>
            <button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              title="Apply for Digital Marketing Internship"
              className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Internship */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gold-500 tracking-luxury mb-8">The Opportunity</h2>
              <h3 className="text-5xl font-serif italic text-white mb-8 leading-tight">Practical Skills. <br /> Real Projects. <br /> True Growth.</h3>
              <p className="text-lg text-text-muted leading-relaxed font-sans font-light mb-8">
                At PROXIMAX, we don't believe in "coffee-run" internships. Our interns are integral members of our team, working directly on client accounts, managing real budgets, and delivering actual results.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass-premium flex items-center justify-center text-gold-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-white font-medium">Flexible Timing</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass-premium flex items-center justify-center text-gold-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-white font-medium">Remote Work</span>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden glass-premium border border-white/10 p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/30 transition-all">
                      <div className="w-12 h-12 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500">
                        <b.icon className="w-6 h-6" />
                      </div>
                      <span className="text-white font-serif italic text-xl">{b.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Available */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-gold-500 tracking-luxury mb-8">Open Positions</h2>
            <h3 className="text-6xl font-serif italic text-white tracking-tighter">Choose Your Path</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-premium p-10 rounded-3xl border border-white/5 hover:border-gold-500/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold-600/10 flex items-center justify-center text-gold-500 mb-8 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                  <role.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif italic text-white mb-4">{role.title}</h4>
                <p className="text-text-dim leading-relaxed font-sans font-light">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/5 rounded-[3rem] p-16 md:p-24 border border-white/5">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-gold-500 tracking-luxury mb-8">Curriculum</h2>
                <h3 className="text-5xl font-serif italic text-white mb-10 leading-tight">Master the Digital <br /> Ecosystem</h3>
                <div className="space-y-6">
                  {learningPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-text-muted font-sans font-light">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-square glass-premium rounded-3xl p-8 flex flex-col justify-end">
                    <div className="text-4xl font-serif italic text-white mb-2">1-3</div>
                    <div className="text-text-dim tracking-luxury">Months Duration</div>
                  </div>
                  <div className="aspect-[4/5] bg-gold-600 rounded-3xl p-8 flex flex-col justify-end">
                    <div className="text-4xl font-serif italic text-white mb-2">100%</div>
                    <div className="text-gold-100 tracking-luxury">Practical Work</div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="aspect-[4/5] glass-premium rounded-3xl p-8 flex flex-col justify-end">
                    <div className="text-4xl font-serif italic text-white mb-2">Remote</div>
                    <div className="text-text-dim tracking-luxury">Work Location</div>
                  </div>
                  <div className="aspect-square glass-premium rounded-3xl p-8 flex flex-col justify-end border-gold-500/30">
                    <div className="text-4xl font-serif italic text-white mb-2">Elite</div>
                    <div className="text-text-dim tracking-luxury">Mentorship</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-gold-500 tracking-luxury mb-8">Prerequisites</h2>
          <h3 className="text-5xl font-serif italic text-white mb-16">What You Need</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { t: "Smartphone/Laptop", i: Cpu },
              { t: "Stable Internet", i: ArrowRight },
              { t: "Eagerness to Learn", i: GraduationCap },
              { t: "Basic Communication", i: Users }
            ].map((req, i) => (
              <div key={i} className="glass-premium px-10 py-8 rounded-2xl border border-white/5 flex items-center gap-6">
                <req.i className="w-6 h-6 text-gold-500" />
                <span className="text-white font-medium">{req.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
            <div className="text-center mb-16">
              <h2 className="text-gold-500 tracking-luxury mb-6">Apply Now</h2>
              <h3 className="text-5xl font-serif italic text-white tracking-tighter">Join the Elite</h3>
            </div>

            <form 
              className="space-y-8" 
              name="internship" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              action="/thank-you"
              encType="multipart/form-data"
            >
              <input type="hidden" name="form-name" value="internship" />
              <input type="hidden" name="subject" value="Internship Application Submission" />
              <div hidden>
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="fullName" className="text-text-dim tracking-luxury ml-1">Full Name</label>
                  <input 
                    id="fullName"
                    name="fullName"
                    type="text" required placeholder="Your Name"
                    value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-text-dim tracking-luxury ml-1">Phone (WhatsApp)</label>
                  <input 
                    id="phone"
                    name="phone"
                    type="tel" required placeholder="+91 00000 00000"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="email" className="text-text-dim tracking-luxury ml-1">Email Address</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" required placeholder="you@example.com"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="college" className="text-text-dim tracking-luxury ml-1">College/University</label>
                  <input 
                    id="college"
                    name="college"
                    type="text" required placeholder="Your Institution"
                    value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="course" className="text-text-dim tracking-luxury ml-1">Course/Stream</label>
                  <input 
                    id="course"
                    name="course"
                    type="text" required placeholder="B.Tech, MBA, etc."
                    value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="year" className="text-text-dim tracking-luxury ml-1">Year of Study</label>
                  <select 
                    id="year"
                    name="year"
                    value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                  >
                    <option value="1st" className="bg-[#0a0a0a]">1st Year</option>
                    <option value="2nd" className="bg-[#0a0a0a]">2nd Year</option>
                    <option value="3rd" className="bg-[#0a0a0a]">3rd Year</option>
                    <option value="4th" className="bg-[#0a0a0a]">4th Year</option>
                    <option value="Other" className="bg-[#0a0a0a]">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="skills" className="text-text-dim tracking-luxury ml-1">Skills</label>
                <textarea 
                  id="skills"
                  name="skills"
                  rows={3} required placeholder="SEO, Content Writing, Graphic Design, etc..."
                  value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-3">
                <label htmlFor="motivation" className="text-text-dim tracking-luxury ml-1">Why do you want this internship?</label>
                <textarea 
                  id="motivation"
                  name="motivation"
                  rows={4} required placeholder="Tell us about your motivation..."
                  value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-3">
                <label htmlFor="resume" className="text-text-dim tracking-luxury ml-1">Resume Upload (Optional)</label>
                <div className="relative">
                  <input 
                    id="resume"
                    name="resume"
                    type="file" 
                    onChange={(e) => setFormData({...formData, resume: e.target.files ? e.target.files[0] : null})}
                    className="hidden"
                  />
                  <label 
                    htmlFor="resume"
                    className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-6 py-8 flex flex-col items-center justify-center cursor-pointer hover:border-gold-500/50 transition-all group"
                  >
                    <Upload className="w-8 h-8 text-text-dim group-hover:text-gold-500 mb-4 transition-colors" />
                    <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                      {formData.resume ? formData.resume.name : 'Click to upload your resume (PDF/Doc)'}
                    </span>
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Apply Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-gold-500 tracking-luxury mb-8">Success Stories</h2>
            <h3 className="text-6xl font-serif italic text-white tracking-tighter">From Interns to Experts</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Anjali Sharma", role: "Digital Marketing Intern", text: "The hands-on experience I got at PROXIMAX was incredible. I learned more in 2 months than I did in a year of college." },
              { name: "Rahul Verma", role: "Web Dev Intern", text: "Working on real client websites gave me the confidence to build professional projects. The mentorship is top-notch." }
            ].map((t, i) => (
              <div key={i} className="glass-premium p-12 rounded-3xl border border-white/5 relative">
                <div className="text-gold-500 mb-8">
                  <Sparkles className="w-10 h-10" />
                </div>
                <p className="text-xl text-white italic font-serif leading-relaxed mb-10 opacity-90">"{t.text}"</p>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-gold-500 tracking-luxury mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-gold-500 tracking-luxury mb-8">FAQ</h2>
            <h3 className="text-5xl font-serif italic text-white tracking-tighter">Common Questions</h3>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-premium p-8 rounded-2xl border border-white/5">
                <h4 className="text-white font-serif italic text-xl mb-4 flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-gold-500" />
                  {faq.q}
                </h4>
                <p className="text-text-muted font-sans font-light leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-gold-600 to-gold-800 rounded-[3rem] p-20 relative overflow-hidden">
            <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-10 tracking-tighter">Don't Just Watch. <br /> Build the Future.</h2>
            <p className="text-gold-100 text-xl mb-12 max-w-2xl mx-auto opacity-90 font-sans font-light">
              Limited slots available for the next cohort. Apply today and start your journey towards digital mastery.
            </p>
            <button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gold-700 px-16 py-6 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-50 transition-all shadow-2xl"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    id: "seo",
    title: "SEO (On-page & Off-page)",
    headline: "Rank Your Website on Google & Get More Traffic",
    description: "We help your website rank higher on Google using proven SEO strategies.",
    detailedServices: ["On-page SEO", "Off-page SEO", "Keyword Research", "Technical SEO"],
    process: "Audit → Optimize → Rank",
    results: ["More traffic", "Higher rankings", "More leads"],
    cta: "Get Free SEO Audit",
    icon: Search,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "gmb",
    title: "GMB Optimization",
    headline: "Rank Your Business on Google Maps & Get Local Customers",
    description: "We optimize your Google My Business profile to bring more calls and visits.",
    detailedServices: ["GMB Setup & Optimization", "Local SEO", "Review Management"],
    results: ["More calls", "More local customers"],
    cta: "Rank My Business on Maps",
    icon: MapPin,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "smm",
    title: "Social Media Management",
    headline: "Grow Your Social Media & Build Your Brand",
    description: "We manage and grow your social media for better engagement.",
    detailedServices: ["Content Posting", "Reels & Graphics", "Engagement Strategy"],
    results: ["More followers", "Better engagement"],
    cta: "Grow My Social Media",
    icon: Share2,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "performance",
    title: "Performance Marketing",
    headline: "Get Instant Leads & Sales with Paid Ads",
    description: "We run high-converting ad campaigns to grow your business fast.",
    detailedServices: ["Facebook & Instagram Ads", "Google Ads", "Retargeting"],
    results: ["More leads", "High ROI"],
    cta: "Start My Ads Campaign",
    icon: TrendingUp,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "web",
    title: "Website & Landing Page Design",
    headline: "Build High-Converting Websites for Your Business",
    description: "We create modern and responsive websites that convert visitors into customers.",
    detailedServices: ["Business Website", "Landing Page Design", "Mobile Responsive"],
    results: ["More conversions", "Professional presence"],
    cta: "Build My Website",
    icon: Layout,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing & Automation",
    headline: "Convert Leads Faster with WhatsApp Automation",
    description: "We set up WhatsApp systems to automate your customer communication.",
    detailedServices: ["Bulk Messaging", "Automation", "Chatbot Setup"],
    results: ["Instant replies", "Higher conversion"],
    cta: "Setup WhatsApp Marketing",
    icon: WhatsAppIcon,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "leadgen",
    title: "Lead Generation & Sales Funnel",
    headline: "Get Daily Quality Leads for Your Business",
    description: "We build automated systems to generate consistent leads.",
    detailedServices: ["Funnel Setup", "Landing Page", "Automation"],
    results: ["Consistent leads", "Automated sales"],
    cta: "Get More Leads",
    icon: Target,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "content",
    title: "Content Creation & Copywriting",
    headline: "Content That Attracts & Converts",
    description: "We create powerful content that drives engagement and sales.",
    detailedServices: ["Ad Copy", "Social Media Content", "Website Content"],
    results: ["More engagement", "Better conversions"],
    cta: "Create My Content",
    icon: PenTool,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "branding",
    title: "Branding (Logo & Business Identity)",
    headline: "Build a Strong & Professional Brand Identity",
    description: "We design branding that makes your business stand out.",
    detailedServices: ["Logo Design", "Brand Identity", "Social Media Branding"],
    results: ["Professional look", "Strong brand image"],
    cta: "Build My Brand",
    icon: Award,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "influencer",
    title: "Influencer Marketing",
    headline: "Collaborate with Top Influencers to Grow Your Brand",
    description: "We connect your brand with the right influencers for maximum reach and ROI.",
    detailedServices: ["Influencer Sourcing", "Campaign Management", "Performance Tracking"],
    results: ["Massive reach", "Authentic engagement"],
    cta: "Start Influencer Campaign",
    icon: Users,
    color: "bg-gold-500/10 text-gold-500"
  }
];

const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DigitalMarketingAgency",
    "name": "PROXIMAX",
    "url": "https://proximax.in",
    "logo": "https://proximax.in/logo.png",
    "image": "https://proximax.in/og-image.jpg",
    "description": "PROXIMAX is the best digital marketing agency in India, specializing in expert SEO services, GMB optimization, and local business growth strategies.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Simdega",
      "addressRegion": "Jharkhand",
      "postalCode": "835223",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.6234,
      "longitude": 84.4815
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 93415 79348",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/proximax",
      "https://twitter.com/proximax",
      "https://www.instagram.com/rajendar_rana_732/",
      "https://www.facebook.com/proximaxagency"
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Search Engine Optimization",
      "Google My Business Optimization",
      "Local SEO",
      "Social Media Marketing",
      "Lead Generation",
      "Digital Strategy"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Helmet>
          <title>PROXIMAX | Best Digital Marketing Agency in India | Expert SEO & GMB</title>
          <meta name="description" content="PROXIMAX is the best digital marketing agency in India. We specialize in expert SEO services, GMB optimization, and social media marketing to scale your local business. Get a free consultation today!" />
          <meta name="keywords" content="digital marketing agency india, best seo services, gmb optimization, local business growth, proximax, social media marketing india" />
          <link rel="canonical" href="https://proximax.in" />
          <meta property="og:title" content="PROXIMAX | Best Digital Marketing Agency in India" />
          <meta property="og:description" content="Scale your business with the best digital marketing agency in India. Expert SEO, GMB, and social media strategies." />
          <meta property="og:url" content="https://proximax.in" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="PROXIMAX | Best Digital Marketing Agency in India" />
          <meta name="twitter:description" content="Expert SEO and GMB optimization services to grow your local business in India." />
        </Helmet>
        <StructuredData />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<MainApp />} />
              <Route path="/blog/*" element={<MainApp />} />
              <Route path="/internship" element={<MainApp />} />
              <Route path="/influencer-apply" element={<MainApp />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

function MainApp() {
  const location = useLocation();
  const [view, setView] = useState<'agency' | 'internship' | 'blog' | 'influencer-apply'>('agency');
  const [homeBlogs, setHomeBlogs] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...formData,
          service: 'General Inquiry'
        })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/blog')) {
      setView('blog');
    } else if (path === '/internship') {
      setView('internship');
    } else if (path === '/influencer-apply') {
      setView('influencer-apply');
    } else {
      setView('agency');
    }
  }, [location.pathname]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setHomeBlogs(data.slice(0, 3)))
      .catch(err => console.error("Error fetching home blogs:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-text-muted selection:bg-gold-500/30 selection:text-white relative overflow-hidden">
      <MagicCursor />
      <FloatingBubbles />
      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-12"
          >
            <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" onClick={() => setSelectedService(null)} />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl max-h-full overflow-y-auto glass-premium"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Left Side: Visuals */}
                <div className="relative aspect-square lg:aspect-auto bg-[#0f0f0f] p-12 flex flex-col justify-center items-center text-center overflow-hidden">
                  {/* Magic Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-600/20 to-transparent z-0" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-600/5 rounded-full blur-[100px]" />
                  
                  {/* Magic Color Glow */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360],
                      backgroundColor: ["rgba(179, 155, 107, 0.1)", "rgba(137, 109, 77, 0.15)", "rgba(113, 90, 67, 0.1)"]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-0 blur-[120px]"
                  />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gold-600 text-white flex items-center justify-center mb-8 shadow-2xl shadow-gold-500/20 mx-auto">
                      <selectedService.icon className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-serif italic text-white mb-4 tracking-tight">{selectedService.title}</h2>
                    <p className="text-gold-400 tracking-luxury">Service Exploration</p>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="p-12 lg:p-16">
                  <h3 className="text-3xl font-serif italic text-white mb-6 leading-tight">{selectedService.headline}</h3>
                  <p className="text-text-muted mb-10 leading-relaxed font-sans">{selectedService.description}</p>
                  
                  <div className="space-y-10">
                    {/* Services List */}
                    <div>
                      <h4 className="tracking-luxury text-text-dim mb-4">Core Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.detailedServices.map((s, i) => (
                          <div key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gold-500" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button 
                      onClick={() => {
                        setSelectedService(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-sm uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3"
                    >
                      {selectedService.cta} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919341579348" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      >
        <WhatsAppIcon className="w-8 h-8" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-emerald-600 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-emerald-100">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-6",
        scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-premium px-8 py-4 rounded-full border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 group cursor-pointer" aria-label="PROXIMAX - Best Digital Marketing Agency">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-500/20 group-hover:scale-110 transition-transform" aria-hidden="true">P</div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Services', 'Blog', 'FAQ', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={item === 'Blog' ? '/blog' : (view === 'agency' ? `#${item.toLowerCase()}` : '/')} 
                title={`Go to ${item} section`}
                onClick={(e) => {
                  if (item === 'Blog') {
                    e.preventDefault();
                    setView('blog');
                    window.scrollTo(0, 0);
                    window.history.pushState({}, '', '/blog');
                    return;
                  }
                  if (view !== 'agency') {
                    e.preventDefault();
                    setView('agency');
                    window.history.pushState({}, '', '/');
                    setTimeout(() => {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={cn(
                  "tracking-luxury transition-colors",
                  (view === 'agency' && item !== 'Blog') || (view === 'blog' && item === 'Blog') ? "text-gold-500" : "text-text-dim hover:text-gold-500"
                )}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {
                setView('internship');
                window.scrollTo(0, 0);
                window.history.pushState({}, '', '/internship');
              }}
              title="View Digital Marketing Internship Opportunities"
              className={cn(
                "tracking-luxury transition-colors",
                view === 'internship' ? "text-gold-500" : "text-text-dim hover:text-gold-500"
              )}
            >
              Internship
            </button>
            <button 
              onClick={() => {
                setView('influencer-apply');
                window.scrollTo(0, 0);
                window.history.pushState({}, '', '/influencer-apply');
              }}
              title="Join PROXIMAX Influencer Network"
              className={cn(
                "tracking-luxury transition-colors",
                view === 'influencer-apply' ? "text-blue-500" : "text-text-dim hover:text-blue-500"
              )}
            >
              Influencer
            </button>
            <button 
              onClick={() => {
                setView('agency');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              title="Get Started with PROXIMAX Digital Marketing Services"
              className="bg-gold-600 text-white px-8 py-3 rounded-full tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Home', 'Services', 'Blog', 'FAQ', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Blog' ? '/blog' : (view === 'agency' ? `#${item.toLowerCase()}` : '/')} 
                  className="text-3xl font-bold text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item === 'Blog') {
                      setView('blog');
                      window.scrollTo(0, 0);
                      window.history.pushState({}, '', '/blog');
                      return;
                    }
                    if (view !== 'agency') {
                      setView('agency');
                      window.history.pushState({}, '', '/');
                      setTimeout(() => {
                        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setView('internship');
                  window.scrollTo(0, 0);
                  window.history.pushState({}, '', '/internship');
                }}
                className="text-3xl font-bold text-white text-left"
              >
                Internship
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setView('influencer-apply');
                  window.scrollTo(0, 0);
                  window.history.pushState({}, '', '/influencer-apply');
                }}
                className="text-3xl font-bold text-white text-left"
              >
                Influencer
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setView('agency');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'agency' && (
        <>
          {/* Hero Section */}
          <section id="home" className="relative pt-48 pb-32 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Main Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-gold-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-gold-900/10 rounded-full blur-[120px]" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(179,155,107,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 tracking-luxury mb-10 relative overflow-hidden group">
              <Sparkles className="w-3 h-3 animate-pulse" />
              The Gold Standard of Digital
            </div>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.85] text-white mb-10 tracking-tighter">
              Best Digital <br />
              <span className="text-gradient">Marketing Agency</span> <br />
              in India.
            </h1>
            <p className="text-xl text-text-muted mb-12 max-w-lg leading-relaxed font-sans font-light">
              PROXIMAX is the leading digital marketing agency in India for local business growth. We specialize in expert SEO services, GMB optimization, and lead generation for Real Estate, Jewellery, and Fashion brands.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                title="Get a Free Digital Marketing Growth Strategy for Your Local Business"
                className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center gap-3 group"
              >
                Get Free Growth Strategy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                title="Request a Free SEO & GMB Audit for Your Business"
                className="bg-white/5 text-white border border-white/10 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-white/10 transition-all flex items-center gap-3"
              >
                Free SEO Audit <Search className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            {/* Premium Glow Behind Banner */}
            <div className="absolute -inset-4 bg-gold-600/10 blur-[60px] rounded-[3rem] opacity-50" />
            
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(0,0,0,1)] group aspect-square bg-[#010101]">
              {/* Floating Icons for Magic Effect */}
              <motion.div 
                animate={{ y: [0, -25, 0], rotate: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 left-12 z-20 p-5 rounded-[1.5rem] bg-white/5 backdrop-blur-2xl border border-white/20 text-gold-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <TrendingUp className="w-10 h-10" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 25, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute bottom-12 right-12 z-20 p-5 rounded-[1.5rem] bg-white/5 backdrop-blur-2xl border border-white/20 text-gold-400 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <Target className="w-10 h-10" />
              </motion.div>
              <motion.div 
                animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-6 z-20 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-gold-600 shadow-2xl"
              >
                <Search className="w-8 h-8" />
              </motion.div>

              {/* Premium Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.25, 1],
                    rotate: [0, 8, 0],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-br from-gold-900/50 via-black to-gold-800/40"
                />
                
                {/* Liquid Gold Accents - High Intensity */}
                <motion.div 
                  animate={{ 
                    x: [-40, 40, -40],
                    y: [-40, 40, -40],
                    opacity: [0.2, 0.35, 0.2]
                  }}
                  transition={{ duration: 25, repeat: Infinity }}
                  className="absolute -top-60 -left-60 w-[250%] h-[250%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"
                />

                {/* Floating Geometric Outlines - Intricate Grid */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: i % 2 === 0 ? 360 : -360,
                      opacity: [0.03, 0.1, 0.03],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 30 + i * 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute border border-gold-500/10 rounded-full"
                    style={{
                      width: `${400 + i * 200}px`,
                      height: `${400 + i * 200}px`,
                      top: '50%',
                      left: '50%',
                      marginLeft: `-${200 + i * 100}px`,
                      marginTop: `-${200 + i * 100}px`,
                    }}
                  />
                ))}
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                {/* Animated Particles/Glows - Volumetric */}
                <motion.div 
                  animate={{ 
                    y: [0, -200, 0],
                    x: [0, 80, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/25 rounded-full blur-[140px]"
                />
                <motion.div 
                  animate={{ 
                    y: [0, 200, 0],
                    x: [0, -80, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 22, repeat: Infinity, delay: 5 }}
                  className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gold-500/20 rounded-full blur-[180px]"
                />

                {/* Star Particles - Denser */}
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    animate={{
                      opacity: [0.1, 1, 0.1],
                      scale: [0.8, 1.8, 0.8]
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 10
                    }}
                    className="absolute w-[1px] h-[1px] bg-gold-100 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Floating Icons with Enhanced Glassmorphism */}
              <motion.div
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] right-16 z-20 glass-premium p-5 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <Cpu className="w-8 h-8 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[15%] left-16 z-20 glass-premium p-5 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <ShieldCheck className="w-8 h-8 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="absolute top-[45%] right-24 z-20 glass-premium p-4 rounded-xl border border-white/20 backdrop-blur-2xl"
              >
                <Target className="w-6 h-6 text-gold-400" />
              </motion.div>

              {/* Animated Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="tracking-luxury text-gold-500 mb-12 block drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">The Agency of</span>
                </motion.div>
                
                <div className="relative group">
                  <motion.h2 
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-9xl md:text-[11rem] font-serif italic text-white mb-20 tracking-tighter leading-none relative"
                  >
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-gold-200 to-gold-600 drop-shadow-[0_0_60px_rgba(212,175,55,0.6)]">
                      PROXIMAX
                    </span>
                    
                    {/* Digital Glitch Layers - Refined */}
                    <motion.span
                      animate={{
                        x: [-3, 3, -3],
                        opacity: [0, 0.4, 0],
                      }}
                      transition={{
                        duration: 0.15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 3
                      }}
                      className="absolute inset-0 z-0 text-gold-500/40 blur-[3px] translate-x-1.5"
                    >
                      PROXIMAX
                    </motion.span>
                    
                    {/* Shimmer Effect - High Velocity */}
                    <motion.div
                      animate={{
                        x: ['-200%', '300%']
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5
                      }}
                      className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] blur-md"
                    />
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="flex flex-col gap-10"
                >
                  <div className="h-px w-64 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto opacity-70" />
                  <div className="flex items-center justify-center gap-8">
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
                    <p className="text-xl font-display font-black text-gold-500/90 uppercase tracking-[1em] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Local Business Growth</p>
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
                  </div>
                </motion.div>
              </div>
              
              {/* Luxury Overlays - High Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-[#010101]/60 opacity-90" />
              
              {/* Premium Badge - Large */}
              <div className="absolute top-12 left-12">
                <div className="glass-premium px-8 py-4 rounded-full border border-white/30 flex items-center gap-4 backdrop-blur-3xl shadow-2xl">
                  <div className="w-3 h-3 rounded-full bg-gold-500 animate-ping" />
                  <span className="tracking-luxury text-white">Elite Standard</span>
                </div>
              </div>

              {/* Bottom Right Seal - Large */}
              <div className="absolute bottom-12 right-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="relative w-24 h-24 flex items-center justify-center"
                >
                  <div className="absolute inset-0 border-2 border-gold-500/30 rounded-full border-dashed" />
                  <Award className="w-10 h-10 text-gold-500/70" />
                </motion.div>
              </div>
            </div>
            
            {/* Floating Stats - Enhanced Glassmorphism */}
            <div className="absolute -bottom-10 -left-10 glass-premium p-10 rounded-[2rem] z-20 shadow-2xl border border-white/10 backdrop-blur-2xl">
              <div className="text-6xl font-serif italic text-gold-500 mb-1 tracking-tighter">98%</div>
              <div className="text-text-dim tracking-luxury">Client Retention</div>
              <div className="mt-4 flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gold-500/40" />)}
              </div>
            </div>

            {/* Floating Element - Awards */}
            <div className="absolute -top-10 -right-10 glass-premium p-8 rounded-[2rem] z-20 shadow-2xl border border-white/10 backdrop-blur-2xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-serif italic text-white">Award Winning</div>
                  <div className="text-text-dim tracking-luxury">Excellence in Design</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USPs Section (Hidden visually but kept for SEO) */}
      <section className="sr-only" aria-hidden="false">
        <div className="max-w-7xl mx-auto px-6">
          <h2>PROXIMAX Unique Selling Points</h2>
          <div className="grid md:grid-cols-5 gap-12">
            {[
              { title: "Lead-Focused", desc: "We don't just get traffic; we get you customers." },
              { title: "GMB Experts", desc: "Dominate local search and show up when customers need you." },
              { title: "Niche Expertise", desc: "Specialized marketing for Real Estate, Jewellery, and Fashion." },
              { title: "Data-Driven", desc: "Transparent reporting and measurable ROI for every campaign." },
              { title: "Personalized", desc: "Dedicated experts who understand your local business goals." }
            ].map((usp, i) => (
              <div key={i} className="text-center">
                <div className="text-gold-500 font-display font-black uppercase tracking-widest text-[10px] mb-4">{usp.title}</div>
                <p className="text-text-muted text-xs leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <p className="text-gold-500 tracking-luxury mb-8 flex items-center gap-4">
                <div className="h-px w-8 bg-gold-500" /> SEO & Digital Marketing Services
              </p>
              <h2 className="text-6xl md:text-7xl font-serif italic text-white leading-[0.9] tracking-tighter">Expert SEO Services for <br /> Local Business Growth</h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-text-muted max-w-sm mb-4 font-sans font-light leading-relaxed"
            >
              Our digital marketing agency provides data-driven SEO and GMB optimization to help your business dominate local search results.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedService(service)}
                className="group p-12 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-700 cursor-pointer relative overflow-hidden"
              >
                {/* Magical Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-600/0 via-gold-600/0 to-gold-600/0 group-hover:from-gold-600/5 group-hover:via-transparent group-hover:to-gold-600/5 transition-all duration-700" />
                <div className="absolute -inset-px bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/0 group-hover:from-gold-500/20 group-hover:via-transparent group-hover:to-gold-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl blur-sm" />
                
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/5 rounded-full blur-[80px] group-hover:bg-gold-500/10 transition-all duration-700" />
                
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-12 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                  <service.icon className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-serif italic text-white mb-6 group-hover:text-gold-400 transition-colors">{service.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed mb-10 font-sans font-light">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-4 tracking-luxury text-gold-500 group-hover:gap-6 transition-all">
                  Explore Service <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      {/* Founder Section */}
      <section id="about" className="py-48 relative overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="bg-white p-10 rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-center max-w-[450px] w-full border border-gold-500/20 relative overflow-hidden group">
                {/* Magical Floating Icon */}
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 z-30 p-3 rounded-xl bg-gold-600 text-white shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px]" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px]" />
                
                <div className="relative mb-10 rounded-[20px] overflow-hidden border-[6px] border-[#f8f8f8] shadow-inner group">
                  <img 
                    src="1000077645.png" 
                    alt="Rajendar Rana - Founder of PROXIMAX, the best digital marketing agency in India" 
                    className="w-full h-auto transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://picsum.photos/seed/founder/800/1000";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                <h2 className="text-4xl font-serif italic text-[#1a1a1a] mb-3 tracking-tight">Rajendar Rana</h2>
                <p className="text-gold-600 tracking-luxury mb-10">Founder & CEO | Digital Strategist</p>
                
                <a 
                  href="#contact" 
                  className="inline-block bg-[#1a1a1a] text-gold-500 px-12 py-5 rounded-xl transition-all duration-500 hover:bg-gold-600 hover:text-white font-display font-black uppercase tracking-luxury text-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-gold-500/20 hover:-translate-y-1"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold-500 tracking-luxury mb-8">About PROXIMAX Agency</p>
              <h2 className="text-6xl font-serif italic text-white mb-10 leading-[0.9] tracking-tighter">The Best Digital Marketing <br /> Agency in India</h2>
              <p className="text-xl text-text-muted mb-10 leading-relaxed font-sans font-light">
                PROXIMAX is a premier digital marketing agency in India dedicated to helping local businesses scale. We are GMB experts and SEO specialists committed to delivering consistent leads and sustainable growth.
              </p>
              <blockquote className="border-l-2 border-gold-500 pl-10 py-4 mb-16">
                <p className="text-2xl text-white italic font-serif leading-relaxed opacity-90">
                  "Leads That Matter. Growth That Lasts. We don't just build websites; we build monuments of digital influence."
                </p>
              </blockquote>
              
              <div className="grid grid-cols-2 gap-16 mb-16">
                <div>
                  <div className="text-5xl font-serif italic text-white mb-3">10+</div>
                  <div className="text-text-dim tracking-luxury">Years of Vision</div>
                </div>
                <div>
                  <div className="text-5xl font-serif italic text-white mb-3">500+</div>
                  <div className="text-text-dim tracking-luxury">Masterpieces Delivered</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {[
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "https://www.instagram.com/xoxo_tweez?igsh=eWR2NHp3eWxianU5" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-text-dim hover:bg-gold-600 hover:text-white transition-all duration-500"
                  >
                    <social.Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-gold-500 tracking-luxury mb-8">SEO & GMB FAQs</p>
            <h2 className="text-6xl font-serif italic text-white tracking-tighter">Digital Marketing Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "GMB se clients kaise milte hain?",
                a: "GMB optimization se aapka business Google Maps par top par dikhta hai, jisse local customers aapko call ya visit karte hain jab wo aapki services search karte hain."
              },
              {
                q: "Result kitne din me milta hai?",
                a: "GMB aur Local SEO ka result usually 1-3 months me dikhne lagta hai. Agar aapko instant results chahiye, toh hum ads (Performance Marketing) suggest karte hain jo pehle din se leads de sakte hain."
              },
              {
                q: "Kya aap guarantee dete ho?",
                a: "Hum quality leads aur growth strategy ki commitment dete hain. Digital marketing me exact numbers ki guarantee dena mushkil hai, par hamara track record 98% client retention ka hai."
              },
              {
                q: "Price kya hai?",
                a: "Hamare plans aapki business needs ke hisaab se customized hote hain. Hum small businesses ke liye affordable packages se lekar enterprises ke liye premium solutions tak sab provide karte hain."
              },
              {
                q: "Kya small business ke liye useful hai?",
                a: "Bilkul! Local businesses ke liye GMB aur Local SEO sabse effective aur budget-friendly tarika hai apne area me dominate karne ka."
              },
              {
                q: "Kya mujhe website bhi chahiye?",
                a: "Website trust build karti hai, par agar aapke paas nahi hai toh hum GMB optimization aur high-converting landing pages se bhi aapka business grow kar sakte hain."
              },
              {
                q: "Kya aap monthly service dete ho?",
                a: "Haan, hum monthly management provide karte hain jisme hum aapki rankings maintain karte hain, naya content post karte hain aur leads track karte hain."
              },
              {
                q: "Kaise start kare?",
                a: "Bahut aasaan hai! Aap niche diye gaye 'Contact' form ko fill karein ya WhatsApp par message karein. Hum aapke business ka free audit karke ek custom plan banayenge."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section id="blog" className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <p className="text-gold-500 tracking-luxury mb-6">The Journal</p>
              <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">Latest Insights <br /> & Strategies</h2>
            </div>
            <button 
              onClick={() => { setView('blog'); window.scrollTo(0, 0); window.history.pushState({}, '', '/blog'); }}
              className="group flex items-center gap-4 text-white tracking-luxury hover:text-gold-500 transition-colors"
            >
              View All Articles <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {homeBlogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <button 
                  onClick={() => { setView('blog'); window.scrollTo(0, 0); window.history.pushState({}, '', `/blog/${blog.slug}`); }}
                  className="block text-left w-full space-y-6"
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-gold-500/30 transition-colors">
                    {/* Magical Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-600/0 via-gold-600/0 to-gold-600/0 group-hover:from-gold-600/10 group-hover:via-transparent group-hover:to-gold-600/10 transition-all duration-700 z-10 pointer-events-none" />
                    
                    <img 
                      src={blog.banner} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-[10px] font-display font-black uppercase tracking-luxury text-white bg-gold-600 px-4 py-1.5 rounded-full">{blog.category}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-display font-black uppercase tracking-luxury text-text-dim">{new Date(blog.date).toLocaleDateString()} • {blog.readTime} min read</p>
                    <h4 className="text-2xl font-serif italic text-white group-hover:text-gold-400 transition-colors line-clamp-2">{blog.title}</h4>
                    <p className="text-sm text-text-muted line-clamp-2 font-sans font-light">{blog.excerpt}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gold-600 to-gold-800 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-gold-900/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-10 tracking-tighter">Ready to Scale <br /> Your Influence?</h2>
              <p className="text-gold-100 text-xl mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed font-sans font-light">
                Join an elite circle of brands that have transformed their digital presence with PROXIMAX. Let's build your legacy together.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-gold-700 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-50 transition-all shadow-2xl"
                >
                  Request Consultation
                </button>
                <a 
                  href="https://wa.me/919341579348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-white border border-white/30 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Direct Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32">
            <div>
              <p className="text-gold-500 tracking-luxury mb-8">Contact PROXIMAX</p>
              <h2 className="text-6xl font-serif italic text-white mb-10 leading-[0.9] tracking-tighter">Start Your Digital <br /> Marketing Journey</h2>
              <p className="text-xl text-text-muted mb-16 leading-relaxed font-sans font-light">
                Ready to work with the best digital marketing agency in India? Contact us today for expert SEO services and GMB optimization.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-text-dim tracking-luxury mb-1">Email</p>
                    <p className="text-xl font-serif italic text-white">hello@proximax.in</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-text-dim tracking-luxury mb-1">Phone</p>
                    <p className="text-xl font-serif italic text-white">+91 93415 79348</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-text-dim tracking-luxury mb-1">Location</p>
                    <p className="text-xl font-serif italic text-white">Simdega, India (Remote)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] p-12 rounded-2xl border border-white/5 shadow-2xl relative">
              <form 
                className="space-y-8" 
                onSubmit={handleSubmit}
                name="contact"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="contact" />
                {submitStatus === 'success' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl text-center mb-8">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center mb-8">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="contactName" className="text-text-dim tracking-luxury ml-1">Full Name</label>
                    <input 
                      id="contactName"
                      name="name"
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="contactEmail" className="text-text-dim tracking-luxury ml-1">Email Address</label>
                    <input 
                      id="contactEmail"
                      name="email"
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="contactPhone" className="text-text-dim tracking-luxury ml-1">Phone Number (Optional)</label>
                  <input 
                    id="contactPhone"
                    name="phone"
                    type="tel" 
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="contactBudget" className="text-text-dim tracking-luxury ml-1">Your Budget</label>
                  <input 
                    id="contactBudget"
                    name="budget"
                    type="text" 
                    required
                    placeholder="e.g. ₹50,000 or $600"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                  />
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="contactMessage" className="text-text-dim tracking-luxury ml-1">Message</label>
                  <textarea 
                    id="contactMessage"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none font-sans"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3 group/submit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )}

  {view === 'internship' && <InternshipPage />}
  {view === 'influencer-apply' && <InfluencerApplyPage />}

  {view === 'blog' && (
    <div className="pt-32">
      <Routes>
        <Route index element={<BlogListPage />} />
        <Route path=":slug" element={<BlogPostPage />} />
      </Routes>
    </div>
  )}

  {/* Footer */}
      <footer className="bg-[#050505] text-text-dim pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-600/20">P</div>
              <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
            </div>
            <p className="text-sm leading-relaxed mb-10 text-text-muted font-sans font-light">
              Your premier digital growth partner. We combine creativity, technology, and data to deliver results that matter.
            </p>
            <div className="flex gap-6">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-gold-500 transition-colors">
                  <social.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white tracking-luxury mb-10">Company</h4>
            <ul className="space-y-6 tracking-luxury">
              {['Home', 'Services', 'Blog', 'Internship', 'Influencer', 'FAQ', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      if (item === 'Internship') {
                        setView('internship');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/internship');
                      } else if (item === 'Influencer') {
                        setView('influencer-apply');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/influencer-apply');
                      } else if (item === 'Blog') {
                        setView('blog');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/blog');
                      } else {
                        setView('agency');
                        window.history.pushState({}, '', '/');
                        setTimeout(() => {
                          document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="hover:text-gold-500 transition-colors text-left"
                    title={`Go to ${item} section`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white tracking-luxury mb-10">Solutions</h4>
            <ul className="space-y-6 tracking-luxury">
              {['SEO & GMB', 'Performance', 'Web Design', 'Social Media', 'Branding'].map(item => (
                <li key={item}><a href="#" className="hover:text-gold-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white tracking-luxury mb-10">Connect</h4>
            <ul className="space-y-8 text-sm font-sans font-light">
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-text-muted">hello@proximax.in</span>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-text-muted">+91 93415 79348</span>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-text-muted">Simdega, India<br />(Remote)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 tracking-luxury opacity-30">
          <p>© 2026 PROXIMAX Agency. All rights reserved.</p>
          <p>Designed for Digital Excellence</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect, Suspense, Component, ErrorInfo, ReactNode, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { 
  Check,
  ArrowUp
} from 'lucide-react';
import { FloatingBubbles } from './components/FloatingBubbles';
import { MagicCursor } from './components/MagicCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/icons/WhatsApp';

// Lazy load pages for performance
const AgencyPage = lazy(() => import('./components/AgencyPage'));
const BlogListPage = lazy(() => import('./components/BlogListPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const InfluencerApplyPage = lazy(() => import('./components/InfluencerApplyPage'));
const InternshipPage = lazy(() => import('./components/InternshipPage'));
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const CareersPage = lazy(() => import('./components/CareersPage'));
const AdminLoginPage = lazy(() => import('./components/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// Legal Pages
const PrivacyPolicy = lazy(() => import('./components/legal/LegalPages').then(m => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('./components/legal/LegalPages').then(m => ({ default: m.TermsConditions })));
const RefundPolicy = lazy(() => import('./components/legal/LegalPages').then(m => ({ default: m.RefundPolicy })));
const ShippingPolicy = lazy(() => import('./components/legal/LegalPages').then(m => ({ default: m.ShippingPolicy })));
const CompliancePage = lazy(() => import('./components/legal/LegalPages').then(m => ({ default: m.CompliancePage })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-gold-600/20 backdrop-blur-md border border-gold-500/30 rounded-full flex items-center justify-center text-gold-500 shadow-2xl hover:bg-gold-600 hover:text-white transition-all duration-300"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

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
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-2xl w-full glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-900/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-8 mx-auto">
            <Check className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-text-main mb-6 tracking-tighter">Thank You!</h1>
          <p className="text-xl text-text-muted font-sans font-light leading-relaxed mb-12">
            Your submission has been received. We appreciate your interest in PROXIMAX and will get back to you shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/919341579348" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform group"
  >
    <WhatsAppIcon className="w-8 h-8" />
    <div className="absolute right-full mr-4 px-4 py-2 bg-white rounded-lg text-black text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
      Chat with us!
    </div>
  </a>
);

const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PROXIMAX",
    "alternateName": "Proximax Agency",
    "url": "https://proximax.in",
    "logo": "https://proximax.in/logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/proximax",
      "https://twitter.com/proximax",
      "https://www.instagram.com/rajendar_rana_732/",
      "https://www.facebook.com/proximaxagency"
    ],
    "image": "https://proximax.in/og-image.jpg",
    "description": "PROXIMAX is a premier Performance Marketing Agency in India specializing in Lead Generation, SEO, and ROI focused digital strategies.",
    "brand": {
      "@type": "Brand",
      "name": "PROXIMAX",
      "logo": "https://proximax.in/logo.png"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith('/admin');

  if (isAdminPath) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-bg text-text-muted selection:bg-gold-500/30 selection:text-white relative overflow-hidden flex flex-col transition-colors duration-500">
      <MagicCursor />
      <FloatingBubbles />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTopButton />
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Helmet>
          <title>PROXIMAX | Best Digital Marketing Agency India | Lead Generation & SEO</title>
          <meta name="description" content="PROXIMAX is India's premier Performance Marketing Agency. We specialize in high-ROI Lead Generation, SEO Services, GMB Optimization, and Social Media Marketing to scale your business growth." />
          <meta name="keywords" content="Best Digital Marketing Agency India, Performance Marketing India, Lead Generation Agency, SEO Services India, GMB Optimization Expert, Digital Marketing for Real Estate, Jewellery Marketing Agency" />
          <link rel="canonical" href="https://proximax.in" />
          <meta name="author" content="PROXIMAX Team" />
          <meta name="robots" content="index, follow" />
          <link rel="alternate" hrefLang="en-in" href="https://proximax.in" />
        </Helmet>
        <StructuredData />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <MainLayout>
              <Routes>
                <Route path="/" element={<AgencyPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/internship" element={<InternshipPage />} />
                <Route path="/case-studies" element={<CaseStudyPage />} />
                <Route path="/influencer-apply" element={<InfluencerApplyPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/thank-you" element={<ThankYou />} />
                
                {/* Legal Routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/compliance" element={<CompliancePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </MainLayout>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

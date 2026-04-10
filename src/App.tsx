import React, { useState, useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { 
  Check,
  MessageSquare
} from 'lucide-react';
import { FloatingBubbles } from './components/FloatingBubbles';
import { MagicCursor } from './components/MagicCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import InfluencerApplyPage from './components/InfluencerApplyPage';
import AgencyPage from './components/AgencyPage';
import InternshipPage from './components/InternshipPage';
import CaseStudyPage from './components/CaseStudyPage';
import { WhatsAppIcon } from './components/icons/WhatsApp';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-900/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
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
    "@type": "DigitalMarketingAgency",
    "name": "PROXIMAX",
    "url": "https://proximax.in",
    "logo": "https://proximax.in/logo.png",
    "image": "https://proximax.in/og-image.jpg",
    "description": "PROXIMAX is the best digital marketing agency in India, specializing in expert SEO services, GMB optimization, lead generation, and performance marketing for Real Estate, Jewellery, and Fashion brands.",
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
    "priceRange": "₹₹",
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
      "Digital Strategy",
      "Performance Marketing",
      "Influencer Marketing"
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
          <title>PROXIMAX | Best Digital Marketing Agency in India | SEO & GMB Experts</title>
          <meta name="description" content="PROXIMAX is the best digital marketing agency in India. We specialize in expert SEO services, GMB optimization, and performance marketing to scale your local business. Get a free audit today!" />
          <meta name="keywords" content="digital marketing agency india, best seo services india, gmb optimization india, local business growth india, proximax agency, social media marketing india, lead generation services india" />
          <link rel="canonical" href="https://proximax.in" />
          <meta property="og:title" content="PROXIMAX | Best Digital Marketing Agency in India | SEO & GMB Experts" />
          <meta property="og:description" content="Scale your business with the best digital marketing agency in India. Expert SEO, GMB, and performance marketing strategies." />
          <meta property="og:url" content="https://proximax.in" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="PROXIMAX | Best Digital Marketing Agency in India | SEO & GMB Experts" />
          <meta name="twitter:description" content="Expert SEO and GMB optimization services to grow your local business in India. Scale your revenue with PROXIMAX." />
        </Helmet>
        <StructuredData />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <div className="min-h-screen bg-[#050505] text-text-muted selection:bg-gold-500/30 selection:text-white relative overflow-hidden">
              <MagicCursor />
              <FloatingBubbles />
              <Navbar />
              <Routes>
                <Route path="/" element={<AgencyPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/internship" element={<InternshipPage />} />
                <Route path="/case-studies" element={<CaseStudyPage />} />
                <Route path="/influencer-apply" element={<InfluencerApplyPage />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
              <Footer />
              <FloatingWhatsApp />
            </div>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

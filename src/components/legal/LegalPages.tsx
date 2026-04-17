import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, ShieldCheck } from 'lucide-react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode; lastUpdated: string }> = ({ title, children, lastUpdated }) => (
  <div className="min-h-screen bg-[#050505] pt-48 pb-32">
    <Helmet>
      <title>{title} | PROXIMAX</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-gold-500" />
          <span className="tracking-luxury text-gold-500">Legal Documents</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-6 leading-none">
          {title}
        </h1>
        <p className="text-text-dim text-sm tracking-luxury">Last Updated: {lastUpdated}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose prose-invert prose-gold max-w-none font-sans font-light text-slate-400 space-y-8 text-lg leading-relaxed"
      >
        {children}
        
        <div className="mt-20 pt-12 border-t border-white/5">
          <div className="glass-premium p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center text-gold-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-display text-sm">Legally Certified</p>
                <p className="text-text-dim text-xs">PROXIMAX Compliance Standard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-500" />
              <span className="text-white text-sm">legal@proximax.in</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="April 17, 2026">
    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">1. Introduction</h2>
      <p>At PROXIMAX, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">2. Information We Collect</h2>
      <p>We collect several types of information from and about users of our website, including:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Usage data (IP address, browser type, operating system, etc.)</li>
        <li>Interaction data from Google and Meta ads</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">3. How We Use Data</h2>
      <p>We use the information we collect to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide, operate, and maintain our services</li>
        <li>Improve, personalize, and expand our services</li>
        <li>Understand and analyze how you use our website</li>
        <li>Communicate with you for marketing and promotional purposes</li>
        <li>Find and prevent fraud</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">4. Data Protection & Security</h2>
      <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">5. Third-Party Tools</h2>
      <p>We use third-party analytics and advertising tools such as Google Analytics, Google Ads, and Meta Pixel to track website performance and serve targeted advertisements. These third-party services may use cookies and similar technologies.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">6. Cookies Usage</h2>
      <p>Our website uses cookies to enhance user experience. A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">7. User Rights</h2>
      <p>Depending on your location, you may have the following rights regarding your personal data:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>The right to access your data</li>
        <li>The right to rectification</li>
        <li>The right to erasure</li>
        <li>The right to object to processing</li>
      </ul>
    </section>
  </LegalLayout>
);

export const TermsConditions = () => (
  <LegalLayout title="Terms & Conditions" lastUpdated="April 17, 2026">
    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">1. Acceptance of Terms</h2>
      <p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">2. Services Overview</h2>
      <p>PROXIMAX provides performance marketing, SEO, lead generation, and other digital marketing services. The specific scope of services will be defined in a separate service agreement or project proposal.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">3. User Responsibilities</h2>
      <p>You are responsible for providing accurate information for the execution of campaigns and for ensuring that the content you provide for marketing does not violate any third-party rights.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">4. Payment Terms</h2>
      <p>Invoices are generated according to the agreed-upon billing cycle. Payments must be made within the timeframe specified on the invoice. Failure to pay may result in suspension of services.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">5. Limitation of Liability</h2>
      <p>PROXIMAX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">6. Intellectual Property</h2>
      <p>All content, strategies, and code developed by PROXIMAX remains the property of PROXIMAX until full payment is received, after which ownership of final deliverables is transferred to the client, excluding proprietary tools and methodologies.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">7. Termination of Services</h2>
      <p>Either party may terminate the service agreement with a 30-day written notice. Outstanding payments must be settled upon termination.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">8. Governing Law</h2>
      <p>These terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</p>
    </section>
  </LegalLayout>
);

export const RefundPolicy = () => (
  <LegalLayout title="Cancellation & Refund Policy" lastUpdated="April 17, 2026">
    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">1. Service Cancellation</h2>
      <p>Clients can cancel their ongoing subscription or project by providing a 30-day written notice. Any work performed up to the termination date will be billed accordingly.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">2. Refund Eligibility</h2>
      <p>Refunds are only applicable in cases where there is a clear failure on PROXIMAX's part to deliver the agreed-upon scope of work. Refund requests must be submitted within 7 days of the billing date.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">3. Non-refundable Services</h2>
      <p>The following categories are strictly non-refundable:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Third-party ad spends (Google Ads, Meta Ads, etc.)</li>
        <li>Domain registration and hosting fees</li>
        <li>Work already completed and approved by the client</li>
        <li>One-time setup fees</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">4. Processing Time</h2>
      <p>Approved refunds will be processed within 10–15 working days and will be credited using the original payment method or bank transfer.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">5. Contact</h2>
      <p>For refund requests, please email <strong>billing@proximax.in</strong> with your project details and reasons for the request.</p>
    </section>
  </LegalLayout>
);

export const ShippingPolicy = () => (
  <LegalLayout title="Shipping & Delivery Policy" lastUpdated="April 17, 2026">
    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">1. Digital Delivery</h2>
      <p>As PROXIMAX provides digital marketing and consultancy services, no physical shipping is involved. All deliverables, reports, and strategies are delivered electronically.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">2. Delivery Timelines</h2>
      <p>Standard delivery timelines for digital assets (e.g., logos, landing pages) range from 3–7 working days after all required inputs are received. Strategy implementation timelines may vary based on project scope.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">3. Communication Methods</h2>
      <p>All service delivery communications will be conducted through official email (hello@proximax.in), client dashboards, or verified WhatsApp business accounts.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">4. Delays Disclaimer</h2>
      <p>While we strive to meet all deadlines, delays may occur due to technical issues, third-party platform approvals (Google/Meta), or delays in receiving necessary inputs from the client.</p>
    </section>
  </LegalLayout>
);

export const CompliancePage = () => (
  <LegalLayout title="Compliance & Legal" lastUpdated="April 17, 2026">
    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">1. Business Compliance</h2>
      <p>PROXIMAX operates in full compliance with all relevant commercial laws in India. We maintain transparency in our business operations and billing practices.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">2. GST & Registration</h2>
      <p>We are a registered business entity. GST details are provided on all official invoices. Our registrations are maintained as per the guidelines of the Ministry of Corporate Affairs, India.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">3. Ad Policy Compliance</h2>
      <p>We strictly adhere to the advertising policies of major platforms including Google Ads, Meta Ads, and LinkedIn Ads. We do not engage in misleading or unethical advertising practices.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">4. Anti-Spam Policy</h2>
      <p>We do not support or engage in spamming activities. All outreach and marketing campaigns follow legitimate permission-based marketing protocols.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">5. Data Protection Compliance</h2>
      <p>We implement industry-standard data protection protocols to ensure that all client and user data remains private and secure.</p>
    </section>

    <section>
      <h2 className="text-2xl text-white font-serif italic mb-4">6. Ethical Marketing</h2>
      <p>PROXIMAX is committed to ethical marketing practices. We prioritize honesty, trust, and long-term client results over short-term gains.</p>
    </section>
  </LegalLayout>
);

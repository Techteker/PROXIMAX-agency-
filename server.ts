import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { blogs } from "./src/data/blogs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Content Data
  const agencyData = {
    services: [
      {
        id: "seo",
        title: "Search Engine Optimization",
        headline: "Dominate Search Results & Capture Organic Demand",
        description: "We engineer high-performance SEO strategies that elevate your brand to the pinnacle of search results, driving sustainable organic growth.",
        detailedServices: ["Strategic On-page SEO", "Authority Building (Off-page)", "Advanced Keyword Intelligence", "Technical Infrastructure Optimization"],
        process: "Audit → Architect → Accelerate",
        results: ["Market Dominance", "Elite Search Visibility", "High-Intent Lead Flow"],
        cta: "Request SEO Strategy",
        icon: "Search",
        color: "bg-gold-500/10 text-gold-500"
      },
      {
        id: "gmb",
        title: "GMB & Local Search Mastery",
        headline: "Command Your Local Market with Precision",
        description: "Strategic GMB optimization to ensure your business is the first choice for local customers on Google Maps and search.",
        detailedServices: ["GMB Engineering", "Local Search Dominance", "Reputation Management"],
        results: ["Peak Local Visibility", "Increased High-Intent Calls"],
        cta: "Dominate Local Search",
        icon: "MapPin",
        color: "bg-gold-400/10 text-gold-400"
      },
      {
        id: "smm",
        title: "Social Media Management",
        headline: "Cultivating Digital Influence & Brand Equity",
        description: "We curate sophisticated social media presences that resonate with your audience and build lasting brand loyalty.",
        detailedServices: ["Editorial Content Strategy", "Premium Visual Storytelling", "Strategic Community Engagement"],
        results: ["Enhanced Brand Influence", "Sophisticated Audience Growth"],
        cta: "Elevate Your Social Presence",
        icon: "Share2",
        color: "bg-gold-500/10 text-gold-500"
      },
      {
        id: "performance",
        title: "Performance Marketing",
        headline: "Engineered Growth via High-Precision Advertising",
        description: "Data-driven ad campaigns designed for maximum ROI, capturing demand and converting it into measurable business growth.",
        detailedServices: ["Meta & Instagram Ads", "Google Search & Display Ads", "Strategic Retargeting Frameworks"],
        results: ["Accelerated Lead Acquisition", "Optimized ROI"],
        cta: "Launch Growth Campaign",
        icon: "TrendingUp",
        color: "bg-gold-600/10 text-gold-600"
      },
      {
        id: "web",
        title: "Web Design & Digital Experience",
        headline: "Architecting High-Conversion Digital Storefronts",
        description: "We design and develop bespoke, responsive websites that serve as the cornerstone of your digital brand identity.",
        detailedServices: ["Bespoke Enterprise Websites", "High-Conversion Landing Pages", "Mobile-First Experience Design"],
        results: ["Superior Conversion Rates", "Elite Brand Presentation"],
        cta: "Architect Your Website",
        icon: "Layout",
        color: "bg-gold-500/10 text-gold-500"
      },
      {
        id: "whatsapp",
        title: "WhatsApp Marketing & Automation",
        headline: "Accelerate Conversions with Intelligent Automation",
        description: "Streamline your customer journey with sophisticated WhatsApp automation and intelligent chatbot frameworks.",
        detailedServices: ["Strategic Bulk Messaging", "Intelligent Workflow Automation", "AI Chatbot Integration"],
        results: ["Instantaneous Engagement", "Enhanced Conversion Velocity"],
        cta: "Automate Your Growth",
        icon: "WhatsApp",
        color: "bg-gold-500/10 text-gold-500"
      },
      {
        id: "leadgen",
        title: "Lead Generation & Sales Funnels",
        headline: "Consistent Acquisition of High-Value Prospects",
        description: "We build automated, high-performance sales funnels that deliver a steady stream of qualified leads to your business.",
        detailedServices: ["Strategic Funnel Architecture", "High-Impact Landing Pages", "Lead Nurturing Automation"],
        results: ["Predictable Lead Flow", "Automated Sales Velocity"],
        cta: "Scale Your Lead Flow",
        icon: "Target",
        color: "bg-gold-400/10 text-gold-400"
      },
      {
        id: "content",
        title: "Content Creation & Copywriting",
        headline: "Narratives That Compel & Convert",
        description: "We craft powerful, persuasive content that captures attention and drives meaningful audience action.",
        detailedServices: ["Strategic Ad Copywriting", "Premium Social Content", "Persuasive Website Narratives"],
        results: ["Heightened Engagement", "Superior Conversion Performance"],
        cta: "Craft Your Narrative",
        icon: "PenTool",
        color: "bg-gold-500/10 text-gold-500"
      },
      {
        id: "branding",
        title: "Branding & Identity Design",
        headline: "Defining Elite Business Identities",
        description: "We engineer distinctive brand identities that command respect and establish market authority.",
        detailedServices: ["Bespoke Logo Design", "Comprehensive Brand Systems", "Strategic Visual Identity"],
        results: ["Market Distinction", "Authoritative Brand Image"],
        cta: "Define Your Brand",
        icon: "Award",
        color: "bg-gold-600/10 text-gold-600"
      },
      {
        id: "influencer",
        title: "Influencer Marketing",
        headline: "Amplifying Reach via Strategic Partnerships",
        description: "We connect your brand with high-impact influencers to drive authentic engagement and massive market reach.",
        detailedServices: ["Strategic Influencer Sourcing", "Campaign Architecture", "Performance Analytics"],
        results: ["Exponential Market Reach", "Authentic Brand Advocacy"],
        cta: "Initiate Partnership",
        icon: "Users",
        color: "bg-gold-500/10 text-gold-500"
      }
    ],
    faqs: [
      {
        q: "How does GMB optimization generate leads?",
        a: "Strategic GMB optimization ensures your business appears at the pinnacle of local search results and Google Maps. This visibility captures high-intent customers exactly when they are searching for your specific services in your area."
      },
      {
        q: "What is the typical timeline for seeing results?",
        a: "While Local SEO and GMB optimization typically show significant traction within 1 to 3 months, our Performance Marketing strategies can generate high-quality leads almost immediately upon campaign launch."
      },
      {
        q: "Do you provide performance guarantees?",
        a: "We commit to delivering high-quality leads and a data-driven growth strategy. While the digital landscape is dynamic, our 98% client retention rate is a testament to the consistent ROI we deliver for our partners."
      },
      {
        q: "How do you determine your pricing structure?",
        a: "Our solutions are bespoke. We offer tailored packages ranging from foundational local SEO for emerging businesses to comprehensive, multi-channel growth engines for established enterprises."
      },
      {
        q: "Is digital marketing effective for smaller local businesses?",
        a: "Absolutely. For local businesses, GMB and Local SEO represent the most cost-effective and high-impact methods to establish market dominance and outcompete larger rivals in your specific territory."
      },
      {
        q: "Is a professional website necessary for growth?",
        a: "A website establishes authority and trust. However, we can also drive significant growth using GMB optimization and high-conversion landing pages if you are currently without a full site."
      },
      {
        q: "Do you offer ongoing management services?",
        a: "Yes, we provide comprehensive monthly management, ensuring your rankings are maintained, content is consistently refreshed, and lead flow is continuously optimized."
      },
      {
        q: "How do we initiate a partnership?",
        a: "The process is seamless. Simply submit the contact form or reach out via WhatsApp. Our team will perform a complimentary audit of your digital presence and architect a custom growth plan."
      }
    ],
    testimonials: [
      { name: "Anjali Sharma", role: "Digital Marketing Intern", text: "The hands-on experience I got at PROXIMAX was incredible. I learned more in 2 months than I did in a year of college." },
      { name: "Rahul Verma", role: "Web Dev Intern", text: "Working on real client websites gave me the confidence to build professional projects. The mentorship is top-notch." }
    ]
  };

  const internshipData = {
    roles: [
      { title: "Digital Marketing Residency", icon: "Target", desc: "Master the intricacies of SEO, GMB engineering, and performance marketing on high-stakes client accounts." },
      { title: "Strategic Lead Acquisition", icon: "Briefcase", desc: "Master the methodology of identifying and qualifying high-value enterprise prospects." },
      { title: "Business Development & Sales", icon: "ArrowRight", desc: "Cultivate persuasive communication and high-level negotiation skills in a professional environment." },
      { title: "Social Media Strategy", icon: "Instagram", desc: "Architect brand influence and sophisticated engagement frameworks across global platforms." },
      { title: "Full-Stack Digital Development", icon: "Cpu", desc: "Engineer high-conversion digital storefronts and sophisticated enterprise web solutions." }
    ],
    learningPoints: [
      "Advanced Google Business Profile (GMB) Engineering",
      "High-Performance Lead Acquisition Methodologies",
      "Executive Client Relations & Strategic Communication",
      "Elite SEO & Content Optimization Frameworks",
      "Sophisticated Social Influence & Automation",
      "Data-Driven Performance Marketing & ROI Optimization"
    ],
    benefits: [
      { title: "Professional Certification", icon: "Award" },
      { title: "High-Stakes Project Experience", icon: "Target" },
      { title: "Executive Letter of Recommendation", icon: "FileText" },
      { title: "Performance-Based Stipend", icon: "Sparkles" },
      { title: "Elite Career Opportunities", icon: "Briefcase" }
    ],
    faqs: [
      { q: "Is this a compensated residency?", a: "We provide performance-based stipends to elite residents who deliver exceptional value and measurable results for our partners." },
      { q: "Will I receive official accreditation?", a: "Yes, every resident receives an official certification of completion from PROXIMAX upon successful conclusion of the program." },
      { q: "What is the expected time commitment?", a: "We offer flexible engagement models to accommodate academic schedules, allowing you to balance professional growth with your studies." },
      { q: "What is the selection criteria?", a: "Selection is based on a rigorous review of your application, demonstrated motivation, and a strategic introductory interview." }
    ]
  };

  // API Routes
  app.get("/api/home", (req, res) => {
    res.json({
      hero: {
        title: "Grow Your Local Business with Leads.",
        subtitle: "We help Real Estate, Jewellery, and Fashion brands dominate their local market with expert SEO and GMB strategies."
      }
    });
  });

  app.get("/api/services", (req, res) => {
    res.json(agencyData.services);
  });

  app.get("/api/faq", (req, res) => {
    res.json(agencyData.faqs);
  });

  app.get("/api/testimonials", (req, res) => {
    res.json(agencyData.testimonials);
  });

  app.get("/api/internship-details", (req, res) => {
    res.json(internshipData);
  });

  // Blog API Routes
  console.log(`Loaded ${blogs.length} blogs from data source.`);
  
  // Pre-calculate readTime for all blogs
  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const cachedBlogList = blogs.map(({ content, ...rest }) => ({
    ...rest,
    readTime: getReadTime(content || '')
  }));

  app.get("/api/blogs", (req, res) => {
    // Return the pre-calculated list for speed
    res.json(cachedBlogList);
  });

  app.get("/api/blogs/:slug", (req, res) => {
    const blog = blogs.find(b => b.slug === req.params.slug);
    if (blog) {
      res.json({
        ...blog,
        readTime: getReadTime(blog.content || '')
      });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  });

  // API Route for sending email
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, budget, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "rajendarrana732@gmail.com",
      subject: `New Inquiry from ${name} - PROXIMAX Agency`,
      text: `
        Name: ${name}
        Email: ${email}
        Service: ${service}
        Budget: ${budget}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #D4AF37;">New Inquiry from ${name}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("EMAIL_USER or EMAIL_PASS not set. Email not sent.");
        return res.status(200).json({ 
          success: true, 
          message: "Form received (Email not sent due to missing configuration)." 
        });
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  });

  // API Route for internship application
  app.post("/api/internship", async (req, res) => {
    const { name, phone, email, college, role, motivation } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "rajendarrana732@gmail.com",
      subject: `New Internship Application: ${role} - ${name}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        College: ${college}
        Role: ${role}
        Motivation: ${motivation}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #D4AF37;">New Internship Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>College:</strong> ${college}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Motivation:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${motivation}</p>
        </div>
      `,
    };

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("EMAIL_USER or EMAIL_PASS not set. Email not sent.");
        return res.status(200).json({ 
          success: true, 
          message: "Application received (Email not sent due to missing configuration)." 
        });
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Application sent successfully!" });
    } catch (error) {
      console.error("Error sending internship email:", error);
      res.status(500).json({ success: false, message: "Failed to send application." });
    }
  });

  // Explicit routes for SPA navigation
  const spaRoutes = ["/", "/home", "/services", "/faq", "/about", "/contact", "/internship", "/blog", "/blog/:slug"];
  spaRoutes.forEach(route => {
    app.get(route, (req, res, next) => {
      if (process.env.NODE_ENV === "production") {
        res.sendFile(path.join(process.cwd(), "dist", "index.html"));
      } else {
        next(); // Let Vite handle it in dev
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

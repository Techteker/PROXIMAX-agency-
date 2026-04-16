import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ALL_BLOGS as blogs } from "./src/data/blogs";

console.log("Starting server.ts...");
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Loaded ${blogs.length} blogs.`);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Custom Header for Verification
  app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "PROXIMAX-Server");
    next();
  });

  // Request Logging
  app.use("/api", (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", blogsLoaded: blogs.length });
  });

  // Blog API Routes
  console.log(`Loaded ${blogs.length} blogs from data source.`);
  
  const getReadTime = (content: string) => {
    const words = (content || '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const cachedBlogList = blogs.map(({ content, ...rest }) => ({
    ...rest,
    readTime: getReadTime(content || '')
  }));

  app.get("/api/blogs", (req, res) => {
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

  // Catch-all for API routes to ensure they return JSON
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: "API route not found" });
  });

  // Content Data
  const agencyData = {
    services: [
      {
        id: "seo",
        title: "SEO (On-page & Off-page)",
        headline: "Rank Your Website on Google & Get More Traffic",
        description: "We help your website rank higher on Google using proven SEO strategies.",
        detailedServices: ["On-page SEO", "Off-page SEO", "Keyword Research", "Technical SEO"],
        process: "Audit → Optimize → Rank",
        results: ["More traffic", "Higher rankings", "More leads"],
        cta: "Get Free SEO Audit",
        icon: "Search",
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
        icon: "MapPin",
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
        icon: "Share2",
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
        icon: "TrendingUp",
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
        icon: "Layout",
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
        icon: "WhatsApp",
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
        icon: "Target",
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
        icon: "PenTool",
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
        icon: "Award",
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
        icon: "Users",
        color: "bg-gold-500/10 text-gold-500"
      }
    ],
    faqs: [
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
    ],
    testimonials: [
      { name: "Anjali Sharma", role: "Digital Marketing Intern", text: "The hands-on experience I got at PROXIMAX was incredible. I learned more in 2 months than I did in a year of college." },
      { name: "Rahul Verma", role: "Web Dev Intern", text: "Working on real client websites gave me the confidence to build professional projects. The mentorship is top-notch." }
    ]
  };

  const internshipData = {
    roles: [
      { title: "Digital Marketing Intern", icon: "Target", desc: "Master SEO, GMB, and performance marketing on real client projects." },
      { title: "Lead Generation Intern", icon: "Briefcase", desc: "Learn the art of finding and qualifying high-value prospects." },
      { title: "Sales Intern", icon: "ArrowRight", desc: "Develop persuasive communication and closing skills." },
      { title: "Social Media Manager", icon: "Instagram", desc: "Build brand presence and engagement across all platforms." },
      { title: "Web Development Intern", icon: "Cpu", desc: "Create high-converting landing pages and business websites." }
    ],
    learningPoints: [
      "Google Business Profile (GMB) Mastery",
      "High-Quality Lead Generation Strategies",
      "Professional Client Handling & Communication",
      "SEO & Content Optimization Techniques",
      "Social Media Growth & Automation",
      "Performance Marketing & Ad Campaigns"
    ],
    benefits: [
      { title: "Official Certificate", icon: "Award" },
      { title: "Real Project Experience", icon: "Target" },
      { title: "Letter of Recommendation", icon: "FileText" },
      { title: "Performance Stipend", icon: "Sparkles" },
      { title: "Job Opportunities", icon: "Briefcase" }
    ],
    faqs: [
      { q: "Is this a paid internship?", a: "We offer performance-based stipends to top performers who deliver exceptional results for our clients." },
      { q: "Will I get a certificate?", a: "Yes, every intern receives an official internship completion certificate from PROXIMAX." },
      { q: "What are the timings?", a: "We offer flexible timings to accommodate students. You can choose your working hours." },
      { q: "How are interns selected?", a: "Selection is based on your application, motivation, and a short introductory interview." }
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

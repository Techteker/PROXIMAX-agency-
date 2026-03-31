import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route for sending email
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, budget, message, auth: clientAuth } = req.body;

    // Use client-provided auth if available, otherwise fallback to environment variables
    const emailUser = clientAuth?.user || process.env.EMAIL_USER;
    const emailPass = clientAuth?.pass || process.env.EMAIL_PASS;
    const recipientEmail = clientAuth?.recipient || process.env.RECIPIENT_EMAIL || "rajendarrana732@gmail.com";

    if (!emailUser || !emailPass) {
      console.warn("Email credentials not provided.");
      return res.status(400).json({ 
        success: false, 
        message: "Email configuration missing. Please set it up in the app settings." 
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: recipientEmail,
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
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email. Check your credentials." });
    }
  });

  // API Route for Internship Form
  app.post("/api/internship", async (req, res) => {
    const { name, phone, email, college, role, motivation, auth: clientAuth } = req.body;

    // Use client-provided auth if available, otherwise fallback to environment variables
    const emailUser = clientAuth?.user || process.env.EMAIL_USER;
    const emailPass = clientAuth?.pass || process.env.EMAIL_PASS;
    const recipientEmail = clientAuth?.recipient || process.env.RECIPIENT_EMAIL || "rajendarrana732@gmail.com";

    if (!emailUser || !emailPass) {
      console.warn("Email credentials not provided.");
      return res.status(400).json({ 
        success: false, 
        message: "Email configuration missing. Please set it up in the app settings." 
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: recipientEmail,
      subject: `New Internship Application from ${name} - PROXIMAX`,
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
          <h2 style="color: #D4AF37;">New Internship Application: ${name}</h2>
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
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Internship application sent successfully!" });
    } catch (error) {
      console.error("Error sending internship email:", error);
      res.status(500).json({ success: false, message: "Failed to send application email. Check your credentials." });
    }
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

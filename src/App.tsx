import React from 'react';
import emailjs from '@emailjs/browser';

/**
 * PROXIMAX Simple Functional Website
 * This component provides three forms: Contact, Internship, and Influencer.
 * It uses EmailJS for form submission as per the user's requirements.
 * No styling or UI/UX design is applied to maintain the basic HTML structure.
 */
export default function App() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // EmailJS integration requirements:
    // Public Key: rjOxQ70915IIF0uSP
    // Service ID: service_ind0oyk
    // Template ID: template_f9lvw8e
    emailjs.sendForm(
      'service_ind0oyk',
      'template_f9lvw8e',
      form,
      'rjOxQ70915IIF0uSP'
    )
    .then((result) => {
        console.log('SUCCESS!', result.text);
        alert('Message sent successfully!');
        form.reset();
    }, (error) => {
        console.log('FAILED...', error.text);
        alert('Failed to send message. Please try again.');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PROXIMAX</h1>

      {/* 1. Contact Form */}
      <section>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="form_type" value="Contact" />
          
          <div>
            <label htmlFor="contact-name">Full Name:</label><br />
            <input type="text" id="contact-name" name="name" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="contact-email">Email Address:</label><br />
            <input type="email" id="contact-email" name="email" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="contact-phone">Phone Number:</label><br />
            <input type="tel" id="contact-phone" name="phone" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="contact-service">Service:</label><br />
            <select id="contact-service" name="service" required>
              <option value="">Select a Service</option>
              <option value="SEO & GMB Optimization">SEO & GMB Optimization</option>
              <option value="Website Development">Website Development</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="Performance Ads">Performance Ads</option>
              <option value="Branding & Design">Branding & Design</option>
            </select>
          </div>
          <br />
          
          <div>
            <label htmlFor="contact-budget">Budget Range:</label><br />
            <input type="text" id="contact-budget" name="budget" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="contact-message">Message:</label><br />
            <textarea id="contact-message" name="message" required></textarea>
          </div>
          <br />
          
          <button type="submit">Submit Contact</button>
        </form>
      </section>

      <hr />

      {/* 2. Internship Application Form */}
      <section>
        <h2>Internship Application Form</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="form_type" value="Internship" />
          
          <div>
            <label htmlFor="intern-name">Full Name:</label><br />
            <input type="text" id="intern-name" name="name" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="intern-phone">Phone:</label><br />
            <input type="tel" id="intern-phone" name="phone" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="intern-email">Email Address:</label><br />
            <input type="email" id="intern-email" name="email" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="intern-college">College/University:</label><br />
            <input type="text" id="intern-college" name="college" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="intern-role">Role:</label><br />
            <select id="intern-role" name="role" required>
              <option value="">Select a Role</option>
              <option value="Digital Marketing Intern">Digital Marketing Intern</option>
              <option value="Sales Intern">Sales Intern</option>
              <option value="Content Creator">Content Creator</option>
            </select>
          </div>
          <br />
          
          <div>
            <label htmlFor="intern-message">Message:</label><br />
            <textarea id="intern-message" name="message" required></textarea>
          </div>
          <br />
          
          <button type="submit">Submit Internship Application</button>
        </form>
      </section>

      <hr />

      {/* 3. Influencer Application Form */}
      <section>
        <h2>Influencer Application Form</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="form_type" value="Influencer" />
          
          <div>
            <label htmlFor="influencer-name">Full Name:</label><br />
            <input type="text" id="influencer-name" name="name" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-email">Email Address:</label><br />
            <input type="email" id="influencer-email" name="email" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-phone">WhatsApp Number:</label><br />
            <input type="tel" id="influencer-phone" name="phone" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-city">City:</label><br />
            <input type="text" id="influencer-city" name="city" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-platform">Platform:</label><br />
            <select id="influencer-platform" name="platform" required>
              <option value="">Select a Platform</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-profile">Profile Link:</label><br />
            <input type="url" id="influencer-profile" name="profile" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-followers">Followers Count:</label><br />
            <input type="text" id="influencer-followers" name="followers" required />
          </div>
          <br />
          
          <div>
            <label htmlFor="influencer-message">Message:</label><br />
            <textarea id="influencer-message" name="message" required></textarea>
          </div>
          <br />
          
          <button type="submit">Submit Influencer Application</button>
        </form>
      </section>
    </div>
  );
}


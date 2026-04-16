import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import App from './App.tsx';
import './index.css';

// Initialize EmailJS
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (publicKey) {
  emailjs.init(publicKey);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

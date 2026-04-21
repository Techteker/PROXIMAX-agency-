import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { login } from '../services/supabaseService';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || 'Oops! Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF2F8] flex items-center justify-center px-6 py-20 relative overflow-hidden font-sans">
      {/* Cute Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-pink-200/50 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-200/50 rounded-full blur-[80px]" />
      
      {/* Floating Sparkles */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20 text-pink-400"
      >
        <Sparkles size={40} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-20 text-purple-400"
      >
        <Star size={32} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white shadow-[0_20px_50px_rgba(255,182,193,0.3)] p-10 md:p-12 rounded-[3.5rem] border-4 border-white relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shadow-inner">
            <Heart className="w-10 h-10 fill-current" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif italic text-pink-600 mb-2 tracking-tight">Admin Love</h1>
          <p className="text-pink-400/80 text-[10px] uppercase tracking-[0.2em] font-black italic">Welcome Back, Sweetie!</p>
        </div>

        {error && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-6 p-4 rounded-3xl bg-red-50 border border-red-100 text-red-400 text-[11px] text-center font-bold"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] text-pink-400 uppercase tracking-widest font-black ml-4">Your Magic Email</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@proximax.in"
                className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-3xl py-5 pl-14 pr-8 text-pink-600 text-sm focus:border-pink-300 focus:bg-white outline-none transition-all placeholder:text-pink-200 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] text-pink-400 uppercase tracking-widest font-black ml-4">Your Secret Heart</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-3xl py-5 pl-14 pr-8 text-pink-600 text-sm focus:border-pink-300 focus:bg-white outline-none transition-all placeholder:text-pink-200 shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white py-6 rounded-3xl text-[11px] uppercase tracking-[0.2em] font-black flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(244,63,94,0.3)] disabled:opacity-50"
          >
            {loading ? 'Opening Vault...' : (
              <>Let's Go! <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px bg-pink-100 flex-grow" />
          <Sparkles className="text-pink-200 w-4 h-4" />
          <div className="h-px bg-pink-100 flex-grow" />
        </div>
        
        <p className="mt-6 text-center text-[8px] text-pink-300 uppercase tracking-widest font-black italic">
          High Performance • Cute Backend
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;

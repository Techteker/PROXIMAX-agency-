import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  LogOut, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  CloudUpload,
  UserCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  signOut, 
  fetchFounderInfo, 
  upsertFounderInfo, 
  uploadFounderImage 
} from '../services/supabaseService';

const AdminDashboard = () => {
  const [founder, setFounder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Initial check
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      setAuthChecking(false);
      loadData();
    };

    checkUser();

    // 2. Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchFounderInfo();
      setFounder(data);
    } catch (err) {
      console.error(err);
      setError('Could not get your info, sweetie!');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setSaving(true);
    setError('');
    setMessage('');
    
    const progressInterval = simulateProgress();
    
    try {
      // 1. Upload
      const url = await uploadFounderImage(e.target.files[0]);
      
      // 2. Save directly (Upsert)
      const updatedData = await upsertFounderInfo({
        ...(founder || {}),
        image_url: url
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setFounder(updatedData);
      setMessage('Yay! Picture updated perfectly! ✨');
      
      setTimeout(() => setUploadProgress(0), 3000);
    } catch (err: any) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setError(err.message || 'Oh no, upload failed!');
    } finally {
      setSaving(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-pink-500 mb-8"
        >
          <Heart size={64} fill="currentColor" />
        </motion.div>
        <p className="text-pink-600 font-black text-xs uppercase tracking-[0.3em] animate-pulse italic">Verifying Love...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 transition-all duration-1000">
        <div className="w-20 h-20 border-8 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-8 shadow-xl" />
        <p className="text-pink-500 tracking-[0.2em] font-black uppercase text-[10px]">Loading Sweetness...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF2F8] flex flex-col font-sans selection:bg-pink-200">
      {/* Cute Header */}
      <header className="bg-white/80 border-b-2 border-pink-100 px-8 py-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-100 rounded-2xl shadow-sm">
            <UserCircle className="w-8 h-8 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl font-serif italic text-pink-600 leading-none">Sweet Control</h1>
            <p className="text-[10px] text-pink-400 uppercase tracking-widest font-black mt-2 italic">Founder Portal</p>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 text-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-3xl border-2 border-pink-100 bg-white shadow-sm"
        >
          <LogOut size={16} /> Goodbye!
        </button>
      </header>

      <main className="flex-grow p-8 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
        {/* Status Messages */}
        <div className="w-full max-w-md mx-auto mb-10 h-16">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-100 text-emerald-600 text-sm flex items-center justify-center gap-3 font-black shadow-lg"
              >
                <CheckCircle2 size={22} className="flex-shrink-0" /> {message}
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 rounded-3xl bg-pink-50 border-2 border-rose-100 text-rose-500 text-sm flex items-center justify-center gap-3 font-black shadow-lg"
              >
                <AlertCircle size={22} className="flex-shrink-0" /> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Upload Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white shadow-[0_30px_100px_rgba(255,182,193,0.4)] p-12 md:p-16 rounded-[4rem] border-4 border-white relative text-center"
        >
          <div className="absolute -top-12 -left-12 opacity-50 rotate-[-15deg] pointer-events-none">
            <Sparkles size={80} className="text-pink-200" />
          </div>
          
          <div className="relative mb-12 flex flex-col items-center">
            <h2 className="text-4xl font-serif italic text-pink-600 mb-2 tracking-tight">Your Portrait</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-pink-400 to-rose-300 rounded-full mb-4" />
            <span className="text-[9px] text-pink-300 font-black uppercase tracking-[0.3em]">Current Live Picture</span>
          </div>

          {/* Profile Image Section */}
          <div className="relative group mx-auto w-64 h-64 mb-10">
            <div className="w-full h-full rounded-[3.5rem] overflow-hidden border-4 border-pink-100 shadow-2xl relative bg-pink-50">
              <img 
                src={founder?.image_url || 'https://via.placeholder.com/400'} 
                alt="Founder Portrait" 
                className={`w-full h-full object-cover transition-all duration-700 ${saving ? 'opacity-30 blur-sm scale-110' : 'group-hover:scale-105'}`}
                referrerPolicy="no-referrer"
              />
              
              {saving && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mb-4"
                  />
                  <div className="px-4 w-full">
                    <div className="h-1.5 w-full bg-pink-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-pink-500"
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-pink-600 font-black uppercase tracking-widest">{Math.round(uploadProgress)}%</p>
                  </div>
                </div>
              )}
            </div>
            
            <label className={`absolute -bottom-4 -right-4 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-pink-600 hover:scale-110 transition-all z-20 ${saving ? 'opacity-50 pointer-events-none shadow-none' : ''}`}>
              <Camera size={28} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
                disabled={saving}
              />
            </label>
          </div>

          <div className="space-y-6">
            <p className="text-pink-400 text-[11px] font-black uppercase tracking-widest leading-relaxed">
              Step 1: Click the camera icon <br />
              Step 2: Choose your beautiful photo <br />
              Step 3: Magic happens! ✨
            </p>
            
            <div className="pt-8">
              <label className={`w-full btn-premium py-6 rounded-[2.5rem] bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-[0_15px_35px_rgba(244,63,94,0.4)] flex items-center justify-center gap-4 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all text-xs font-black uppercase tracking-luxury ${saving ? 'opacity-50 pointer-events-none' : ''}`}>
                <CloudUpload size={20} /> {saving ? 'Magic in progress...' : 'Upload New Portrait'}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={saving} />
              </label>
            </div>
          </div>

          <p className="mt-12 text-[8px] text-pink-200 uppercase tracking-widest font-black italic">
            Securely Saving to Supabase Cloud
          </p>
        </motion.div>

        {/* Decoration */}
        <div className="mt-20 flex items-center gap-8 text-pink-200 opacity-50">
          <Heart size={20} />
          <div className="w-24 h-px bg-pink-100" />
          <Sparkles size={20} />
          <div className="w-24 h-px bg-pink-100" />
          <Heart size={20} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  MousePointer2, 
  Users, 
  Phone, 
  MessageSquare,
  Search,
  Eye,
  MousePointerClick,
  BarChart3,
  Sparkles
} from 'lucide-react';

interface CaseStudyVisualProps {
  id: string;
}

const CaseStudyVisual: React.FC<CaseStudyVisualProps> = ({ id }) => {
  // Variant 0: Real Estate Leads (cs1)
  if (id === 'cs1') {
    return (
      <div className="w-full bg-slate-900 rounded-2xl p-6 border border-white/5 relative overflow-hidden font-sans shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-600/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <p className="text-[10px] text-text-dim uppercase tracking-widest font-black">Lead Generation Dashboard</p>
              <p className="text-sm text-white font-bold">Real Estate Inquiry Growth</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 text-xs font-bold leading-none">+300%</span>
            <p className="text-[8px] text-text-dim uppercase">Conversion Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <p className="text-[8px] text-text-dim uppercase mb-1">Total Leads (21 Days)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white italic">42</span>
              <span className="text-[10px] text-emerald-400 font-bold">Verified</span>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <p className="text-[8px] text-text-dim uppercase mb-1">Cost Per Lead</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white italic">₹312</span>
              <span className="text-[10px] text-emerald-400 font-bold">-30%</span>
            </div>
          </div>
        </div>

        <div className="relative h-24 flex items-end gap-1 px-2 mb-2">
          {[15, 22, 28, 35, 42, 38, 45, 55, 62, 70, 75, 82, 88, 95].map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${val}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-1 bg-gold-600/30 rounded-t-sm"
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10" />
        </div>
        <div className="flex justify-between px-2 text-[8px] text-text-dim uppercase tracking-widest">
          <span>Day 1</span>
          <span>Day 10</span>
          <span>Day 21</span>
        </div>
      </div>
    );
  }

  // Variant 0.5: Jewellery Store (cs2)
  if (id === 'cs2') {
    return (
      <div className="w-full bg-[#1c1c1e] rounded-2xl p-6 border border-white/10 relative overflow-hidden font-sans">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gold-600/10 flex items-center justify-center border border-gold-600/20">
            <Search className="w-5 h-5 text-gold-500" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black italic">Google Maps Insights</p>
            <p className="text-sm text-zinc-100 font-bold">Local Store Visits</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-zinc-300">"Jewellery shop near me"</span>
            </div>
            <span className="text-xs font-black text-white italic">#1 Ranking</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-zinc-300">"Gold showroom in [City]"</span>
            </div>
            <span className="text-xs font-black text-white italic">#1 Ranking</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gold-600/5 rounded-2xl border border-gold-600/10">
            <p className="text-[8px] text-zinc-500 uppercase mb-1">Walk-in Growth</p>
            <p className="text-2xl font-black text-gold-500 italic">+60%</p>
          </div>
          <div className="text-center p-4 bg-gold-600/5 rounded-2xl border border-gold-600/10">
            <p className="text-[8px] text-zinc-500 uppercase mb-1">Monthly Views</p>
            <p className="text-2xl font-black text-gold-500 italic">45k+</p>
          </div>
        </div>
      </div>
    );
  }

  // Variant 1: GMB Success (cs5 - Healthcare)
  if (id === 'cs5') {
    return (
      <div className="w-full bg-slate-950 rounded-2xl p-6 border border-white/5 relative overflow-hidden font-sans">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Search className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-text-dim uppercase tracking-widest font-black">Google My Business</p>
              <p className="text-sm text-white font-bold">Profile Interactions</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +52.4%
            </span>
            <p className="text-[8px] text-text-dim uppercase">Last 90 Days</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-1 h-32 mb-6">
          {[35, 42, 38, 45, 52, 58, 65, 72, 68, 75, 82, 88].map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${val}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 1 }}
              className="flex-grow bg-blue-500/40 rounded-t-sm relative group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[8px] py-0.5 px-1 rounded font-bold">
                {val}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
          <div className="text-center">
            <p className="text-white text-lg font-black italic">642</p>
            <p className="text-[8px] text-text-dim uppercase flex items-center justify-center gap-1"><Phone className="w-2 h-2" /> Calls</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-black italic">891</p>
            <p className="text-[8px] text-text-dim uppercase flex items-center justify-center gap-1"><MousePointer2 className="w-2 h-2" /> Web Clicks</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-black italic">1.2k</p>
            <p className="text-[8px] text-text-dim uppercase flex items-center justify-center gap-1"><Search className="w-2 h-2" /> Directions</p>
          </div>
        </div>
      </div>
    );
  }

  // Variant 2: Ads Performance (cs6 - Interior Design)
  if (id === 'cs6') {
    return (
      <div className="w-full bg-[#18191c] rounded-2xl p-6 border border-white/5 relative overflow-hidden font-sans shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0668E1] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Meta Ads Manager</p>
              <p className="text-xs text-zinc-300">Campaign: Luxury_Design_Scale_Q1</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-bold uppercase tracking-widest">
            Active
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead className="text-zinc-500 border-b border-white/5 uppercase">
              <tr>
                <th className="pb-3 font-normal">Metric</th>
                <th className="pb-3 font-normal text-right">Value</th>
                <th className="pb-3 font-normal text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/5">
                <td className="py-3">Amount Spent</td>
                <td className="py-3 text-right">₹48,250</td>
                <td className="py-3 text-right text-emerald-400 font-bold" rowSpan={3}>12.4x</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3">Clicks (Link)</td>
                <td className="py-3 text-right">3,124</td>
              </tr>
              <tr>
                <td className="py-3">On-Facebook Leads</td>
                <td className="py-3 text-right font-bold text-white text-xs">158</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[8px] text-zinc-500 uppercase">Cost Per Lead</p>
            <p className="text-xs text-white font-bold">₹305.37</p>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '85%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // Variant 3: WhatsApp Funnel (cs7 - Car Rental)
  if (id === 'cs7') {
    return (
      <div className="w-full bg-[#0b141a] rounded-3xl p-6 border border-[#202c33] relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#00a884]" />
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#202c33] flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#00a884]" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">WhatsApp Marketing</p>
            <p className="text-sm text-zinc-200 font-bold">Customer Acquisition Funnel</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full bg-[#202c33] p-4 rounded-2xl rounded-tl-none relative border border-white/5">
              <p className="text-xs text-zinc-300">New Inquiry: "Hi, I'm interested in renting the Audi A6 for a wedding on..."</p>
              <span className="text-[8px] text-zinc-500 absolute bottom-2 right-4 tracking-tighter italic">Today, 10:24 AM</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[8px] text-zinc-500 uppercase font-black">Conversion Analytics</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#111b21] p-4 border border-[#202c33] rounded-2xl">
                <p className="text-[8px] text-zinc-500 uppercase mb-1 leading-none">Response Rate</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-white italic leading-none">98%</span>
                  <span className="text-[8px] text-emerald-400 leading-none">+4%</span>
                </div>
              </div>
              <div className="bg-[#111b21] p-4 border border-[#202c33] rounded-2xl">
                <p className="text-[8px] text-zinc-500 uppercase mb-1 leading-none">Avg Closing Time</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-white italic leading-none">12m</span>
                  <span className="text-[8px] text-emerald-400 leading-none">-5m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="px-6 py-2 rounded-full bg-[#00a884]/10 border border-[#00a884]/20 text-[#00a884] text-[9px] font-black uppercase tracking-luxury">
            82% Booking Increase
          </div>
        </div>
      </div>
    );
  }

  // Default / Generic Visual
  return (
    <div className="w-full bg-slate-900/50 rounded-2xl p-8 border border-white/5 relative overflow-hidden font-sans">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-gold-500" />
          <p className="text-xs text-white font-bold italic tracking-tighter">Growth Analytics Snapshot</p>
        </div>
        <Sparkles className="w-4 h-4 text-gold-500/50" />
      </div>

      <div className="relative h-40 flex items-end gap-2 px-2 border-b border-white/5">
        {[20, 35, 25, 45, 65, 55, 85, 75, 95].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 bg-gradient-to-t from-gold-600/40 to-gold-400/10 rounded-t-sm"
          />
        ))}
        {/* Line overlay */}
        <svg className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
           <motion.path
             initial={{ pathLength: 0 }}
             whileInView={{ pathLength: 1 }}
             transition={{ duration: 2 }}
             d="M0 160 L40 120 L80 140 L120 100 L160 50 L200 80 L240 20"
             fill="none"
             stroke="#cb8e3b"
             strokeWidth="2"
           />
        </svg>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-[8px] text-text-dim uppercase">ROI Increase</p>
          <p className="text-xl font-black text-white italic">+300%</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-[8px] text-text-dim uppercase">Active Leads</p>
          <p className="text-xl font-black text-white italic">2.4k</p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyVisual;

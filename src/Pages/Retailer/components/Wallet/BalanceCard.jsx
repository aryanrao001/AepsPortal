import React from 'react';
import { Wallet, TrendingUp, ArrowRight, RefreshCcw } from 'lucide-react';

const BalanceCard = () => {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl h-full relative overflow-hidden flex flex-col justify-between group">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/20 rounded-full -ml-12 -mb-12 blur-xl"></div>

        <div>
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                    <Wallet size={24} className="text-orange-400" />
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Refresh Balance">
                    <RefreshCcw size={16} className="text-slate-400 hover:text-white" />
                </button>
            </div>

            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Available Balance</p>
            <h3 className="text-4xl font-mono font-bold tracking-tight">₹ 24,590.00</h3>
            
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-lg w-fit border border-emerald-500/20">
                <TrendingUp size={14} /> + ₹ 1,240 Today (Comm.)
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400">Locked Amount</span>
                <span className="text-sm font-bold">₹ 500.00</span>
            </div>
            
            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20">
                View Commission Report <ArrowRight size={14} />
            </button>
        </div>
    </div>
  );
};

export default BalanceCard;
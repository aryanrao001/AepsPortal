import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Percent, ArrowRightLeft, Save, Plus, Trash2, 
  Loader2, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown 
} from 'lucide-react';

const FinanceControl = () => {
  const [activeView, setActiveView] = useState('commission'); // 'wallet' | 'commission'
  
  // --- WALLET STATE ---
  const [txnType, setTxnType] = useState('Credit');
  const [walletForm, setWalletForm] = useState({ userId: '', amount: '', remarks: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  // --- COMMISSION STATE ---
  const [activeService, setActiveService] = useState('AEPS');
  const [slabs, setSlabs] = useState([
    { id: 1, min: 0, max: 1000, type: 'Percentage', val: 0.25 },
    { id: 2, min: 1001, max: 3000, type: 'Flat', val: 5.00 },
    { id: 3, min: 3001, max: 10000, type: 'Flat', val: 10.00 },
  ]);

  // --- HANDLERS ---

  const handleTransaction = (e) => {
    e.preventDefault();
    if(!walletForm.userId || !walletForm.amount) return alert("Please fill all details");
    
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        alert(`Successfully ${txnType}ed ₹${walletForm.amount} to ${walletForm.userId}`);
        setWalletForm({ userId: '', amount: '', remarks: '' });
    }, 1500);
  };

  const addSlab = () => {
    const newId = slabs.length + 1;
    setSlabs([...slabs, { id: newId, min: 0, max: 0, type: 'Flat', val: 0 }]);
  };

  const removeSlab = (id) => {
    setSlabs(slabs.filter(s => s.id !== id));
  };

  const updateSlab = (id, field, value) => {
    setSlabs(slabs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      
      {/* --- Sidebar Menu --- */}
      <div className="lg:col-span-1 space-y-3">
        <button 
          onClick={() => setActiveView('commission')}
          className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all border shadow-sm ${activeView === 'commission' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'}`}
        >
          <Percent size={20} className={activeView === 'commission' ? 'text-indigo-600' : 'text-slate-400'} />
          <div className="text-left">
            <span className="block">Commission Setup</span>
            <span className="text-[10px] font-normal opacity-70">Manage Slabs & Margins</span>
          </div>
        </button>
        
        <button 
          onClick={() => setActiveView('wallet')}
          className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all border shadow-sm ${activeView === 'wallet' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'}`}
        >
          <Wallet size={20} className={activeView === 'wallet' ? 'text-emerald-600' : 'text-slate-400'} />
          <div className="text-left">
            <span className="block">Wallet Manager</span>
            <span className="text-[10px] font-normal opacity-70">Load / Debit Funds</span>
          </div>
        </button>
      </div>

      {/* --- Main Content Area --- */}
      <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[500px]">
        <AnimatePresence mode="wait">
            
            {/* VIEW 1: WALLET MANAGER */}
            {activeView === 'wallet' && (
                <motion.div 
                    key="wallet"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="max-w-lg mx-auto pt-4"
                >
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                            <ArrowRightLeft size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Fund Transfer</h3>
                        <p className="text-sm text-slate-500">Manage user wallet balances instantly.</p>
                    </div>

                    <div className="bg-slate-50 p-1.5 rounded-xl flex mb-6 border border-slate-200">
                        <button 
                            onClick={() => setTxnType('Credit')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${txnType === 'Credit' ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <TrendingUp size={16} /> Credit (Load)
                        </button>
                        <button 
                            onClick={() => setTxnType('Debit')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${txnType === 'Debit' ? 'bg-white text-rose-700 shadow-sm ring-1 ring-rose-100' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <TrendingDown size={16} /> Debit (Deduct)
                        </button>
                    </div>

                    <form onSubmit={handleTransaction} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Target User ID</label>
                            <input 
                                value={walletForm.userId}
                                onChange={e => setWalletForm({...walletForm, userId: e.target.value})}
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                placeholder="e.g. DT_101 or Mobile Number"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-lg">₹</span>
                                <input 
                                    type="number" 
                                    value={walletForm.amount}
                                    onChange={e => setWalletForm({...walletForm, amount: e.target.value})}
                                    className="w-full border border-slate-300 rounded-xl pl-8 pr-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Remarks</label>
                            <textarea 
                                value={walletForm.remarks}
                                onChange={e => setWalletForm({...walletForm, remarks: e.target.value})}
                                rows={2} 
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" 
                                placeholder="Reason for transaction..."
                            ></textarea>
                        </div>

                        <button 
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${txnType === 'Credit' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'}`}
                        >
                            {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                            Confirm {txnType} Transaction
                        </button>
                    </form>
                </motion.div>
            )}

            {/* VIEW 2: COMMISSION SETUP */}
            {activeView === 'commission' && (
                <motion.div 
                    key="commission"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Commission Structure</h3>
                            <p className="text-xs text-slate-500 mt-1">Configure slabs for {activeService}</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95">
                            <Save size={16}/> Save Changes
                        </button>
                    </div>

                    {/* Service Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {['AEPS', 'DMT', 'Recharge', 'BBPS', 'Micro ATM'].map(s => (
                            <button 
                                key={s} 
                                onClick={() => setActiveService(s)}
                                className={`px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeService === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Slab Table */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Min Amount (₹)</th>
                                    <th className="px-4 py-3">Max Amount (₹)</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Value</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {slabs.map((slab) => (
                                    <tr key={slab.id} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3">
                                            <input 
                                                type="number" 
                                                value={slab.min} 
                                                onChange={(e) => updateSlab(slab.id, 'min', e.target.value)}
                                                className="w-24 border border-slate-300 rounded px-2 py-1.5 text-xs font-bold outline-none focus:border-indigo-500 transition-colors"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input 
                                                type="number" 
                                                value={slab.max} 
                                                onChange={(e) => updateSlab(slab.id, 'max', e.target.value)}
                                                className="w-24 border border-slate-300 rounded px-2 py-1.5 text-xs font-bold outline-none focus:border-indigo-500 transition-colors"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <select 
                                                value={slab.type} 
                                                onChange={(e) => updateSlab(slab.id, 'type', e.target.value)}
                                                className="border border-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-500 bg-white"
                                            >
                                                <option>Flat (₹)</option>
                                                <option>Percentage (%)</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <input 
                                                type="number" 
                                                value={slab.val} 
                                                onChange={(e) => updateSlab(slab.id, 'val', e.target.value)}
                                                className="w-20 border border-slate-300 rounded px-2 py-1.5 text-xs font-bold text-center outline-none focus:border-indigo-500" 
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button 
                                                onClick={() => removeSlab(slab.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {/* Add Slab Row */}
                        <button 
                            onClick={addSlab}
                            className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold border-t border-slate-200 flex items-center justify-center gap-2 transition-colors"
                        >
                            <Plus size={14} /> Add New Slab
                        </button>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl flex gap-3 border border-amber-100">
                        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-xs font-bold text-amber-800 uppercase">Limit Warning</h4>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                                Total commission distribution cannot exceed 1.2% (Global Cap). Changes will reflect immediately for all users on the "Standard" plan.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinanceControl;
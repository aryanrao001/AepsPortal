import React, { useState } from 'react';
import { Smartphone, ScanFace, Building2 } from 'lucide-react';

const CashWithdrawal = () => {
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-5">
       <div className="pb-4 border-b border-slate-100 mb-4">
           <h2 className="text-lg font-bold text-slate-800">Cash Withdrawal</h2>
           <p className="text-xs text-slate-500">Withdraw cash using Aadhaar Biometric.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div className="space-y-4">
               <div>
                   <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Customer Mobile</label>
                   <div className="relative">
                       <Smartphone className="absolute left-3 top-3 text-slate-400" size={18} />
                       <input className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="10 Digit Number" />
                   </div>
               </div>
               <div>
                   <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Aadhaar Number</label>
                   <div className="relative">
                       <ScanFace className="absolute left-3 top-3 text-slate-400" size={18} />
                       <input className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all tracking-widest" placeholder="XXXX XXXX XXXX" maxLength={12} />
                   </div>
               </div>
           </div>

           <div className="space-y-4">
               <div>
                   <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Select Bank</label>
                   <div className="relative">
                       <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
                       <select className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white">
                           <option>State Bank of India</option>
                           <option>HDFC Bank</option>
                           <option>ICICI Bank</option>
                           <option>Bank of Baroda</option>
                       </select>
                   </div>
               </div>
               
               <div>
                   <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                   <div className="relative">
                       <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                       <input 
                           type="number" 
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                           placeholder="0.00" 
                       />
                   </div>
                   <div className="flex gap-2 mt-2">
                       {[500, 1000, 2000, 5000].map(amt => (
                           <button key={amt} onClick={() => setAmount(amt)} className="px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600 hover:bg-slate-200 border border-slate-200">
                               ₹{amt}
                           </button>
                       ))}
                   </div>
               </div>
           </div>
       </div>

       <div className="pt-4 border-t border-slate-100 flex justify-end">
           <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg">
               Submit Transaction
           </button>
       </div>
    </div>
  );
};

export default CashWithdrawal;
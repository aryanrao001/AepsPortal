import React from 'react';
import { Smartphone, ScanFace, Building2 } from 'lucide-react';

const BalanceEnquiry = () => {
  return (
    <div className="space-y-5">
       <div className="pb-4 border-b border-slate-100 mb-4">
           <h2 className="text-lg font-bold text-slate-800">Balance Enquiry</h2>
           <p className="text-xs text-slate-500">Check customer account balance.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Customer Mobile</label>
               <div className="relative">
                   <Smartphone className="absolute left-3 top-3 text-slate-400" size={18} />
                   <input className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="10 Digit Number" />
               </div>
           </div>
           <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Aadhaar Number</label>
               <div className="relative">
                   <ScanFace className="absolute left-3 top-3 text-slate-400" size={18} />
                   <input className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 tracking-widest" placeholder="XXXX XXXX XXXX" />
               </div>
           </div>
           <div className="md:col-span-2">
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Select Bank</label>
               <div className="relative">
                   <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
                   <select className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 bg-white">
                       <option>State Bank of India</option>
                       <option>HDFC Bank</option>
                       <option>Punjab National Bank</option>
                   </select>
               </div>
           </div>
       </div>

       <div className="pt-4 border-t border-slate-100 flex justify-end">
           <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-transform active:scale-95 shadow-lg shadow-blue-600/20">
               Check Balance
           </button>
       </div>
    </div>
  );
};

export default BalanceEnquiry;
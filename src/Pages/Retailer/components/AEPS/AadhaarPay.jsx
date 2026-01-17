import React from 'react';
import { AlertTriangle, Smartphone, ScanFace, Building2 } from 'lucide-react';

const AadhaarPay = () => {
  return (
    <div className="space-y-5">
       <div className="pb-4 border-b border-slate-100 mb-4">
           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               Aadhaar Pay <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded border border-orange-200">Merchant Service</span>
           </h2>
           <p className="text-xs text-slate-500">Accept payments from customers. (Higher MDR charges apply)</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           {/* Inputs similar to Withdrawal, but with a warning or fee notice */}
           <div className="md:col-span-2 bg-orange-50 border border-orange-100 p-3 rounded-lg flex gap-3">
               <AlertTriangle size={18} className="text-orange-600 shrink-0 mt-0.5" />
               <p className="text-xs text-orange-800 leading-relaxed">
                   <strong>Note:</strong> Transaction fee (MDR) is applicable on Aadhaar Pay transactions. Please inform the customer before proceeding.
               </p>
           </div>
           
           <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Customer Mobile</label>
               <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none" placeholder="10 Digit Number" />
           </div>
           <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                    <input className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl text-lg font-bold outline-none" placeholder="0.00" />
                </div>
           </div>
       </div>

       <div className="pt-4 border-t border-slate-100 flex justify-end">
           <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg">
               Proceed to Pay
           </button>
       </div>
    </div>
  );
};

export default AadhaarPay;
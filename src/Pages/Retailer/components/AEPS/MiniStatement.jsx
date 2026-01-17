import React, { useState } from 'react';
import { Smartphone, ScanFace, Building2, FileText, CheckCircle2 } from 'lucide-react';

const MiniStatement = () => {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="space-y-5">
       <div className="pb-4 border-b border-slate-100 mb-4">
           <h2 className="text-lg font-bold text-slate-800">Mini Statement</h2>
           <p className="text-xs text-slate-500">View last 9 transactions of customer account.</p>
       </div>

       {!showResult ? (
           <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   {/* ... Similar Input Fields as Balance Enquiry ... */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Customer Mobile</label>
                        <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none" placeholder="10 Digit Number" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Aadhaar Number</label>
                        <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold outline-none" placeholder="XXXX XXXX XXXX" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Select Bank</label>
                        <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-white">
                           <option>State Bank of India</option>
                           <option>HDFC Bank</option>
                        </select>
                    </div>
               </div>
               <div className="pt-4 border-t border-slate-100 flex justify-end">
                   <button onClick={() => setShowResult(true)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg">Fetch Statement</button>
               </div>
           </>
       ) : (
           <div className="animate-in fade-in slide-in-from-bottom-4">
               <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 mb-6">
                   <CheckCircle2 className="text-emerald-600" />
                   <div>
                       <h4 className="font-bold text-emerald-800 text-sm">Statement Fetched Successfully</h4>
                       <p className="text-xs text-emerald-600">Available Balance: ₹ 12,450.00</p>
                   </div>
               </div>

               <div className="border border-slate-200 rounded-xl overflow-hidden">
                   <table className="w-full text-left">
                       <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                           <tr>
                               <th className="px-4 py-3">Date</th>
                               <th className="px-4 py-3">Narration</th>
                               <th className="px-4 py-3 text-right">Amount</th>
                               <th className="px-4 py-3 text-right">Type</th>
                           </tr>
                       </thead>
                       <tbody className="text-sm divide-y divide-slate-100">
                           {[1,2,3,4,5].map(i => (
                               <tr key={i}>
                                   <td className="px-4 py-3 text-slate-500">Oct {20+i}</td>
                                   <td className="px-4 py-3 font-bold text-slate-700">UPI/P2A/88291</td>
                                   <td className="px-4 py-3 text-right font-mono">₹ {i * 500}</td>
                                   <td className="px-4 py-3 text-right text-xs font-bold text-red-500">DR</td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
               
               <button onClick={() => setShowResult(false)} className="mt-4 text-sm font-bold text-slate-500 hover:text-slate-900">Check Another</button>
           </div>
       )}
    </div>
  );
};

export default MiniStatement;
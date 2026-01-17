import React, { useState } from 'react';
import { ShieldCheck, Lock, Check, X, AlertTriangle } from 'lucide-react';

const ComplianceHub = () => {
  const [kycQueue, setKycQueue] = useState([
    { id: 1, name: "Amit Store", doc: "Aadhaar + Pan", time: "2h ago" },
    { id: 2, name: "Vijay Tech", doc: "GST Cert", time: "5h ago" },
  ]);

  const handleKyc = (id) => setKycQueue(kycQueue.filter(k => k.id !== id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Retailer KYC Approval */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2"><ShieldCheck className="text-emerald-600"/> Retailer KYC Queue</h3>
            {kycQueue.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No pending approvals</div>
            ) : (
                <div className="space-y-3">
                    {kycQueue.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <div className="font-bold text-slate-900">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.doc} • {item.time}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleKyc(item.id)} className="p-2 bg-white border border-slate-200 text-red-600 rounded-lg hover:bg-red-50"><X size={16}/></button>
                                <button onClick={() => handleKyc(item.id)} className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm"><Check size={16}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Daily Limit Control */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2"><Lock className="text-rose-600"/> Daily Transaction Limits</h3>
            <div className="space-y-4">
                {[
                    { label: "Retailer Max Debit", val: "50000" },
                    { label: "AEPS Per Txn Limit", val: "10000" },
                    { label: "Daily Payout Cap", val: "200000" }
                ].map((limit, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-600">{limit.label}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs font-bold">₹</span>
                            <input type="number" defaultValue={limit.val} className="w-32 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 outline-none focus:border-blue-500" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800">Changes to limits apply instantly. High-value changes require OTP verification.</p>
            </div>
        </div>
    </div>
  );
};

export default ComplianceHub;
import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, AlertTriangle } from 'lucide-react';

const UpiPayout = () => {
  const [vpa, setVpa] = useState('');
  const [verifiedName, setVerifiedName] = useState(null);
  const [amount, setAmount] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    if(!vpa) return;
    // Simulate verification
    setTimeout(() => setVerifiedName("ROHIT KUMAR"), 800);
  };

  const handlePay = () => {
      alert(`Paid ₹${amount} to ${verifiedName}`);
      setVerifiedName(null);
      setAmount('');
      setVpa('');
  };

  return (
    <div className="h-full p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ArrowUpRight className="text-blue-600" /> UPI Payout (Transfer)
        </h2>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Step 1: VPA Entry & Verify */}
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Beneficiary UPI ID</label>
                <div className="flex gap-2">
                    <input 
                        value={vpa}
                        onChange={e => { setVpa(e.target.value); setVerifiedName(null); }}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500 transition-colors" 
                        placeholder="e.g. 9876543210@paytm" 
                    />
                    <button 
                        onClick={handleVerify}
                        disabled={verifiedName}
                        className={`px-5 rounded-xl font-bold text-sm transition-all ${verifiedName ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        {verifiedName ? <ShieldCheck size={20} /> : 'Verify'}
                    </button>
                </div>
            </div>

            {/* Verified Name Display */}
            {verifiedName && (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Verified Name</p>
                    <p className="text-lg font-bold text-slate-800">{verifiedName}</p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        <ShieldCheck size={12} /> Banking Name Match
                    </p>
                </div>
            )}

            {/* Step 2: Amount & Pay */}
            {verifiedName && (
                <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-xl">₹</span>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl font-bold text-2xl outline-none focus:border-blue-500" 
                                placeholder="0.00" 
                            />
                        </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 items-start">
                        <AlertTriangle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed">
                            Money will be instantly transferred to the recipient's bank account linked to this UPI ID. This action cannot be undone.
                        </p>
                    </div>

                    <button 
                        onClick={handlePay}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95"
                    >
                        Pay ₹ {amount}
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default UpiPayout;
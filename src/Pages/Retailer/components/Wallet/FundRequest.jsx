import React, { useState } from 'react';
import { ArrowDownLeft, Send, CheckCircle2, Clock } from 'lucide-react';

const FundRequest = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!amount) return;
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  if(status === 'success') {
      return (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                  <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Request Sent!</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">Your distributor has been notified. Amount will be credited once approved.</p>
              <button onClick={() => { setStatus('idle'); setAmount(''); }} className="mt-6 text-sm font-bold text-blue-600 hover:underline">Make Another Request</button>
          </div>
      )
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 h-full shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <ArrowDownLeft size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">Load Wallet</h3>
                <p className="text-xs text-slate-500">Request fund from Distributor</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                            placeholder="0.00" 
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Payment Mode</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold outline-none bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                        <option>IMPS Transfer</option>
                        <option>NEFT / RTGS</option>
                        <option>Cash Deposit (CDM)</option>
                        <option>UPI Transfer</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Bank Reference ID (RRN)</label>
                <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                    placeholder="Enter 12-digit RRN" 
                />
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    disabled={status === 'submitting'}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70"
                >
                    {status === 'submitting' ? <Clock className="animate-spin" size={18} /> : <Send size={18} />}
                    {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                </button>
            </div>
        </form>
    </div>
  );
};

export default FundRequest;
import React, { useState } from 'react';
import { ArrowLeft, Shield, Banknote, Clock, CheckCircle2 } from 'lucide-react';

const MoneyTransferForm = ({ sender, beneficiary, onBack }) => {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('IMPS');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransfer = () => {
    if(!amount) return;
    setIsSuccess(true);
  };

  if(isSuccess) {
      return (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center h-full flex flex-col justify-center items-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={48} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">₹ {amount} Sent!</h2>
              <p className="text-slate-500 mt-2">Transaction Successful to {beneficiary.name}</p>
              <div className="mt-6 bg-slate-50 p-4 rounded-xl w-full text-left text-sm space-y-2">
                  <div className="flex justify-between"><span>Txn ID:</span> <span className="font-mono font-bold">DMT882910</span></div>
                  <div className="flex justify-between"><span>Bank Ref:</span> <span className="font-mono font-bold">RRN00921</span></div>
                  <div className="flex justify-between"><span>Date:</span> <span className="font-bold">{new Date().toLocaleString()}</span></div>
              </div>
              <button onClick={onBack} className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Make Another Transfer</button>
          </div>
      )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                <ArrowLeft size={20} />
            </button>
            <div>
                <h3 className="font-bold text-lg text-slate-800">Confirm Transfer</h3>
                <p className="text-xs text-slate-500">To: {beneficiary.name} ({beneficiary.bank})</p>
            </div>
        </div>

        {/* Sender Limit Info */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex justify-between items-center">
            <div>
                <p className="text-xs text-blue-600 font-bold uppercase">Available Limit</p>
                <p className="text-lg font-bold text-blue-900">₹ {sender.limit.toLocaleString()}</p>
            </div>
            <Shield className="text-blue-300" size={32} />
        </div>

        {/* Form */}
        <div className="space-y-6 flex-1">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Payment Mode</label>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setMode('IMPS')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'IMPS' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Banknote size={20} />
                        <span className="text-xs font-bold">IMPS (Instant)</span>
                    </button>
                    <button 
                        onClick={() => setMode('NEFT')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'NEFT' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Clock size={20} />
                        <span className="text-xs font-bold">NEFT (Batch)</span>
                    </button>
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Transfer Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-4 text-slate-400 font-bold text-xl">₹</span>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full pl-10 pr-4 py-4 border border-slate-300 rounded-xl text-2xl font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                        placeholder="0.00" 
                    />
                </div>
                <div className="flex gap-2 mt-3">
                    {[1000, 2000, 5000].map(amt => (
                        <button key={amt} onClick={() => setAmount(amt)} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200">
                            + {amt}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-6">
            <button 
                onClick={handleTransfer}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95 flex justify-center items-center gap-2"
            >
                Pay ₹ {amount || '0'}
            </button>
        </div>
    </div>
  );
};

export default MoneyTransferForm;
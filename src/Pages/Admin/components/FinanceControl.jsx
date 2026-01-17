import React, { useState } from 'react';
import { Wallet, ArrowRightLeft, Percent, CheckCircle2 } from 'lucide-react';

const FinanceControl = () => {
  const [view, setView] = useState('wallet'); // 'wallet' or 'commission'
  const [loadType, setLoadType] = useState('Credit'); // Credit, Debit
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransaction = (e) => {
    e.preventDefault();
    alert(`Successfully ${loadType}ed ₹${amount} to ${userId}`);
    setUserId(''); setAmount('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar Navigation */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-2">
          <button onClick={() => setView('wallet')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${view === 'wallet' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Wallet size={18} /> Wallet Manager
          </button>
          <button onClick={() => setView('commission')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${view === 'commission' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Percent size={18} /> Set Commissions
          </button>
      </div>

      {/* Main Panel */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
          {view === 'wallet' ? (
              <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2"><ArrowRightLeft className="text-blue-600"/> Fund Management</h3>
                  <div className="flex bg-slate-100 p-1 rounded-xl mb-6 w-fit">
                      {['Credit', 'Debit'].map(type => (
                          <button key={type} onClick={() => setLoadType(type)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${loadType === type ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>{type}</button>
                      ))}
                  </div>
                  <form onSubmit={handleTransaction} className="space-y-4 max-w-md">
                      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">User ID / Mobile</label><input required className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500" placeholder="e.g. DT_101" value={userId} onChange={e => setUserId(e.target.value)} /></div>
                      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount (₹)</label><input required type="number" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Remarks</label><textarea className="w-full border border-slate-300 rounded-lg p-3 outline-none h-20 resize-none" placeholder="Reason for transaction..." /></div>
                      <button className={`w-full py-3 rounded-xl font-bold text-white shadow-lg ${loadType === 'Credit' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>Confirm {loadType}</button>
                  </form>
              </div>
          ) : (
              <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2"><Percent className="text-blue-600"/> Commission Structure</h3>
                  <div className="grid grid-cols-2 gap-4">
                      {['AEPS Cash Withdrawal', 'Domestic Money Transfer', 'Micro ATM', 'Bill Payment (BBPS)'].map((service, i) => (
                          <div key={i} className="p-4 border border-slate-200 rounded-xl">
                              <h4 className="font-bold text-slate-700 text-sm mb-3">{service}</h4>
                              <div className="flex items-center gap-2">
                                  <div className="relative flex-1">
                                      <input type="number" defaultValue="0.5" className="w-full pl-3 pr-8 py-2 border rounded-lg text-sm font-bold outline-none" />
                                      <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                                  </div>
                                  <button className="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">Set</button>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-2">Max Limit: 1.2%</p>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default FinanceControl;
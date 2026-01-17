import React, { useState } from 'react';
import { Send, CheckCircle2, Clock } from 'lucide-react';

const UpiCollect = () => {
  const [vpa, setVpa] = useState('');
  const [amount, setAmount] = useState('');
  const [reqStatus, setReqStatus] = useState('idle'); // idle, sent, approved, rejected

  const handleSendRequest = (e) => {
    e.preventDefault();
    if(!vpa.includes('@')) return alert("Invalid VPA");
    
    setReqStatus('sent');
    
    // Simulation
    setTimeout(() => {
        setReqStatus('approved');
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50/50">
        
        {reqStatus === 'idle' ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600">
                        <Send size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Send Payment Request</h2>
                    <p className="text-sm text-slate-500">Customer will receive a notification to pay.</p>
                </div>

                <form onSubmit={handleSendRequest} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Customer UPI ID (VPA)</label>
                        <input 
                            value={vpa}
                            onChange={e => setVpa(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" 
                            placeholder="mobile@upi" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" 
                                placeholder="0.00" 
                            />
                        </div>
                    </div>

                    <button className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-200 transition-all active:scale-95">
                        Send Request
                    </button>
                </form>
            </div>
        ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl w-full max-w-md text-center animate-in zoom-in duration-300">
                {reqStatus === 'sent' && (
                    <>
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Clock size={40} className="text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Request Sent</h3>
                        <p className="text-sm text-slate-500 mt-1">Waiting for customer approval...</p>
                        <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500">
                            Time remaining: <span className="font-mono font-bold text-slate-800">04:59</span>
                        </div>
                    </>
                )}

                {reqStatus === 'approved' && (
                    <>
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={40} className="text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Payment Received!</h3>
                        <p className="text-sm text-slate-500 mt-1">Transaction Successful.</p>
                        <div className="mt-6">
                            <p className="text-3xl font-extrabold text-slate-900">₹ {amount}</p>
                            <p className="text-xs text-slate-400 mt-1">Ref: UPI/882910/22</p>
                        </div>
                        <button 
                            onClick={() => { setReqStatus('idle'); setAmount(''); setVpa(''); }}
                            className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800"
                        >
                            Send Another
                        </button>
                    </>
                )}
            </div>
        )}
    </div>
  );
};

export default UpiCollect;
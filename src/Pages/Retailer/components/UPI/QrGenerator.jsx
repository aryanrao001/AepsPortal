import React, { useState, useEffect } from 'react';
import { QrCode, Download, Share2, CheckCircle2, RefreshCw } from 'lucide-react';

const QrGenerator = () => {
  const [amount, setAmount] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('waiting'); // waiting, success

  // Simulate Payment Listener
  useEffect(() => {
    let timer;
    if (isGenerated && paymentStatus === 'waiting') {
        timer = setTimeout(() => {
            setPaymentStatus('success');
        }, 8000); // Auto-success after 8 seconds for demo
    }
    return () => clearTimeout(timer);
  }, [isGenerated, paymentStatus]);

  const handleGenerate = () => {
      if(!amount) return;
      setIsGenerated(true);
      setPaymentStatus('waiting');
  };

  const handleReset = () => {
      setIsGenerated(false);
      setPaymentStatus('waiting');
      setAmount('');
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT: Input Form */}
        <div className="p-8 border-r border-slate-100 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Receive Payment</h2>
                    <p className="text-sm text-slate-500">Generate a dynamic QR code for customers.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-xl">₹</span>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => { setAmount(e.target.value); setIsGenerated(false); }}
                                className="w-full pl-10 pr-4 py-4 border border-slate-200 rounded-xl text-2xl font-bold outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all" 
                                placeholder="0.00" 
                                disabled={isGenerated && paymentStatus === 'waiting'}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        {[100, 500, 2000].map(amt => (
                            <button 
                                key={amt}
                                onClick={() => { setAmount(amt); setIsGenerated(false); }}
                                className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                ₹{amt}
                            </button>
                        ))}
                    </div>

                    {!isGenerated ? (
                        <button 
                            onClick={handleGenerate}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Generate QR Code
                        </button>
                    ) : (
                        <button 
                            onClick={handleReset}
                            className="w-full py-4 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                        >
                            Create New QR
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* RIGHT: QR Display */}
        <div className="p-8 bg-slate-50 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {isGenerated ? (
                <div className="relative z-10 w-full max-w-xs animate-in zoom-in duration-300">
                    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">UPI</span>
                            <span className="text-xs font-bold text-slate-400">BharatPay</span>
                        </div>

                        {/* QR Box */}
                        <div className="aspect-square bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4 relative overflow-hidden">
                            {paymentStatus === 'success' ? (
                                <div className="absolute inset-0 bg-emerald-500 flex flex-col items-center justify-center animate-in fade-in">
                                    <CheckCircle2 size={64} className="text-white drop-shadow-md mb-2" />
                                    <span className="font-bold text-white text-lg">Received!</span>
                                </div>
                            ) : (
                                <QrCode size={160} />
                            )}
                        </div>

                        <div className="text-2xl font-extrabold text-slate-900 mb-1">₹ {amount}</div>
                        <p className="text-xs text-slate-500 mb-6">Scan with any UPI App</p>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                                <Download size={14} /> Save
                            </button>
                            <button className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                                <Share2 size={14} /> Share
                            </button>
                        </div>
                    </div>

                    {paymentStatus === 'waiting' && (
                        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm animate-pulse">
                            <RefreshCw size={16} className="animate-spin" /> Waiting for payment...
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center text-slate-400 max-w-xs">
                    <div className="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <QrCode size={40} className="opacity-50" />
                    </div>
                    <h3 className="font-bold text-slate-600">No QR Generated</h3>
                    <p className="text-sm mt-1">Enter an amount on the left to generate a dynamic QR code.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default QrGenerator;
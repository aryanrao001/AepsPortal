import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, CreditCard, Wallet, History, ScanFace, 
  Smartphone, Building2, Wifi, CheckCircle2, AlertCircle 
} from 'lucide-react';

// Import Components
import CashWithdrawal from './components/AEPS/CashWithdrawal';
import BalanceEnquiry from './components/AEPS/BalanceEnquiry';
import MiniStatement from './components/AEPS/MiniStatement';
import AadhaarPay from './components/AEPS/AadhaarPay';

const AepsPage = () => {
  const [activeTab, setActiveTab] = useState('withdrawal');
  const [device, setDevice] = useState('Mantra');
  const [isScanning, setIsScanning] = useState(false);

  // Simulate Scan
  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const tabs = [
    { id: 'withdrawal', label: 'Cash Withdrawal', icon: <CreditCard size={18} /> },
    { id: 'balance', label: 'Balance Enquiry', icon: <Wallet size={18} /> },
    { id: 'ministatement', label: 'Mini Statement', icon: <History size={18} /> },
    { id: 'auth', label: 'Aadhaar Pay', icon: <ScanFace size={18} /> },
  ];

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Fingerprint className="text-blue-600" /> AEPS Banking
          </h1>
          <p className="text-sm text-slate-500">Aadhaar Enabled Payment System Gateway</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <Wifi size={14} className="animate-pulse" /> Server Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- LEFT COLUMN: SERVICE FORMS --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Tab Navigation */}
            <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm flex overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Dynamic Content */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'withdrawal' && <CashWithdrawal />}
                        {activeTab === 'balance' && <BalanceEnquiry />}
                        {activeTab === 'ministatement' && <MiniStatement />}
                        {activeTab === 'auth' && <AadhaarPay />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* --- RIGHT COLUMN: BIOMETRIC CONTROLS (Persistent) --- */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Background Decoration */}
                <Fingerprint className="absolute -right-6 -bottom-6 text-white/5 w-40 h-40" />
                
                <h3 className="font-bold text-lg mb-4">Device Manager</h3>
                
                <div className="space-y-4 relative z-10">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Select Scanner</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Mantra', 'Morpho', 'Startek', 'SecuGen'].map(d => (
                                <button 
                                    key={d}
                                    onClick={() => setDevice(d)}
                                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                                        device === d 
                                        ? 'bg-white text-slate-900 border-white' 
                                        : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-white/10 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
                         <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mb-3 transition-all ${isScanning ? 'border-emerald-500 bg-emerald-500/20' : 'border-slate-500 bg-transparent'}`}>
                             <Fingerprint size={40} className={isScanning ? 'text-emerald-400 animate-pulse' : 'text-slate-500'} />
                         </div>
                         <div className="text-sm font-bold">
                             {isScanning ? <span className="text-emerald-400">Scanning...</span> : 'Ready to Scan'}
                         </div>
                         <p className="text-[10px] text-slate-400 mt-1">
                             {device} Device Connected
                         </p>
                    </div>

                    <button 
                        onClick={handleScan}
                        disabled={isScanning}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/50 transition-all active:scale-95"
                    >
                        {isScanning ? 'Capture in progress...' : 'Capture Fingerprint'}
                    </button>
                    
                    <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 opacity-70">
                        <AlertCircle size={12} /> Minimum 60% match required
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AepsPage;
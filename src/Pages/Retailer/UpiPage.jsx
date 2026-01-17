import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ScanLine, ArrowUpRight, Smartphone } from 'lucide-react';

// Import Components
import QrGenerator from './components/UPI/QrGenerator';
import UpiCollect from './components/UPI/UpiCollect';
import UpiPayout from './components/UPI/UpiPayout';

const UpiPage = () => {
  const [activeTab, setActiveTab] = useState('qr');

  const tabs = [
    { id: 'qr', label: 'Generate QR', icon: <QrCode size={18} /> },
    { id: 'collect', label: 'Collect Request', icon: <ScanLine size={18} /> },
    { id: 'payout', label: 'UPI Payout', icon: <ArrowUpRight size={18} /> },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col">
       
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
           <div>
               <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="text-purple-600" /> UPI Interface
               </h1>
               <p className="text-sm text-slate-500">Unified Payments Interface Gateway</p>
           </div>
           
           {/* Tab Navigation */}
           <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
               {tabs.map(tab => (
                   <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                       {tab.icon} {tab.label}
                   </button>
               ))}
           </div>
       </div>

       {/* Dynamic Content Area */}
       <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
           <AnimatePresence mode="wait">
               <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.2 }}
                   className="h-full overflow-y-auto"
               >
                   {activeTab === 'qr' && <QrGenerator />}
                   {activeTab === 'collect' && <UpiCollect />}
                   {activeTab === 'payout' && <UpiPayout />}
               </motion.div>
           </AnimatePresence>
       </div>
    </div>
  );
};

export default UpiPage;
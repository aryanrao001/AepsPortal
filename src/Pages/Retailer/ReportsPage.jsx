import React, { useState } from 'react';
import { FileText, Filter, Calendar, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Report Components
import AepsReceipts from './components/Reports/AepsReceipts';
import DmtReceipts from './components/Reports/DmtReceipts';
import CommissionLog from './components/Reports/CommissionLog';

const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState('aeps');

  const reportTabs = [
    { id: 'aeps', label: 'AEPS Receipts' },
    { id: 'dmt', label: 'DMT Receipts' },
    { id: 'comm', label: 'Commission Log' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="text-slate-600" /> Transaction Reports
                </h1>
                <p className="text-sm text-slate-500">View history and download receipts.</p>
            </div>

            {/* Global Date Filter (Mock) */}
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Calendar size={16} /> This Month
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                    <Download size={16} /> Export All
                </button>
            </div>
        </div>

        {/* Report Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50/50">
                {reportTabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveReport(tab.id)}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-all ${activeReport === tab.id ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Dynamic Component Render */}
            <div className="flex-1 overflow-hidden p-0 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeReport}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {activeReport === 'aeps' && <AepsReceipts />}
                        {activeReport === 'dmt' && <DmtReceipts />}
                        {activeReport === 'comm' && <CommissionLog />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
};

export default ReportsPage;
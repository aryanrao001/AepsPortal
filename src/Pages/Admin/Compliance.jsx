import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, Check, X, FileText, Eye, 
  AlertTriangle, Save, Loader2, Calendar, CreditCard, ScanFace
} from 'lucide-react';

const INITIAL_QUEUE = [
  { 
    id: 1, 
    name: "Amit General Store", 
    type: "Retailer", 
    date: "2023-10-24 10:30 AM", 
    status: "Pending",
    docs: [
      { name: "Aadhaar Card", type: "ID Proof" },
      { name: "PAN Card", type: "Tax ID" }
    ]
  },
  { 
    id: 2, 
    name: "Vijay Tech Solutions", 
    type: "Distributor", 
    date: "2023-10-24 09:15 AM", 
    status: "Under Review",
    docs: [
      { name: "GST Certificate", type: "Business Proof" },
      { name: "Shop Photo", type: "Verification" }
    ]
  },
  { 
    id: 3, 
    name: "Quick Pay Point", 
    type: "Retailer", 
    date: "2023-10-23 04:45 PM", 
    status: "Pending",
    docs: [
      { name: "Aadhaar Card", type: "ID Proof" }
    ]
  },
];

const INITIAL_LIMITS = [
  { id: 'l1', label: "Max Retailer Debit (Daily)", val: 50000, desc: "Max wallet debit allowed per retailer in 24h." },
  { id: 'l2', label: "AEPS Per Transaction Cap", val: 10000, desc: "Hard limit for a single AEPS withdrawal." },
  { id: 'l3', label: "Monthly Payout Limit", val: 200000, desc: "Total payout volume allowed per month." },
  { id: 'l4', label: "Minimum Wallet Balance", val: 100, desc: "Amount to maintain to keep account active." },
];

const ComplianceHub = () => {
  const [activeTab, setActiveTab] = useState('kyc'); 
  
  // KYC State
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [selectedDoc, setSelectedDoc] = useState(null); // For Modal
  const [processingId, setProcessingId] = useState(null);

  // Limits State
  const [limits, setLimits] = useState(INITIAL_LIMITS);
  const [isSaving, setIsSaving] = useState(false);

  // --- Actions ---

  const handleKycAction = (id, action) => {
    setProcessingId(id);
    // Simulate API Call
    setTimeout(() => {
        setQueue(queue.filter(item => item.id !== id));
        setProcessingId(null);
        // Optional: Show Toast here
    }, 800);
  };

  const handleLimitChange = (id, newVal) => {
    setLimits(limits.map(l => l.id === id ? { ...l, val: newVal } : l));
  };

  const saveLimits = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        alert("Transaction limits updated successfully across the zone.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* --- Tab Navigation --- */}
      <div className="flex gap-6 border-b border-slate-200">
        <button 
            onClick={() => setActiveTab('kyc')} 
            className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'kyc' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
            <ShieldCheck size={18} /> KYC Approvals 
            {queue.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{queue.length}</span>}
        </button>
        <button 
            onClick={() => setActiveTab('limits')} 
            className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'limits' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
            <Lock size={18} /> Daily Limits
        </button>
      </div>

      {/* --- KYC Tab --- */}
      {activeTab === 'kyc' ? (
        <div className="min-h-[400px]">
            <AnimatePresence mode='popLayout'>
                {queue.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200"
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Check size={32} className="text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">All Caught Up!</h3>
                        <p className="text-sm">No pending KYC requests at the moment.</p>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {queue.map(item => (
                            <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                            >
                                {processingId === item.id && (
                                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm">
                                        <Loader2 className="animate-spin text-slate-900" size={32} />
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                            {item.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{item.type}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100 uppercase">
                                        {item.status}
                                    </span>
                                </div>
                                
                                {/* Document List */}
                                <div className="space-y-2 mb-6">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Submitted Documents</p>
                                    {item.docs.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                {doc.name.includes('Aadhaar') ? <ScanFace size={14} className="text-blue-500"/> : <FileText size={14} className="text-slate-500"/>}
                                                <span className="text-xs font-bold text-slate-700">{doc.name}</span>
                                            </div>
                                            <button 
                                                onClick={() => setSelectedDoc({ ...doc, userName: item.name })}
                                                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                                            >
                                                <Eye size={12} /> View
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-4 bg-slate-50 p-2 rounded">
                                    <Calendar size={12} /> Applied: {item.date}
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleKycAction(item.id, 'reject')}
                                        className="py-2.5 border border-red-100 text-red-600 bg-red-50 rounded-xl text-xs font-bold hover:bg-red-100 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={14} /> Reject
                                    </button>
                                    <button 
                                        onClick={() => handleKycAction(item.id, 'approve')}
                                        className="py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                                    >
                                        <Check size={14} /> Approve
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
      ) : (
        /* --- Limits Tab --- */
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <Lock size={20} className="text-blue-600"/> Transaction Limits
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Set global thresholds for retailer transactions.</p>
                </div>
                <button 
                    onClick={saveLimits}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-70"
                >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSaving ? "Updating..." : "Update Limits"}
                </button>
            </div>

            <div className="grid gap-4">
                {limits.map((l) => (
                    <div key={l.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group">
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-sm">{l.label}</h4>
                            <p className="text-xs text-slate-500 mt-1 max-w-md">{l.desc}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative group-focus-within:text-blue-600">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                                <input 
                                    type="number" 
                                    value={l.val} 
                                    onChange={(e) => handleLimitChange(l.id, e.target.value)}
                                    className="w-32 border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white shadow-sm" 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-xs font-bold text-amber-800 uppercase">Important Note</h4>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        Changes to "Daily Debit" and "Payout Cap" apply instantly to all active retailers in your zone. 
                        High-value changes (> ₹5L) may require Super Admin approval.
                    </p>
                </div>
            </div>
        </div>
      )}

      {/* --- Document Viewer Modal --- */}
      <AnimatePresence>
        {selectedDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div>
                            <h3 className="font-bold text-slate-800">{selectedDoc.name}</h3>
                            <p className="text-xs text-slate-500">Applicant: {selectedDoc.userName}</p>
                        </div>
                        <button onClick={() => setSelectedDoc(null)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-8 flex items-center justify-center bg-slate-100 min-h-[300px]">
                        {/* Placeholder for actual image */}
                        <div className="text-center">
                            <div className="w-48 h-32 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-dashed border-slate-300">
                                <FileText size={48} className="text-slate-400" />
                            </div>
                            <p className="text-xs text-slate-500">Preview not available in demo mode.</p>
                        </div>
                    </div>

                    <div className="px-5 py-4 flex justify-end gap-2 border-t border-slate-100">
                        <button onClick={() => setSelectedDoc(null)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">
                            Close Preview
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ComplianceHub;
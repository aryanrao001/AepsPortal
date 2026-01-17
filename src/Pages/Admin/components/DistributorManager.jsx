import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, MapPin, Phone, MoreVertical, X, CheckCircle2 } from 'lucide-react';

const INITIAL_DISTRIBUTORS = [
  { id: "DT_101", name: "Singh Enterprises", mobile: "9876543210", zone: "North Delhi", retailers: 42, status: "Active" },
  { id: "DT_102", name: "Ravi Trading Co", mobile: "9988776655", zone: "West Delhi", retailers: 28, status: "Active" },
];

const DistributorManager = () => {
  const [distributors, setDistributors] = useState(INITIAL_DISTRIBUTORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', zone: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newDist = {
        id: `DT_${Math.floor(Math.random()*1000)}`,
        ...formData,
        retailers: 0,
        status: "Active"
    };
    setDistributors([newDist, ...distributors]);
    setIsModalOpen(false);
    setFormData({ name: '', mobile: '', zone: '' });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search Distributor..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 shadow-lg active:scale-95 transition-all">
              <Plus size={18} /> Add Distributor
          </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {distributors.map((dist) => (
              <div key={dist.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">{dist.name[0]}</div>
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full border border-emerald-100">{dist.status}</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{dist.name}</h3>
                  <div className="text-sm text-slate-500 space-y-1 mt-2">
                      <div className="flex items-center gap-2"><Phone size={14} /> {dist.mobile}</div>
                      <div className="flex items-center gap-2"><MapPin size={14} /> {dist.zone}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase">{dist.retailers} Retailers</span>
                      <button className="text-blue-600 text-xs font-bold hover:underline">Manage Zone</button>
                  </div>
              </div>
          ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center"><h3 className="font-bold text-lg">New Distributor</h3><button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400"/></button></div>
                    <form onSubmit={handleAdd} className="p-6 space-y-4">
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firm Name</label><input required className="w-full border rounded-lg p-2.5 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile</label><input required className="w-full border rounded-lg p-2.5 text-sm" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} /></div>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Zone / Area</label><input required className="w-full border rounded-lg p-2.5 text-sm" value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})} /></div>
                        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm mt-2">Create Account</button>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DistributorManager;
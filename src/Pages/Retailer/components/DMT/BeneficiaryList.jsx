import React, { useState } from 'react';
import { UserPlus, Trash2, ShieldCheck, ArrowRight, X, Building2 } from 'lucide-react';

const MOCK_BENEFICIARIES = [
  { id: 1, name: "Rahul Sharma", bank: "HDFC Bank", account: "501002348821", ifsc: "HDFC00012", verified: true },
  { id: 2, name: "Priya Singh", bank: "State Bank of India", account: "30998822110", ifsc: "SBIN00045", verified: false },
];

const BeneficiaryList = ({ sender, onSelect }) => {
  const [beneficiaries, setBeneficiaries] = useState(MOCK_BENEFICIARIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBene, setNewBene] = useState({ name: '', bank: '', account: '', ifsc: '' });

  const handleAddBene = (e) => {
    e.preventDefault();
    const newId = beneficiaries.length + 1;
    setBeneficiaries([...beneficiaries, { id: newId, ...newBene, verified: false }]);
    setShowAddModal(false);
    setNewBene({ name: '', bank: '', account: '', ifsc: '' });
  };

  const handleVerify = (id) => {
    // Simulate Penny Drop
    alert("Verification Successful! Name matched: " + beneficiaries.find(b => b.id === id).name);
    setBeneficiaries(beneficiaries.map(b => b.id === id ? { ...b, verified: true } : b));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
        <div>
            <h3 className="font-bold text-slate-800">Beneficiaries</h3>
            <p className="text-xs text-slate-500">Sender: {sender?.name} ({sender?.mobile})</p>
        </div>
        <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
        >
            <UserPlus size={16} /> Add New
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {beneficiaries.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No beneficiaries found. Add one to proceed.</div>
        ) : (
            <div className="space-y-2">
                {beneficiaries.map((bene) => (
                    <div key={bene.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-all group relative">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${bene.verified ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {bene.bank[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                        {bene.name}
                                        {bene.verified && <ShieldCheck size={12} className="text-emerald-500" />}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-mono">
                                        {bene.bank} • {bene.account.slice(-4).padStart(bene.account.length, '•')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {!bene.verified && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleVerify(bene.id); }}
                                        className="px-3 py-1.5 border border-slate-200 text-slate-600 text-[10px] font-bold rounded hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                                    >
                                        Verify
                                    </button>
                                )}
                                <button 
                                    onClick={() => onSelect(bene)}
                                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-1 shadow-lg shadow-slate-200"
                                >
                                    Transfer <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Add Beneficiary Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-white/90 z-10 flex items-center justify-center backdrop-blur-sm rounded-2xl">
            <div className="bg-white border border-slate-200 shadow-2xl p-6 rounded-2xl w-full max-w-sm m-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Add Bank Account</h3>
                    <button onClick={() => setShowAddModal(false)}><X size={20} className="text-slate-400" /></button>
                </div>
                <form onSubmit={handleAddBene} className="space-y-3">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Account Number</label>
                        <input className="w-full border rounded-lg p-2.5 text-sm font-bold outline-none" required value={newBene.account} onChange={e=>setNewBene({...newBene, account: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">IFSC Code</label>
                        <input className="w-full border rounded-lg p-2.5 text-sm font-bold outline-none uppercase" required value={newBene.ifsc} onChange={e=>setNewBene({...newBene, ifsc: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Bank Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 text-slate-400" size={16}/>
                            <input className="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm font-bold outline-none" required value={newBene.bank} onChange={e=>setNewBene({...newBene, bank: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Account Holder Name</label>
                        <input className="w-full border rounded-lg p-2.5 text-sm font-bold outline-none" required value={newBene.name} onChange={e=>setNewBene({...newBene, name: e.target.value})} />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-2 hover:bg-blue-700">Save Beneficiary</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryList;
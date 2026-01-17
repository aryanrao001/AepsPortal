import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, MapPin, User, Edit2, CheckCircle2, 
  X, Filter, Percent, ArrowRight, Save, Shield, Lock, Phone, Building2
} from 'lucide-react';

const INITIAL_USERS = [
  { 
    id: "DT_101", 
    name: "Singh Enterprises", 
    role: "Distributor", 
    owner: "Rajesh Singh", 
    mobile: "9876543210", 
    zone: "North Delhi", 
    balance: 45000, 
    status: "Active", 
    commType: "Standard",
    rates: { aeps: 0.25, dmt: 1.0, recharge: 2.5 } // Default values
  },
  { 
    id: "RT_205", 
    name: "Amit General Store", 
    role: "Retailer", 
    owner: "Amit Kumar", 
    mobile: "8877665544", 
    zone: "West Delhi", 
    balance: 2500, 
    status: "Active", 
    commType: "Custom",
    rates: { aeps: 0.50, dmt: 1.2, recharge: 3.0 } // Custom values
  },
];

const DistributorManager = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [filterRole, setFilterRole] = useState("All"); 
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- ADD USER STATE ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [newUserData, setNewUserData] = useState({ role: 'Distributor', firmName: '', ownerName: '', mobile: '', zone: 'North Zone' });

  // --- EDIT USER STATE ---
  const [editingUser, setEditingUser] = useState(null); // Holds the user object being edited
  const [editTab, setEditTab] = useState('profile'); // 'profile' or 'commission'

  // --- HANDLERS ---

  // 1. Open Edit Modal
  const handleEditClick = (user) => {
    setEditingUser({ ...user }); // Create a copy to edit
    setEditTab('profile'); // Reset to first tab
  };

  // 2. Save Edited User
  const handleSaveEdit = () => {
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    alert("User details updated successfully!");
  };

  // 3. Add New User
  const handleAddSubmit = () => {
    const newUser = {
        id: `NEW_${Math.floor(Math.random()*1000)}`,
        name: newUserData.firmName,
        role: newUserData.role,
        owner: newUserData.ownerName,
        mobile: newUserData.mobile,
        zone: newUserData.zone,
        balance: 0,
        status: "Active",
        commType: "Standard",
        rates: { aeps: 0.25, dmt: 1.0, recharge: 2.5 }
    };
    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setAddStep(1);
  };

  // Helper for Badges
  const getRoleBadge = (role) => {
    switch(role) {
        case 'Distributor': return "bg-purple-100 text-purple-700 border-purple-200";
        case 'Retailer': return "bg-blue-100 text-blue-700 border-blue-200";
        default: return "bg-slate-100 text-slate-600";
    }
  };

  const filteredData = users.filter(u => 
    (filterRole === "All" || u.role === filterRole) &&
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.mobile.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      
      {/* --- Toolbar --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search Name, Mobile..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="hidden md:flex bg-slate-100 p-1 rounded-lg">
                {['All', 'Distributor', 'Retailer'].map(r => (
                    <button 
                        key={r}
                        onClick={() => setFilterRole(r)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filterRole === r ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {r}
                    </button>
                ))}
            </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg active:scale-95 transition-all"
        >
          <Plus size={18} /> Onboard New User
        </button>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs text-slate-500 uppercase">
              <th className="px-6 py-4">Entity Details</th>
              <th className="px-6 py-4">Role & Zone</th>
              <th className="px-6 py-4">Commercial Plan</th>
              <th className="px-6 py-4">Balance</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
            {filteredData.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {user.name[0]}
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                            {user.name}
                            {user.status === 'Inactive' && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded">SUSPENDED</span>}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                            <User size={10}/> {user.owner} • {user.mobile}
                        </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <div className="space-y-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getRoleBadge(user.role)}`}>
                            {user.role}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={10}/> {user.zone}
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    {user.commType === 'Standard' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            <Shield size={12} /> Zone Standard
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                            <Percent size={12} /> Custom Rates
                        </span>
                    )}
                </td>
                <td className="px-6 py-4 font-mono font-bold">₹ {user.balance.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => handleEditClick(user)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit User"
                    >
                        <Edit2 size={16}/>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =================================================================================
          EDIT USER MODAL 
         ================================================================================= */}
      <AnimatePresence>
        {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0.95, opacity: 0 }} 
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Edit User Profile</h3>
                            <p className="text-xs text-slate-500">ID: {editingUser.id}</p>
                        </div>
                        <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-100">
                        <button 
                            onClick={() => setEditTab('profile')}
                            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${editTab === 'profile' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                        >
                            Profile Details
                        </button>
                        <button 
                            onClick={() => setEditTab('commission')}
                            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${editTab === 'commission' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                        >
                            Commission Settings
                        </button>
                    </div>
                    
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        
                        {/* TAB 1: PROFILE EDIT */}
                        {editTab === 'profile' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Firm Name</label>
                                        <div className="relative">
                                            <Building2 size={14} className="absolute left-3 top-3 text-slate-400" />
                                            <input 
                                                value={editingUser.name} 
                                                onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                                                className="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Owner Name</label>
                                        <div className="relative">
                                            <User size={14} className="absolute left-3 top-3 text-slate-400" />
                                            <input 
                                                value={editingUser.owner} 
                                                onChange={e => setEditingUser({...editingUser, owner: e.target.value})}
                                                className="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Mobile</label>
                                        <div className="relative">
                                            <Phone size={14} className="absolute left-3 top-3 text-slate-400" />
                                            <input 
                                                value={editingUser.mobile} 
                                                onChange={e => setEditingUser({...editingUser, mobile: e.target.value})}
                                                className="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Account Status</label>
                                        <select 
                                            value={editingUser.status}
                                            onChange={e => setEditingUser({...editingUser, status: e.target.value})}
                                            className={`w-full border rounded-lg px-3 py-2.5 text-sm font-bold outline-none ${editingUser.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Suspended / Ban</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: COMMISSION EDIT */}
                        {editTab === 'commission' && (
                            <div className="space-y-5">
                                {/* Toggle Mode */}
                                <div className="bg-slate-100 p-1 rounded-xl flex">
                                    <button 
                                        onClick={() => setEditingUser({...editingUser, commType: 'Standard'})}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${editingUser.commType === 'Standard' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                                    >
                                        Standard Plan
                                    </button>
                                    <button 
                                        onClick={() => setEditingUser({...editingUser, commType: 'Custom'})}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${editingUser.commType === 'Custom' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
                                    >
                                        Custom Override
                                    </button>
                                </div>

                                {editingUser.commType === 'Standard' ? (
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                                        <Shield className="mx-auto text-blue-600 mb-2" size={32} />
                                        <h4 className="font-bold text-slate-800">Zone Standard Applied</h4>
                                        <p className="text-xs text-blue-700 mt-1">
                                            This user inherits default rates for <strong>{editingUser.zone}</strong>.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 border rounded-xl">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">AEPS Margin (%)</label>
                                            <input 
                                                type="number" 
                                                value={editingUser.rates?.aeps} 
                                                onChange={(e) => setEditingUser({...editingUser, rates: {...editingUser.rates, aeps: parseFloat(e.target.value)}})}
                                                className="w-full mt-1 font-bold text-slate-900 outline-none"
                                            />
                                        </div>
                                        <div className="p-3 border rounded-xl">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">DMT Fee (%)</label>
                                            <input 
                                                type="number" 
                                                value={editingUser.rates?.dmt} 
                                                onChange={(e) => setEditingUser({...editingUser, rates: {...editingUser.rates, dmt: parseFloat(e.target.value)}})}
                                                className="w-full mt-1 font-bold text-slate-900 outline-none"
                                            />
                                        </div>
                                        <div className="p-3 border rounded-xl">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Recharge (%)</label>
                                            <input 
                                                type="number" 
                                                value={editingUser.rates?.recharge} 
                                                onChange={(e) => setEditingUser({...editingUser, rates: {...editingUser.rates, recharge: parseFloat(e.target.value)}})}
                                                className="w-full mt-1 font-bold text-slate-900 outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-100 flex gap-3 bg-slate-50">
                        <button onClick={() => setEditingUser(null)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white">Cancel</button>
                        <button onClick={handleSaveEdit} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 flex items-center justify-center gap-2">
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* =================================================================================
          ADD USER MODAL (Existing)
         ================================================================================= */}
      <AnimatePresence>
        {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div><h3 className="font-bold text-lg text-slate-800">Onboard New Entity</h3><p className="text-xs text-slate-500">Step {addStep} of 2</p></div>
                        <button onClick={() => setIsAddModalOpen(false)}><X size={20} className="text-slate-400"/></button>
                    </div>
                    <div className="p-6">
                        {addStep === 1 ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Role</label>
                                    <div className="flex gap-2">
                                        {['Distributor', 'Retailer'].map(r => (
                                            <button key={r} onClick={() => setNewUserData({...newUserData, role: r})} className={`flex-1 py-2 text-sm font-bold rounded-lg border ${newUserData.role === r ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500'}`}>{r}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Firm Name" className="border rounded-lg p-2.5 text-sm font-bold" value={newUserData.firmName} onChange={e => setNewUserData({...newUserData, firmName: e.target.value})} />
                                    <input placeholder="Owner Name" className="border rounded-lg p-2.5 text-sm font-bold" value={newUserData.ownerName} onChange={e => setNewUserData({...newUserData, ownerName: e.target.value})} />
                                </div>
                                <input placeholder="Mobile Number" className="w-full border rounded-lg p-2.5 text-sm font-bold" value={newUserData.mobile} onChange={e => setNewUserData({...newUserData, mobile: e.target.value})} />
                                <button onClick={() => setAddStep(2)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-2">Next Step <ArrowRight size={16}/></button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-blue-50 border-blue-100 border rounded-xl p-4 text-center"><p className="text-xs text-blue-700 font-bold">Standard Zone Commission will be applied initially.</p></div>
                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setAddStep(1)} className="flex-1 border py-3 rounded-xl font-bold text-sm">Back</button>
                                    <button onClick={handleAddSubmit} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm">Create Account</button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DistributorManager;
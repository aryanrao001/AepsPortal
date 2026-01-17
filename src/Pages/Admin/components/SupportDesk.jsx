import React, { useState } from 'react';
import { MessageSquare, Map, ChevronRight, FileText } from 'lucide-react';

const SupportDesk = () => {
  const [activeView, setActiveView] = useState('disputes');

  return (
    <div className="space-y-6">
        {/* Toggle */}
        <div className="flex gap-4 border-b border-slate-200 pb-1">
            <button onClick={() => setActiveView('disputes')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeView === 'disputes' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500'}`}>Dispute Handling</button>
            <button onClick={() => setActiveView('reports')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeView === 'reports' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500'}`}>Area-wise Reports</button>
        </div>

        {activeView === 'disputes' ? (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b"><tr className="text-xs text-slate-500 uppercase"><th className="px-6 py-4">Ticket ID</th><th className="px-6 py-4">User</th><th className="px-6 py-4">Issue</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Action</th></tr></thead>
                    <tbody className="text-sm">
                        {[
                            { id: "#TK_9921", user: "Rahul Telecom", issue: "Wallet Debit Failed", status: "Open" },
                            { id: "#TK_9922", user: "City Point", issue: "KYC Rejected", status: "In Progress" },
                        ].map((t, i) => (
                            <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono font-bold text-blue-600">{t.id}</td>
                                <td className="px-6 py-4">{t.user}</td>
                                <td className="px-6 py-4">{t.issue}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${t.status === 'Open' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{t.status}</span></td>
                                <td className="px-6 py-4"><button className="text-slate-500 hover:text-slate-900"><MessageSquare size={18}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Map size={18}/> Zone Performance</h3>
                <div className="space-y-3">
                    {[
                        { zone: "North Zone", sales: "₹ 1.2Cr", active: "85%" },
                        { zone: "West Zone", sales: "₹ 98L", active: "72%" },
                        { zone: "East Zone", sales: "₹ 45L", active: "60%" },
                    ].map((zone, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <div className="font-bold text-slate-900">{zone.zone}</div>
                                <div className="text-xs text-slate-500">Active Agents: {zone.active}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-emerald-600">{zone.sales}</div>
                                <button className="text-xs text-blue-600 font-bold hover:underline flex items-center justify-end gap-1 mt-1">Full Report <ChevronRight size={12}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default SupportDesk;
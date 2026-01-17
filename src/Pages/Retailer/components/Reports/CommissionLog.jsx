import React from 'react';
import { TrendingUp, Filter } from 'lucide-react';

const MOCK_COMM_DATA = [
  { id: "COMM_991", date: "Oct 24, 10:30 AM", service: "AEPS Cash Withdrawal", ref: "TXN_AEPS_001", amount: "12.50" },
  { id: "COMM_992", date: "Oct 24, 10:45 AM", service: "DMT Surcharge", ref: "DMT_88210", amount: "8.00" },
  { id: "COMM_993", date: "Oct 23, 05:00 PM", service: "Mobile Recharge", ref: "RCH_7721", amount: "4.50" },
];

const CommissionLog = () => {
  return (
    <div className="h-full flex flex-col">
        
        {/* Stats Header */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 bg-slate-50/30">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex justify-between items-center">
                <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase">Today's Earning</p>
                    <h3 className="text-2xl font-extrabold text-emerald-800">₹ 420.50</h3>
                </div>
                <TrendingUp className="text-emerald-300" size={32} />
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase">This Month</p>
                <h3 className="text-2xl font-extrabold text-blue-800">₹ 8,450.00</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-center">
                <button className="flex items-center gap-2 text-slate-600 text-sm font-bold hover:text-slate-900">
                    <Filter size={16} /> Filter by Service
                </button>
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-slate-200 text-xs uppercase font-bold text-slate-500 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3">Date / ID</th>
                        <th className="px-6 py-3">Service</th>
                        <th className="px-6 py-3">Reference Txn</th>
                        <th className="px-6 py-3 text-right">Commission Earned</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                    {MOCK_COMM_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-700">{row.date}</div>
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{row.id}</div>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-800">{row.service}</td>
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">{row.ref}</td>
                            <td className="px-6 py-4 text-right">
                                <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                                    + ₹ {row.amount}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default CommissionLog;
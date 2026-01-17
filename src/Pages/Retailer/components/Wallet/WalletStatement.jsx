import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const MOCK_TXNS = [
  { id: "TXN_99821", date: "Oct 24, 10:45 AM", desc: "DMT Transfer - Rahul", type: "Debit", amount: "5,000.00", bal: "24,590.00", status: "Success" },
  { id: "TXN_99820", date: "Oct 24, 10:30 AM", desc: "Commission - AEPS", type: "Credit", amount: "12.50", bal: "29,590.00", status: "Success" },
  { id: "TXN_99819", date: "Oct 24, 09:15 AM", desc: "Wallet Load (Distributor)", type: "Credit", amount: "20,000.00", bal: "29,577.50", status: "Success" },
  { id: "TXN_99818", date: "Oct 23, 05:00 PM", desc: "Mobile Recharge", type: "Debit", amount: "299.00", bal: "9,577.50", status: "Failed" },
];

const WalletStatement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTxns = MOCK_TXNS.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search Transactions..." 
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Filter size={14} /> Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download size={14} /> Export
                </button>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                    <tr>
                        <th className="px-6 py-4">Transaction ID / Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4 text-right">Balance</th>
                        <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-100">
                    {filteredTxns.map((txn, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{txn.id}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{txn.date}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{txn.desc}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${txn.type === 'Credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                    {txn.type === 'Credit' ? <ArrowDownLeft size={12}/> : <ArrowUpRight size={12}/>}
                                    {txn.type}
                                </span>
                            </td>
                            <td className={`px-6 py-4 text-right font-bold font-mono ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                                {txn.type === 'Credit' ? '+' : '-'} ₹ {txn.amount}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-slate-500">
                                ₹ {txn.bal}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {txn.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-center">
            <button className="text-xs font-bold text-slate-500 hover:text-slate-800">Load More Transactions</button>
        </div>
    </div>
  );
};

export default WalletStatement;
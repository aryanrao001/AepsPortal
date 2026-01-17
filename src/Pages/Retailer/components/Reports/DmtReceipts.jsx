import React from 'react';
import { Search, Printer, ArrowRight } from 'lucide-react';

const MOCK_DMT_DATA = [
  { id: "DMT_88210", date: "Oct 24, 10:45 AM", sender: "Rahul Sharma", bene: "Priya Singh", bank: "SBI", account: "**9982", amount: "5,000", fee: "25.00", status: "Success" },
  { id: "DMT_88211", date: "Oct 24, 11:00 AM", sender: "Amit Kumar", bene: "Self", bank: "HDFC", account: "**4421", amount: "10,000", fee: "50.00", status: "Refunded" },
];

const DmtReceipts = () => {
  return (
    <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search Sender Mobile or Txn ID..." 
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3">Txn ID / Date</th>
                        <th className="px-6 py-3">Transfer Flow</th>
                        <th className="px-6 py-3">Beneficiary Bank</th>
                        <th className="px-6 py-3 text-right">Amount</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-right">Receipt</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                    {MOCK_DMT_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{row.id}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{row.date}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    {row.sender} <ArrowRight size={12} className="text-slate-400"/> {row.bene}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500">
                                <div className="font-bold text-slate-700">{row.bank}</div>
                                <div>Acc: {row.account}</div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="font-bold font-mono text-slate-900">₹ {row.amount}</div>
                                <div className="text-[10px] text-slate-400">Fee: ₹ {row.fee}</div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                                    row.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                    row.status === 'Refunded' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                                    'bg-red-50 text-red-700 border-red-100'
                                }`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="flex items-center gap-1 ml-auto text-blue-600 text-xs font-bold hover:underline">
                                    <Printer size={14} /> Print
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default DmtReceipts;
import React, { useState } from 'react';
import { Search, Download, Eye, CheckCircle2, XCircle, Printer } from 'lucide-react';

const MOCK_AEPS_DATA = [
  { id: "TXN_AEPS_001", date: "Oct 24, 10:30 AM", type: "Cash Withdrawal", amount: "5,000", aadhaar: "XXXX-XXXX-1234", bank: "SBI", rrn: "123456789012", status: "Success" },
  { id: "TXN_AEPS_002", date: "Oct 24, 11:15 AM", type: "Balance Enquiry", amount: "-", aadhaar: "XXXX-XXXX-5678", bank: "HDFC", rrn: "123456789013", status: "Failed" },
  { id: "TXN_AEPS_003", date: "Oct 23, 04:45 PM", type: "Aadhaar Pay", amount: "2,500", aadhaar: "XXXX-XXXX-9012", bank: "PNB", rrn: "123456789014", status: "Success" },
];

const AepsReceipts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_AEPS_DATA.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.aadhaar.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search Txn ID or Last 4 Aadhaar..." 
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3">Transaction Details</th>
                        <th className="px-6 py-3">Customer Info</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3 text-right">Amount</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                    {filteredData.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{row.id}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{row.date}</div>
                                <div className="text-[10px] text-slate-500 font-mono mt-0.5">RRN: {row.rrn}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-slate-700">{row.aadhaar}</div>
                                <div className="text-xs text-slate-500">{row.bank}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                                    {row.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right font-bold font-mono">
                                {row.amount !== '-' ? `₹ ${row.amount}` : '-'}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase ${row.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                    {row.status === 'Success' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                    {row.status}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-all" title="Print Receipt">
                                    <Printer size={16} />
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

export default AepsReceipts;
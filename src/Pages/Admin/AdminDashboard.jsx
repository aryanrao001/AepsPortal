import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Calendar, Download, Filter, Search, 
  ArrowUpRight, ArrowDownRight, FileText, PieChart, 
  CreditCard, Wallet, RefreshCw, ChevronDown 
} from 'lucide-react';

const REPORTS_DATA = {
  transactions: [
    { id: "TXN_882910", date: "Oct 24, 10:30 AM", user: "Rahul Telecom", type: "AEPS W/D", amount: "₹ 2,500", status: "Success", comm: "₹ 12.50" },
    { id: "TXN_882911", date: "Oct 24, 10:35 AM", user: "City Point", type: "DMT Transfer", amount: "₹ 5,000", status: "Pending", comm: "₹ 25.00" },
    { id: "TXN_882912", date: "Oct 24, 10:42 AM", user: "Vijay Tech", type: "Bill Payment", amount: "₹ 850", status: "Success", comm: "₹ 2.00" },
    { id: "TXN_882913", date: "Oct 24, 11:00 AM", user: "Amit Store", type: "Mobile Rech", amount: "₹ 299", status: "Failed", comm: "₹ 0.00" },
    { id: "TXN_882914", date: "Oct 24, 11:15 AM", user: "Singh Ent", type: "AEPS W/D", amount: "₹ 10,000", status: "Success", comm: "₹ 18.00" },
  ],
  wallet: [
    { id: "WAL_1002", date: "Oct 24", user: "Singh Enterprises", type: "Credit (Load)", amount: "+ ₹ 50,000", balance: "₹ 1,25,000" },
    { id: "WAL_1003", date: "Oct 24", user: "Ravi Trading", type: "Debit (Admin)", amount: "- ₹ 5,000", balance: "₹ 12,000" },
  ]
};

const AdminDashboard = () => {
  const [reportType, setReportType] = useState('transactions'); // 'transactions' | 'wallet' | 'commissions'
  const [dateRange, setDateRange] = useState('This Month');
  const [isExporting, setIsExporting] = useState(false);

  // --- Actions ---
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report (${reportType}) downloaded successfully.`);
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- 1. Report Control Toolbar --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-blue-600" size={24} /> Financial Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">Generate detailed logs for audits and accounting.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Date Picker Mock */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-white transition-all">
              <Calendar size={16} /> {dateRange} <ChevronDown size={14} className="opacity-50" />
            </button>
            {/* Dropdown (Hidden logic for demo) */}
          </div>

          {/* Export Button */}
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-70"
          >
            {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? 'Generating...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* --- 2. KPI Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Gross Transaction Value", val: "₹ 1.2 Cr", sub: "+12% vs last month", color: "text-slate-900", icon: BarChart3, bg: "bg-blue-50 text-blue-600" },
          { label: "Net Revenue (Comm.)", val: "₹ 4.8 L", sub: "0.4% Avg Margin", color: "text-emerald-600", icon: Wallet, bg: "bg-emerald-50 text-emerald-600" },
          { label: "Success Rate", val: "98.2%", sub: "1.8% Failure Rate", color: "text-slate-900", icon: RefreshCw, bg: "bg-purple-50 text-purple-600" },
          { label: "Wallet Float", val: "₹ 85.5 L", sub: "Across all users", color: "text-slate-900", icon: CreditCard, bg: "bg-orange-50 text-orange-600" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
                <h3 className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.val}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
              {kpi.sub.includes('+') ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-slate-400" />}
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* --- 3. Visual Analytics Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Transaction Volume Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Daily Volume Trend</h3>
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">Last 7 Days</span>
          </div>
          
          {/* CSS Bar Chart Simulation */}
          <div className="flex items-end justify-between h-48 gap-2 pt-4">
            {[45, 60, 35, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full bg-slate-100 rounded-t-lg relative h-full flex items-end overflow-hidden group-hover:bg-slate-200 transition-colors">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${h}%` }} 
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-blue-600 rounded-t-md opacity-80 group-hover:opacity-100"
                  ></motion.div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Split */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Revenue by Service</h3>
          <div className="space-y-5">
            {[
              { label: "AEPS Banking", val: 45, color: "bg-blue-600" },
              { label: "Money Transfer", val: 30, color: "bg-emerald-500" },
              { label: "Bill Payments", val: 15, color: "bg-purple-500" },
              { label: "Recharges", val: 10, color: "bg-orange-500" },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">{s.label}</span>
                  <span className="text-slate-900">{s.val}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 4. Detailed Data Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Table Tabs */}
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setReportType('transactions')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${reportType === 'transactions' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
          >
            <FileText size={16} /> Transaction Ledger
          </button>
          <button 
            onClick={() => setReportType('wallet')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${reportType === 'wallet' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
          >
            <Wallet size={16} /> Wallet Loads
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50/50 flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input type="text" placeholder="Search Transaction ID, User..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-white" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs font-bold text-slate-600 hover:bg-slate-50">
            <Filter size={14} /> Filter Status
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Transaction Details</th>
                <th className="px-6 py-4 font-bold">User / Shop</th>
                {reportType === 'transactions' && <th className="px-6 py-4 font-bold">Type</th>}
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                {reportType === 'transactions' && <th className="px-6 py-4 font-bold text-right">Commission</th>}
                {reportType === 'wallet' && <th className="px-6 py-4 font-bold text-right">Closing Bal.</th>}
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
              {reportType === 'transactions' ? (
                REPORTS_DATA.transactions.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{row.id}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{row.date}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{row.user}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200">{row.type}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        row.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        row.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600 font-bold">{row.comm}</td>
                  </tr>
                ))
              ) : (
                REPORTS_DATA.wallet.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{row.id}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{row.date}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{row.user}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.amount}</td>
                    <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${row.type.includes('Credit') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {row.type}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-600">{row.balance}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Showing 1-10 of 1,240 records</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">Previous</button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">Next</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
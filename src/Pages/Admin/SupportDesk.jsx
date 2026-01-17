import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Map, ChevronRight, BarChart3, Clock, 
  CheckCircle2, Search, Filter, Download, AlertCircle, 
  MoreHorizontal, User, Send
} from 'lucide-react';

const INITIAL_TICKETS = [
  { id: "TK_8829", user: "Rahul Telecom", subject: "Wallet Debit Failed but Money Cut", status: "Open", priority: "High", time: "10 mins ago", msg: "I tried to transfer 5k but it failed..." },
  { id: "TK_7721", user: "City Point", subject: "KYC Rejected Repeatedly", status: "In Progress", priority: "Medium", time: "2 hrs ago", msg: "My documents are clear but still getting rejected." },
  { id: "TK_1102", user: "Amit Store", subject: "Commission not received", status: "Resolved", priority: "Low", time: "1 day ago", msg: "DMT transaction #9921 commission missing." },
  { id: "TK_3321", user: "Vijay Tech", subject: "Login Issue on App", status: "Open", priority: "High", time: "3 hrs ago", msg: "App crashes when opening ledger." },
];

const ZONE_DATA = [
  { zone: "North Zone", sales: 12000000, target: 15000000, growth: 12.5, active: 85 },
  { zone: "West Zone", sales: 9800000, target: 10000000, growth: 8.2, active: 72 },
  { zone: "East Zone", sales: 4500000, target: 8000000, growth: -2.4, active: 60 },
  { zone: "South Zone", sales: 15500000, target: 14000000, growth: 18.0, active: 92 },
];

const SupportDesk = () => {
  const [activeView, setActiveView] = useState('disputes'); // 'disputes' | 'reports'
  const [ticketFilter, setTicketFilter] = useState('All');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Helpers ---
  const getStatusColor = (status) => {
    switch(status) {
        case 'Open': return 'bg-red-50 text-red-700 border-red-100';
        case 'In Progress': return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        default: return 'bg-slate-50 text-slate-600';
    }
  };

  const getPriorityDot = (p) => {
    if(p === 'High') return 'bg-red-500';
    if(p === 'Medium') return 'bg-amber-500';
    return 'bg-blue-500';
  };

  const filteredTickets = tickets.filter(t => 
    (ticketFilter === 'All' || t.status === ticketFilter) &&
    (t.user.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6">
       
       {/* --- Header & Tabs --- */}
       <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            <button 
                onClick={() => setActiveView('disputes')} 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeView === 'disputes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <MessageSquare size={16} /> Dispute Center
            </button>
            <button 
                onClick={() => setActiveView('reports')} 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeView === 'reports' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <BarChart3 size={16} /> Zone Analytics
            </button>
          </div>

          {activeView === 'disputes' && (
              <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search Ticket ID or User..." 
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
              </div>
          )}
       </div>

      <AnimatePresence mode="wait">
        
        {/* === VIEW 1: DISPUTES === */}
        {activeView === 'disputes' && (
            <motion.div 
                key="disputes"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    {['All', 'Open', 'In Progress', 'Resolved'].map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setTicketFilter(filter)}
                            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                                ticketFilter === filter 
                                ? 'bg-white border-blue-200 text-blue-700 shadow-sm' 
                                : 'bg-transparent border-transparent text-slate-500 hover:bg-white hover:border-slate-200'
                            }`}
                        >
                            {filter} Tickets
                            <span className={`text-xs px-2 py-0.5 rounded-full ${ticketFilter === filter ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                                {filter === 'All' ? tickets.length : tickets.filter(t => t.status === filter).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Ticket List */}
                <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-[500px]">
                    <div className="divide-y divide-slate-100">
                        {filteredTickets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <CheckCircle2 size={48} className="mb-4 text-emerald-100" />
                                <p>No tickets found matching criteria.</p>
                            </div>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <div key={ticket.id} className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-2 h-2 rounded-full ${getPriorityDot(ticket.priority)}`}></span>
                                            <span className="font-mono text-xs font-bold text-slate-400">#{ticket.id}</span>
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} /> {ticket.time}
                                        </span>
                                    </div>
                                    
                                    <h4 className="font-bold text-slate-800 text-base mb-1">{ticket.subject}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-1">{ticket.msg}</p>
                                    
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                            <User size={12} /> {ticket.user}
                                        </div>
                                        
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-white hover:border-blue-300 hover:text-blue-600">
                                                View Details
                                            </button>
                                            <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-1">
                                                <Send size={12} /> Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </motion.div>
        )}

        {/* === VIEW 2: REPORTS === */}
        {activeView === 'reports' && (
            <motion.div 
                key="reports"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
            >
                {/* Sales Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ZONE_DATA.map((z, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">{z.zone}</h4>
                                <div className="text-lg font-extrabold text-slate-900">{formatCurrency(z.sales)}</div>
                                <div className={`flex items-center gap-1 text-xs font-bold mt-2 ${z.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {z.growth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                                    {Math.abs(z.growth)}% vs Target
                                </div>
                            </div>
                            {/* Background Chart Element */}
                            <div className="absolute bottom-0 right-0 w-20 h-10 opacity-10 bg-current"></div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Performance Table */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 text-lg">Zone Performance Matrix</h3>
                            <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                <Download size={16} /> Export Report
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {ZONE_DATA.map((z, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm font-bold mb-2">
                                        <span className="text-slate-700">{z.zone}</span>
                                        <span className="text-slate-500 text-xs">
                                            {formatCurrency(z.sales)} / <span className="text-slate-400">{formatCurrency(z.target)}</span>
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                                        <div 
                                            className={`h-full rounded-full ${z.sales >= z.target ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                                            style={{ width: `${(z.sales / z.target) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map / Geo Placeholder */}
                    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-center items-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                        <Map size={64} className="text-slate-700 mb-4 group-hover:scale-110 transition-transform duration-500" />
                        <h3 className="font-bold text-lg relative z-10">Geospatial Data</h3>
                        <p className="text-sm text-slate-400 text-center mt-2 max-w-[200px] relative z-10">
                            Interactive heatmap of transaction density requires WebGL support.
                        </p>
                        <button className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold backdrop-blur-sm transition-colors border border-white/10 relative z-10">
                            Launch Map View
                        </button>
                    </div>

                </div>
            </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

// Simple Icons for the component
const TrendingUpIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const TrendingDownIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>;

export default SupportDesk;
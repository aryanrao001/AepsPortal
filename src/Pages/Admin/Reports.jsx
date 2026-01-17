import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, MapPin, Globe, TrendingUp, TrendingDown, 
  ArrowUpRight, Download, Calendar, Filter, Search, 
  Navigation, Users, ChevronRight, BarChart3
} from 'lucide-react';

// --- MOCK DATA ---
const ZONE_STATS = [
  { id: 'north', name: "North Zone", revenue: "₹ 1.25 Cr", growth: 12.4, agents: 450, target: 85, status: "High" },
  { id: 'west', name: "West Zone", revenue: "₹ 98.5 L", growth: 8.2, agents: 320, target: 72, status: "Medium" },
  { id: 'south', name: "South Zone", revenue: "₹ 1.80 Cr", growth: 18.5, agents: 610, target: 94, status: "High" },
  { id: 'east', name: "East Zone", revenue: "₹ 42.0 L", growth: -2.1, agents: 180, target: 45, status: "Low" },
];

const CITY_DATA = [
  { city: "New Delhi", state: "Delhi", dists: 12, retailers: 145, vol: "₹ 45L", trend: "up" },
  { city: "Jaipur", state: "Rajasthan", dists: 8, retailers: 92, vol: "₹ 28L", trend: "up" },
  { city: "Lucknow", state: "Uttar Pradesh", dists: 5, retailers: 64, vol: "₹ 12L", trend: "down" },
  { city: "Chandigarh", state: "Punjab", dists: 4, retailers: 48, vol: "₹ 15L", trend: "stable" },
  { city: "Dehradun", state: "Uttarakhand", dists: 2, retailers: 22, vol: "₹ 5L", trend: "up" },
];

const Reports = () => {
  const [selectedZone, setSelectedZone] = useState('All');

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* --- 1. Header: Regional Controls --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Globe className="text-blue-600" size={24} /> Regional Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">Monitor performance across territories, states, and pincodes.</p>
        </div>

        <div className="flex flex-wrap gap-3">
            {/* Zone Filter */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
                {['All', 'North', 'South', 'East', 'West'].map(z => (
                    <button 
                        key={z} 
                        onClick={() => setSelectedZone(z)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedZone === z ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {z}
                    </button>
                ))}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50">
               <Calendar size={14} /> This Month
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:scale-95">
               <Download size={14} /> Export Map Data
            </button>
        </div>
      </div>

      {/* --- 2. Territory Highlights (KPIs) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: "Top Performing Region", val: "South Zone", sub: "₹ 1.8 Cr Volume", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Active Pincodes", val: "842", sub: "+12 New Areas", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Network Size", val: "1,560", sub: "Retailers & Dists", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Under-served Areas", val: "3 Regions", sub: "Require Attention", icon: Navigation, color: "text-orange-600", bg: "bg-orange-50" }
        ].map((kpi, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
                        <h3 className={`text-xl font-extrabold mt-1 text-slate-900`}>{kpi.val}</h3>
                    </div>
                    <div className={`p-2.5 rounded-xl ${kpi.bg} ${kpi.color}`}>
                        <kpi.icon size={18} />
                    </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-50 text-xs font-bold text-slate-500 flex items-center gap-1">
                    <ArrowUpRight size={12} className={kpi.color} /> {kpi.sub}
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- 3. Zone Comparison Cards (Left Col) --- */}
        <div className="lg:col-span-1 space-y-4">
            {ZONE_STATS.map((zone) => (
                <div key={zone.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="font-bold text-slate-800">{zone.name}</h4>
                            <p className="text-xs text-slate-500">{zone.agents} Active Agents</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${zone.growth > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {zone.growth > 0 ? '+' : ''}{zone.growth}%
                        </span>
                    </div>
                    
                    <div className="flex items-end gap-1 mb-1">
                        <span className="text-2xl font-extrabold text-slate-900">{zone.revenue}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1.5">/ Month</span>
                    </div>

                    {/* Target Progress Bar */}
                    <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                            <span>Target Achievement</span>
                            <span>{zone.target}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${zone.target > 80 ? 'bg-emerald-500' : zone.target > 50 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                                style={{ width: `${zone.target}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- 4. Interactive Map Visualization (Center/Right Col) --- */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-xl group">
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_blank_map.svg/1200px-India_blank_map.svg.png')] bg-contain bg-center bg-no-repeat opacity-10 grayscale invert"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

            <div className="relative z-10 p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl max-w-sm">
                <Map size={48} className="text-blue-400 mx-auto mb-4 drop-shadow-lg animate-pulse" />
                <h3 className="text-xl font-bold text-white">Live Territory Heatmap</h3>
                <p className="text-sm text-slate-300 mt-2 mb-6 leading-relaxed">
                    Visualise transaction density and active agent locations in real-time across the map.
                </p>
                <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-xs text-slate-400 uppercase font-bold">Density</div>
                        <div className="text-white font-bold">High (North)</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-xs text-slate-400 uppercase font-bold">Coverage</div>
                        <div className="text-white font-bold">82% States</div>
                    </div>
                </div>
                <button className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                    Open Full Map View
                </button>
            </div>
        </div>
      </div>

      {/* --- 5. Granular City/State Table --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Navigation size={18} className="text-slate-400" /> City-wise Performance Breakdown
            </h3>
            
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input 
                    type="text" 
                    placeholder="Search City or State..." 
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white" 
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-xs text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-4 font-bold">City / Location</th>
                        <th className="px-6 py-4 font-bold">Network Strength</th>
                        <th className="px-6 py-4 font-bold">Total Volume</th>
                        <th className="px-6 py-4 font-bold">Trend</th>
                        <th className="px-6 py-4 font-bold text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                    {CITY_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{row.city}</div>
                                <div className="text-xs text-slate-500">{row.state}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-xs">
                                        <span className="font-bold text-slate-800">{row.dists}</span> <span className="text-slate-400">Dist.</span>
                                    </div>
                                    <div className="w-px h-3 bg-slate-300"></div>
                                    <div className="text-xs">
                                        <span className="font-bold text-slate-800">{row.retailers}</span> <span className="text-slate-400">Ret.</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                    {row.vol}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {row.trend === 'up' && <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold"><TrendingUp size={12}/> Growing</span>}
                                {row.trend === 'down' && <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold"><TrendingDown size={12}/> Decline</span>}
                                {row.trend === 'stable' && <span className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold"><BarChart3 size={12}/> Stable</span>}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <ChevronRight size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default Reports;
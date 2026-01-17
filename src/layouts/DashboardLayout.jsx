import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Bell, Search, ChevronDown, Zap } from 'lucide-react';


const DashboardLayout = ({ role, links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens here
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex text-slate-800">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        
        {/* Brand Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={20} fill="currentColor" className="text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight leading-none">QuickNpay</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{role.replace('_', ' ')} Panel</p>
          </div>
          {/* Close Button (Mobile Only) */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden ml-auto text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {links.map((item, index) => {
            // Render Section Header
            if (item.header) {
              return (
                <div key={index} className="mt-6 mb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {item.header}
                </div>
              );
            }

            // Render Link
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on mobile click
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
              {role.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">User Profile</p>
              <p className="text-xs text-slate-400 truncate">user@quicknpay.com</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            {/* Page Title (Dynamic) */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 hidden md:block">
                {location.pathname.split('/').slice(-1)[0].replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())}
              </h2>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Search Bar (Hidden on small mobile) */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all w-64">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-slate-700 placeholder:text-slate-400" 
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            {/* Wallet Balance (Mock) */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wallet Balance</span>
              <span className="text-sm font-extrabold text-slate-900 font-mono">₹ 42,592.00</span>
            </div>
          </div>
        </header>

        {/* Page Content Render Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Overlay for Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
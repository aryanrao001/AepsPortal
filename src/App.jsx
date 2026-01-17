import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Layouts & Config ---
import DashboardLayout from './layouts/DashboardLayout';
import { SUPER_ADMIN_LINKS, ADMIN_LINKS, RETAILER_LINKS } from './config/navigation'; 

// --- Pages: Public ---
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';

// --- Pages: Super Admin ---
import ReportsAnalytics from './pages/SuperAdmin/Reports/ReportsAnalytics';
import WalletManagement from './pages/SuperAdmin/Wallet/WalletManagement';
import Compliance from './pages/SuperAdmin/Compliance/Compliance';
import DashboardHome from './pages/SuperAdmin/DashboardHome';
import ProviderOnboarding from './pages/SuperAdmin/SystemControl/ProviderOnboarding';
import ServiceMapping from './pages/SuperAdmin/SystemControl/ServiceMapping';
import SwitchRouting from './Pages/SuperAdmin/SystemControl/PaymentReports';
import CommissionSetup from './pages/SuperAdmin/SystemControl/CommissionSetup';
import UserManagement from './Pages/SuperAdmin/Users/UserManagement';
import PaymentReports from './Pages/SuperAdmin/SystemControl/PaymentReports';


// --- Pages: Admin ---
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Distributors from './Pages/Admin/Distributors';
import Finance from './Pages/Admin/Finance';
import Reports from './Pages/Admin/Reports';
import SupportDesk from './Pages/Admin/SupportDesk';

// --- Pages: Retailer ---
// Ensure these match the folder structure you created
import AepsPage from './Pages/Retailer/AepsPage';
import DmtPage from './Pages/Retailer/DmtPage';
import UpiPage from './Pages/Retailer/UpiPage';
import WalletPage from './Pages/Retailer/WalletPage';
import ReportsPage from './Pages/Retailer/ReportsPage';
import RetailerDashboard from './Pages/Retailer/RetailerDashboard'; // Or a dedicated Home/Overview component
import BusinessSummary from './Pages/SuperAdmin/SystemControl/BuisnessSummary';

// --- Helper: Placeholder ---
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
    <div className="text-4xl mb-4">🚧</div>
    <h2 className="text-xl font-bold text-slate-600">{title}</h2>
    <p className="text-sm">This module is under development.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* --- SUPER ADMIN PANEL --- */}
        <Route 
          path="/super-admin" 
          element={
            <DashboardLayout 
              role="Super_Admin" 
              links={SUPER_ADMIN_LINKS} 
            />
          }
        >
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="system/providers" element={<ProviderOnboarding />} />
          <Route path="system/mapping" element={<ServiceMapping />} />
          <Route path="system/reports" element={<PaymentReports />} />
          <Route path="system/buisnessSummary" element={<BusinessSummary />} />
          
          <Route path="system/commissions" element={<CommissionSetup />} />
          <Route path="compliance" element={<Compliance title="Compliance & KYC Policy" />} />
          <Route path="wallet" element={<WalletManagement />} />
          <Route path="users" element={<UserManagement title="User Management" />} />
          <Route path="statement" element={<ReportsAnalytics title="Global Reports & Analytics" />} />
          <Route index element={<Navigate to="system/providers" replace />} />
        </Route>

        {/* --- ADMIN PANEL --- */}
        <Route 
          path="/admin" 
          element={
            <DashboardLayout 
              role="Admin" 
              links={ADMIN_LINKS} 
            />
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="distributors" element={<Distributors title="Distributor Network" />} />
          <Route path="kyc" element={<Compliance title="KYC Approvals" />} />
          <Route path="disputes" element={<Reports title="Dispute Center" />} />
          <Route path="wallet" element={<Finance title="Finance Operations" />} />
          <Route path="support" element={<SupportDesk title="Support Desk" />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* --- RETAILER PANEL (New) --- */}
        <Route 
          path="/retailer" 
          element={
            <DashboardLayout 
              role="Retailer" 
              links={RETAILER_LINKS} 
            />
          }
        >
          {/* Default Dashboard Overview */}
          <Route path="dashboard" element={<RetailerDashboard />} />
          
          {/* Service Modules */}
          <Route path="aeps" element={<AepsPage />} />
          <Route path="dmt" element={<DmtPage />} />
          <Route path="upi" element={<UpiPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="reports" element={<ReportsPage />} />

          {/* Default Redirect */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
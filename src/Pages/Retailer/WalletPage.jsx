import React from 'react';
import { Wallet, ArrowDownLeft } from 'lucide-react';

// Import Components
import BalanceCard from './components/Wallet/BalanceCard';
import FundRequest from './components/Wallet/FundRequest';
import WalletStatement from './components/Wallet/WalletStatement';

const WalletPage = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Wallet className="text-orange-600" /> Wallet & Funds
                </h1>
                <p className="text-sm text-slate-500">Manage your main balance and payout requests.</p>
            </div>
        </div>

        {/* Top Section: Balance & Fund Request */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Balance Card */}
            <div className="lg:col-span-1 h-full">
                <BalanceCard />
            </div>

            {/* Right: Load Money Form */}
            <div className="lg:col-span-2 h-full">
                <FundRequest />
            </div>
        </div>

        {/* Bottom Section: History */}
        <div className="pt-4">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Transaction Statement</h2>
            <WalletStatement />
        </div>
    </div>
  );
};

export default WalletPage;
import React, { useState } from 'react';
import { Search, UserPlus, Smartphone, Loader2, CheckCircle2 } from 'lucide-react';

const SenderRegistration = ({ onSenderFound }) => {
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [regForm, setRegForm] = useState({ firstName: '', lastName: '', otp: '' });

  // Mock Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) return alert("Enter valid 10-digit mobile");
    
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        // Mock Logic: Numbers ending in '00' are considered NEW users
        if (mobile.endsWith('00')) {
            setIsNewUser(true);
        } else {
            // Existing User Found
            onSenderFound({
                name: "Rahul Sharma",
                mobile: mobile,
                limit: 25000,
                kyc: true
            });
        }
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regForm.otp !== '1234') return alert("Invalid OTP (Use 1234)");
    
    // Register & Login
    onSenderFound({
        name: `${regForm.firstName} ${regForm.lastName}`,
        mobile: mobile,
        limit: 10000, // Non-KYC Limit
        kyc: false
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
        <Smartphone className="text-blue-600" size={20} /> Sender Details
      </h3>

      {!isNewUser ? (
        <form onSubmit={handleSearch} className="space-y-4">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Sender Mobile Number</label>
                <div className="relative">
                    <input 
                        type="text" 
                        maxLength={10} 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl font-bold text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="98XXXXXXXX"
                    />
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : <Search size={20} />}
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                    Enter customer mobile number to search or register.
                </p>
            </div>
        </form>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4 flex gap-2 items-center">
                <UserPlus size={18} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-700">New Sender Registration</span>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <input 
                        placeholder="First Name" 
                        className="border rounded-lg p-2.5 text-sm outline-none font-bold"
                        value={regForm.firstName}
                        onChange={e => setRegForm({...regForm, firstName: e.target.value})}
                        required
                    />
                    <input 
                        placeholder="Last Name" 
                        className="border rounded-lg p-2.5 text-sm outline-none font-bold"
                        value={regForm.lastName}
                        onChange={e => setRegForm({...regForm, lastName: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">OTP Verification</label>
                    <div className="flex gap-2 mt-1">
                        <input 
                            placeholder="Enter OTP" 
                            maxLength={4}
                            className="flex-1 border rounded-lg p-2.5 text-sm outline-none font-bold tracking-widest text-center"
                            value={regForm.otp}
                            onChange={e => setRegForm({...regForm, otp: e.target.value})}
                            required
                        />
                        <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Resend</button>
                    </div>
                </div>
                <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg">
                    Verify & Register
                </button>
                <button type="button" onClick={() => setIsNewUser(false)} className="w-full text-xs font-bold text-slate-500 hover:text-slate-800">
                    Cancel
                </button>
            </form>
        </div>
      )}
    </div>
  );
};

export default SenderRegistration;
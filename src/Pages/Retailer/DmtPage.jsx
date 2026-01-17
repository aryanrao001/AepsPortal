import React, { useState } from 'react';
import { Send, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import SenderRegistration from './components/DMT/SenderRegistration';
import BeneficiaryList from './components/DMT/BeneficiaryList';
import MoneyTransferForm from './components/DMT/MoneyTransferForm';

const DmtPage = () => {
  const [step, setStep] = useState(1); // 1: Search, 2: Select Bene, 3: Pay
  const [senderData, setSenderData] = useState(null);
  const [selectedBene, setSelectedBene] = useState(null);

  // Handlers
  const handleSenderFound = (data) => {
    setSenderData(data);
    setStep(2);
  };

  const handleBeneSelect = (bene) => {
    setSelectedBene(bene);
    setStep(3);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Send className="text-emerald-600" /> Money Transfer
          </h1>
          <p className="text-sm text-slate-500">Domestic Remittance (IMPS/NEFT)</p>
        </div>
        
        {step > 1 && (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">Sender: {senderData?.name}</span>
                <button onClick={() => setStep(1)} className="text-xs font-bold text-blue-600 hover:underline">Change</button>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-6">
        
        {/* LEFT COLUMN: Sender Search (Always visible or persistent context) */}
        <div className="lg:col-span-4 h-fit">
            <SenderRegistration onSenderFound={handleSenderFound} />
            
            {step === 1 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-800 text-xs">
                    <strong>Note:</strong> Verify customer mobile number carefully. OTP is required for new sender registration.
                </div>
            )}
        </div>

        {/* RIGHT COLUMN: Dynamic Content (Bene List / Payment Form) */}
        <div className="lg:col-span-8 h-full">
             <AnimatePresence mode="wait">
                
                {/* STEP 1: Placeholder */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="h-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400"
                    >
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">Search for a sender to view beneficiaries</p>
                    </motion.div>
                )}

                {/* STEP 2: Beneficiary List */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="h-full"
                    >
                        <BeneficiaryList sender={senderData} onSelect={handleBeneSelect} />
                    </motion.div>
                )}

                {/* STEP 3: Payment Form */}
                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="h-full"
                    >
                        <MoneyTransferForm 
                            sender={senderData} 
                            beneficiary={selectedBene} 
                            onBack={() => setStep(2)} 
                        />
                    </motion.div>
                )}

             </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DmtPage;
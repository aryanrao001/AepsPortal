import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, Send, Store, Fingerprint, Tv, Zap, Flame, Plane, 
  CreditCard, Wallet, Shield, FileText, Banknote, PlayCircle, HeartHandshake, ArrowUpRight
} from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';

const Services = () => {
  const servicesData = [
    { title: "Mobile Recharge", desc: "Instant top-ups for all major operators.", icon: <Smartphone /> },
    { title: "WebLoxicWallet Transfer", desc: "Seamless peer-to-peer money transfers.", icon: <Send /> },
    { title: "WebLoxic Vendor", desc: "Streamlined tools for vendor management.", icon: <Store /> },
    { title: "AEPS Banking", desc: "Biometric banking using Aadhaar.", icon: <Fingerprint /> },
    { title: "DTH Recharge", desc: "Uninterrupted TV entertainment top-ups.", icon: <Tv /> },
    { title: "Utility Bills", desc: "Pay electricity, water, and gas bills.", icon: <Zap /> },
    { title: "Gas Booking", desc: "Schedule gas cylinder refills easily.", icon: <Flame /> },
    { title: "Travel Booking", desc: "Flights, buses, and train reservations.", icon: <Plane /> },
    { title: "Credit Card", desc: "Bill payments and card management.", icon: <CreditCard /> },
    { title: "Digital Wallet", desc: "Secure storage for faster payments.", icon: <Wallet /> },
    { title: "Insurance", desc: "Health, life, and general insurance.", icon: <Shield /> },
    { title: "BBPS", desc: "One-stop Bharat Bill Payment System.", icon: <FileText /> },
    { title: "MATM", desc: "Micro-ATM services for cash withdrawal.", icon: <Banknote /> },
    { title: "OTT Subscription", desc: "Netflix, Prime, and more subscriptions.", icon: <PlayCircle /> },
    { title: "LIC Premiums", desc: "Pay your insurance premiums instantly.", icon: <HeartHandshake /> },
  ];

  return (
    <section id="services" className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* --- Background Elements (Matching Hero Theme) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Tech Grid */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         
         {/* Ambient Blobs */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50"></div>
         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] translate-x-1/2"></div>
         <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
            Our Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Everything you need, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
              In One Ecosystem
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            From daily utilities to complex banking, we've simplified every transaction into a single, powerful platform.
          </p>
        </motion.div>

        {/* --- Grid --- */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesData.map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Hover Glow Behind Card */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-2xl opacity-0 group-hover:opacity-60 blur transition duration-500"></div>
              
              {/* Card Body */}
              <div className="relative h-full bg-white/60 backdrop-blur-md border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start hover:bg-white hover:border-transparent">
                
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3">
                  {React.cloneElement(item.icon, { size: 26, strokeWidth: 1.5 })}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow Icon that appears on hover */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight className="text-slate-300 group-hover:text-blue-500" size={20} />
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
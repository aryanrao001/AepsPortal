import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Wallet, Smartphone, CreditCard, Zap, Menu, Send, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';
import { Link } from 'react-router-dom';


// --- Helper Components ---

// 1. Live Aurora Grid Background
const AuroraBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50">
      {/* A. Moving Gradient Blobs (The "Aurora") */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          rotate: [0, 90, 0],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-blue-400/30 rounded-full blur-[120px] mix-blend-multiply"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1], 
          x: [0, -100, 0], 
          y: [0, 100, 0] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-400/30 rounded-full blur-[120px] mix-blend-multiply"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          x: [0, 50, 0], 
          y: [0, 50, 0] 
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-cyan-300/30 rounded-full blur-[120px] mix-blend-multiply"
      />

      {/* B. The Technical Grid */}
      <div 
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
      ></div>
      <div 
        className="absolute inset-0" 
        style={{ 
            backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)', 
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            opacity: 0.4
        }} 
      />

      {/* C. Mouse Spotlight Interaction */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />
    </div>
  );
};

// 2. Magnetic Button Component
const MagneticButton = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    function handleMouseMove(e) {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.2); 
        y.set((clientY - centerY) * 0.2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.9 }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

// 3. Wifi Icon
const WifiIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-6 h-6 ${className}`}>
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

// --- Main Hero Component ---
const Hero = () => {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const quickLinks = [
    { name: "QuickWallet", icon: <Wallet size={16} /> },
    { name: "Recharge", icon: <Smartphone size={16} /> },
    { name: "Credit Card", icon: <CreditCard size={16} /> },
    { name: "Electricity", icon: <Zap size={16} /> }
  ];

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden perspective-1000 min-h-screen flex items-center"
    >
      {/* 1. Background Layer */}
      <AuroraBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* --- Left Column: Content --- */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="text-center lg:text-left z-20"
          >
            {/* Trust Badge */}
            <motion.div 
                variants={fadeIn} 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-blue-200 text-blue-700 text-sm font-semibold mb-8 shadow-sm cursor-default select-none hover:bg-white/80 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Trusted by 1000+ Distributors
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Welcome to <br className="hidden lg:block" />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-blue-700 animate-gradient-x bg-[length:200%_auto]">
                  WebLoxic
                </span>
                {/* Text Underline Decoration */}
                <motion.svg 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                    className="absolute w-full h-4 -bottom-2 left-0 text-blue-500 opacity-60 z-0" 
                    viewBox="0 0 100 10" 
                    preserveAspectRatio="none"
                >
                    <motion.path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
                </motion.svg>
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The all-in-one payment ecosystem. We provide seamless solutions for banking, communication, entertainment, travel, insurance, and utilities.
            </motion.p>
            
            {/* Quick Links Tags */}
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {quickLinks.map((item, i) => (
                <motion.div 
                    key={i} 
                    whileHover={{ y: -3, scale: 1.02 }} 
                    className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-700 px-5 py-3 rounded-xl text-sm font-bold shadow-sm cursor-pointer transition-all duration-300 group hover:border-blue-400 hover:shadow-blue-200/50 hover:bg-white"
                >
                  <span className="p-1.5 bg-blue-100/50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  {item.name}
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
                <Link to="/login">
              <MagneticButton className="group relative px-8 py-4 bg-slate-900 rounded-full text-white font-bold shadow-xl shadow-blue-900/20 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <div className="flex items-center justify-center relative z-10">
                  Get Started Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
              </MagneticButton>
              </Link>

              
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                className="px-8 py-4 bg-white/60 backdrop-blur-sm text-slate-800 border border-slate-300 rounded-full font-bold shadow-sm hover:shadow-lg hover:border-blue-400 transition-all"
              >
                View Services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* --- Right Column: 3D Interactive Mockup --- */}
          <div className="relative hidden lg:block h-[650px] w-full perspective-[2000px]">
            <motion.div 
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
                className="relative w-full h-full flex items-center justify-center"
            >
              
              {/* Glow Behind Phone */}
              <motion.div 
                 style={{ transform: "translateZ(-80px)" }}
                 animate={{ opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute w-[400px] h-[700px] bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-[3rem] blur-2xl"
              />

              {/* 1. Main Phone Device */}
              <div 
                className="w-[360px] h-[640px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative z-10 overflow-hidden ring-1 ring-white/20"
                style={{ transform: "translateZ(50px)" }}
              >
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 rounded-[2.5rem]"></div>
                
                {/* Notch */}
                <div className="absolute top-0 w-full h-7 bg-slate-900 z-30 flex justify-center"><div className="w-32 h-6 bg-black rounded-b-xl"></div></div>
                
                {/* Status Bar Mockup */}
                <div className="w-full h-8 bg-slate-900 flex justify-between items-center px-6 pt-2 z-20 absolute text-[10px] text-white font-medium">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                    </div>
                </div>

                {/* App UI */}
                <div className="h-full w-full bg-slate-50 pt-10 px-5 overflow-hidden flex flex-col relative">
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-center mb-6 mt-2">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600"><Menu size={20}/></div>
                    <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 shadow-blue-500/30 shadow-lg flex items-center justify-center text-white"><Smartphone size={18}/></div>
                    </div>
                  </div>

                  {/* Balance Card (Holo Effect) */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/30 mb-8 relative overflow-hidden group cursor-default"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition-all"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/50 rounded-full -ml-10 -mb-10 blur-xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-sm text-blue-100 font-medium">Total Wallet Balance</span>
                            <Wallet size={16} className="text-blue-200" />
                        </div>
                        <div className="text-3xl font-bold tracking-tight mb-6">₹ 24,500.00</div>
                        <div className="flex justify-between items-end">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                            </div>
                            <div className="text-xs font-mono opacity-80 bg-white/10 px-2 py-1 rounded">**** 4289</div>
                        </div>
                    </div>
                  </motion.div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {["Send", "Bill", "Scan", "More"].map((l, i) => (
                      <motion.div key={i} whileHover={{ y: -2 }} className="flex flex-col items-center gap-2 cursor-pointer">
                        <div className={`w-14 h-14 rounded-2xl ${i===2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-white text-blue-600 border border-slate-100 shadow-sm'} flex items-center justify-center transition-all`}>
                          {i === 0 ? <Send size={20}/> : i === 1 ? <FileText size={20}/> : i === 2 ? <Zap size={24}/> : <Menu size={20}/>}
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">{l}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Activity List (Slide Up) */}
                  <div className="flex-1 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 relative">
                    <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    <div className="flex justify-between items-center mb-5">
                        <span className="font-bold text-slate-800 text-lg">Transactions</span>
                        <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-lg cursor-pointer">View All</span>
                    </div>
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 mb-5 border-b border-slate-50 pb-4 last:border-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${i===0?'bg-green-50 text-green-600':i===1?'bg-red-50 text-red-600':'bg-orange-50 text-orange-600'}`}>
                           {i===0?<CheckCircle size={20}/>:<ArrowRight size={20}/>}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-slate-800">{i===0 ? "Netflix Sub" : i===1 ? "Electric Bill" : "Gas Booking"}</div>
                          <div className="text-xs text-slate-400 font-medium">Today, 10:23 AM</div>
                        </div>
                        <div className="text-sm font-bold text-slate-800">- ₹{100 + i * 150}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 2. Floating Glass Credit Card (3D Layer) */}
              <motion.div 
                style={{ transform: "translateZ(120px) rotate(-15deg)" }} 
                variants={floatingAnimation} 
                animate="animate" 
                className="absolute top-24 -right-20 w-72 h-44 bg-white/20 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-2xl z-30"
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl pointer-events-none"></div>
                 <div className="flex justify-between items-center mb-8 relative z-10">
                    <span className="text-white font-bold text-xl italic tracking-wide drop-shadow-md">WebLoxic</span>
                    <WifiIcon className="text-white drop-shadow-md" />
                 </div>
                 <div className="text-white font-mono text-xl tracking-widest mb-4 drop-shadow-md">4582 1022 9920</div>
                 <div className="flex justify-between text-white/80 text-[10px] uppercase font-bold tracking-wider mb-1"><span>Card Holder</span><span>Expires</span></div>
                 <div className="flex justify-between text-white font-bold text-sm tracking-wide drop-shadow-md"><span>Rahul Kumar</span><span>12/28</span></div>
              </motion.div>

              {/* 3. Success Bubble (3D Layer) */}
              <motion.div 
                style={{ transform: "translateZ(90px)" }} 
                animate={{ y: [0, 15, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                className="absolute bottom-48 -left-20 bg-white/95 backdrop-blur-xl p-4 pr-8 rounded-2xl shadow-xl border border-white/60 z-30 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/30"><CheckCircle size={24} /></div>
                <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">Status</div>
                    <div className="text-base font-extrabold text-slate-800">Payment Sent</div>
                </div>
              </motion.div>

              {/* 4. Floating 3D Shapes */}
              <motion.div
                 style={{ transform: "translateZ(60px)" }}
                 animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-2xl opacity-90 shadow-lg z-0"
              />
               <motion.div
                 style={{ transform: "translateZ(20px)" }}
                 animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [0, -45, 0] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-bl from-blue-300 to-cyan-400 rounded-full blur-sm opacity-60 z-0"
              />

            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Styles */}
      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } } 
        .animate-shimmer { animation: shimmer 2s infinite; } 
        .perspective-1000 { perspective: 1000px; }
        .animate-gradient-x { background-size: 200% auto; animation: gradient-x 4s linear infinite; }
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>
    </section>
  );
};

export default Hero;
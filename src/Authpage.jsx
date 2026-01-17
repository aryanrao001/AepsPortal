import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Zap, User, // Navbar Icons
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, // Form Icons
  Smartphone, Tv, Plane, Wifi, CreditCard, Globe, Cpu, Hexagon // Service Icons
} from 'lucide-react';

// --- COMPONENT: NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/' },
    { name: 'Services', href: '/' },
    { name: 'Contact', href: '/' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-200/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- Logo Area --- */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <Zap size={20} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                        WebLoxic
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fintech Solutions</span>
                </div>
            </Link>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-slate-200/50 shadow-inner">
            {navLinks.map((link, index) => (
              <a 
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors z-10"
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </div>

          {/* --- Actions Area --- */}
          

          {/* --- Mobile Toggle --- */}
          <div className="md:hidden flex items-center">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold text-slate-600 bg-slate-50/50 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-98"
                >
                  {link.name}
                  <ChevronRight size={16} className="text-slate-300" />
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4 flex flex-col gap-3"
              >
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                  >
                    <User size={18} />
                    Log In
                  </Link>

                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-transform flex items-center justify-center gap-2">
                      Get Started Now
                      <Zap size={18} fill="currentColor" />
                    </button>
                  </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- DATA: Services ---
const services = [
  { id: 1, name: "Electricity", icon: Zap, color: "text-amber-600", bg: "bg-amber-100/80" },
  { id: 2, name: "Mobile", icon: Smartphone, color: "text-blue-600", bg: "bg-blue-100/80" },
  { id: 3, name: "DTH", icon: Tv, color: "text-purple-600", bg: "bg-purple-100/80" },
  { id: 4, name: "Flights", icon: Plane, color: "text-sky-600", bg: "bg-sky-100/80" },
  { id: 5, name: "WiFi", icon: Wifi, color: "text-emerald-600", bg: "bg-emerald-100/80" },
  { id: 6, name: "Cards", icon: CreditCard, color: "text-rose-600", bg: "bg-rose-100/80" },
  { id: 7, name: "Forex", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-100/80" },
];

// --- COMPONENT: Holographic Node ---
const HolographicNode = ({ service, index, total, rotation }) => {
  const theta = (index / total) * Math.PI * 2;
  const currentAngle = theta + rotation;
  const radiusX = 220;
  const radiusY = 80;
  
  const x = Math.cos(currentAngle) * radiusX;
  const y = Math.sin(currentAngle) * radiusY;
  
  const scale = (Math.sin(currentAngle) + 2.5) / 3.2; 
  const zIndex = Math.floor(Math.sin(currentAngle) * 100);
  const isFront = Math.sin(currentAngle) > 0;
  const blurValue = isFront ? 0 : 2;
  const opacity = isFront ? 1 : 0.6;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: x - 32, 
        y: y - 32,
        scale,
        zIndex,
        filter: `blur(${blurValue}px)`,
        opacity
      }}
      className="flex flex-col items-center justify-center pointer-events-none lg:pointer-events-auto"
    >
      <div className="relative group cursor-pointer">
        <div 
            className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 origin-left"
            style={{ 
                width: 200, 
                transform: `rotate(${Math.atan2(-y, -x) * (180/Math.PI)}deg) translateX(-100%)`,
                opacity: isFront ? 0.3 : 0.1
            }} 
        />
        <div className={`w-16 h-16 rounded-2xl ${service.bg} backdrop-blur-md border border-white/50 flex items-center justify-center shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2`}>
           <service.icon size={24} className={service.color} strokeWidth={2.5} />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      <motion.span 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: isFront ? 1 : 0, y: isFront ? 10 : 5 }}
        className="absolute -bottom-8 whitespace-nowrap text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-white/60 px-2 py-0.5 rounded-md backdrop-blur-sm"
      >
        {service.name}
      </motion.span>
    </motion.div>
  );
};

// --- HELPER: Premium Floating Input ---
const PremiumInput = ({ icon: Icon, type, placeholder, showToggle, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputType = showToggle ? (showPassword ? "text" : "password") : type;

    return (
        <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.01]' : 'scale-100'}`}>
            <div className={`absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors duration-200 z-10 ${isFocused ? 'text-blue-600' : 'text-slate-400'}`}>
                <Icon size={20} />
            </div>
            <input 
                type={inputType} 
                className={`w-full bg-slate-50/50 text-slate-900 text-base font-medium rounded-2xl block pl-12 pr-12 py-4 outline-none border transition-all placeholder:text-slate-400 ${isFocused ? 'border-blue-500 bg-white shadow-[0_4px_20px_-2px_rgba(37,99,235,0.1)]' : 'border-slate-200 hover:bg-white hover:border-slate-300'}`} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {showToggle && (
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors z-10"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRotation(prev => prev + 0.002);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        let role = "";
        if (email.includes("super")) role = "Super_Admin";
        else if (email.includes("admin")) role = "Admin";
        else if (email.includes("dist")) role = "Distributor";
        else role = "Retailer"; 

        localStorage.setItem("token", "mock-jwt-token-123");
        localStorage.setItem("role", role);
        setLoading(false);

        switch (role) {
            case "Super_Admin": navigate("/super-admin/dashboard"); break;
            case "Admin": navigate("/admin"); break;
            case "Distributor": navigate("/distributor"); break;
            case "Retailer": navigate("/retailer"); break;
            default: navigate("/login");
        }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 relative overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Navbar Added Here */}
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[#F0F4F8] -z-20"></div>
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-200/40 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] -z-10" 
      />

      {/* Main Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[1100px] min-h-[700px] bg-white/40 backdrop-blur-[40px] rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-white/60 flex overflow-hidden relative z-10"
      >
        
        {/* LEFT SIDE: Holographic Visuals */}
        <div className="hidden lg:flex w-[55%] relative flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
               <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-b from-white to-blue-50 shadow-[0_20px_50px_-10px_rgba(59,130,246,0.5)] border border-white">
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl animate-pulse"></div>
                  <Hexagon size={40} className="text-blue-500 relative z-10" strokeWidth={1.5} />
               </div>
               
               <div className="absolute w-[440px] h-[160px] border border-white/60 rounded-full transform" style={{ boxShadow: '0 0 40px rgba(255,255,255,0.5)' }}></div>
               <div className="absolute w-[300px] h-[100px] border border-blue-200/30 rounded-full transform rotate-3"></div>

               {services.map((service, index) => (
                  <HolographicNode 
                    key={service.id} 
                    service={service} 
                    index={index} 
                    total={services.length} 
                    rotation={rotation} 
                  />
               ))}
            </div>

            <div className="absolute bottom-12 text-center px-12">
               <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Infinite</span> Possibilities
               </h2>
               <p className="text-slate-500 text-sm mt-2 font-medium">
                 Your complete financial ecosystem, reimagined.
               </p>
            </div>
        </div>

        {/* RIGHT SIDE: Premium Form */}
        <div className="w-full lg:w-[45%] bg-white/50 backdrop-blur-xl relative flex flex-col justify-center px-10 lg:px-16 border-l border-white/50">
            <div className="w-full max-w-sm mx-auto">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6 rotate-3">
                        <Cpu size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        {isLogin ? "Welcome Back" : "Join Us"}
                    </h1>
                    <p className="text-slate-500">
                        {isLogin ? "Enter your credentials to continue." : "Start your journey today."}
                    </p>
                </motion.div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <AnimatePresence mode='wait'>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <PremiumInput icon={User} type="text" placeholder="Full Name" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <PremiumInput 
                        icon={Mail} 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <PremiumInput 
                        icon={Lock} 
                        type="password" 
                        placeholder="Password" 
                        showToggle 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isLogin && (
                        <div className="flex justify-between items-center text-sm font-medium">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-800 transition-colors">
                                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Recovery?</a>
                        </div>
                    )}

                    <motion.button 
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full py-4 bg-[#0F172A] text-white text-lg font-bold rounded-2xl shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2">
                           {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                           {!loading && <ArrowRight size={20} />}
                        </span>
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 font-medium text-sm">
                        {isLogin ? "No account yet?" : "Already a member?"}
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-bold hover:text-blue-800 ml-1 underline decoration-2 underline-offset-4 decoration-blue-200 hover:decoration-blue-600 transition-all"
                        >
                            {isLogin ? "Sign up now" : "Log in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
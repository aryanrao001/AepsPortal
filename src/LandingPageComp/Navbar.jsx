import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronRight, Zap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
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
                        WebLoxic<span className="text-blue-600"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fintech Solutions</span>
                </div>
            </Link>
          </div>

          {/* --- Desktop Menu (Morphing Hover) --- */}
          <div className="hidden md:flex items-center bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-slate-200/50 shadow-inner">
            {navLinks.map((link, index) => (
              <a 
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors z-10"
              >
                {/* The Morphing Background Pill */}
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

          {/* --- Actions Area (Login + CTA) --- */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login"
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-2"
            >
              Log in
            </Link>

            <Link to="/signup">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-xl shadow-slate-900/10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started 
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </div>

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

      {/* --- Mobile Menu --- */}
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
              
              {/* Mobile Actions */}
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

export default Navbar;
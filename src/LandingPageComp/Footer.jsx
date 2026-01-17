import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  ArrowUp, Send, ShieldCheck, Heart 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden border-t border-slate-800/50">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Top Section: Brand & Newsletter --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-white">
                    WebLoxic<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Npay</span>
                </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering India with secure, fast, and reliable digital payment solutions. Join the revolution of seamless transactions today.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
             <div className="flex-1">
                <h4 className="text-white font-bold text-lg mb-1">Stay Updated</h4>
                <p className="text-slate-400 text-sm">Get the latest updates on features and banking news.</p>
             </div>
             <div className="w-full md:w-auto flex-1 relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-950 border border-slate-700 text-white pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
                  <Send size={16} />
                </button>
             </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 my-12"></div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Refund Policy</FooterLink>
              <FooterLink href="#">Disclaimer</FooterLink>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Mobile Recharge</FooterLink>
              <FooterLink href="#">Bill Payments</FooterLink>
              <FooterLink href="#">Money Transfer</FooterLink>
              <FooterLink href="#">AEPS Banking</FooterLink>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Headquarters</h4>
            <div className="space-y-4">
               <div>
                  <p className="text-white font-medium text-sm">GOODLUCK TECHNOLOGIES PVT LTD</p>
                  <p className="text-slate-400 text-sm mt-1">
                    2/15, 3rd Floor, West Patel Nagar, <br /> New Delhi-110008
                  </p>
               </div>
               <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full w-fit border border-green-500/20">
                  <ShieldCheck size={14} /> 100% Secure
               </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800/50 gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} WebLoxic. All Rights Reserved. 
          </p>
          
          <div className="flex items-center gap-6">
             <p className="text-slate-600 text-xs flex items-center gap-1">
                Made with <Heart size={10} className="text-red-500 fill-red-500" /> in India
             </p>
             
             <motion.button 
               onClick={scrollToTop}
               whileHover={{ y: -3 }}
               whileTap={{ scale: 0.9 }}
               className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-slate-700"
             >
               <ArrowUp size={18} />
             </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, children }) => (
  <li>
    <motion.a 
      href={href}
      className="text-slate-400 text-sm hover:text-blue-400 transition-colors inline-block"
      whileHover={{ x: 5 }}
    >
      {children}
    </motion.a>
  </li>
);

const SocialIcon = ({ icon }) => (
  <motion.a 
    href="#" 
    whileHover={{ y: -3 }}
    className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-slate-800"
  >
    {icon}
  </motion.a>
);

export default Footer;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight, Shield } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';

// --- Helper: 3D Wireframe Globe (High Contrast Version) ---
const WireframeGlobe = () => {
  return (
    // Changed opacity-60 to opacity-100 for full visibility
    <div className="relative w-[500px] h-[500px] opacity-100 pointer-events-none perspective-[1000px]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        // Darkened border-slate-200 -> border-slate-300
        className="absolute inset-0 border-[1.5px] border-slate-300 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Longitudinal Lines */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            // Darkened border-blue-100 -> border-blue-300
            className="absolute inset-0 border border-blue-300 rounded-full"
            style={{ transform: `rotateY(${i * 36}deg)` }}
          ></div>
        ))}
        {/* Latitudinal Rings - Darkened borders */}
        <div className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] border border-blue-300 rounded-full transform rotate-x-12"></div>
        <div className="absolute top-[25%] left-[5%] right-[5%] bottom-[25%] border border-blue-300 rounded-full transform -rotate-x-12"></div>
        <div className="absolute inset-0 border-r border-blue-400 rounded-full blur-[1px]"></div>
      </motion.div>
      
      {/* Floating Connection Nodes - Made slightly larger/brighter */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/3 left-1/3 w-4 h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-400 z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-indigo-600 rounded-full shadow-lg shadow-indigo-400 z-10"
      />
    </div>
  );
};

// --- Main Component ---
const Contact = () => {
  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden min-h-screen flex items-center">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Tech Grid - Increased opacity from 0.03 to 0.08 */}
         <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         
         {/* Ambient Blobs */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Left Column: Immersive Visuals --- */}
          <div className="relative hidden lg:block h-[600px] flex items-center justify-center">
            {/* The Globe */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <WireframeGlobe />
            </div>

            {/* Floating Info Cards (Orbiting) - Added border-slate-200 and stronger shadow */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-24 left-0 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-2xl w-72"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Headquarters</h4>
                <p className="text-sm font-bold text-slate-900 leading-tight">West Patel Nagar, New Delhi</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-32 right-0 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-2xl w-72"
            >
               <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-sm">
                <Shield size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Support</h4>
                <p className="text-sm font-bold text-slate-900 leading-tight">24/7 Secure Assistance</p>
              </div>
            </motion.div>

             {/* Background Text Decoration - Darkened text-slate-100 to text-slate-200 */}
             <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute top-1/2 right-10 transform translate-x-1/2"
            >
               <h1 className="text-8xl font-black text-slate-200/50 tracking-tighter rotate-90 whitespace-nowrap select-none">
                 CONTACT
               </h1>
            </motion.div>
          </div>

          {/* --- Right Column: The Form --- */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Form Container - Darkened Border and Shadow */}
            <div className="relative bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden group">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-transparent"></div>
              
              {/* Header */}
              <motion.div variants={fadeIn} className="mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
                    Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Let's Connect</h2>
                <p className="text-slate-600 font-medium">Fill out the form below and our team will get back to you.</p>
              </motion.div>

              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FloatingInput label="Your Name" placeholder="John Doe" />
                  <FloatingInput label="Your Email" placeholder="john@company.com" />
                </div>
                
                <FloatingInput label="Subject" placeholder="Partnership / Support" />
                
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Message</label>
                  {/* Textarea - Darker border-slate-300 */}
                  <textarea 
                    rows="4" 
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none hover:bg-white hover:shadow-sm"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 transition-all flex items-center justify-center group/btn relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Send Message <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </form>

              {/* Decorative Background Blob behind Form - Darker blue */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
              
              {/* Contact Info Pills */}
              <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
                 <ContactPill icon={<Mail size={14}/>} text="care@WebLoxic.com" href="mailto:care@WebLoxic.com" />
                 <ContactPill icon={<Phone size={14}/>} text="+91 11-35885329" href="tel:01135885329" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Helper: Floating Label Input ---
const FloatingInput = ({ label, placeholder }) => {
    const [focused, setFocused] = useState(false);
    
    return (
        <div className="relative group">
            <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${focused ? 'text-blue-600' : 'text-slate-500'}`}>
                {label}
            </label>
            <input 
                type="text" 
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                // Darkened Border from 200 to 300, BG from 50 to 100/white hover
                className="w-full mt-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all hover:bg-white hover:shadow-sm"
            />
        </div>
    );
};

// --- Helper: Contact Pill ---
const ContactPill = ({ icon, text, href }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-600 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-200 transition-colors font-semibold"
  >
    {icon}
    <span>{text}</span>
  </a>
);

export default Contact;
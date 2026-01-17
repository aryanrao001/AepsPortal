import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Star } from 'lucide-react';

const Clients = () => {
  const clients = [
    { name: "Anugraha", loc: "Central Delhi", initial: "A", color: "bg-blue-100 text-blue-600" },
    { name: "Shiv Enterprises", loc: "South Delhi", initial: "S", color: "bg-indigo-100 text-indigo-600" },
    { name: "Roop Singh Gusain", loc: "Delhi", initial: "R", color: "bg-cyan-100 text-cyan-600" },
    { name: "Awnish Traders", loc: "North Delhi", initial: "A", color: "bg-purple-100 text-purple-600" },
    { name: "Pandey Comm.", loc: "Delhi", initial: "P", color: "bg-emerald-100 text-emerald-600" },
    { name: "Ajay Kumar Mishra", loc: "New Delhi", initial: "A", color: "bg-orange-100 text-orange-600" },
    { name: "Santosh Yadav", loc: "Central Delhi", initial: "S", color: "bg-rose-100 text-rose-600" },
    { name: "Kamal Kumar", loc: "Delhi", initial: "K", color: "bg-sky-100 text-sky-600" },
  ];

  // duplicate list for seamless loop
  const marqueeClients = [...clients, ...clients];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                Trust & Reliability
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Powering Businesses <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                    Across Delhi
                </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                We are privileged to serve a diverse range of clients, from startups to established enterprises, acting as the backbone of their payment infrastructure.
            </p>
        </motion.div>
      </div>

      {/* --- Infinite Marquee --- */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Fade Masks for edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="flex">
            <motion.div 
                className="flex gap-6 pr-6"
                animate={{ x: "-50%" }}
                transition={{ 
                    duration: 30, 
                    ease: "linear", 
                    repeat: Infinity 
                }}
                whileHover={{ animationPlayState: "paused" }} // Note: Framer motion handles this differently, but for simple CSS pause effect we use class below or simple logic
                style={{ width: "fit-content" }}
            >
                {marqueeClients.map((client, index) => (
                    <ClientCard key={`${client.name}-${index}`} client={client} />
                ))}
            </motion.div>
            
            {/* Note: For a perfect CSS-only loop with Framer Motion, 
               we actually need two copies rendering in the same motion div 
               translating -50%, which is what we did above with `marqueeClients`.
            */}
        </div>
      </div>

    </section>
  );
};

// --- Helper: Client Card Component ---
const ClientCard = ({ client }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="flex-shrink-0 w-72 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-default"
  >
    <div className="flex items-start gap-4">
      {/* Avatar/Logo Placeholder */}
      <div className={`w-12 h-12 rounded-xl ${client.color} flex items-center justify-center font-bold text-xl shadow-inner`}>
        {client.initial}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
            {client.name}
        </h4>
        
        <div className="flex items-center mt-1 text-xs text-slate-500 font-medium">
            <MapPin size={12} className="mr-1 text-slate-400" />
            {client.loc}
        </div>
      </div>
    </div>

    <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
        <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />)}
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold flex items-center gap-1">
            <Building2 size={10} /> Partner
        </span>
    </div>
  </motion.div>
);

export default Clients;
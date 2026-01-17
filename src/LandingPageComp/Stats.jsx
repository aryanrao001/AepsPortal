import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Store, Share2 } from 'lucide-react';

// --- Helper: Animated Counter ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Parse number (remove commas) to animate
      const numericValue = parseInt(value.replace(/,/g, '').replace('+', ''), 10);
      motionValue.set(numericValue);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format back to string with commas
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <span className="flex items-center">
      <span ref={ref}>0</span>{suffix}
    </span>
  );
};

// --- Main Component ---
const Stats = () => {
  const stats = [
    { 
      label: "Happy Customers", 
      value: "2,345", 
      suffix: "+", 
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "from-blue-500 to-indigo-500",
      delay: 0
    },
    { 
      label: "Happy Merchants", 
      value: "1,018", 
      suffix: "+", 
      icon: <Store className="w-6 h-6 text-white" />,
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.1
    },
    { 
      label: "Distributors", 
      value: "200", 
      suffix: "+", 
      icon: <Share2 className="w-6 h-6 text-white" />,
      gradient: "from-cyan-500 to-blue-500",
      delay: 0.2
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* --- Background Elements (Matching Hero) --- */}
      {/* 1. Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* 2. Soft Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[100px] translate-y-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: stat.delay, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-all duration-300 group-hover:shadow-blue-200/50 group-hover:border-blue-100">
                
                {/* Floating Icon Bubble */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index }}
                  className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </motion.div>

                {/* Counter Number */}
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-600 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors duration-300">
                  {stat.label}
                </div>

                {/* Decorative Bottom Bar */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-t-full transition-all duration-500 group-hover:w-1/2`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
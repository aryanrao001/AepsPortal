import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle, ShieldCheck, Globe, Smartphone, ArrowRight } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';

const About = () => {
  // --- 3D Tilt Logic for the Right Card ---
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

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <section id="about" className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* --- Left Column: Text Content --- */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              About Us
            </motion.div>

            {/* Heading */}
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Empowering Convenience: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                Comprehensive Solutions
              </span>
            </motion.h2>

            {/* Paragraphs */}
            <motion.div variants={fadeIn} className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
              <p>
                Protect what matters most with our insurance solutions covering general, health, life, and term insurance. Additionally, streamline your utility payments for electric, water, and gas services with a single tap.
              </p>
              <p>
                Our partnerships with banks and service providers ensure a seamless experience. Leveraging a unified platform, we simplify transactions to enhance your convenience.
              </p>
            </motion.div>

            {/* Call to Action Link */}
            <motion.div variants={fadeIn} className="mt-8">
              <a href="#contact" className="inline-flex items-center font-bold text-blue-700 hover:text-blue-800 transition-colors group">
                Learn more about our mission 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
          
          {/* --- Right Column: Interactive Glass Card --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
          >
            {/* Decorative Backdrops */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-[2.5rem] opacity-30 blur-xl transform rotate-3"></div>
            
            {/* Main 3D Card */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative bg-white/80 backdrop-blur-xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-[100px] opacity-50 pointer-events-none"></div>

              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="text-blue-600 w-8 h-8" />
                Why Choose WebLoxic?
              </h3>

              <div className="space-y-6">
                {/* Feature 1 */}
                <FeatureItem 
                  icon={<Globe className="w-6 h-6 text-white" />}
                  color="bg-blue-500"
                  title="One Platform, Many Solutions"
                  desc="From travel bookings to insurance premiums, handle everything in one place."
                />

                {/* Feature 2 */}
                <FeatureItem 
                  icon={<Smartphone className="w-6 h-6 text-white" />}
                  color="bg-indigo-500"
                  title="Banking Made Simple"
                  desc="Aadhaar & Biometric enabled transactions for secure, instant banking."
                />

                {/* Feature 3 */}
                <FeatureItem 
                  icon={<CheckCircle className="w-6 h-6 text-white" />}
                  color="bg-cyan-500"
                  title="Entertainment & Travel"
                  desc="Instant bookings for DTH, OTT, Bus, Flight and Trains worldwide."
                />
              </div>

              {/* Floating "Secure" Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold text-slate-700 text-sm">100% Secure System</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Helper Component for Feature List Items
const FeatureItem = ({ icon, color, title, desc }) => (
  <motion.div 
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255, 0.6)" }}
    className="flex items-start p-4 rounded-2xl transition-colors cursor-default border border-transparent hover:border-blue-100"
  >
    <div className={`flex-shrink-0 w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 mr-5 mt-1`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-lg text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

export default About;
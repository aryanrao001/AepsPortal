import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rajesh Gupta",
      role: "Retail Store Owner",
      location: "Mumbai",
      text: "WebLoxic transformed how I handle customer recharges. The success rate is incredibly high, and the commission structure is the best in the market. I've seen a 30% increase in repeat customers.",
      initial: "R",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Freelancer & Designer",
      location: "Bangalore",
      text: "I use the WebLoxicWallet feature daily. It is significantly faster than my traditional banking app and the UI is so much cleaner. Highly recommended for instant peer-to-peer transfers.",
      initial: "P",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "Regional Distributor",
      location: "Delhi",
      text: "Managing my retailer network has never been easier. The dashboard gives me real-time insights, and the support team is actually helpful. It's the most reliable platform I've used in 5 years.",
      initial: "A",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 4,
      name: "Suresh Patel",
      role: "Small Business Owner",
      location: "Ahmedabad",
      text: "The AEPS service is a lifesaver for my rural customers. Biometric transactions are smooth, settlement is instant, and the trust factor it builds with my clients is invaluable.",
      initial: "S",
      color: "bg-green-100 text-green-600"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  // Navigation handlers
  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return nextIndex;
    });
  }, [reviews.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation Variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[120px] translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Industry Leaders</span>
            </h2>
        </div>

        {/* --- Carousel Container --- */}
        <div 
            className="relative h-[500px] md:h-[400px] w-full flex items-center justify-center perspective-1000"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Arrow Left */}
            <button 
                onClick={() => paginate(-1)}
                className="absolute left-0 md:left-4 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-110 hover:shadow-lg transition-all flex items-center justify-center hidden md:flex"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Arrow Right */}
            <button 
                onClick={() => paginate(1)}
                className="absolute right-0 md:right-4 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-110 hover:shadow-lg transition-all flex items-center justify-center hidden md:flex"
            >
                <ChevronRight size={24} />
            </button>

            {/* The Main Card Slide */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute w-full max-w-4xl cursor-grab active:cursor-grabbing"
                >
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
                        
                        {/* Decorative Background Quote */}
                        <Quote className="absolute top-10 right-10 text-slate-100 w-32 h-32 rotate-180 -z-0 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
                            
                            {/* User Profile */}
                            <div className="flex-shrink-0">
                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl ${reviews[currentIndex].color} flex items-center justify-center text-4xl font-bold shadow-inner mb-4 md:mb-0 mx-auto`}>
                                    {reviews[currentIndex].initial}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                                            {reviews[currentIndex].name}
                                            <CheckCircle size={18} className="text-blue-500 fill-blue-50" />
                                        </h3>
                                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 mt-1">
                                            {reviews[currentIndex].role} • {reviews[currentIndex].location}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 mt-3 md:mt-0 justify-center">
                                        {[1,2,3,4,5].map(i => (
                                            <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium italic">
                                    "{reviews[currentIndex].text}"
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* --- Indicators (Dots) --- */}
        <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                            ? "w-8 bg-blue-600" 
                            : "w-2 bg-slate-300 hover:bg-blue-300"
                    }`}
                />
            ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
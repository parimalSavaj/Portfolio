import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../lib/data";
import Scene3D from "./Scene3D";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative h-[99vh] flex items-center justify-center py-16 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-aurora-purple/10 to-aurora-blue/10"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid 20s linear infinite",
          }}
        ></div>
      </div>

      {/* 3D Scene - Positioned on the right side */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-60 pointer-events-none hidden lg:block">
        <Scene3D />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-left"
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-aurora-text leading-tight"
            >
              Building Scalable Solutions
              <br />
              <span className="bg-gradient-to-r from-aurora-purple to-aurora-blue bg-clip-text text-transparent">
                with Modern Technology
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-aurora-muted max-w-3xl mx-auto"
            >
              I'm a{" "}
              <span className="text-aurora-purple font-semibold">
                {personalInfo.title}
              </span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-aurora-purple/25"
              >
                View My Projects
              </button>
              <button className="px-6 py-3 border-2 border-aurora-purple text-aurora-purple font-semibold rounded-lg hover:bg-aurora-purple hover:text-white transition-all duration-300">
                Download Resume
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Scene for Mobile/Tablet */}
          <div className="lg:hidden flex justify-center items-center h-48 opacity-80">
            <Scene3D />
          </div>
        </div>

        {/* Centered Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-aurora-muted text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-aurora-purple/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-aurora-purple rounded-full mt-2"
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Add keyframes for grid animation */}
      <style>{`
        @keyframes grid {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          100% {
            transform: translateY(-50px) translateX(-50px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

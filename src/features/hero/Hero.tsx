import { motion } from "framer-motion";
import { personalInfo } from "../../lib/data";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const Hero = () => {
  const { scrollToSection } = useSmoothScroll({ offset: 80 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 py-16">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-aurora-text leading-tight"
          >
            Building Scalable Solutions
            <br />
            <span className="bg-gradient-to-r from-aurora-purple to-aurora-blue bg-clip-text text-transparent">
              with Modern Technology
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl text-aurora-muted max-w-3xl mx-auto"
          >
            I'm a{" "}
            <span className="text-aurora-purple font-semibold">
              {personalInfo.title}
            </span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-aurora-purple/25 text-lg"
            >
              View My Projects
            </button>
            <button className="px-8 py-4 border-2 border-aurora-purple text-aurora-purple font-semibold rounded-lg hover:bg-aurora-purple hover:text-white transition-all duration-300 text-lg">
              Download Resume
            </button>
          </motion.div>
        </div>

        {/* Centered Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 flex flex-col items-center"
        >
          <span className="text-aurora-muted text-sm mb-4">
            Scroll to explore
          </span>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../lib/data";

import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiGraphql,
  SiDocker,
  SiAmazon,
} from "react-icons/si";

const Skills = () => {
  // Icon mapping for each technology
  const skillIcons: { [key: string]: React.ReactNode } = {
    TypeScript: <SiTypescript className="w-8 h-8 text-aurora-purple" />,
    React: <SiReact className="w-8 h-8 text-aurora-blue" />,
    "Next.js": <SiNextdotjs className="w-8 h-8 text-aurora-text" />,
    "Node.js": <SiNodedotjs className="w-8 h-8 text-green-400" />,
    "Tailwind CSS": <SiTailwindcss className="w-8 h-8 text-cyan-400" />,
    "Framer Motion": <SiFramer className="w-8 h-8 text-aurora-purple" />,
    "Three.js": <SiThreedotjs className="w-8 h-8 text-aurora-text" />,
    GraphQL: <SiGraphql className="w-8 h-8 text-pink-400" />,
    Docker: <SiDocker className="w-8 h-8 text-blue-400" />,
    AWS: <SiAmazon className="w-8 h-8 text-orange-400" />,
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aurora-text mb-4">
            My Tech Stack
          </h2>
          <p className="text-aurora-muted text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(168, 85, 247, 0.2)",
              }}
              className="group relative rounded-xl"
              style={{ borderRadius: "0.75rem" }}
            >
              <div className="bg-aurora-night/50 backdrop-blur-sm border border-aurora-purple/20 rounded-xl p-4 md:p-6 text-center hover:border-aurora-purple/50 transition-all duration-300">
                {/* Skill Icon */}
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  {skillIcons[skill] || (
                    <div className="w-8 h-8 bg-gradient-to-r from-aurora-purple to-aurora-blue rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {skill.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Skill Name */}
                <h3 className="text-aurora-text font-semibold text-sm md:text-base group-hover:text-aurora-purple transition-colors duration-300">
                  {skill}
                </h3>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-purple/5 to-aurora-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-aurora-muted">
            Always learning and exploring new technologies to stay ahead of the
            curve
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

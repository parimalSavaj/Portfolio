import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../lib/data";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-aurora-night to-aurora-night/95"
    >
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
            About Me
          </h2>
          <p className="text-aurora-muted text-lg max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Profile Photo Placeholder */}
              <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple to-aurora-blue rounded-2xl"></div>
                <div className="absolute inset-2 bg-aurora-night rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-aurora-purple to-aurora-blue rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {personalInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <p className="text-aurora-muted text-sm">
                      Professional Photo
                      <br />
                      Coming Soon
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-aurora-purple/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-aurora-blue/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-aurora-text leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-aurora-night/50 rounded-xl border border-aurora-purple/20">
                <div className="text-2xl font-bold text-aurora-purple mb-1">
                  3+
                </div>
                <div className="text-aurora-muted text-sm">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 bg-aurora-night/50 rounded-xl border border-aurora-blue/20">
                <div className="text-2xl font-bold text-aurora-blue mb-1">
                  50+
                </div>
                <div className="text-aurora-muted text-sm">
                  Projects Completed
                </div>
              </div>
            </div>

            {/* Personal Interests */}
            <div className="pt-6">
              <h3 className="text-xl font-semibold text-aurora-text mb-4">
                When I'm not coding...
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "🌱 Learning new technologies",
                  "🚀 Contributing to open source",
                  "📚 Reading tech blogs",
                  "🎮 Gaming",
                  "🏃‍♂️ Running",
                  "☕ Coffee enthusiast",
                ].map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-aurora-purple/10 to-aurora-blue/10 border border-aurora-purple/20 rounded-full text-aurora-text text-sm hover:from-aurora-purple/20 hover:to-aurora-blue/20 transition-all duration-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="pt-6">
              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-aurora-purple/25 transition-all duration-300"
              >
                Let's Work Together
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, Heart, Lightbulb, Github, Twitter, Mail, Zap, Terminal, Database } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'React', level: 90, color: 'cyan' },
    { name: 'TypeScript', level: 85, color: 'pink' },
    { name: 'Node.js', level: 80, color: 'yellow' },
    { name: 'Design', level: 75, color: 'green' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full border border-cyan-500/30 mb-6"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm cyber-text">USER PROFILE</span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-bold mb-6 cyber-text gradient-text-alt"
          >
            ABOUT.EXE
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Digital architect, code craftsman, and cybernetic explorer navigating the infinite possibilities of the digital realm
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-cyan-600 via-pink-600 to-yellow-600 rounded-full flex items-center justify-center text-8xl relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-30"></div>
                <span className="relative z-10">🤖</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center border border-cyan-400"
              >
                <Terminal className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white mb-4 cyber-text gradient-text">ALFIN.JOSEPH</h2>
              <p className="text-gray-300 leading-relaxed">
                A digital nomad traversing the cybernetic landscape, crafting elegant solutions and pushing the boundaries of what's possible. 
                When not immersed in code, you'll find me exploring emerging technologies, contributing to the open-source collective, or fueling up with premium caffeine.
              </p>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6 cyber-text gradient-text">CORE PROTOCOLS</h3>
            
            <div className="space-y-4">
              {[
                { icon: Code, title: 'Clean Architecture', desc: 'Building maintainable, scalable systems', color: 'cyan' },
                { icon: Lightbulb, title: 'Innovation Drive', desc: 'Exploring cutting-edge technologies', color: 'pink' },
                { icon: Heart, title: 'User-Centric', desc: 'Creating meaningful digital experiences', color: 'yellow' },
                { icon: Coffee, title: 'Continuous Evolution', desc: 'Always learning, always growing', color: 'green' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="cyber-card p-4 rounded-lg group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r from-${item.color}-600 to-${item.color}-400 rounded-lg flex items-center justify-center`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 cyber-text">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-4xl font-bold text-center text-white mb-8 cyber-text gradient-text">SKILL MATRIX</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="cyber-card p-6 rounded-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-bold cyber-text">{skill.name}</span>
                  <span className={`text-${skill.color}-400 font-bold cyber-text`}>{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                    className={`h-full bg-gradient-to-r from-${skill.color}-600 to-${skill.color}-400 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center cyber-card rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-4 cyber-text gradient-text">ESTABLISH CONNECTION</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Ready to collaborate on the next digital frontier? Let's sync up and build something extraordinary
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, label: 'GitHub', href: '#', color: 'cyan' },
              { icon: Twitter, label: 'Twitter', href: '#', color: 'pink' },
              { icon: Mail, label: 'Email', href: 'mailto:hello@example.com', color: 'yellow' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`cyber-button w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
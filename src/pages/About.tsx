import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, Heart, Lightbulb, Github, Twitter, Mail } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Design', level: 75 },
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
          >
            About Me
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Passionate developer, creative thinker, and lifelong learner on a mission to build beautiful digital experiences
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
              <div className="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-8xl">
                👨‍💻
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
              >
                <Code className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">Alfin Joseph</h2>
              <p className="text-gray-300 leading-relaxed">
                I'm a full-stack developer with a passion for creating beautiful, functional, and user-friendly applications. 
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.
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
            <h3 className="text-2xl font-semibold text-white mb-6">What Drives Me</h3>
            
            <div className="space-y-4">
              {[
                { icon: Code, title: 'Clean Code', desc: 'Writing maintainable, elegant solutions' },
                { icon: Lightbulb, title: 'Innovation', desc: 'Exploring new ideas and technologies' },
                { icon: Heart, title: 'User Experience', desc: 'Creating delightful interactions' },
                { icon: Coffee, title: 'Continuous Learning', desc: 'Always growing and improving' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="professional-card p-4 rounded-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
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
          <h3 className="text-3xl font-bold text-center text-white mb-8">Skills & Expertise</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-indigo-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
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
          className="text-center professional-card rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
          <p className="text-gray-300 mb-6">
            I'm always open to interesting conversations and collaboration opportunities
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, label: 'GitHub', href: '#' },
              { icon: Twitter, label: 'Twitter', href: '#' },
              { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
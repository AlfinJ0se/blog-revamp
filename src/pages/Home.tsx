import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, User, Zap, Code2, Database } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { formatDate } from '../utils/dateUtils';

const Home: React.FC = () => {
  const { posts } = useBlog();
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  if (!mounted) return null;

  return (
    <div className="pt-20">
      {/* Hero Section with Cyberpunk Effects */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full border border-cyan-500/30 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm cyber-text">SYSTEM ONLINE</span>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 cyber-text">
            <span className="block gradient-text-alt neon-pulse">CYBER</span>
            <span className="block gradient-text">CHRONICLES</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Diving deep into the digital realm where{' '}
            <span className="text-cyan-400 cyber-text">code meets creativity</span> and{' '}
            <span className="text-pink-400 cyber-text">innovation shapes reality</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/posts"
              className="cyber-button inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group cyber-text"
            >
              <Code2 className="w-5 h-5 mr-2" />
              ENTER THE MATRIX
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 text-cyan-400/30"
        >
          <Database className="w-12 h-12" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 text-pink-400/30"
        >
          <Code2 className="w-16 h-16" />
        </motion.div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20 px-6 relative">
        <motion.div
          style={{ y: y2 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 cyber-text gradient-text">
              FEATURED LOGS
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Latest transmissions from the digital frontier
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/posts/${post.slug}`}>
                  <div className="cyber-card rounded-xl overflow-hidden h-full">
                    <div className="h-48 bg-gradient-to-br from-cyan-600/20 via-pink-600/20 to-yellow-600/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 cyber-grid opacity-30"></div>
                      <div className="text-6xl opacity-40 relative z-10">⚡</div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xs font-bold rounded-full cyber-text">
                          {post.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2 cyber-text">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4 text-pink-400" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/posts"
              className="cyber-button inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 group cyber-text"
            >
              ACCESS ALL LOGS
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
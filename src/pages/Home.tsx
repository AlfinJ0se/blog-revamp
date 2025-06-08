import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, User, Sparkles } from 'lucide-react';
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 subtle-grid opacity-30" />
          <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">Welcome to my digital space</span>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="block text-white">Modern</span>
            <span className="block gradient-text-alt">Insights</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Exploring the intersection of{' '}
            <span className="text-indigo-400 font-medium">technology</span>,{' '}
            <span className="text-purple-400 font-medium">design</span>, and{' '}
            <span className="text-cyan-400 font-medium">innovation</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/posts"
              className="professional-button inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group"
            >
              Explore Articles
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Latest insights and discoveries from the world of technology
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
                  <div className="professional-card rounded-xl overflow-hidden h-full">
                    <div className="h-48 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-cyan-600/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 subtle-grid opacity-20"></div>
                      <div className="text-6xl opacity-30 relative z-10">📝</div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4 text-purple-400" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
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
              className="inline-flex items-center px-6 py-3 text-indigo-400 border border-indigo-400/50 rounded-lg hover:bg-indigo-400/10 transition-all duration-300 group"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
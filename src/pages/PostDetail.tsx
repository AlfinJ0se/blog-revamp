import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, User, Clock, Zap, Share2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { formatDate } from '../utils/dateUtils';
import 'highlight.js/styles/atom-one-dark.css';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlog();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      setTimeout(() => {
        setContent(post.content);
        setLoading(false);
      }, 500);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-6 opacity-50">⚠️</div>
          <h1 className="text-4xl font-bold text-white mb-4 cyber-text">LOG NOT FOUND</h1>
          <p className="text-gray-400 mb-8 cyber-text">The requested data does not exist in the database.</p>
          <Link
            to="/posts"
            className="cyber-button inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 cyber-text"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            RETURN TO ARCHIVE
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-800/50 rounded w-3/4 border border-cyan-500/20"></div>
            <div className="h-4 bg-gray-800/50 rounded w-1/2 border border-pink-500/20"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800/50 rounded border border-cyan-500/10"></div>
              <div className="h-4 bg-gray-800/50 rounded w-5/6 border border-pink-500/10"></div>
              <div className="h-4 bg-gray-800/50 rounded w-4/6 border border-yellow-500/10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/posts"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group cyber-text"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO ARCHIVE
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-sm font-bold rounded-full cyber-text">
                {post.category.toUpperCase()}
              </span>
              <div className="flex items-center space-x-2 px-3 py-1 bg-black/30 rounded-full border border-cyan-500/30">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm cyber-text">ACTIVE LOG</span>
              </div>
            </div>
            
            <button className="cyber-button p-3 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight cyber-text gradient-text-alt">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-cyan-500 pl-6 bg-gradient-to-r from-cyan-500/10 to-transparent py-4">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-cyan-500/30">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-white cyber-text">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-pink-500/30">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span className="text-white cyber-text">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-yellow-500/30">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-white cyber-text">{post.readTime}</span>
            </div>
          </div>
        </motion.header>

        {/* Post Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none
                     prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-headings:cyber-text
                     prose-h1:text-4xl prose-h1:mb-6 prose-h1:gradient-text-alt
                     prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-cyan-400 prose-h2:border-b prose-h2:border-cyan-500/30 prose-h2:pb-2
                     prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-pink-400
                     prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4 prose-h4:text-yellow-400
                     prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                     prose-a:text-cyan-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-cyan-300 hover:prose-a:underline prose-a:transition-all
                     prose-strong:text-white prose-strong:font-semibold
                     prose-em:text-gray-300 prose-em:italic
                     prose-code:text-cyan-400 prose-code:bg-gray-900/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-cyan-500/30
                     prose-pre:bg-gray-900/90 prose-pre:border prose-pre:border-cyan-500/30 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:backdrop-blur-sm
                     prose-blockquote:border-l-4 prose-blockquote:border-pink-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-pink-500/10 prose-blockquote:to-transparent prose-blockquote:text-gray-300 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
                     prose-ul:text-gray-300 prose-ul:space-y-1
                     prose-ol:text-gray-300 prose-ol:space-y-1
                     prose-li:text-gray-300 prose-li:marker:text-cyan-400
                     prose-table:border-collapse prose-table:border prose-table:border-cyan-500/30 prose-table:rounded-lg prose-table:overflow-hidden
                     prose-th:bg-gray-900/80 prose-th:text-cyan-400 prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-cyan-500/30 prose-th:cyber-text
                     prose-td:p-3 prose-td:border prose-td:border-gray-700/50 prose-td:text-gray-300
                     prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-cyan-500/30"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6 mt-8 cyber-text gradient-text-alt">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-cyan-400 mb-4 mt-8 border-b border-cyan-500/30 pb-2 cyber-text">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold text-pink-400 mb-3 mt-6 cyber-text">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-bold text-yellow-400 mb-2 mt-4 cyber-text">
                  {children}
                </h4>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.article>

        {/* Related Posts */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-12 border-t border-cyan-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-8 cyber-text gradient-text">RELATED LOGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {posts
              .filter(p => p.slug !== slug && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/posts/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="cyber-card rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors cyber-text">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1 text-cyan-400" />
                      <span className="cyber-text">{formatDate(relatedPost.date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PostDetail;
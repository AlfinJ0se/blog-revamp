import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
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
      // Simulate loading markdown content
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
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The post you're looking for doesn't exist.</p>
          <Link
            to="/posts"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
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
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/posts"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Posts
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.header>

        {/* Post Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none
                     prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                     prose-h1:text-4xl prose-h1:mb-6 prose-h1:bg-gradient-to-r prose-h1:from-purple-400 prose-h1:to-cyan-400 prose-h1:bg-clip-text prose-h1:text-transparent
                     prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-purple-300 prose-h2:border-b prose-h2:border-slate-700 prose-h2:pb-2
                     prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-cyan-300
                     prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                     prose-a:text-purple-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-purple-300 hover:prose-a:underline prose-a:transition-all
                     prose-strong:text-white prose-strong:font-semibold
                     prose-em:text-gray-300 prose-em:italic
                     prose-code:text-cyan-400 prose-code:bg-slate-800/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-slate-600
                     prose-pre:bg-slate-900/90 prose-pre:border prose-pre:border-slate-600 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:backdrop-blur-sm
                     prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-slate-800/30 prose-blockquote:text-gray-300 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:italic
                     prose-ul:text-gray-300 prose-ul:space-y-1
                     prose-ol:text-gray-300 prose-ol:space-y-1
                     prose-li:text-gray-300 prose-li:marker:text-purple-400
                     prose-table:border-collapse prose-table:border prose-table:border-slate-600
                     prose-th:bg-slate-800 prose-th:text-white prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-slate-600
                     prose-td:p-3 prose-td:border prose-td:border-slate-600 prose-td:text-gray-300
                     prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-slate-600"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-white mb-6 mt-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-purple-300 mb-4 mt-8 border-b border-slate-700 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold text-cyan-300 mb-3 mt-6">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-bold text-white mb-2 mt-4">
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
          className="mt-20 pt-12 border-t border-slate-700"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
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
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(relatedPost.date)}
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

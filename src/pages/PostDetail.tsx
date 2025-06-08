import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
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
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/posts"
            className="professional-button inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
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
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
            
            <button className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-indigo-500/50 transition-colors">
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          
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
          className="prose prose-lg max-w-none"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
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
          <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
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
                  <div className="professional-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {relatedPost.title}
                    </h3>
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

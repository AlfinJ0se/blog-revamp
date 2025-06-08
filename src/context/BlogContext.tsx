import React, { createContext, useContext, useState } from 'react';
import postsData from '../data/posts.json';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  tags?: string[];
}

interface BlogContextType {
  posts: BlogPost[];
  categories: string[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts] = useState<BlogPost[]>(postsData.posts);
  const [categories] = useState<string[]>(postsData.categories);

  return (
    <BlogContext.Provider value={{ posts, categories }}>
      {children}
    </BlogContext.Provider>
  );
};

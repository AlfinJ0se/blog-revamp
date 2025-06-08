import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
          </Routes>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;

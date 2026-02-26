import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import Blogs from './Blogs';
import Admin from './Admin';
import BlogDetail from './BlogDetail';
import CursorEffect from './components/CursorEffect';
import './index.css';

const App = () => {
  return (
    <Router>
      <CursorEffect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin" element={<Admin />} />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

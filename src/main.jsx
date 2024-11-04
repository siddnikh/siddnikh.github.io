import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Projects from './Projects';
import Blogs from './Blogs';
import './index.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage}/>;
      case 'blogs':
        return <Blogs setCurrentPage={setCurrentPage}/>;
      case 'projects':
        return <Projects setCurrentPage={setCurrentPage}/>;
      default:
        return <Home setCurrentPage={setCurrentPage}/>;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

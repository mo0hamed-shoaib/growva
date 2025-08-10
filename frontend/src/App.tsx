import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">CV Builder - Coming Soon</h1></div>} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">About - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Contact - Coming Soon</h1></div>} />
            <Route path="/privacy" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Privacy - Coming Soon</h1></div>} />
            <Route path="/terms" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Terms - Coming Soon</h1></div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

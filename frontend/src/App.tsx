import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CVProvider } from './contexts/CVContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CVBuilder from './pages/CVBuilder';

function App() {
  return (
    <ThemeProvider>
      <CVProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/builder" element={<CVBuilder />} />
              <Route path="/privacy" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Privacy - Coming Soon</h1></div>} />
              <Route path="/terms" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Terms - Coming Soon</h1></div>} />
            </Routes>
          </Layout>
        </Router>
      </CVProvider>
    </ThemeProvider>
  );
}

export default App;

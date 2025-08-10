import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CVProvider } from './contexts/CVContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CVBuilder from './pages/CVBuilder';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <CVProvider>
            <Router>
              <Layout>
                <main id="main-content" role="main">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/builder" element={<CVBuilder />} />
                    <Route path="/privacy" element={
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Privacy Policy
                        </h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                          Our privacy policy is coming soon. We are committed to protecting your data and privacy.
                        </p>
                      </div>
                    } />
                    <Route path="/terms" element={
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Terms of Service
                        </h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                          Our terms of service are coming soon. We are working on comprehensive terms that protect both users and our service.
                        </p>
                      </div>
                    } />
                    <Route path="*" element={
                      <div className="container mx-auto px-4 py-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                          404 - Page Not Found
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          The page you're looking for doesn't exist.
                        </p>
                        <a 
                          href="/" 
                          className="btn-primary"
                          aria-label="Go back to home page"
                        >
                          Go Home
                        </a>
                      </div>
                    } />
                  </Routes>
                </main>
              </Layout>
            </Router>
          </CVProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

import React, { useState } from 'react';
import { useCV } from '../contexts/CVContext';
import { useTemplates } from '../hooks/useTemplates';
import TemplatePreview from './TemplatePreview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'professional' | 'creative' | 'minimal' | 'modern';
  atsOptimized: boolean;
  features: string[];
}

const templates: Template[] = [
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Traditional layout perfect for corporate environments and ATS systems',
    preview: '📄',
    category: 'professional',
    atsOptimized: true,
    features: ['ATS-friendly', 'Clean typography', 'Standard sections', 'Professional colors']
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and contemporary design with plenty of white space',
    preview: '✨',
    category: 'minimal',
    atsOptimized: true,
    features: ['Minimal design', 'ATS-compatible', 'Easy to scan', 'Modern typography']
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Bold design for creative professionals and tech roles',
    preview: '🎨',
    category: 'creative',
    atsOptimized: false,
    features: ['Creative layout', 'Color accents', 'Visual hierarchy', 'Portfolio-style']
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    description: 'Sophisticated template for senior-level positions',
    preview: '👔',
    category: 'professional',
    atsOptimized: true,
    features: ['Executive style', 'ATS-optimized', 'Professional spacing', 'Premium fonts']
  },
  {
    id: 'tech-focused',
    name: 'Tech Focused',
    description: 'Designed specifically for technology and engineering roles',
    preview: '💻',
    category: 'modern',
    atsOptimized: true,
    features: ['Tech-optimized', 'Skills emphasis', 'Project showcase', 'Clean code style']
  },
  {
    id: 'startup-entrepreneur',
    name: 'Startup Entrepreneur',
    description: 'Dynamic template for entrepreneurs and startup professionals',
    preview: '🚀',
    category: 'creative',
    atsOptimized: false,
    features: ['Entrepreneurial', 'Results-focused', 'Achievement highlights', 'Modern branding']
  }
];

const TemplateSelection: React.FC = () => {
  const { cvData, dispatch } = useCV();
  const { templates, loading, error } = useTemplates();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const selectedTemplate = cvData.customization?.template || 'classic';

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-phoenix-600 mx-auto mb-2"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-2">Error loading templates</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Using default templates</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'professional', name: 'Professional', count: templates.filter(t => t.id.includes('professional') || t.id === 'classic').length },
    { id: 'minimal', name: 'Minimal', count: templates.filter(t => t.id.includes('minimal')).length },
    { id: 'creative', name: 'Creative', count: templates.filter(t => t.id.includes('creative')).length },
    { id: 'modern', name: 'Modern', count: templates.filter(t => t.id.includes('modern')).length },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => {
        if (selectedCategory === 'professional') return template.id.includes('professional') || template.id === 'classic';
        return template.id.includes(selectedCategory);
      });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    dispatch({ 
      type: 'UPDATE_CUSTOMIZATION', 
      payload: { template: templateId }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Choose Your Template
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select a template that matches your industry and career level. ATS-optimized templates are recommended for most applications.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-phoenix-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-phoenix-500 bg-phoenix-50 dark:bg-phoenix-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* ATS Badge */}
            {template.atsOptimized && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  ATS
                </span>
              </div>
            )}

            {/* Template Preview */}
            <div className="flex flex-col items-center mb-4">
              <div className="mb-3 border rounded bg-white shadow-sm">
                <TemplatePreview templateId={template.id} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center">
                {template.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
              {template.description}
            </p>

            {/* Features */}
            <div className="space-y-1">
              {template.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 left-2">
                <div className="w-5 h-5 bg-phoenix-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ATS Information */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
              ATS Optimization
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              ATS (Applicant Tracking System) optimized templates are designed to pass through automated screening systems. 
              They use standard formatting, clear section headers, and avoid complex layouts that might confuse parsing algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;

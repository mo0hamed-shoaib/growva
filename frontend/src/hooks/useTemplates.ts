import { useState, useEffect } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  atsOptimized: boolean;
  features: string[];
}

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/templates');
        
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        
        const data = await response.json();
        setTemplates(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch templates');
        
        // Fallback to default templates
        setTemplates([
          {
            id: 'classic',
            name: 'Classic',
            description: 'Clean and traditional layout with professional formatting.',
            thumbnailUrl: '/templates/classic.png',
            atsOptimized: true,
            features: ['Traditional layout', 'ATS-friendly formatting', 'Professional appearance']
          },
          {
            id: 'modern',
            name: 'Modern',
            description: 'Sleek design with emphasis on skills and achievements.',
            thumbnailUrl: '/templates/modern.png',
            atsOptimized: true,
            features: ['Contemporary design', 'Skills-focused layout', 'Clean typography']
          },
          {
            id: 'minimal',
            name: 'Minimal',
            description: 'Simple and clean layout for maximum readability.',
            thumbnailUrl: '/templates/minimal.png',
            atsOptimized: true,
            features: ['Minimal design', 'Maximum readability', 'ATS-optimized']
          },
          {
            id: 'professional',
            name: 'Professional',
            description: 'Corporate-style layout suitable for all industries.',
            thumbnailUrl: '/templates/professional.png',
            atsOptimized: true,
            features: ['Corporate style', 'Industry-agnostic', 'Professional appearance']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return { templates, loading, error };
};

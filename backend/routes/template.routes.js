const express = require('express');
const router = express.Router();

// ATS-optimized CV templates
const templates = [
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
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern layout with subtle design elements for creative fields.',
    thumbnailUrl: '/templates/creative.png',
    atsOptimized: true,
    features: ['Creative design', 'Subtle styling', 'ATS-compatible']
  }
];

// Get all available templates
router.get('/templates', (req, res) => {
  try {
    res.json(templates);
  } catch (err) {
    console.error('Error fetching templates:', err);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

// Get template by ID
router.get('/templates/:templateId', (req, res) => {
  try {
    const { templateId } = req.params;
    
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      return res.status(404).json({ 
        message: 'Template not found' 
      });
    }

    res.json(template);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

// Get template preview data (for future use)
router.get('/templates/:templateId/preview', (req, res) => {
  try {
    const { templateId } = req.params;
    
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      return res.status(404).json({ 
        message: 'Template not found' 
      });
    }

    // Return sample data for preview
    const previewData = {
      templateId,
      sampleData: {
        personalInfo: {
          fullName: 'John Doe',
          jobTitle: 'Software Developer',
          email: { value: 'john.doe@email.com' },
          phone: { value: '+1 (555) 123-4567' },
          location: { value: 'San Francisco, CA' }
        },
        summary: 'Experienced software developer with 5+ years in full-stack development...',
        workExperience: [
          {
            jobTitle: 'Senior Developer',
            company: 'Tech Corp',
            startDate: new Date('2022-01-01'),
            endDate: null,
            description: 'Led development of web applications...'
          }
        ],
        skills: [
          {
            groupName: 'Programming Languages',
            skills: ['JavaScript', 'Python', 'Java']
          }
        ]
      }
    };

    res.json(previewData);
  } catch (err) {
    console.error('Error fetching template preview:', err);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;

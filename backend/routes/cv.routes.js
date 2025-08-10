const express = require('express');
const router = express.Router();
const CV = require('../models/cv.model');

// Create a new CV
router.post('/cvs', async (req, res) => {
  try {
    const { userId, cvData, template } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ 
        message: 'userId is required' 
      });
    }

    if (!cvData || !cvData.personalInfo || !cvData.personalInfo.fullName || !cvData.personalInfo.email) {
      return res.status(400).json({ 
        message: 'CV data with personal information (fullName and email) is required' 
      });
    }

    // Create new CV document
    const newCV = new CV({
      userId,
      template: template || 'classic',
      ...cvData
    });

    await newCV.save();

    res.status(201).json({
      cvId: newCV._id,
      userId,
      message: 'CV created successfully',
      createdAt: newCV.createdAt
    });

  } catch (err) {
    console.error('Error creating CV:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

// Get CV by ID
router.get('/cvs/:cvId', async (req, res) => {
  try {
    const { cvId } = req.params;

    const cv = await CV.findById(cvId);
    
    if (!cv) {
      return res.status(404).json({ 
        message: 'CV not found' 
      });
    }

    res.json({
      cvId: cv._id,
      userId: cv.userId,
      cvData: {
        personalInfo: cv.personalInfo,
        summary: cv.summary,
        workExperience: cv.workExperience,
        internships: cv.internships,
        education: cv.education,
        skills: cv.skills,
        certifications: cv.certifications,
        projects: cv.projects,
        languages: cv.languages,
        customization: cv.customization
      },
      template: cv.template,
      updatedAt: cv.updatedAt
    });

  } catch (err) {
    console.error('Error fetching CV:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid CV ID format' 
      });
    }

    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

// Update CV by ID
router.put('/cvs/:cvId', async (req, res) => {
  try {
    const { cvId } = req.params;
    const updateData = req.body.cvData || {};
    const template = req.body.template;

    // Build update object
    const updateFields = { ...updateData };
    if (template) updateFields.template = template;

    const updatedCV = await CV.findByIdAndUpdate(
      cvId, 
      updateFields, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedCV) {
      return res.status(404).json({ 
        message: 'CV not found' 
      });
    }

    res.json({
      cvId: updatedCV._id,
      message: 'CV updated successfully',
      updatedAt: updatedCV.updatedAt
    });

  } catch (err) {
    console.error('Error updating CV:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid CV ID format' 
      });
    }

    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

// Delete CV by ID
router.delete('/cvs/:cvId', async (req, res) => {
  try {
    const { cvId } = req.params;

    const deletedCV = await CV.findByIdAndDelete(cvId);
    
    if (!deletedCV) {
      return res.status(404).json({ 
        message: 'CV not found' 
      });
    }

    res.json({
      cvId,
      message: 'CV deleted successfully'
    });

  } catch (err) {
    console.error('Error deleting CV:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid CV ID format' 
      });
    }

    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

// Get all CVs for a user (optional endpoint for future use)
router.get('/users/:userId/cvs', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const cvs = await CV.find({ userId })
      .select('_id template personalInfo.fullName createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CV.countDocuments({ userId });

    res.json({
      cvs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCVs: count
    });

  } catch (err) {
    console.error('Error fetching user CVs:', err);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;

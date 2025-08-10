const mongoose = require('mongoose');

// Link Schema for pre-made social/professional links
const LinkSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['LinkedIn', 'GitHub', 'Portfolio', 'Behance', 'Dribbble', 'Medium', 'Twitter'], 
    required: true 
  },
  url: { type: String, required: true },
  iconColor: { type: String, default: '#F25C1C' } // Default to phoenix orange
});

// Skill Group Schema for organizing skills
const SkillGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  skills: [{ type: String }],
  displayLayout: { 
    type: String, 
    enum: ['bullet', 'one-line', 'columns-2', 'columns-3', 'badges'], 
    default: 'bullet' 
  },
  proficiency: [{
    skill: { type: String },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
    percentage: { type: Number, min: 0, max: 100 }
  }]
});

// Certification Schema
const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  certificateLink: { type: String }
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  techStack: [{ type: String }],
  liveDemoLink: { type: String },
  githubLink: { type: String },
  description: { type: String }
});

// Work Experience Schema (used for both work and internships)
const WorkExpSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  achievements: [{ type: String }]
});

// Education Schema
const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String }
});

// Language Schema
const LanguageSchema = new mongoose.Schema({
  language: { type: String, required: true },
  proficiency: { 
    type: String, 
    enum: ['Native', 'Fluent', 'Intermediate', 'Basic'], 
    required: true 
  }
});

// Personal Information Schema
const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  jobTitle: { type: String },
  phone: { 
    value: { type: String },
    iconColor: { type: String, default: '#F25C1C' }
  },
  email: { 
    value: { type: String, required: true },
    iconColor: { type: String, default: '#F25C1C' }
  },
  location: { 
    value: { type: String },
    iconColor: { type: String, default: '#F25C1C' }
  },
  preMadeLinks: [LinkSchema],
  optionalFields: {
    maritalStatus: { type: String },
    militaryStatus: { type: String }
  }
});

// Customization Schema
const CustomizationSchema = new mongoose.Schema({
  theme: { 
    type: String, 
    enum: ['dark', 'light'], 
    default: 'dark' 
  },
  primaryColor: { type: String, default: '#F25C1C' },
  iconColors: { type: Map, of: String }, // Map of field to hex color
  sectionOrder: [{ type: String }],
  fontSize: { 
    type: String, 
    enum: ['small', 'medium', 'large'], 
    default: 'medium' 
  },
  fontChoice: { type: String, default: 'Inter' }
});

// Main CV Schema
const CVSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    index: true 
  }, // anonymous user ID from localStorage
  template: { 
    type: String, 
    default: 'classic' 
  },
  personalInfo: PersonalInfoSchema,
  summary: { type: String },
  workExperience: [WorkExpSchema],
  internships: [WorkExpSchema], // same schema as workExperience
  education: [EducationSchema],
  skills: [SkillGroupSchema],
  certifications: [CertificationSchema],
  projects: [ProjectSchema],
  languages: [LanguageSchema],
  customization: CustomizationSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update updatedAt before save
CVSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
CVSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('CV', CVSchema);

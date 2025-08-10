import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Types based on GROWVA_DATA_STRUCTURE.md
export interface Link {
  type: 'linkedin' | 'github' | 'portfolio' | 'behance' | 'dribbble' | 'medium' | 'twitter';
  url: string;
  iconColor: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle?: string;
  phone?: string;
  phoneIconColor?: string;
  email: string;
  emailIconColor?: string;
  location?: string;
  locationIconColor?: string;
  links: Link[];
  maritalStatus?: string;
  militaryStatus?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string; // MM/YYYY format
  endDate?: string; // MM/YYYY format or "Present"
  description?: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
  displayLayout: 'bullet' | 'oneLine' | 'columns' | 'badge';
  proficiency?: 'beginner' | 'intermediate' | 'expert';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  startDate: string;
  endDate?: string;
  description?: string;
  certificateLink?: string;
}

export interface Project {
  id: string;
  name: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  techStack: string[];
  liveDemoLink?: string;
  githubLink?: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'intermediate';
}

export interface Customization {
  primaryColor: string;
  secondaryColor?: string;
  sectionOrder: string[];
  iconColors: Record<string, string>;
  template?: string;
  iconStyle?: string;
  spacing?: string;
  fontFamily?: string;
  borderStyle?: string;
}

// Section configuration for drag-and-drop
export interface CVSection {
  id: string;
  title: string;
  icon: string;
  required: boolean;
  order: number;
}

export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];
  internships: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  customization: Customization;
  createdAt: string;
  updatedAt: string;
}

// Initial CV data
const initialCVData: CVData = {
  id: crypto.randomUUID(),
  personalInfo: {
    fullName: '',
    jobTitle: '',
    phone: '',
    phoneIconColor: '#6B7280',
    email: '',
    emailIconColor: '#6B7280',
    location: '',
    locationIconColor: '#6B7280',
    links: [],
    maritalStatus: '',
    militaryStatus: '',
  },
  summary: '',
  workExperience: [],
  internships: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
  customization: {
    primaryColor: '#F25C1C', // Phoenix orange
    secondaryColor: '#F47A2E', // Phoenix secondary
    sectionOrder: [
      'personal',
      'summary',
      'work',
      'education',
      'skills',
      'certifications',
      'projects',
      'languages',
    ],
    iconColors: {},
    template: 'professional-classic',
    iconStyle: 'professional',
    spacing: 'standard',
    fontFamily: 'inter',
    borderStyle: 'subtle',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Action types
type CVAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'DELETE_WORK_EXPERIENCE'; payload: string }
  | { type: 'ADD_INTERNSHIP'; payload: WorkExperience }
  | { type: 'UPDATE_INTERNSHIP'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'DELETE_INTERNSHIP'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL_GROUP'; payload: SkillGroup }
  | { type: 'UPDATE_SKILL_GROUP'; payload: { id: string; data: Partial<SkillGroup> } }
  | { type: 'DELETE_SKILL_GROUP'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: Language }
  | { type: 'UPDATE_LANGUAGE'; payload: { id: string; data: Partial<Language> } }
  | { type: 'DELETE_LANGUAGE'; payload: string }
  | { type: 'UPDATE_CUSTOMIZATION'; payload: Partial<Customization> }
  | { type: 'REORDER_SECTIONS'; payload: string[] }
  | { type: 'LOAD_CV_DATA'; payload: CVData }
  | { type: 'RESET_CV_DATA' };

// Reducer function
const cvReducer = (state: CVData, action: CVAction): CVData => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_SUMMARY':
      return {
        ...state,
        summary: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: [...state.workExperience, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter(exp => exp.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_INTERNSHIP':
      return {
        ...state,
        internships: [...state.internships, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_INTERNSHIP':
      return {
        ...state,
        internships: state.internships.map(internship =>
          internship.id === action.payload.id ? { ...internship, ...action.payload.data } : internship
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_INTERNSHIP':
      return {
        ...state,
        internships: state.internships.filter(internship => internship.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_SKILL_GROUP':
      return {
        ...state,
        skills: [...state.skills, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_SKILL_GROUP':
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_SKILL_GROUP':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [...state.certifications, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map(cert =>
          cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter(cert => cert.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? { ...project, ...action.payload.data } : project
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, action.payload],
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map(lang =>
          lang.id === action.payload.id ? { ...lang, ...action.payload.data } : lang
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'DELETE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.filter(lang => lang.id !== action.payload),
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_CUSTOMIZATION':
      return {
        ...state,
        customization: { ...state.customization, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'REORDER_SECTIONS':
      return {
        ...state,
        customization: { 
          ...state.customization, 
          sectionOrder: action.payload 
        },
        updatedAt: new Date().toISOString(),
      };

    case 'LOAD_CV_DATA':
      return action.payload;

    case 'RESET_CV_DATA':
      return {
        ...initialCVData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

    default:
      return state;
  }
};

// Context interface
interface CVContextType {
  cvData: CVData;
  dispatch: React.Dispatch<CVAction>;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetCV: () => void;
  getProgressPercentage: () => number;
}

// Create context
const CVContext = createContext<CVContextType | undefined>(undefined);

// Provider component
interface CVProviderProps {
  children: React.ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  const [cvData, dispatch] = useReducer(cvReducer, initialCVData);

  // Save to localStorage
  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem('growva-cv-data', JSON.stringify(cvData));
    } catch (error) {
      console.error('Failed to save CV data to localStorage:', error);
    }
  }, [cvData]);

  // Load from localStorage
  const loadFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem('growva-cv-data');
      if (saved) {
        const parsedData = JSON.parse(saved);
        dispatch({ type: 'LOAD_CV_DATA', payload: parsedData });
      }
    } catch (error) {
      console.error('Failed to load CV data from localStorage:', error);
    }
  }, []);

  // Reset CV
  const resetCV = useCallback(() => {
    dispatch({ type: 'RESET_CV_DATA' });
    localStorage.removeItem('growva-cv-data');
  }, []);

  // Calculate progress percentage
  const getProgressPercentage = useCallback(() => {
    const sections = [
      cvData.personalInfo.fullName && cvData.personalInfo.email, // Personal info
      cvData.summary, // Summary
      cvData.workExperience.length > 0, // Work experience
      cvData.education.length > 0, // Education
      cvData.skills.length > 0, // Skills
      cvData.certifications.length > 0, // Certifications
      cvData.projects.length > 0, // Projects
      cvData.languages.length > 0, // Languages
    ];

    const completedSections = sections.filter(Boolean).length;
    return Math.round((completedSections / sections.length) * 100);
  }, [cvData]);

  // Load data on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Autosave on data changes
  useEffect(() => {
    const timeoutId = setTimeout(saveToLocalStorage, 1000); // Debounce for 1 second
    return () => clearTimeout(timeoutId);
  }, [cvData, saveToLocalStorage]);

  const value: CVContextType = {
    cvData,
    dispatch,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetCV,
    getProgressPercentage,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

// Hook to use CV context
export const useCV = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};

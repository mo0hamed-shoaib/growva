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
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string; // MM/YYYY format
  endDate?: string; // MM/YYYY format or "Present"
  isCurrent?: boolean;
  description?: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  gpa?: string;
  relevantCourses?: string[];
}

export interface SkillGroup {
  groupName?: string;
  skills: string[];
  displayLayout: 'bullet' | 'one-line' | 'columns-2' | 'columns-3' | 'badges';
  proficiency?: Array<{
    skill: string;
    level: 'Beginner' | 'Intermediate' | 'Expert';
    percentage?: number;
  }>;
}

export interface Certification {
  title: string;
  issuer: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  certificateLink?: string;
}

export interface Project {
  name: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  techStack: string[];
  liveDemoLink?: string;
  githubLink?: string;
  description?: string;
}

export interface Language {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
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
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: WorkExperience[] }
  | { type: 'UPDATE_EDUCATION'; payload: Education[] }
  | { type: 'UPDATE_SKILLS'; payload: SkillGroup[] }
  | { type: 'UPDATE_CERTIFICATIONS'; payload: Certification[] }
  | { type: 'UPDATE_PROJECTS'; payload: Project[] }
  | { type: 'UPDATE_LANGUAGES'; payload: Language[] }
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

    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_CERTIFICATIONS':
      return {
        ...state,
        certifications: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        languages: action.payload,
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
  updateCV: (updates: Partial<CVData>) => void;
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

  // Update CV data
  const updateCV = useCallback((updates: Partial<CVData>) => {
    Object.entries(updates).forEach(([key, value]) => {
      switch (key) {
        case 'personalInfo':
          dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: value as Partial<PersonalInfo> });
          break;
        case 'summary':
          dispatch({ type: 'UPDATE_SUMMARY', payload: value as string });
          break;
        case 'workExperience':
          dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: value as WorkExperience[] });
          break;
        case 'education':
          dispatch({ type: 'UPDATE_EDUCATION', payload: value as Education[] });
          break;
        case 'skills':
          dispatch({ type: 'UPDATE_SKILLS', payload: value as SkillGroup[] });
          break;
        case 'certifications':
          dispatch({ type: 'UPDATE_CERTIFICATIONS', payload: value as Certification[] });
          break;
        case 'projects':
          dispatch({ type: 'UPDATE_PROJECTS', payload: value as Project[] });
          break;
        case 'languages':
          dispatch({ type: 'UPDATE_LANGUAGES', payload: value as Language[] });
          break;
        case 'customization':
          dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: value as Partial<Customization> });
          break;
      }
    });
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
    updateCV,
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

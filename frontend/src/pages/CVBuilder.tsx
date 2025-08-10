import React, { useState } from 'react';
import { useCV } from '../contexts/CVContext';
import ProgressBar from '../components/ProgressBar';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import LanguagesForm from '../components/forms/LanguagesForm';
import CVPreview from '../components/CVPreview';
import SectionOrdering from '../components/SectionOrdering';
import TemplateSelection from '../components/TemplateSelection';
import CustomizationPanel from '../components/CustomizationPanel';
import ExportModal from '../components/ExportModal';

type FormSection = 'personal' | 'summary' | 'work' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages' | 'customization';
type BuilderMode = 'quick' | 'custom';

const CVBuilder: React.FC = () => {
  const { cvData } = useCV();
  const [activeSection, setActiveSection] = useState<FormSection>('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [mode, setMode] = useState<BuilderMode>('quick');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Quick mode sections - essential fields only
  const quickModeSections: { id: FormSection; title: string; icon: string; required: boolean }[] = [
    { id: 'personal', title: 'Personal Info', icon: '👤', required: true },
    { id: 'summary', title: 'Summary', icon: '📝', required: false },
    { id: 'work', title: 'Work Experience', icon: '💼', required: false },
    { id: 'skills', title: 'Skills', icon: '⚡', required: false },
  ];

  // Custom mode sections - all available sections
  const customModeSections: { id: FormSection; title: string; icon: string; required: boolean }[] = [
    { id: 'personal', title: 'Personal Info', icon: '👤', required: true },
    { id: 'summary', title: 'Summary', icon: '📝', required: false },
    { id: 'work', title: 'Work Experience', icon: '💼', required: false },
    { id: 'education', title: 'Education', icon: '🎓', required: false },
    { id: 'skills', title: 'Skills', icon: '⚡', required: false },
    { id: 'certifications', title: 'Certifications', icon: '🏆', required: false },
    { id: 'projects', title: 'Projects', icon: '🚀', required: false },
    { id: 'languages', title: 'Languages', icon: '🌍', required: false },
    { id: 'customization', title: 'Customize', icon: '🎨', required: false },
  ];

  const sections = mode === 'quick' ? quickModeSections : customModeSections;
  const currentSectionIndex = sections.findIndex(section => section.id === activeSection);

  const getSectionStatus = (sectionId: FormSection) => {
    switch (sectionId) {
      case 'personal':
        return cvData.personalInfo.fullName && cvData.personalInfo.email;
      case 'summary':
        return !!cvData.summary;
      case 'work':
        return cvData.workExperience.length > 0;
      case 'education':
        return cvData.education.length > 0;
      case 'skills':
        return cvData.skills.length > 0;
      case 'certifications':
        return cvData.certifications.length > 0;
      case 'projects':
        return cvData.projects.length > 0;
      case 'languages':
        return cvData.languages.length > 0;
      case 'customization':
        return true; // Always considered complete as it's optional
      default:
        return false;
    }
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'work':
        return <WorkExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'customization':
        return (
          <div className="space-y-6">
            <TemplateSelection />
            <SectionOrdering />
            <CustomizationPanel />
          </div>
        );
      default:
        return null;
    }
  };

  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveSection(sections[currentSectionIndex + 1].id);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(sections[currentSectionIndex - 1].id);
    }
  };

  const getQuickModeTips = (sectionId: FormSection) => {
    switch (sectionId) {
      case 'personal':
        return {
          title: "Personal Information Tips",
          tips: [
            "Use your full legal name as it appears on official documents",
            "Include a professional email address",
            "Add your current location (city, state/country)",
            "Include relevant professional links like LinkedIn or GitHub"
          ]
        };
      case 'summary':
        return {
          title: "Summary Tips",
          tips: [
            "Keep it concise (2-4 sentences)",
            "Highlight your key strengths and career objectives",
            "Use action verbs and industry-specific keywords",
            "Focus on what you can offer employers"
          ]
        };
      case 'work':
        return {
          title: "Work Experience Tips",
          tips: [
            "Start with your most recent position",
            "Use bullet points to describe your achievements",
            "Quantify your accomplishments when possible (e.g., 'Increased sales by 25%')",
            "Focus on relevant experience for the job you're applying for"
          ]
        };
      case 'skills':
        return {
          title: "Skills Tips",
          tips: [
            "List both technical and soft skills",
            "Prioritize skills that are most relevant to your target job",
            "Include proficiency levels if applicable",
            "Group related skills together (e.g., 'Programming Languages', 'Design Tools')"
          ]
        };
      default:
        return null;
    }
  };

  const currentTips = mode === 'quick' ? getQuickModeTips(activeSection) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Title and Progress */}
            <div className="flex items-center justify-between sm:justify-start space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                CV Builder
              </h1>
              <div className="hidden sm:block">
                <ProgressBar className="w-48 lg:w-64" />
              </div>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="sm:hidden w-full">
              <ProgressBar className="w-full" />
            </div>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setMode('quick')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'quick'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  title="Quick Mode: Guided step-by-step process with essential fields only"
                >
                  <span className="hidden sm:inline">Quick Mode</span>
                  <span className="sm:hidden">Quick</span>
                </button>
                <button
                  onClick={() => setMode('custom')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'custom'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  title="Custom Mode: Full control with all sections and advanced options"
                >
                  <span className="hidden sm:inline">Custom Mode</span>
                  <span className="sm:hidden">Custom</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    showPreview
                      ? 'bg-phoenix-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                  <span className="sm:hidden">{showPreview ? 'Hide' : 'Preview'}</span>
                </button>
                
                <button
                  onClick={() => setShowExportModal(true)}
                  className="btn-primary text-sm px-3 sm:px-4 py-2"
                >
                  <span className="hidden sm:inline">Export CV</span>
                  <span className="sm:hidden">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Description Banner */}
      <div className="bg-phoenix-50 dark:bg-phoenix-900/10 border-b border-phoenix-200 dark:border-phoenix-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center text-sm">
            {mode === 'quick' ? (
              <div className="flex items-center space-x-2 text-phoenix-700 dark:text-phoenix-300">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-center">
                  <strong>Quick Mode:</strong> 
                  <span className="hidden sm:inline"> Guided step-by-step process with essential fields only. Perfect for beginners or quick CV creation.</span>
                  <span className="sm:hidden"> Guided process with essential fields only.</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-phoenix-700 dark:text-phoenix-300">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-center">
                  <strong>Custom Mode:</strong> 
                  <span className="hidden sm:inline"> Full control with all sections and advanced customization options. Perfect for detailed CV creation.</span>
                  <span className="sm:hidden"> Full control with all sections and options.</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {mode === 'quick' ? (
          // Quick Mode Layout - Step by Step
          <div className={`grid gap-6 lg:gap-8 ${showPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Form Section */}
            <div className="space-y-6 lg:space-y-8">
              {/* Progress Indicator */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Step {currentSectionIndex + 1} of {sections.length}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(((currentSectionIndex + 1) / sections.length) * 100)}% Complete
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-phoenix-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSectionIndex + 1) / sections.length) * 100}%` }}
                  />
                </div>

                {/* Current Section Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{sections[currentSectionIndex]?.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {sections[currentSectionIndex]?.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {sections[currentSectionIndex]?.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                {renderActiveForm()}
              </div>

              {/* Tips Section for Quick Mode */}
              {currentTips && (
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 {currentTips.title}
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    {currentTips.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-300 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handlePreviousSection}
                  disabled={currentSectionIndex === 0}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentSectionIndex === 0
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  ← Previous
                </button>
                
                <button
                  onClick={handleNextSection}
                  disabled={currentSectionIndex === sections.length - 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentSectionIndex === sections.length - 1
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-phoenix-600 text-white hover:bg-phoenix-700'
                  }`}
                >
                  {currentSectionIndex === sections.length - 1 ? 'Complete' : 'Next →'}
                </button>
              </div>
            </div>

            {/* Preview Section */}
            {showPreview && (
              <div className="xl:sticky xl:top-24">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Live Preview
                  </h2>
                  <CVPreview cvData={cvData} />
                </div>
              </div>
            )}
          </div>
        ) : (
          // Custom Mode Layout - Sidebar/Accordion
          <div className={`grid gap-6 lg:gap-8 ${showPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Form Section */}
            <div className="space-y-6 lg:space-y-8">
              {/* Section Navigation */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  CV Sections
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    const isComplete = getSectionStatus(section.id);
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`p-3 rounded-lg text-center transition-all duration-200 ${
                          isActive
                            ? 'bg-phoenix-100 dark:bg-phoenix-900/20 border-2 border-phoenix-500'
                            : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="text-xl sm:text-2xl mb-1">{section.icon}</div>
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {section.title}
                        </div>
                        {isComplete && (
                          <div className="flex justify-center mt-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                {renderActiveForm()}
              </div>
            </div>

            {/* Preview Section */}
            {showPreview && (
              <div className="xl:sticky xl:top-24">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Live Preview
                  </h2>
                  <CVPreview cvData={cvData} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
};

export default CVBuilder;

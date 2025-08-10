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

type FormSection = 'personal' | 'summary' | 'work' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages' | 'customization';

const CVBuilder: React.FC = () => {
  const { cvData } = useCV();
  const [activeSection, setActiveSection] = useState<FormSection>('personal');
  const [showPreview, setShowPreview] = useState(false);

  const sections: { id: FormSection; title: string; icon: string; required: boolean }[] = [
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
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                CV Builder
              </h1>
              <ProgressBar className="w-64" />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showPreview
                    ? 'bg-phoenix-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              
              <button className="btn-primary">
                Export CV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Form Section */}
          <div className="space-y-8">
            {/* Section Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                CV Sections
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                      <div className="text-2xl mb-1">{section.icon}</div>
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {section.title}
                      </div>
                      {isComplete && (
                        <div className="flex justify-center mt-1">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              {renderActiveForm()}
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Live Preview
                </h2>
                <CVPreview cvData={cvData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;

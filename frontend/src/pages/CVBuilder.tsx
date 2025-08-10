import React, { useState } from 'react';
import { useCV } from '../contexts/CVContext';
import ProgressBar from '../components/ProgressBar';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import CVPreview from '../components/CVPreview';

type FormSection = 'personal' | 'summary' | 'work' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages';

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
        return <div className="text-center py-12">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Work Experience
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon! This section will allow you to add your work history.
          </p>
        </div>;
      case 'education':
        return <div className="text-center py-12">
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Education
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon! This section will allow you to add your educational background.
          </p>
        </div>;
      case 'skills':
        return <div className="text-center py-12">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Skills
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon! This section will allow you to add your skills and expertise.
          </p>
        </div>;
      case 'certifications':
        return <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Certifications
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon! This section will allow you to add your certifications.
          </p>
        </div>;
      case 'projects':
        return <div className="text-center py-12">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Projects
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon! This section will allow you to showcase your projects.
          </p>
        </div>;
      case 'languages':
        return <div className="text-center py-12">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Languages
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon! This section will allow you to add your language skills.
          </p>
        </div>;
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

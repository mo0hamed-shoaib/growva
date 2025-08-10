import React from 'react';
import { CVData } from '../contexts/CVContext';

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    if (dateString === 'Present') return 'Present';
    
    const [month, year] = dateString.split('/');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getLinkIcon = (type: string) => {
    const icons: Record<string, string> = {
      linkedin: '💼',
      github: '🐙',
      portfolio: '🎨',
      behance: '🎭',
      dribbble: '🏀',
      medium: '📝',
      twitter: '🐦',
    };
    return icons[type] || '🔗';
  };

  const getLinkLabel = (type: string) => {
    const labels: Record<string, string> = {
      linkedin: 'LinkedIn',
      github: 'GitHub',
      portfolio: 'Portfolio',
      behance: 'Behance',
      dribbble: 'Dribbble',
      medium: 'Medium',
      twitter: 'Twitter/X',
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {cvData.personalInfo.fullName || 'Your Name'}
        </h1>
        {cvData.personalInfo.jobTitle && (
          <p className="text-xl text-gray-600 mb-3">
            {cvData.personalInfo.jobTitle}
          </p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
          {cvData.personalInfo.email && (
            <div className="flex items-center">
              <span className="mr-1">📧</span>
              {cvData.personalInfo.email}
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="flex items-center">
              <span className="mr-1">📞</span>
              {cvData.personalInfo.phone}
            </div>
          )}
          {cvData.personalInfo.location && (
            <div className="flex items-center">
              <span className="mr-1">📍</span>
              {cvData.personalInfo.location}
            </div>
          )}
        </div>

        {/* Links */}
        {cvData.personalInfo.links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {cvData.personalInfo.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-phoenix-600 hover:text-phoenix-700 transition-colors"
              >
                <span className="mr-1">{getLinkIcon(link.type)}</span>
                {getLinkLabel(link.type)}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {cvData.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {cvData.workExperience.map((job, index) => (
              <div key={index} className="border-l-4 border-phoenix-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {job.jobTitle}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(job.startDate)} - {formatDate(job.endDate || 'Present')}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">
                  {job.company}
                  {job.location && `, ${job.location}`}
                </p>
                {job.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {job.description}
                  </p>
                )}
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start">
                        <span className="text-phoenix-500 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internships */}
      {cvData.internships.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Internships
          </h2>
          <div className="space-y-4">
            {cvData.internships.map((internship, index) => (
              <div key={index} className="border-l-4 border-phoenix-400 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {internship.jobTitle}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(internship.startDate)} - {formatDate(internship.endDate || 'Present')}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">
                  {internship.company}
                  {internship.location && `, ${internship.location}`}
                </p>
                {internship.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {internship.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {cvData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-phoenix-300 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate || 'Present')}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </p>
                {edu.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="space-y-3">
            {cvData.skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-800 mb-2">
                  {skillGroup.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-phoenix-100 text-phoenix-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {cvData.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-3">
            {cvData.certifications.map((cert, index) => (
              <div key={index} className="border-l-4 border-phoenix-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {cert.title}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(cert.startDate)} - {formatDate(cert.endDate || 'Present')}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">
                  {cert.issuer}
                </p>
                {cert.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {cvData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {cvData.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-phoenix-100 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-sm text-gray-600">
                      {project.startDate && formatDate(project.startDate)} - {project.endDate && formatDate(project.endDate)}
                    </span>
                  )}
                </div>
                {project.role && (
                  <p className="text-gray-700 font-medium mb-1">
                    Role: {project.role}
                  </p>
                )}
                {project.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    {project.description}
                  </p>
                )}
                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 text-sm">
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-phoenix-600 hover:text-phoenix-700 transition-colors"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-phoenix-600 hover:text-phoenix-700 transition-colors"
                    >
                      🐙 GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {cvData.languages.map((language, index) => (
              <div key={index} className="flex items-center">
                <span className="font-medium text-gray-900 mr-2">
                  {language.name}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {language.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!cvData.personalInfo.fullName && !cvData.summary && 
       cvData.workExperience.length === 0 && cvData.education.length === 0 && 
       cvData.skills.length === 0 && cvData.certifications.length === 0 && 
       cvData.projects.length === 0 && cvData.languages.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium mb-2">Your CV Preview</h3>
          <p className="text-sm">
            Start filling out the sections to see your CV take shape here.
          </p>
        </div>
      )}
    </div>
  );
};

export default CVPreview;

import React from 'react';

interface TemplatePreviewProps {
  templateId: string;
  className?: string;
}

// Sample CV data for previews
const sampleCVData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    jobTitle: "Senior Frontend Developer",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    links: [
      { type: 'linkedin' as const, url: 'linkedin.com/in/sarah', iconColor: '#0077B5' },
      { type: 'github' as const, url: 'github.com/sarah', iconColor: '#333' }
    ]
  },
  summary: "Experienced frontend developer with 5+ years building modern web applications using React, TypeScript, and modern development practices.",
  workExperience: [
    {
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "Present",
      achievements: ["Led development of new dashboard", "Improved performance by 40%"]
    }
  ],
  skills: [
    { groupName: "Frontend", skills: ["React", "TypeScript", "CSS"] },
    { groupName: "Tools", skills: ["Git", "Docker", "AWS"] }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "Stanford University",
      startDate: "2016-09",
      endDate: "2020-05"
    }
  ]
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId, className = "" }) => {
  const getTemplateStyles = () => {
    switch (templateId) {
      case 'classic':
      case 'professional-classic':
        return {
          container: "bg-white p-4 text-black font-serif",
          header: "text-center border-b border-gray-300 pb-2 mb-3",
          name: "text-lg font-bold",
          title: "text-sm text-gray-600 mt-1",
          contact: "text-xs text-gray-500 mt-1",
          section: "mb-3",
          sectionTitle: "text-sm font-bold text-gray-800 border-b border-gray-200 mb-1"
        };
      case 'modern':
      case 'creative-modern':
        return {
          container: "bg-gradient-to-br from-blue-50 to-white p-4 text-gray-800",
          header: "text-left mb-3",
          name: "text-lg font-bold text-blue-900",
          title: "text-sm text-blue-600 mt-1",
          contact: "text-xs text-gray-600 mt-1",
          section: "mb-3",
          sectionTitle: "text-sm font-bold text-blue-800 mb-1"
        };
      case 'minimal':
        return {
          container: "bg-white p-4 text-gray-900",
          header: "text-left mb-3",
          name: "text-lg font-light",
          title: "text-sm text-gray-600 mt-1",
          contact: "text-xs text-gray-500 mt-1",
          section: "mb-3",
          sectionTitle: "text-sm font-medium text-gray-700 mb-1"
        };
      case 'professional':
        return {
          container: "bg-gray-50 p-4 text-gray-900 border-l-4 border-gray-700",
          header: "text-left mb-3",
          name: "text-lg font-bold text-gray-900",
          title: "text-sm text-gray-700 mt-1",
          contact: "text-xs text-gray-600 mt-1",
          section: "mb-3",
          sectionTitle: "text-sm font-bold text-gray-800 uppercase tracking-wide mb-1"
        };
      default:
        return {
          container: "bg-white p-4 text-gray-900",
          header: "text-left mb-3",
          name: "text-lg font-bold",
          title: "text-sm text-gray-600 mt-1",
          contact: "text-xs text-gray-500 mt-1",
          section: "mb-3",
          sectionTitle: "text-sm font-bold text-gray-800 mb-1"
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`${styles.container} rounded border shadow-sm scale-75 origin-top-left transform ${className}`} style={{ height: '200px', width: '150px', fontSize: '6px', overflow: 'hidden' }}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name} style={{ fontSize: '8px' }}>{sampleCVData.personalInfo.fullName}</h1>
        <p className={styles.title} style={{ fontSize: '6px' }}>{sampleCVData.personalInfo.jobTitle}</p>
        <p className={styles.contact} style={{ fontSize: '5px' }}>
          {sampleCVData.personalInfo.email} • {sampleCVData.personalInfo.phone}
        </p>
        <p className={styles.contact} style={{ fontSize: '5px' }}>
          {sampleCVData.personalInfo.location}
        </p>
      </div>

      {/* Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '6px' }}>SUMMARY</h2>
        <p style={{ fontSize: '5px', lineHeight: '1.2' }}>
          {sampleCVData.summary.substring(0, 60)}...
        </p>
      </div>

      {/* Experience */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '6px' }}>EXPERIENCE</h2>
        <div style={{ fontSize: '5px', lineHeight: '1.2' }}>
          <p style={{ fontWeight: 'bold' }}>{sampleCVData.workExperience[0].jobTitle}</p>
          <p>{sampleCVData.workExperience[0].company}</p>
          <p>{sampleCVData.workExperience[0].startDate} - {sampleCVData.workExperience[0].endDate}</p>
        </div>
      </div>

      {/* Skills */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '6px' }}>SKILLS</h2>
        <div style={{ fontSize: '5px', lineHeight: '1.2' }}>
          {sampleCVData.skills.map((group, index) => (
            <div key={index}>
              <span style={{ fontWeight: 'bold' }}>{group.groupName}:</span> {group.skills.join(', ')}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '6px' }}>EDUCATION</h2>
        <div style={{ fontSize: '5px', lineHeight: '1.2' }}>
          <p style={{ fontWeight: 'bold' }}>{sampleCVData.education[0].degree}</p>
          <p>{sampleCVData.education[0].institution}</p>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;

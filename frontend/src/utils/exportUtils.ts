import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CVData } from '../contexts/CVContext';

// PDF Export Function
export const exportToPDF = async (cvData: CVData): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a temporary div to render the CV
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm'; // A4 width
      tempDiv.style.padding = '20mm';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.4';
      tempDiv.style.color = '#000';
      
      // Generate HTML content for the CV
      tempDiv.innerHTML = generateCVHTML(cvData);
      
      document.body.appendChild(tempDiv);
      
      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 210 * 3.779527559, // Convert mm to pixels
        height: 297 * 3.779527559, // A4 height
      });
      
      // Remove temporary div
      document.body.removeChild(tempDiv);
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const pdfBlob = pdf.output('blob');
      resolve(pdfBlob);
    } catch (error) {
      reject(error);
    }
  });
};

// Markdown Export Function
export const exportToMarkdown = (cvData: CVData): string => {
  let markdown = '';
  
  // Header
  markdown += `# ${cvData.personalInfo.fullName || 'CV'}\n\n`;
  
  if (cvData.personalInfo.jobTitle) {
    markdown += `**${cvData.personalInfo.jobTitle}**\n\n`;
  }
  
  // Contact Information
  markdown += '## Contact Information\n\n';
  if (cvData.personalInfo.email) {
    markdown += `- **Email:** ${cvData.personalInfo.email}\n`;
  }
  if (cvData.personalInfo.phone) {
    markdown += `- **Phone:** ${cvData.personalInfo.phone}\n`;
  }
  if (cvData.personalInfo.location) {
    markdown += `- **Location:** ${cvData.personalInfo.location}\n`;
  }
  
  // Links
  if (cvData.personalInfo.links && cvData.personalInfo.links.length > 0) {
    cvData.personalInfo.links.forEach(link => {
      markdown += `- **${link.type}:** [${link.url}](${link.url})\n`;
    });
  }
  markdown += '\n';
  
  // Summary
  if (cvData.summary) {
    markdown += '## Professional Summary\n\n';
    markdown += `${cvData.summary}\n\n`;
  }
  
  // Work Experience
  if (cvData.workExperience && cvData.workExperience.length > 0) {
    markdown += '## Work Experience\n\n';
    cvData.workExperience.forEach((work, index) => {
      markdown += `### ${work.jobTitle} at ${work.company}\n`;
      if (work.location) {
        markdown += `*${work.location}*\n`;
      }
      markdown += `*${formatDate(work.startDate)} - ${work.isCurrent ? 'Present' : formatDate(work.endDate)}*\n\n`;
      
      if (work.description) {
        markdown += `${work.description}\n\n`;
      }
      
      if (work.achievements && work.achievements.length > 0) {
        markdown += '**Key Achievements:**\n';
        work.achievements.forEach(achievement => {
          markdown += `- ${achievement}\n`;
        });
        markdown += '\n';
      }
    });
  }
  
  // Education
  if (cvData.education && cvData.education.length > 0) {
    markdown += '## Education\n\n';
    cvData.education.forEach((edu, index) => {
      markdown += `### ${edu.degree}\n`;
      markdown += `**${edu.institution}**\n`;
      if (edu.location) {
        markdown += `*${edu.location}*\n`;
      }
      markdown += `*${formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : formatDate(edu.endDate)}*\n`;
      if (edu.gpa) {
        markdown += `**GPA:** ${edu.gpa}\n`;
      }
      if (edu.description) {
        markdown += `${edu.description}\n`;
      }
      if (edu.relevantCourses && edu.relevantCourses.length > 0) {
        markdown += '**Relevant Courses:** ' + edu.relevantCourses.join(', ') + '\n';
      }
      markdown += '\n';
    });
  }
  
  // Skills
  if (cvData.skills && cvData.skills.length > 0) {
    markdown += '## Skills\n\n';
    cvData.skills.forEach((skillGroup, index) => {
      if (skillGroup.groupName) {
        markdown += `### ${skillGroup.groupName}\n`;
      }
      if (skillGroup.skills && skillGroup.skills.length > 0) {
        markdown += skillGroup.skills.join(', ') + '\n';
      }
      if (skillGroup.proficiency && skillGroup.proficiency.length > 0) {
        skillGroup.proficiency.forEach(prof => {
          markdown += `- **${prof.skill}:** ${prof.level}`;
          if (prof.percentage) {
            markdown += ` (${prof.percentage}%)`;
          }
          markdown += '\n';
        });
      }
      markdown += '\n';
    });
  }
  
  // Projects
  if (cvData.projects && cvData.projects.length > 0) {
    markdown += '## Projects\n\n';
    cvData.projects.forEach((project, index) => {
      markdown += `### ${project.name}\n`;
      if (project.role) {
        markdown += `**Role:** ${project.role}\n`;
      }
      if (project.startDate && project.endDate) {
        markdown += `*${formatDate(project.startDate)} - ${project.isCurrent ? 'Present' : formatDate(project.endDate)}*\n`;
      }
      if (project.techStack && project.techStack.length > 0) {
        markdown += `**Tech Stack:** ${project.techStack.join(', ')}\n`;
      }
      if (project.description) {
        markdown += `${project.description}\n`;
      }
      if (project.liveDemoLink || project.githubLink) {
        markdown += '**Links:** ';
        const links = [];
        if (project.liveDemoLink) links.push(`[Live Demo](${project.liveDemoLink})`);
        if (project.githubLink) links.push(`[GitHub](${project.githubLink})`);
        markdown += links.join(' | ') + '\n';
      }
      markdown += '\n';
    });
  }
  
  // Certifications
  if (cvData.certifications && cvData.certifications.length > 0) {
    markdown += '## Certifications\n\n';
    cvData.certifications.forEach((cert, index) => {
      markdown += `### ${cert.title}\n`;
      markdown += `**Issuer:** ${cert.issuer}\n`;
      markdown += `*${formatDate(cert.startDate)} - ${cert.isCurrent ? 'Present' : formatDate(cert.endDate)}*\n`;
      if (cert.description) {
        markdown += `${cert.description}\n`;
      }
      if (cert.certificateLink) {
        markdown += `[View Certificate](${cert.certificateLink})\n`;
      }
      markdown += '\n';
    });
  }
  
  // Languages
  if (cvData.languages && cvData.languages.length > 0) {
    markdown += '## Languages\n\n';
    cvData.languages.forEach((lang, index) => {
      markdown += `- **${lang.language}:** ${lang.proficiency}\n`;
    });
    markdown += '\n';
  }
  
  return markdown;
};

// Helper function to generate HTML for PDF
const generateCVHTML = (cvData: CVData): string => {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 100%;">
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
        <h1 style="margin: 0; font-size: 24px; color: #333;">${cvData.personalInfo.fullName || 'CV'}</h1>
        ${cvData.personalInfo.jobTitle ? `<h2 style="margin: 5px 0; font-size: 16px; color: #666; font-weight: normal;">${cvData.personalInfo.jobTitle}</h2>` : ''}
      </div>
  `;
  
  // Contact Information
  html += '<div style="margin-bottom: 20px; text-align: center;">';
  if (cvData.personalInfo.email) {
    html += `<span style="margin: 0 10px;">📧 ${cvData.personalInfo.email}</span>`;
  }
  if (cvData.personalInfo.phone) {
    html += `<span style="margin: 0 10px;">📞 ${cvData.personalInfo.phone}</span>`;
  }
  if (cvData.personalInfo.location) {
    html += `<span style="margin: 0 10px;">📍 ${cvData.personalInfo.location}</span>`;
  }
  html += '</div>';
  
  // Summary
  if (cvData.summary) {
    html += `
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333; border-bottom: 1px solid #ccc;">Professional Summary</h3>
        <p style="margin: 0; line-height: 1.5;">${cvData.summary}</p>
      </div>
    `;
  }
  
  // Work Experience
  if (cvData.workExperience && cvData.workExperience.length > 0) {
    html += '<div style="margin-bottom: 20px;">';
    html += '<h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333; border-bottom: 1px solid #ccc;">Work Experience</h3>';
    cvData.workExperience.forEach(work => {
      html += `
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 0; font-size: 14px; color: #333;">${work.jobTitle} at ${work.company}</h4>
          <p style="margin: 5px 0; font-size: 12px; color: #666;">
            ${work.location ? `${work.location} • ` : ''}${formatDate(work.startDate)} - ${work.isCurrent ? 'Present' : formatDate(work.endDate)}
          </p>
          ${work.description ? `<p style="margin: 5px 0; line-height: 1.4;">${work.description}</p>` : ''}
          ${work.achievements && work.achievements.length > 0 ? 
            `<ul style="margin: 5px 0; padding-left: 20px;">
              ${work.achievements.map(achievement => `<li style="margin: 2px 0;">${achievement}</li>`).join('')}
            </ul>` : ''
          }
        </div>
      `;
    });
    html += '</div>';
  }
  
  // Skills
  if (cvData.skills && cvData.skills.length > 0) {
    html += '<div style="margin-bottom: 20px;">';
    html += '<h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333; border-bottom: 1px solid #ccc;">Skills</h3>';
    cvData.skills.forEach(skillGroup => {
      if (skillGroup.groupName) {
        html += `<h4 style="margin: 10px 0 5px 0; font-size: 13px; color: #333;">${skillGroup.groupName}</h4>`;
      }
      if (skillGroup.skills && skillGroup.skills.length > 0) {
        html += `<p style="margin: 0; line-height: 1.4;">${skillGroup.skills.join(', ')}</p>`;
      }
    });
    html += '</div>';
  }
  
  html += '</div>';
  return html;
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

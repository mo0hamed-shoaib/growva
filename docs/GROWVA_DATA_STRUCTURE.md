# **Growva Data Structure**

## **CV Data Structure — Updated for ATS + Customization**

### **1. Personal Information**

- Full Name *(string)*
- Job Title *(string, optional — appears under name)*
- Phone Number *(string)* + icon color
- Email *(string)* + icon color
- Location *(string)* + icon color
- **Pre-Made Links** *(array — choose from)*:
    - LinkedIn
    - GitHub
    - Portfolio/Website
    - Behance
    - Dribbble
    - Medium
    - Twitter/X
        
        *(Each link has URL + icon color)*
        
- **Optional Fields**:
    - Marital Status *(string)*
    - Military Status *(string)*

---

### **2. Summary / Profile**

- Summary Text *(multi-line string)*

---

### **3. Work Experience** *(array)*

Each job:

- Job Title *(string)*
- Company *(string)*
- Location *(string, optional)*
- Start Date *(month/year)*
- End Date *(month/year)* or “Present”
- Description *(multi-line string)*
- Achievements *(optional list)*

---

### **4. Internships** *(array)*

- Same structure as Work Experience, but displayed under a separate **"Internships"** section if added.

---

### **5. Education** *(array)*

Each entry:

- Degree / Qualification *(string)*
- Institution *(string)*
- Location *(string, optional)*
- Start Date *(month/year)*
- End Date *(month/year)*
- Description *(optional, multi-line string)*

---

### **6. Skills**

- **Skill Groups** *(array, optional)* — Each group has:
    - Group Name *(string)* — e.g., Frontend, Backend, Tools, Soft Skills
    - Skills *(comma-separated list or array)* — e.g., HTML, CSS, JavaScript
- **Display Layout Options**:
    - Bullet List
    - One Line *(Group: skill1, skill2…)*
    - Columns *(2 or 3 column layout)*
    - Badge Style *(with optional icon & color — ATS safe)*
- **Optional Proficiency Display**:
    - Text Labels *(Beginner, Intermediate, Expert)*
    - Percentages *(e.g., HTML — 90%)*

---

### **7. Certifications** *(array)*

Each certification:

- Title *(string)*
- Issuer *(string)*
- Start Date *(month/year)*
- End Date *(month/year, optional)*
- Description *(optional)*
- Certificate Link *(URL, optional)*

---

### **8. Projects** *(array)*

Each project:

- Project Name *(string)*
- Role / Position *(string, optional)*
- Start Date *(month/year, optional)*
- End Date *(month/year, optional)*
- Tech Stack *(list or array)* — e.g., React, Node.js, MongoDB
- Live Demo Link *(URL, optional)*
- GitHub Link *(URL, optional)*
- Description *(multi-line string, optional but encouraged)*

---

### **9. Languages**

- Language Name *(string)*
- Proficiency *(string — e.g., Native, Fluent, Intermediate)*

---

### **10. Metadata & Customization**

- Template *(string — e.g., classic, modern, minimal)*
- Theme *(dark/light)*
- Primary Color *(hex)*
- Icon Colors *(per field, optional)*
- Section Order *(array of strings)*
- Font Size *(small, medium, large — ATS safe)*
- Font Choice *(limited ATS-safe fonts)*

---

### 11. JSON

```json
{
  "personalInformation": {
    "fullName": "string",
    "jobTitle": "string (optional)",
    "phoneNumber": { "value": "string", "iconColor": "hex" },
    "email": { "value": "string", "iconColor": "hex" },
    "location": { "value": "string", "iconColor": "hex" },
    "preMadeLinks": [
      {
        "type": "LinkedIn | GitHub | Portfolio | Behance | Dribbble | Medium | Twitter",
        "url": "string",
        "iconColor": "hex"
      }
    ],
    "optionalFields": {
      "maritalStatus": "string",
      "militaryStatus": "string"
    }
  },
  "summary": {
    "text": "string (multi-line)"
  },
  "workExperience": [
    {
      "jobTitle": "string",
      "company": "string",
      "location": "string (optional)",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY | Present",
      "description": "string (multi-line)",
      "achievements": ["string"]
    }
  ],
  "internships": [
    {
      "jobTitle": "string",
      "company": "string",
      "location": "string (optional)",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY | Present",
      "description": "string (multi-line)",
      "achievements": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string (optional)",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY",
      "description": "string (optional, multi-line)"
    }
  ],
  "skills": {
    "groups": [
      {
        "groupName": "string (optional)",
        "skills": ["string", "string"],
        "displayLayout": "bullet | one-line | columns-2 | columns-3 | badges",
        "proficiency": [
          {
            "skill": "string",
            "level": "Beginner | Intermediate | Expert",
            "percentage": "number (optional)"
          }
        ]
      }
    ]
  },
  "certifications": [
    {
      "title": "string",
      "issuer": "string",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY (optional)",
      "description": "string (optional)",
      "certificateLink": "string (URL, optional)"
    }
  ],
  "projects": [
    {
      "name": "string",
      "role": "string (optional)",
      "startDate": "MM/YYYY (optional)",
      "endDate": "MM/YYYY (optional)",
      "techStack": ["string", "string"],
      "liveDemoLink": "string (URL, optional)",
      "githubLink": "string (URL, optional)",
      "description": "string (optional, multi-line)"
    }
  ],
  "languages": [
    {
      "language": "string",
      "proficiency": "Native | Fluent | Intermediate | Basic"
    }
  ],
  "metadata": {
    "template": "classic | modern | minimal",
    "theme": "dark | light",
    "primaryColor": "hex",
    "iconColors": { "fieldName": "hex" },
    "sectionOrder": ["string"],
    "fontSize": "small | medium | large",
    "fontChoice": "ATS-safe font name"
  }
}

```

### 12. Comprehensive JSON

```json
[
    {
        "Section": "Personal Information",
        "Field": "Full Name",
        "Type": "string",
        "Required": "Yes",
        "Notes": "Large header on CV",
        "ATS Caution": "Avoid nicknames"
    },
    {
        "Section": "Personal Information",
        "Field": "Job Title",
        "Type": "string",
        "Required": "No",
        "Notes": "Appears under name",
        "ATS Caution": "Use job-relevant keywords"
    },
    {
        "Section": "Personal Information",
        "Field": "Phone Number",
        "Type": "string + iconColor",
        "Required": "Yes",
        "Notes": "Color for display only",
        "ATS Caution": "Keep international format"
    },
    {
        "Section": "Personal Information",
        "Field": "Email",
        "Type": "string + iconColor",
        "Required": "Yes",
        "Notes": "Professional email",
        "ATS Caution": "Avoid images in email"
    },
    {
        "Section": "Personal Information",
        "Field": "Location",
        "Type": "string + iconColor",
        "Required": "No",
        "Notes": "City, State, Country",
        "ATS Caution": "Avoid abbreviations"
    },
    {
        "Section": "Personal Information",
        "Field": "Pre-Made Links",
        "Type": "array",
        "Required": "No",
        "Notes": "LinkedIn, GitHub, Portfolio, Behance, Dribbble, Medium, Twitter/X",
        "ATS Caution": "Always use full URLs"
    },
    {
        "Section": "Personal Information",
        "Field": "Marital Status",
        "Type": "string",
        "Required": "No",
        "Notes": "Rarely used",
        "ATS Caution": "Might be irrelevant"
    },
    {
        "Section": "Personal Information",
        "Field": "Military Status",
        "Type": "string",
        "Required": "No",
        "Notes": "For regions where relevant",
        "ATS Caution": "Not required internationally"
    },
    {
        "Section": "Summary / Profile",
        "Field": "Summary Text",
        "Type": "multi-line string",
        "Required": "No",
        "Notes": "2–4 sentences max",
        "ATS Caution": "Avoid jargon, use keywords"
    },
    {
        "Section": "Work Experience",
        "Field": "Job Title",
        "Type": "string",
        "Required": "Yes",
        "Notes": "Clear and industry standard",
        "ATS Caution": "Avoid abbreviations"
    },
    {
        "Section": "Work Experience",
        "Field": "Company",
        "Type": "string",
        "Required": "Yes",
        "Notes": "Full legal name",
        "ATS Caution": "Avoid acronyms without expansion"
    },
    {
        "Section": "Work Experience",
        "Field": "Location",
        "Type": "string",
        "Required": "No",
        "Notes": "City, State",
        "ATS Caution": "Avoid short codes"
    },
    {
        "Section": "Work Experience",
        "Field": "Start Date",
        "Type": "MM/YYYY",
        "Required": "Yes",
        "Notes": "Consistent format",
        "ATS Caution": "Avoid just years"
    },
    {
        "Section": "Work Experience",
        "Field": "End Date",
        "Type": "MM/YYYY or 'Present'",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Work Experience",
        "Field": "Description",
        "Type": "multi-line string",
        "Required": "No",
        "Notes": "Role overview",
        "ATS Caution": "Use bullet points"
    },
    {
        "Section": "Work Experience",
        "Field": "Achievements",
        "Type": "array",
        "Required": "No",
        "Notes": "Bullet list",
        "ATS Caution": "Start with action verbs"
    },
    {
        "Section": "Internships",
        "Field": "All fields",
        "Type": "same as Work Experience",
        "Required": "—",
        "Notes": "Separate section if added",
        "ATS Caution": "—"
    },
    {
        "Section": "Education",
        "Field": "Degree",
        "Type": "string",
        "Required": "Yes",
        "Notes": "e.g., BSc Computer Science",
        "ATS Caution": "Spell out abbreviations"
    },
    {
        "Section": "Education",
        "Field": "Institution",
        "Type": "string",
        "Required": "Yes",
        "Notes": "Full name",
        "ATS Caution": "Avoid acronyms"
    },
    {
        "Section": "Education",
        "Field": "Location",
        "Type": "string",
        "Required": "No",
        "Notes": "City, State",
        "ATS Caution": "—"
    },
    {
        "Section": "Education",
        "Field": "Start Date",
        "Type": "MM/YYYY",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Education",
        "Field": "End Date",
        "Type": "MM/YYYY",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Education",
        "Field": "Description",
        "Type": "multi-line string",
        "Required": "No",
        "Notes": "Courses, achievements",
        "ATS Caution": "Avoid decorative formatting"
    },
    {
        "Section": "Skills",
        "Field": "Group Name",
        "Type": "string",
        "Required": "No",
        "Notes": "e.g., Frontend, Backend",
        "ATS Caution": "—"
    },
    {
        "Section": "Skills",
        "Field": "Skills",
        "Type": "array or comma-separated",
        "Required": "Yes",
        "Notes": "HTML, CSS, etc.",
        "ATS Caution": "Avoid icons/images"
    },
    {
        "Section": "Skills",
        "Field": "Display Layout",
        "Type": "enum",
        "Required": "No",
        "Notes": "bullet, one-line, 2-columns, 3-columns, badges",
        "ATS Caution": "Columns may wrap oddly"
    },
    {
        "Section": "Skills",
        "Field": "Proficiency",
        "Type": "array",
        "Required": "No",
        "Notes": "Beginner, Intermediate, Expert",
        "ATS Caution": "Some ATS ignore visuals"
    },
    {
        "Section": "Certifications",
        "Field": "Title",
        "Type": "string",
        "Required": "Yes",
        "Notes": "e.g., AWS Certified",
        "ATS Caution": "—"
    },
    {
        "Section": "Certifications",
        "Field": "Issuer",
        "Type": "string",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Certifications",
        "Field": "Start Date",
        "Type": "MM/YYYY",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Certifications",
        "Field": "End Date",
        "Type": "MM/YYYY",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Certifications",
        "Field": "Description",
        "Type": "string",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Certifications",
        "Field": "Certificate Link",
        "Type": "URL",
        "Required": "No",
        "Notes": "Clickable in PDF",
        "ATS Caution": "ATS may ignore links"
    },
    {
        "Section": "Projects",
        "Field": "Name",
        "Type": "string",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Projects",
        "Field": "Role",
        "Type": "string",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Projects",
        "Field": "Start Date",
        "Type": "MM/YYYY",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Projects",
        "Field": "End Date",
        "Type": "MM/YYYY",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Projects",
        "Field": "Tech Stack",
        "Type": "array",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Projects",
        "Field": "Live Demo Link",
        "Type": "URL",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "ATS ignores links"
    },
    {
        "Section": "Projects",
        "Field": "GitHub Link",
        "Type": "URL",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Projects",
        "Field": "Description",
        "Type": "multi-line string",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Languages",
        "Field": "Language Name",
        "Type": "string",
        "Required": "Yes",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Languages",
        "Field": "Proficiency",
        "Type": "string",
        "Required": "Yes",
        "Notes": "Native, Fluent, etc.",
        "ATS Caution": "Avoid percentages only"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Template",
        "Type": "enum",
        "Required": "Yes",
        "Notes": "classic, modern, minimal",
        "ATS Caution": "Visual only"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Theme",
        "Type": "enum",
        "Required": "Yes",
        "Notes": "dark, light",
        "ATS Caution": "—"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Primary Color",
        "Type": "hex",
        "Required": "No",
        "Notes": "—",
        "ATS Caution": "—"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Icon Colors",
        "Type": "object",
        "Required": "No",
        "Notes": "Per-field",
        "ATS Caution": "—"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Section Order",
        "Type": "array",
        "Required": "Yes",
        "Notes": "Drag & drop order",
        "ATS Caution": "ATS unaffected"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Font Size",
        "Type": "enum",
        "Required": "No",
        "Notes": "small, medium, large",
        "ATS Caution": "Use ATS-safe fonts"
    },
    {
        "Section": "Metadata & Customization",
        "Field": "Font Choice",
        "Type": "string",
        "Required": "No",
        "Notes": "ATS-safe only",
        "ATS Caution": "Avoid decorative fonts"
    }
]
```
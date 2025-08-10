# **Growva API Spec and Backend Structure**

### 1. What core resources do we need?

- **Users** (optional if no signup, but maybe for future)
- **CVs** (main resource)
- **Templates** (available CV templates)
- **Exports** (for tracking/export jobs, optional)

---

### 2. Since you want *no signup* initially, how do we handle user data?

- Use a **unique anonymous ID** stored in client localStorage (UUID)
- Associate CVs with this ID on the backend
- Provide an endpoint to **save, update, retrieve, and delete** CVs by this ID
- No passwords needed, no personal accounts

---

### 3. Core API endpoints

| Method | Endpoint | Description | Request Body | Response |
| --- | --- | --- | --- | --- |
| POST | /api/cvs | Create new CV | Full CV JSON data | CV ID, status, timestamp |
| GET | /api/cvs/:cvId | Retrieve CV data by CV ID | None | CV JSON data |
| PUT | /api/cvs/:cvId | Update CV by ID | Partial or full CV JSON | Updated CV data |
| DELETE | /api/cvs/:cvId | Delete CV by ID | None | Success/failure status |
| GET | /api/templates | Get list of ATS-safe templates | None | Array of template metadata |
| GET | /api/exports/:cvId | (Optional) Get export job status | None | Export status or download URL |

---

### 4. Data storage considerations

- Store CV JSON data **as is** in MongoDB (flexible schema)
- Index by `cvId` and associated anonymous `userId`
- Templates can be stored as static JSON or Mongo collection
- Store export jobs if exporting is asynchronous (optional for now)

---

### 5. Security & Privacy

- Validate all incoming data strictly (schema validation)
- Sanitize inputs to prevent injection or malicious data
- Rate-limit requests to prevent abuse
- Use HTTPS for all traffic
- Keep no personal info beyond what user provides in CV

---

# Detailed API Endpoints for ATS CV Maker

---

## 1. Create a New CV

**POST** `/api/cvs`

### Description:

Creates a new CV document tied to a user’s anonymous ID.

### Request Body (JSON):

```json
{
  "userId": "string",         // UUID stored in client localStorage to identify user anonymously
  "cvData": {                 // The full CV JSON structure (see your data model)
    "personalInfo": { ... },
    "summary": "...",
    "workExperience": [ ... ],
    ...
  },
  "template": "string"        // Template ID or name user selected
}
```

### Response (201 Created):

```json
{
  "cvId": "abc123def456",     // Unique CV document ID
  "userId": "string",
  "createdAt": "2025-08-10T12:34:56Z",
  "message": "CV created successfully"
}
```

### Errors:

- 400 Bad Request — if required fields missing or invalid
- 500 Internal Server Error — if DB write fails

---

## 2. Retrieve CV by ID

**GET** `/api/cvs/:cvId`

### Description:

Fetches the full CV JSON data for editing or preview.

### URL Params:

- `cvId` (string) — unique CV identifier

### Response (200 OK):

```json
{
  "cvId": "abc123def456",
  "userId": "string",
  "cvData": { /* full CV JSON object */ },
  "template": "classic",
  "updatedAt": "2025-08-10T13:00:00Z"
}
```

### Errors:

- 404 Not Found — if no CV with this ID exists
- 500 Internal Server Error

---

## 3. Update CV by ID

**PUT** `/api/cvs/:cvId`

### Description:

Update parts or the entire CV document.

### URL Params:

- `cvId` (string) — unique CV ID to update

### Request Body (JSON):

Partial or full CV JSON structure, e.g.:

```json
{
  "cvData": {
    "summary": "Updated summary text",
    "skills": [ ... ]
  },
  "template": "modern"
}
```

### Response (200 OK):

```json
{
  "cvId": "abc123def456",
  "message": "CV updated successfully",
  "updatedAt": "2025-08-10T13:30:00Z"
}
```

### Errors:

- 400 Bad Request — invalid fields
- 404 Not Found
- 500 Internal Server Error

---

## 4. Delete CV by ID

**DELETE** `/api/cvs/:cvId`

### Description:

Deletes a CV permanently.

### URL Params:

- `cvId` (string) — unique CV ID to delete

### Response (200 OK):

```json
{
  "cvId": "abc123def456",
  "message": "CV deleted successfully"
}
```

### Errors:

- 404 Not Found
- 500 Internal Server Error

---

## 5. List Available Templates

**GET** `/api/templates`

### Description:

Returns the list of ATS-optimized templates available to the frontend.

### Response (200 OK):

```json
[
  {
    "id": "classic",
    "name": "Classic",
    "description": "Clean and traditional layout.",
    "thumbnailUrl": "/templates/classic.png",
    "atsOptimized": true
  },
  {
    "id": "modern",
    "name": "Modern",
    "description": "Sleek design with emphasis on skills.",
    "thumbnailUrl": "/templates/modern.png",
    "atsOptimized": true
  }
]
```

---

## 6. (Optional) Export Status / Download Link

**GET** `/api/exports/:cvId`

### Description:

If exporting is asynchronous, check status or get download URL.

### URL Params:

- `cvId` (string)

### Response (200 OK):

```json
{
  "cvId": "abc123def456",
  "status": "ready",            // pending, processing, ready, failed
  "downloadUrl": "/exports/abc123def456.pdf"   // Present if ready
}
```

---

# Notes on Security & Validation

- Validate `userId` as UUID format in all requests
- Validate CV JSON against schema before saving
- Sanitize all strings to prevent injection attacks
- Use HTTPS for all communication

---

# Summary

This spec covers CRUD operations on CVs, listing templates, and (optionally) managing export jobs.

---

# 1. Mongoose Schemas

Here’s a simplified but scalable schema reflecting your CV structure.

```jsx
// models/cv.model.js
const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  type: { type: String, enum: ['LinkedIn', 'GitHub', 'Portfolio', 'Behance', 'Dribbble', 'Medium', 'Twitter'], required: true },
  url: { type: String, required: true },
  iconColor: { type: String } // hex color code
});

const SkillGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  skills: [{ type: String }]
});

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  certificateLink: { type: String }
});

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

const WorkExpSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  achievements: [{ type: String }]
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String }
});

const LanguageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, enum: ['Native', 'Fluent', 'Intermediate', 'Basic'], required: true }
});

const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  jobTitle: { type: String },
  phone: { type: String },
  phoneIconColor: { type: String },
  email: { type: String, required: true },
  emailIconColor: { type: String },
  location: { type: String },
  locationIconColor: { type: String },
  links: [LinkSchema],
  maritalStatus: { type: String },
  militaryStatus: { type: String }
});

const CVSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true }, // anonymous user ID
  template: { type: String, default: 'classic' },
  personalInfo: PersonalInfoSchema,
  summary: { type: String },
  workExperience: [WorkExpSchema],
  internships: [WorkExpSchema], // same schema as workExperience
  education: [EducationSchema],
  skills: [SkillGroupSchema],
  certifications: [CertificationSchema],
  projects: [ProjectSchema],
  languages: [LanguageSchema],
  customization: {
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    primaryColor: { type: String, default: '#2D5D4F' }, // example default teal
    iconColors: { type: Map, of: String }, // Map of field to hex color
    sectionOrder: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update updatedAt before save
CVSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CV', CVSchema);

```

---

# 2. Express Route Handlers

Basic CRUD for CVs with validation and error handling:

```jsx
// routes/cv.routes.js
const express = require('express');
const router = express.Router();
const CV = require('../models/cv.model');

// Create CV
router.post('/cvs', async (req, res) => {
  try {
    const { userId, cvData, template } = req.body;

    if (!userId || !cvData || !cvData.personalInfo || !cvData.personalInfo.fullName || !cvData.personalInfo.email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCV = new CV({
      userId,
      template: template || 'classic',
      ...cvData
    });

    await newCV.save();

    res.status(201).json({ cvId: newCV._id, userId, message: 'CV created successfully' });
  } catch (err) {
    console.error('Error creating CV:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get CV by ID
router.get('/cvs/:cvId', async (req, res) => {
  try {
    const cv = await CV.findById(req.params.cvId);
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (err) {
    console.error('Error fetching CV:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update CV by ID
router.put('/cvs/:cvId', async (req, res) => {
  try {
    const updateData = req.body.cvData || {};
    const template = req.body.template;

    const updateFields = { ...updateData };
    if (template) updateFields.template = template;

    const updatedCV = await CV.findByIdAndUpdate(req.params.cvId, updateFields, { new: true, runValidators: true });

    if (!updatedCV) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json({ cvId: updatedCV._id, message: 'CV updated successfully', updatedAt: updatedCV.updatedAt });
  } catch (err) {
    console.error('Error updating CV:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete CV by ID
router.delete('/cvs/:cvId', async (req, res) => {
  try {
    const deleted = await CV.findByIdAndDelete(req.params.cvId);
    if (!deleted) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json({ cvId: req.params.cvId, message: 'CV deleted successfully' });
  } catch (err) {
    console.error('Error deleting CV:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

```

---

# 3. Template Route (Simple Example)

```jsx
// routes/template.routes.js
const express = require('express');
const router = express.Router();

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean and traditional layout.',
    thumbnailUrl: '/templates/classic.png',
    atsOptimized: true
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek design with emphasis on skills.',
    thumbnailUrl: '/templates/modern.png',
    atsOptimized: true
  }
];

router.get('/templates', (req, res) => {
  res.json(templates);
});

module.exports = router;

```

---

# 4. Server Setup (Basic Express with Routes)

```jsx
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cvRoutes = require('./routes/cv.routes');
const templateRoutes = require('./routes/template.routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', cvRoutes);
app.use('/api', templateRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

---

This setup gives you:

- A flexible CV schema
- Full CRUD API routes with validation
- Simple templates route
- Server.js connects everything

---

## Final Backend Checklist & Considerations

Before moving on, let’s confirm these backend aspects so nothing is overlooked:

### 1. **Validation & Schema Enforcement**

- Use Mongoose schema validation and possibly **Joi** or **Zod** middleware for strict API input validation.
- Validate URL formats for all link fields.
- Enforce date consistency (start < end).
- Sanitize text inputs to prevent injection/XSS risks.

### 2. **Error Handling**

- Centralized error handling middleware for clean and consistent error responses.
- Proper HTTP status codes and error messages.

### 3. **Rate Limiting & Security**

- Add **rate limiting** (e.g., express-rate-limit) to avoid abuse.
- Use **helmet** for secure headers.
- Enable **CORS** with restrictions to your frontend domain.
- Ensure HTTPS in production.

### 4. **Data Backup & Recovery**

- Plan MongoDB Atlas backups (even on free tier, backups exist).
- Possibly implement export/import of CV data JSON for user backup.

### 5. **Auto-save Endpoint (optional)**

- Consider lightweight endpoint for autosave partial data or incremental updates.
- Debounce client autosave calls.

### 6. **Logging & Monitoring**

- Setup basic logging (winston, morgan) for debugging and audit.
- Consider future monitoring with services like Sentry or LogRocket.

### 7. **Testing**

- Write unit and integration tests for API endpoints.
- Test schema validation, error cases, and happy paths.
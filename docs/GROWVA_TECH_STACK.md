# **Growva Tech Stack**

### 1. Frontend: React.js

- Single-page app
- State management with React Context or Redux (lightweight)
- Use Tailwind CSS for styling (dark/light mode built-in)
- Components: CV Editor, Preview, Template Selector, Export Modal
- Autosave localStorage + API sync

---

### 2. Backend: Node.js + Express.js

- REST API as specified above
- Middleware for validation, logging, error handling
- Connect to MongoDB Atlas (free tier)
- Use Mongoose for schema & model definitions
- JWT or token-based system optional for future auth

---

### 3. Database: MongoDB

- Collections: `cvs`, `templates`, optionally `exports`
- Flexible document structure for CV JSON
- Indexes on `cvId`, `userId` for fast queries

---

### 4. Deployment & DevOps

- Backend: Deploy on free-tier platforms (Heroku, Railway, Vercel Serverless Functions)
- Frontend: Static hosting on Vercel or Netlify
- MongoDB Atlas free tier as DB backend
- CI/CD pipeline via GitHub Actions or Vercel/GitHub integration

---

### 5. Folder & Code Structure Example

```bash
/backend
  /models
    cv.model.js
    template.model.js
  /routes
    cv.routes.js
    template.routes.js
  /controllers
    cv.controller.js
    template.controller.js
  /middlewares
    validation.js
    errorHandler.js
  server.js

/frontend
  /src
    /components
      CVEditor.jsx
      CVPreview.jsx
      TemplateSelector.jsx
      ExportModal.jsx
    /contexts
      CVContext.jsx
    /hooks
      useAutoSave.js
    App.jsx
    index.js
  tailwind.config.js
  vite.config.js (or CRA config)

```

---

## 1. **Core Frontend Tech Stack**

| Technology | Purpose |
| --- | --- |
| **React.js** | Core UI framework for building interactive SPA |
| **shadcn/ui** | TailwindCSS-based accessible React component library |
| **Tailwind CSS** | Utility-first CSS framework for styling and themes |
| **React Hook Form** | Robust, performant form state & validation management |
| **Zod** | Schema validation for forms and API data integrity |
| **dnd-kit / react-dnd** | Drag-and-drop functionality for section ordering |
| **Axios / Fetch API** | Communication with backend REST API |
| **Zustand or React Context** | Lightweight global state management |
| **Vite** | Modern frontend build tool with fast dev server |

---

## 2. **UI/UX & Theming**

- **Dark theme by default** with an easy toggle to **light mode**
- Follow **design inspirations**: Vercel, shadcn, Tailwind CSS, ElevenLabs, Mistral.ai — minimal, clean, and modern
- Use **Tailwind’s `dark:` utilities** and `class` strategy for theme switching
- Keep interface **uncluttered** and **intuitive** to minimize user frustration
- Use **shadcn/ui components** for accessible form controls, modals, buttons, and layout grids
- Provide **inline examples, placeholders, and hints** in form inputs for guidance
- Implement **autosave with debounce** to save CV data smoothly without interrupting workflow
- Allow **drag-and-drop ordering** of CV sections with visual feedback

---

## 3. **Component Structure (Suggested)**

```cpp
/src
  /components
    CVEditor.jsx          // Main CV editing UI, split by sections
    CVPreview.jsx         // Live preview panel rendering CV JSON with selected template
    TemplateSelector.jsx  // Cards displaying ATS templates, with selection
    ExportModal.jsx       // Export options (PDF, Markdown) and download link
    FormFields/
      PersonalInfoForm.jsx
      WorkExperienceForm.jsx
      SkillsForm.jsx
      CertificationsForm.jsx
      ProjectsForm.jsx
      LanguagesForm.jsx
    ThemeToggle.jsx       // Dark/light mode toggle switch
    AutoSaveIndicator.jsx // Shows save status (“Saving…”, “Saved”)
  /contexts
    CVContext.jsx         // Holds current CV state and provides update functions
  /hooks
    useAutoSave.js        // Custom hook for autosave with debounce
  App.jsx
  index.jsx

```

---

## 4. **State Management**

- Use **React Context or Zustand** for managing CV data and UI state globally
- Keep form state local within individual form components integrated with **React Hook Form**
- Sync form state with global CV state on submit or autosave trigger

---

## 5. **Forms & Validation**

- Use **React Hook Form + Zod** for forms with type-safe validation
- Utilize **shadcn/ui’s Form components** for accessible and beautiful form fields
- Show **validation errors inline** using `FormMessage` from shadcn/ui
- Validate important fields (email, URLs, date ranges) before allowing save/export

---

## 6. **Drag-and-Drop**

- Use **dnd-kit** (modern and flexible) or **react-dnd** to allow users to reorder sections like Work Experience, Skills, Projects
- Animate drag events smoothly for good UX feedback
- Persist new order in global state and save to backend on change

---

## 7. **Autosave & Persistence**

- Autosave locally in **localStorage** every few seconds or on field blur
- Sync with backend API (POST/PUT `/api/cvs/:cvId`) after debounced delay
- Show autosave status using `AutoSaveIndicator` component
- On first save, get `cvId` from backend and persist it in localStorage for subsequent updates

---

## 8. **Export Features**

- Two export buttons: **PDF** (primary), **Markdown** (secondary)
- Client triggers export, backend generates files or frontend uses libraries (e.g. `pdf-lib`, `markdown-to-jsx`)
- Show confirmation modal with download link after export completes

---

## 9. **Theming & Accessibility**

- Ensure **contrast ratios** meet accessibility standards
- Support keyboard navigation for all interactive components
- Provide ARIA labels and roles in form controls (handled by shadcn/ui)
- Use **focus-visible** styling for keyboard users
- Use Tailwind dark mode strategies consistent with shadcn/ui docs

---

## 10. **Development & Tooling**

- Use **Vite** for fast build and HMR
- Set up **ESLint + Prettier** for code quality and formatting
- Use **TypeScript** if possible for type safety (highly recommended)
- Use **GitHub Actions** for CI/CD with linting & tests
- Host frontend on **Vercel** or **Netlify** for free and fast deployment

---

# Summary

Your frontend will combine:

- **React + shadcn/ui + Tailwind CSS** for polished, accessible UI
- **React Hook Form + Zod** for powerful, type-safe form management
- **dnd-kit** for intuitive drag-and-drop
- Autosave + backend sync for smooth user experience
- Clean dark/light theme toggling
- Focus on usability, minimalism, and customization without clutter
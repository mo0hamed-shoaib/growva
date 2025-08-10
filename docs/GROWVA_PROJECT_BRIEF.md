# **Growva Project Brief**

## 1. **Project Overview**

Build a full MERN stack web application for creating **ATS-optimized, highly customizable CVs** with a clean modern UI. The app includes a **landing page, about page, contact page**, and the main CV builder app.

---

## 2. **Tech Stack**

- **Backend:** Node.js, Express.js, MongoDB (Atlas free tier), Mongoose
- **Frontend:** React.js, Tailwind CSS, shadcn/ui components, React Hook Form + Zod, dnd-kit (drag & drop), Axios (or Fetch)
- **Build tools:** Vite or Create React App
- **Deployment:** Preferably Vercel (frontend) and any free backend hosting (e.g., Render, Railway)

---

## 3. **Backend Requirements**

- **REST API** for managing CV data: full CRUD operations
- Mongoose schema reflecting detailed CV data structure (personal info, work, education, skills, certifications, projects, languages, customization, etc.)
- Data validation and sanitization (Mongoose + Joi/Zod recommended)
- Rate limiting, error handling, security middleware (helmet, cors)
- Autosave endpoint for partial updates
- Templates endpoint serving ATS-optimized CV templates metadata
- Well-structured, modular code with comments

---

## 4. **Frontend Requirements**

- **Dark theme by default**, with user-toggleable light theme
- Responsive, clean, minimal UI inspired by Vercel, shadcn, Tailwind CSS website
- Use **shadcn/ui** for accessible, customizable UI components
- Use **React Hook Form + Zod** for form state and validation
- Provide autosave with debounce and visual save status feedback
- Drag-and-drop for reordering CV sections (using dnd-kit)
- Live CV preview panel alongside form inputs
- Export options for **PDF and Markdown** with user feedback modal
- Routing with React Router (or equivalent) for:
    - Landing page
    - About page
    - Contact page (includes a contact form with validation)
    - CV builder app

---

## 5. **Pages & Features**

### Landing Page

- Clean marketing page highlighting value proposition
- Large “Start Free — No Signup” CTA button
- Dark theme with subtle gradients, light mode toggle top-right
- Responsive layout with hero section, feature highlights, footer

### About Page

- Static content describing the app’s mission, team (if any), and tech stack
- Follow same styling and theme as landing page

### Contact Page

- Contact form with fields: Name, Email, Subject, Message
- Form validation using React Hook Form + Zod
- Submit triggers a backend endpoint that logs or emails message (simulate if email setup is not possible)
- Confirmation message on success

---

## 6. **UX & Accessibility**

- All interactive elements keyboard-navigable
- Proper ARIA roles and labels (inherited from shadcn/ui)
- Clear inline form validation errors and descriptions
- Focus-visible styles for accessibility
- Consistent color contrast ratios (WCAG compliant)
- Minimal user friction: autosave, intuitive drag-and-drop, inline help text

---

## 7. **Code Quality**

- Clean, modular, reusable components and functions
- Descriptive variable and function names
- Comprehensive comments explaining purpose and logic
- Use of TypeScript is optional but preferred for type safety
- Consistent formatting (Prettier/ESLint configuration recommended)
- Git repository initialized with meaningful commit messages

---

## 8. **Deliverables**

- Backend: Complete REST API with all endpoints tested
- Frontend: Fully functional React app with routing and the 3 main pages + CV builder
- Integration: Frontend connected to backend API
- Export functionality working for PDF and Markdown
- Deployment-ready code (no hardcoded secrets, environment variable usage)

---

## 9. **Additional Notes**

- The CV builder must support **high customization** of sections but stay **ATS-friendly**
- Make sure to handle **edge cases gracefully** (empty fields, invalid URLs, date ranges)
- Keep UI uncluttered — only show advanced options when user opts-in
- Use best practices for **state management**, preferring minimal global state and local form state
- Provide a README with setup, run instructions, and any known issues or future improvements

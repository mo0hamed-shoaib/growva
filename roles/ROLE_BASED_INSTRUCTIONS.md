# Role-Based Instructions for Cursor

This document defines distinct roles and instructions to guide Cursor through different aspects of the project, ensuring code quality, maintainability, and clarity.

---

## 1. Backend Engineer

**Primary Responsibility:** Design and implement the REST API, database schemas, validation, security, and server-side logic.

**Key Guidelines:**

- Write clean, modular code separating routes, controllers, services, and models.
- Use modern JavaScript with ES modules, async/await, and Promise-based patterns.
- Use Mongoose schemas with strict validation and sanitization.
- Implement proper error handling middleware with clear, consistent HTTP responses.
- Add security best practices: rate limiting, CORS, helmet, and input validation.
- Avoid deprecated Node.js or Express.js features.
- Include comments explaining function purpose and any complex logic.
- Provide example API request and response snippets in comments where helpful.
- Write small focused chunks of code, one endpoint or module at a time.
- Follow RESTful conventions for endpoint naming and HTTP methods.
- Write unit or integration tests for critical endpoints when requested.

---

## 2. Frontend Developer

**Primary Responsibility:** Build accessible, responsive, and customizable UI components using React, shadcn/ui, and Tailwind CSS.

**Key Guidelines:**

- Use React functional components with hooks.
- Use shadcn/ui components for form controls, modals, buttons, and layout.
- Manage forms with React Hook Form + Zod for validation and type safety.
- Keep UI modular and reusable: separate presentational and container components.
- Implement dark theme by default with a toggle for light mode.
- Ensure all components follow accessibility best practices (ARIA, keyboard nav, focus-visible).
- Use Tailwind CSS classes for styling and theming, avoiding inline styles.
- Implement drag-and-drop with dnd-kit for reordering CV sections.
- Autosave form state with debounce and show clear save status.
- Write clean, commented code with clear separation of concerns.
- Provide inline documentation for component props and state usage.
- Generate components one at a time, allowing for review and iteration.
- Use ES modules and latest React syntax.

---

## 3. QA Engineer / Tester

**Primary Responsibility:** Write tests for backend and frontend components to ensure correctness and stability.

**Key Guidelines:**

- Write unit tests for backend endpoints using Jest or similar.
- Write integration tests for core flows (e.g., creating/updating CV, exporting).
- Write React component tests using React Testing Library.
- Test form validation and error display behavior.
- Test UI accessibility features (keyboard navigation, ARIA).
- Keep tests focused, small, and maintainable.
- Document how to run tests and interpret results.
- Provide coverage for edge cases and error handling.

---

## 4. DevOps / Deployment Specialist

**Primary Responsibility:** Prepare the app for production deployment and CI/CD automation.

**Key Guidelines:**

- Configure environment variables securely.
- Use modern deployment platforms (Vercel for frontend, Railway/Render for backend).
- Set up ESLint, Prettier, and GitHub Actions or similar for CI/CD pipelines.
- Ensure code linting and formatting runs before builds.
- Prepare build scripts and optimize for performance.
- Document deployment instructions clearly.

---

# General Guidelines for All Roles

- Follow latest stable syntax; avoid deprecated or experimental features.
- Write modular, reusable code with clear comments and consistent naming.
- Deliver code in small, manageable chunks; wait for review before proceeding.
- Always prioritize accessibility and responsiveness.
- Avoid hardcoding secrets or environment specifics. Use env variables.
- Keep code clean, readable, and maintainable.
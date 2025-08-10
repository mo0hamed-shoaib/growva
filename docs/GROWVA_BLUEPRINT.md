# **Growva Blueprint**

## 1. Micro-Flow for Each CV Step

### Personal Info

- **Field order:** Full Name → Job Title (optional) → Phone (with icon/color picker) → Email (icon/color) → Location (icon/color) → Pre-made popular links (LinkedIn, GitHub, Portfolio, Behance, Dribbble, Medium, Twitter/X) → Optional: Marital Status, Military Status.
- **Required:** Full Name, Email.
- **Optional:** Others with placeholders.
- **Validation:** Email format, phone number format.
- **Skip/fill later:** Allow skipping optional fields; show “Add later” links.
- **Feedback:** Green checkmark next to completed fields.
- **Partial data:** N/A here, but blanks show placeholder in preview.

### Summary / Profile

- **Field order:** Multi-line text box.
- **Required:** No, but encourage brief summary.
- **Placeholder:** “Write a brief, impactful summary of your experience.”
- **Validation:** Max length limit (e.g., 500 chars).
- **Feedback:** Live preview updates, placeholder text if empty.

### Work Experience

- **Field order:** Job Title → Company → Location (optional) → Start Date → End Date (or Present checkbox) → Description → Achievements (optional list).
- **Required:** Job Title, Company, Start Date.
- **Optional:** Location, End Date (if missing → Present), Description, Achievements.
- **Validation:** Dates logical (Start < End), no future dates.
- **Skip/fill later:** Can add multiple jobs; add “Skip this section” link.
- **Feedback:** Preview highlights changes in job blocks.

### Internships

- Same flow as Work Experience, under separate section.

### Education

- **Field order:** Degree/Qualification → Institution → Location (optional) → Start Date → End Date → Description (optional).
- **Required:** Degree, Institution.
- **Optional:** Others.
- **Validation:** Same as work experience dates.
- **Feedback:** Live preview updates.

### Skills

- **Field order:** Option to add Skill Groups or flat list.
- **Grouping:** User can create groups (e.g., Frontend, Backend).
- **Display options:** Bullet list, one line (Group: skill1, skill2…), columns (2 or 3).
- **Required:** At least one skill or group.
- **Feedback:** Preview updates with chosen layout immediately.
- **Skip/fill later:** Allow skipping with tooltip encouraging skill input.

### Certifications

- **Field order:** Title → Issuer → Start Date → End Date (optional) → Description (optional) → Certificate Link (optional).
- **Required:** Title, Issuer.
- **Optional:** Others.
- **Validation:** URLs valid if present.
- **Feedback:** Preview updates, link icons shown if link present.

### Projects

- **Field order:** Project Name → Role (optional) → Start Date (optional) → End Date (optional) → Tech Stack (array) → Live Demo Link (optional) → GitHub Link (optional) → Description (optional).
- **Required:** Project Name.
- **Validation:** URLs validated.
- **Feedback:** Tech stack rendered as chips, links clickable in preview.

### Languages

- **Field order:** Language Name → Proficiency (Native, Fluent, Intermediate).
- **Required:** Language Name.
- **Feedback:** Preview updates with badges/icons for proficiency.

### Customization Panel

- Tabs: Colors → Icons → Section Order.
- Colors: Choose primary color from ATS-safe palette.
- Icons: Select icon colors only for allowed fields.
- Section Order: Drag & drop to reorder sections.
- Mode toggle: Quick vs. Custom.
- Feedback: Live preview updates in real time.

### Export

- Export buttons: “Export PDF” (primary), “Export Markdown” (secondary).
- Confirmation page with download link and share template option.
- No forced signup.
- Feedback: Success message with download animation.

---

## 2. User Motivation & Retention Inside the Flow

- **Progress tracking:** Show percentage completed + progress bar on top.
- **Quick wins:** Early preview changes (name, title) to hook users.
- **Micro-motivations:** Tooltips with tips, e.g. “Use strong action verbs in achievements.”
- **Break points:** Allow saving & closing anytime with localStorage backup.
- **Return flow:** Resume at last edited section on return.
- **Positive reinforcement:** Checkmarks, “You’re doing great!” messages.

---

## 3. Live Preview Behavior

- **Update frequency:** Debounced instant updates (~300ms delay).
- **Empty fields:** Show example placeholder text in preview to avoid blanks.
- **ATS formatting:** Strict preview with no decorative fonts/colors outside ATS rules.
- **Device toggle:** Button to switch preview between desktop and mobile width.
- **Highlight changes:** Brief animation/highlight of updated preview sections.

---

## 4. Customization Flow

- **Availability:** Unlocked after Personal Info and Summary sections filled.
- **Prevent choice overload:** Start with preset themes (3-5 ATS safe).
- **Full customization:** Accessible after presets, toggle on/off.
- **Defaults:** Dark theme by default, Light theme optional toggle.
- **Icon customization:** Only for phone/email/location and pre-made links.
- **Section order:** Drag and drop, reset to default available.

---

## 5. Export Experience

- **Final review:** Lock preview, show ATS warnings like “Avoid decorative fonts.”
- **Formats:** PDF (primary), Markdown (secondary).
- **Branding:** Minimal branding only, option to hide.
- **ATS reminders:** Short note before export about ATS best practices.
- **Instant download:** No loading screens if possible.
- **Share link:** Generate UUID URL to share or save resume draft.

---

## 6. Accessibility & Inclusivity

- **Keyboard navigation:** All fields & controls accessible via keyboard.
- **Screen reader:** Use ARIA labels, semantic HTML for form controls.
- **Contrast:** Ensure light/dark themes meet WCAG contrast guidelines.
- **Localization-ready:** Text stored separately, easy to add languages.
- **Font size toggle:** Small, medium, large for readability.

---

## 7. Error Prevention & Data Safety

- **Auto-save:** After every change, save to localStorage.
- **Storage fallback:** LocalStorage primary; fallback to IndexedDB or sessionStorage if needed.
- **Undo/Redo:** Support undo for last input change.
- **Clear data:** Confirm before clearing all inputs.
- **Privacy:** Data stays on device, no account required.
- **Data export/import:** Optionally allow users to export JSON of CV data for backup/import.

---

## 8. Optional Engagement Features

- **Example CVs:** Toggleable samples users can load to start faster.
- **AI tips:** Subtle suggestions on content quality, phrasing (non-intrusive).
- **Job Description Compare:** Future feature to analyze job ads vs resume content.
- **Shareable Drafts:** Generate links to share unfinished resumes for feedback.
- **Theme presets:** Seasonal or trendy color themes added over time.
- **Dark/Light auto-detect:** Use system preference as default theme on first visit.

---

# Summary

This blueprint fully prepares you to:

- Design all flows at field and section level with user engagement in mind.
- Ensure every interaction motivates, informs, and delights users.
- Deliver a highly accessible, safe, and privacy-focused ATS resume builder.
- Allow graceful scaling with optional features and future add-ons.
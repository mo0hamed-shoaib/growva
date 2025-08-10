# **Growva User Study**

## **1. Section Flow & Navigation**

We have two main options, and each has UX trade-offs:

**A. Step-by-Step Wizard (One Section at a Time)**

✅ Pros:

- Keeps users focused — only one thing to think about at a time.
- Feels like progress — we can use a progress bar (gamification).
- Less overwhelming for beginners.

⚠ Cons:

- Frustrates advanced users who want to jump around.
- Can feel slow for small edits.

**B. Accordion / Sidebar Navigation (See All Sections)**

✅ Pros:

- Maximum freedom — users can jump to any section instantly.
- Better for experienced users who know what they want.

⚠ Cons:

- Can feel cluttered for first-time users.
- Users might skip important fields accidentally.

**Best Approach:**

Hybrid — **Quick Mode** (step-by-step) for beginners, **Custom Mode** (sidebar/accordion) for advanced.

We already planned Quick vs. Custom earlier, so this aligns perfectly.

---

## **2. Preview & Edit Feedback Loop**

Real-time feedback is non-negotiable for motivation.

Key UX details:

- **Live Preview:** Every keystroke updates the preview instantly.
- **Auto-scroll in preview:** When you edit “Work Experience,” the preview scrolls to that part automatically.
- **Highlight changes:** Brief highlight animation in the preview so the user notices the update.
- **Empty field placeholders:** “Enter your job title” instead of blank spaces, so it doesn’t look broken.

---

## **3. Customization Panel UX**

Danger: This is where users can get lost if we give *too much* freedom.

Safe approach:

- **Default is ATS-safe theme** — all changes are optional.
- **Preset themes first**, then “Advanced” toggle for custom colors/fonts.
- **Inline customization for icons/colors** — click the icon, change the color right there, no menu hunting.

---

## **4. Export Experience**

Users feel relief and satisfaction when exporting — we should make it *a moment*.

- **Primary CTA:** “Export PDF” (big and obvious).
- **Secondary:** “Export Markdown” (small, less emphasized).
- Instant download — no “Processing…” unless absolutely necessary.
- Success page with big “Download Again” button and subtle “Share this template” link.

---

## **5. Onboarding Without Signup**

We want users to *feel rewarded* in the first 10 seconds.

- **Preloaded Example CV** so they can edit instantly.
- Micro-guide tooltips (“Click here to change colors”) — disappear after first visit.
- Save data locally in browser automatically, so no work is lost even if they close the tab.

---

💡 **Psychology angle:**

- *Reduce friction:* No unnecessary questions before editing.
- *Show progress:* Progress bars, “X% complete” nudges.
- *Empower users:* Customization is framed as “make it yours,” not “do it right.”
- *Trust signals:* Small reassurance messages (“Data is stored locally, not uploaded”).

---

## **User Journey — ATS CV Builder**

### **1. Entry Point**

- **Landing Page** (Dark theme by default, Vercel/Tailwind style)
    - Large CTA: **"Start Free — No Signup"**
    - Optional smaller link: **"Import from LinkedIn"** or **"Upload Existing Resume"** (we parse & fill fields automatically).
    - Tagline: “Modern, ATS-friendly resumes in minutes.”

---

### **2. Mode Selection**

- **Quick Mode**
    - Minimal fields: Name, Contact Info, Summary, 1 Job Experience, Skills.
    - Auto-applies clean ATS-safe template & default colors.
    - Can switch to **Custom Mode** anytime.
- **Custom Mode**
    - Full access to all sections, layouts, icon colors, reordering, etc.
    - Perfect for detail-oriented users.

---

### **3. Template & Theme Pick**

- User chooses from **3–5 ATS-safe templates** (minimal visual differences at this stage — focus on structure).
- **Dark/Light Toggle** available immediately.
- **Primary Color Picker** (ATS-safe palette).

---

### **4. Guided Section Editing**

- **Two-pane layout**:
    - **Left:** Form fields for the current section.
    - **Right:** Live preview updates instantly.
- **Section-by-section flow** with progress indicator (like a wizard).
- **Smart defaults & inline examples**:
    - Name field placeholder: *“e.g., Jane Doe”*
    - Job title example: *“Full Stack Developer”*
    - Skills example: *“React, Node.js, MongoDB”*
- **Auto-advance option** after completing each section (reduces clicks for engaged users).

---

### **5. Special Enhancements**

- **Personal Information**
    - Click to select popular links (LinkedIn, GitHub, etc.), only need to paste username or full URL.
- **Skills Section**
    - Choose layout: bullet list, one-line grouped, or columns.
    - Option to group skills or keep as one flat list.
- **Projects Section**
    - Can add tech stack chips, live demo link, GitHub link — all ATS-safe.
- **Internships**
    - Added as separate section for clarity.

---

### **6. Auto-Save & Feedback**

- **Bottom-left status**:
    - ✅ "Saved" in green.
    - 🔄 "Saving..." in yellow.
- **Local Storage fallback** — even if the user leaves or refreshes, data persists.
- No forced account creation.

---

### **7. Final Review**

- Preview locks into **print-ready view**.
- Warnings for ATS safety (e.g., “Too much color in icons,” “Consider removing decorative fonts”).
- Optional **quick tips pop-up**: “Recruiters spend ~7 seconds scanning — keep it concise.”

---

### **8. Export & Share**

- **Export PDF** — ATS-optimized, fonts embedded.
- **Export Markdown** — for version control or editing in plain text.
- **Share Template** — link that opens builder pre-filled with same design & structure.

---

### **9. Exit & Retention**

- Thank-you page: “Your resume is ready 🎉”
- Discreet “Save for later” option with a generated link (UUID) — no account required.
- Subtle CTA: “Create another resume” or “Try a different template.”

---

This journey keeps **frustration low** by:

- Minimizing friction early on (no signup, instant start).
- Offering **two editing speeds** (Quick vs. Custom).
- Always giving visual feedback (live preview, save status).
- Providing smart defaults so users never feel “stuck.”

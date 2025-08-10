# **Growva Moodboard**

## **🎨 Moodboard Proposal — ATS CV Maker**

### **1. Typography**

- **Font**: Inter — modern, readable, and widely used for both dev-focused and design-focused tools.
- **Base Size**: 16px
- **Line Height**: 1.65 for readability
- **Headings**: Medium weight (500–600), no shouting uppercase except for section labels.
- **Body Text**: Regular weight, left-aligned, accessible color contrast.

---

### **2. Components Style**

**Buttons**

- Rounded-lg corners (8px)
- Primary = Accent color fill, white text
- Secondary = Border only, subtle hover background

**Cards (Templates, Panels)**

- Soft shadow on hover (`shadow-lg` in Tailwind terms)
- Minimal borders in dark mode (1px with very low opacity)
- Padding: `p-6` minimum

**Toggles / Switches**

- Inspired by Shadcn: minimal track, smooth animation
- Clear color feedback for states (blue for ON, gray for OFF)

**Form Fields**

- Rounded-md inputs
- Light background in light mode, darker panel background in dark mode
- Placeholder text in muted gray

---

### **3. Motion**

- **Hover animations**: 150–200ms ease-out scale or shadow changes
- **Panel transitions**: fade/slide with low opacity fade for smoothness
- **Drag-and-drop**: subtle scaling & drop-shadow while dragging sections

---

### **4. Visual Inspiration References**

- **Vercel** → Minimalism + strong typography hierarchy
- **Shadcn UI** → Neutral colors + clean component architecture
- **TailwindCSS** → Readability + spaciousness
- **FlowCV** → Clarity in resume previews

---

### 5. Brand Core Colors

| Role | Hex | Notes |
| --- | --- | --- |
| **Brand Primary** | `#F25C1C` | Main phoenix orange |
| **Brand Secondary** | `#F47A2E` | Warm mid-tone orange |
| **Brand Deep** | `#C44714` | Deep burnt orange |
| **Brand Gradient** | `linear-gradient(90deg, #F25C1C, #F47A2E)` | Primary gradient |

---

### 6. Dark Mode (Default)

| Role | Hex | Notes |
| --- | --- | --- |
| **Background** | `#0A0A0A` | Deep black-gray |
| **Surface / Panel** | `#1E1E1E` | Slightly lighter for depth |
| **Accent Primary** | `#F25C1C` → `#F47A2E` | Gradient buttons & CTAs |
| **Accent Secondary** | `#F47A2E` | Alternative accent / hover |
| **Text Primary** | `#F9FAFB` | Near-white for readability |
| **Text Secondary** | `#9CA3AF` | Gray-400 |
| **Borders / Dividers** | `#27272A` | Neutral dark gray |
| **Hover Background** | `#2A2A2A` | Slightly lighter than surface |
| **Active Background** | `#3A3A3A` | Used for pressed states |
| **Overlay / Modal Backdrop** | `rgba(0,0,0,0.6)` | Semi-transparent black |

---

### 7. Light Mode

| Role | Hex | Notes |
| --- | --- | --- |
| **Background** | `#F8FAFC` | Cool light gray |
| **Surface / Panel** | `#FFFFFF` | Pure white |
| **Accent Primary** | `#F25C1C` → `#F47A2E` | Same gradient as dark mode |
| **Accent Secondary** | `#F47A2E` | For variation |
| **Text Primary** | `#0F172A` | Slate-900 |
| **Text Secondary** | `#475569` | Slate-600 |
| **Borders / Dividers** | `#E5E7EB` | Neutral light gray |
| **Hover Background** | `#F1F5F9` | Slightly darker than background |
| **Active Background** | `#E2E8F0` | For pressed states |
| **Overlay / Modal Backdrop** | `rgba(0,0,0,0.4)` | Dark overlay for modals |

---

### **8. Status Colors (consistent across both modes)**

| Status | Hex | Notes |
| --- | --- | --- |
| **Success** | `#22C55E` | Bright green (accessible contrast) |
| **Warning** | `#FACC15` | Warm yellow |
| **Error** | `#EF4444` | Strong red |
| **Info** | `#3B82F6` | Clear blue |

---

### 9. Extended UI Colors

| Role | Light Mode | Dark Mode | Notes |
| --- | --- | --- | --- |
| **Disabled Background** | `#F1F5F9` | `#2A2A2A` | Buttons/inputs |
| **Disabled Text** | `#94A3B8` | `#6B7280` | Lower contrast |
| **Input Background** | `#FFFFFF` | `#1E1E1E` | Text fields |
| **Input Border** | `#E2E8F0` | `#2F2F2F` | Subtle outlines |
| **Focus Ring** | `#F47A2E` | `#F47A2E` | Accessible brand highlight |

---

### 10. CSS Example

```css
/* globals.css */

/* Light mode (default) */
:root {
  /* Backgrounds */
  --background: #F8FAFC; /* cool light gray */
  --panel: #FFFFFF; /* pure white */
  
  /* Text */
  --foreground: #0F172A; /* slate-900 */
  --muted-foreground: #475569; /* slate-600 */

  /* Accents */
  --accent: #FF8B3D; /* secondary accent */
  --primary: #FF6B1A; /* gradient start */
  --primary-gradient: linear-gradient(90deg, #FF6B1A, #FFAE42);

  /* Borders */
  --border: #E5E7EB; /* neutral light gray */
  --input: #E5E7EB;

  /* Misc UI */
  --ring: #FF8B3D;
}

/* Dark mode */
.dark {
  /* Backgrounds */
  --background: #0A0A0A; /* deep black-gray */
  --panel: #1E1E1E; /* slightly lighter for contrast */
  
  /* Text */
  --foreground: #F9FAFB; /* near-white */
  --muted-foreground: #9CA3AF; /* gray-400 */

  /* Accents */
  --accent: #FF8B3D;
  --primary: #FF6B1A;
  --primary-gradient: linear-gradient(90deg, #FF6B1A, #FFAE42);

  /* Borders */
  --border: #27272A; /* neutral dark gray */
  --input: #27272A;

  /* Misc UI */
  --ring: #FF8B3D;
}

/* Tailwind shadcn variables mapping */
@layer base {
  :root {
    --background: var(--background);
    --foreground: var(--foreground);
    --muted-foreground: var(--muted-foreground);
    --card: var(--panel);
    --card-foreground: var(--foreground);
    --popover: var(--panel);
    --popover-foreground: var(--foreground);
    --primary: var(--primary);
    --primary-foreground: white;
    --secondary: var(--accent);
    --secondary-foreground: white;
    --muted: var(--panel);
    --accent: var(--accent);
    --accent-foreground: white;
    --destructive: #EF4444;
    --destructive-foreground: white;
    --border: var(--border);
    --input: var(--input);
    --ring: var(--ring);
    --radius: 0.5rem;
  }
}

```
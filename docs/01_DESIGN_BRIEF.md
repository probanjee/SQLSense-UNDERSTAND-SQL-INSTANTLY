# SQLSense — Design Brief

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This Design Brief establishes the visual identity, brand language, and aesthetic direction for SQLSense. It serves as the definitive reference for all visual decisions throughout development, ensuring consistency across every page, component, and interaction.

**Related Documents:**
- [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md)
- [02_DESIGN_PLAN.md](./02_DESIGN_PLAN.md)
- [03_UI_UX_BRIEF.md](./03_UI_UX_BRIEF.md)
- [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md)

---

## 1. Brand Identity

### 1.1 Brand Essence

SQLSense is a premium developer education tool that combines the analytical rigor of a professional IDE with the clarity of a well-crafted tutorial. The brand communicates:

- **Intelligence** — The tool understands SQL deeply.
- **Clarity** — Complex queries become simple explanations.
- **Trust** — Professional, polished, and reliable.
- **Accessibility** — Welcoming to beginners, useful to experienced developers.

### 1.2 Brand Voice

| Attribute | Description | Example |
|---|---|---|
| **Clear** | Explanations are precise and jargon-free | "This query selects all users who signed up in the last 30 days" |
| **Confident** | The tool speaks with authority | "Complexity Score: 7/10 — Advanced" |
| **Encouraging** | The tone supports learning | "Great query! Here are some optimization tips..." |
| **Professional** | No casual slang or excessive emoji | "Query analyzed successfully" (not "🎉 Nailed it!") |

### 1.3 Brand Personality

If SQLSense were a person, it would be a **senior developer who mentors juniors** — patient, knowledgeable, clear in explanations, and always professional. Not intimidating, not condescending.

---

## 2. Design Inspirations

SQLSense draws visual inspiration from four industry-leading developer tools:

### 2.1 Vercel

| Element | Inspiration |
|---|---|
| Color scheme | Deep blacks, clean whites, subtle grays |
| Typography | Inter font family, generous whitespace |
| Layout | Card-based layouts with clear hierarchy |
| Animations | Smooth, purposeful transitions |

### 2.2 Linear

| Element | Inspiration |
|---|---|
| Dark mode | Rich, deep dark backgrounds |
| Interactions | Fluid micro-animations on hover and focus |
| Information density | Dense but organized data presentation |
| Keyboard shortcuts | Developer-centric interaction patterns |

### 2.3 Supabase

| Element | Inspiration |
|---|---|
| Color palette | Purple/violet primary accents on dark backgrounds |
| Code presentation | Syntax-highlighted code blocks |
| Dashboard design | Data-rich dashboards with clear sections |
| Component style | Glassmorphic cards with subtle borders |

### 2.4 Raycast

| Element | Inspiration |
|---|---|
| Glass effects | Glassmorphism with backdrop blur |
| Gradients | Subtle gradient overlays for depth |
| Command palette | Quick-access search/input patterns |
| Polish level | Pixel-perfect attention to detail |

---

## 3. Color System

### 3.1 Core Palette

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-background` | `#050816` | `5, 8, 22` | Page background, base layer |
| `--color-primary` | `#8B5CF6` | `139, 92, 246` | Primary actions, links, active states |
| `--color-secondary` | `#6366F1` | `99, 102, 241` | Secondary accents, gradients |
| `--color-text` | `#F8FAFC` | `248, 250, 252` | Primary text, headings |
| `--color-muted` | `#94A3B8` | `148, 163, 184` | Secondary text, descriptions, labels |
| `--color-success` | `#10B981` | `16, 185, 129` | Success states, positive indicators |
| `--color-warning` | `#F59E0B` | `245, 158, 11` | Warnings, caution indicators |

### 3.2 Extended Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-error` | `#EF4444` | Error states, destructive actions |
| `--color-info` | `#3B82F6` | Informational messages, tooltips |
| `--color-surface` | `#0A0F1E` | Card backgrounds, elevated surfaces |
| `--color-surface-hover` | `#111827` | Surface hover state |
| `--color-border` | `#1E293B` | Subtle borders, dividers |
| `--color-border-focus` | `#8B5CF6` | Focused input borders |
| `--color-overlay` | `rgba(5, 8, 22, 0.8)` | Modal overlays, backdrops |

### 3.3 Gradient Definitions

| Gradient | Definition | Usage |
|---|---|---|
| `--gradient-primary` | `linear-gradient(135deg, #8B5CF6, #6366F1)` | Primary buttons, hero accents |
| `--gradient-glow` | `radial-gradient(ellipse at center, rgba(139,92,246,0.15), transparent 70%)` | Background glow effects |
| `--gradient-card` | `linear-gradient(135deg, rgba(139,92,246,0.1), rgba(99,102,241,0.05))` | Card background accents |
| `--gradient-text` | `linear-gradient(135deg, #8B5CF6, #6366F1, #8B5CF6)` | Gradient text for hero headings |

### 3.4 Color Usage Rules

1. **Background Layers:** Use `--color-background` for the page, `--color-surface` for cards, and `--color-surface-hover` for interactive elements on hover.
2. **Text Hierarchy:** Use `--color-text` for headings and primary content, `--color-muted` for descriptions and secondary content.
3. **Interactive Elements:** Use `--color-primary` for clickable elements. Use `--gradient-primary` for primary CTAs.
4. **Status Indicators:** Use `--color-success` for positive states, `--color-warning` for caution, `--color-error` for errors.
5. **Borders:** Default to `--color-border`. Use `--color-border-focus` for focused states only.
6. **Never** use pure white (`#FFFFFF`) or pure black (`#000000`) in the UI. The palette is specifically designed with warm-tinted neutrals.

---

## 4. Typography

### 4.1 Font Families

| Category | Font | Fallback Stack | Usage |
|---|---|---|---|
| **Primary** | Inter | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | All UI text |
| **Code** | JetBrains Mono | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace` | SQL input, code blocks, technical output |

### 4.2 Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-hero` | 48px / 3rem | 800 | 1.1 | Landing page hero heading |
| `--text-h1` | 36px / 2.25rem | 700 | 1.2 | Page titles |
| `--text-h2` | 28px / 1.75rem | 700 | 1.3 | Section headings |
| `--text-h3` | 22px / 1.375rem | 600 | 1.4 | Subsection headings |
| `--text-h4` | 18px / 1.125rem | 600 | 1.5 | Card titles |
| `--text-body` | 16px / 1rem | 400 | 1.6 | Body text |
| `--text-body-sm` | 14px / 0.875rem | 400 | 1.5 | Secondary text, descriptions |
| `--text-caption` | 12px / 0.75rem | 500 | 1.4 | Labels, badges, timestamps |
| `--text-code` | 14px / 0.875rem | 400 | 1.7 | Code blocks, SQL input |

### 4.3 Typography Rules

1. **Headings** use Inter with semibold or bold weight. Never use light or thin weights for headings.
2. **Body text** uses Inter at 400 weight with generous line height (1.6) for readability.
3. **Code** always uses JetBrains Mono. Never use the primary font for code.
4. **Letter spacing:** Headings may use `-0.02em` tracking. Body text uses default tracking. Code uses default tracking.
5. **Maximum line width:** Body text should not exceed `65ch` for optimal readability.

---

## 5. Spacing System

### 5.1 Base Unit

The spacing system is based on an **8px grid** with a 4px sub-grid for fine adjustments.

### 5.2 Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Inline spacing, icon gaps |
| `--space-2` | 8px | Tight padding, small gaps |
| `--space-3` | 12px | Input padding, compact card padding |
| `--space-4` | 16px | Standard padding, element gaps |
| `--space-5` | 20px | Card padding (compact) |
| `--space-6` | 24px | Card padding (standard), section gaps |
| `--space-8` | 32px | Section padding, large gaps |
| `--space-10` | 40px | Page section spacing |
| `--space-12` | 48px | Major section spacing |
| `--space-16` | 64px | Page-level vertical rhythm |
| `--space-20` | 80px | Hero section padding |
| `--space-24` | 96px | Maximum section spacing |

---

## 6. Visual Effects

### 6.1 Glassmorphism

Glassmorphism is a core visual treatment for cards, panels, and modal surfaces.

```css
.glass-surface {
  background: rgba(10, 15, 30, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.1);
  border-radius: 16px;
}
```

**Usage rules:**
- Apply to cards, modals, dropdown menus, and navigation bars.
- Always include a subtle border (using primary color at 10% opacity) to define edges.
- Do not stack more than 2 glass layers — performance degrades.
- Ensure text contrast meets WCAG AA on glass surfaces.

### 6.2 Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation for buttons |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Card elevation |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modal, dropdown elevation |
| `--shadow-glow` | `0 0 20px rgba(139,92,246,0.3)` | Primary element glow |
| `--shadow-glow-lg` | `0 0 40px rgba(139,92,246,0.2)` | Hero section ambient glow |

### 6.3 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Small buttons, badges |
| `--radius-md` | 8px | Standard buttons, inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Feature cards, modals |
| `--radius-full` | 9999px | Avatars, circular elements |

### 6.4 Gradients and Background Effects

The landing page features a subtle animated gradient glow behind the hero section:

```css
.hero-glow {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    ellipse at center,
    rgba(139, 92, 246, 0.15) 0%,
    rgba(99, 102, 241, 0.08) 40%,
    transparent 70%
  );
  filter: blur(60px);
  pointer-events: none;
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
}
```

---

## 7. Animation & Motion

### 7.1 Animation Principles

1. **Purposeful:** Every animation must communicate something — state change, hierarchy, or feedback. No gratuitous animations.
2. **Fast:** Animations should feel instant. The user should never wait for an animation to complete.
3. **Smooth:** Use ease-out curves for entering elements, ease-in for exiting. Never use linear timing for UI animations.
4. **Consistent:** Same interaction = same animation everywhere.

### 7.2 Timing Tokens

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `--transition-fast` | 100ms | `ease-out` | Color changes, opacity changes |
| `--transition-normal` | 200ms | `ease-out` | Hover effects, focus rings |
| `--transition-slow` | 300ms | `ease-out` | Card entrances, page transitions |
| `--transition-spring` | 400ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy elements, attention-drawing |

### 7.3 Micro-Animations

| Element | Animation | Trigger |
|---|---|---|
| Buttons | Scale 1.02, shadow increase | Hover |
| Buttons | Scale 0.98 | Active (press) |
| Cards | TranslateY -2px, shadow increase | Hover |
| Links | Color transition to primary | Hover |
| Input focus | Border color transition, subtle glow | Focus |
| Page enter | Fade up (opacity 0→1, translateY 10px→0) | Mount |
| Result cards | Staggered fade-in | Analysis complete |
| Success states | Check icon scale with spring | Save action |
| Error states | Subtle shake (translateX ±4px) | Validation error |
| Loading | Pulsing gradient skeleton | Data loading |

### 7.4 Page Transitions

Pages use a subtle fade-up entrance:

```css
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-content {
  animation: page-enter 300ms ease-out;
}
```

---

## 8. Iconography

### 8.1 Icon Library

SQLSense uses **Lucide React** for all icons. Lucide provides consistent, minimal, and sharp icons that align with the premium aesthetic.

### 8.2 Icon Sizing

| Size | Pixels | Usage |
|---|---|---|
| `xs` | 14px | Inline icons within text |
| `sm` | 16px | Button icons, navigation |
| `md` | 20px | Standard UI icons |
| `lg` | 24px | Card header icons |
| `xl` | 32px | Feature icons, empty states |
| `2xl` | 48px | Hero section, onboarding |

### 8.3 Icon Color Rules

- Icons inherit the text color of their parent by default.
- Active/selected icons use `--color-primary`.
- Disabled icons use `--color-muted` at 50% opacity.
- Never use multicolor icons. All icons are single-color.

---

## 9. Component Design Tokens

### 9.1 Buttons

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| **Primary** | `--gradient-primary` | `#FFFFFF` | none | Primary CTAs (Analyze, Save) |
| **Secondary** | `transparent` | `--color-primary` | `1px solid --color-primary` | Secondary actions |
| **Ghost** | `transparent` | `--color-muted` | none | Tertiary actions, icon buttons |
| **Destructive** | `--color-error` at 10% | `--color-error` | `1px solid --color-error` at 20% | Delete actions |

### 9.2 Inputs

| State | Background | Border | Usage |
|---|---|---|---|
| **Default** | `--color-surface` | `--color-border` | Resting state |
| **Hover** | `--color-surface-hover` | `--color-border` | Mouse hover |
| **Focus** | `--color-surface` | `--color-primary` | Active input |
| **Error** | `--color-surface` | `--color-error` | Validation error |
| **Disabled** | `--color-surface` at 50% | `--color-border` at 50% | Disabled state |

### 9.3 Cards

```css
.card {
  background: rgba(10, 15, 30, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(30, 41, 59, 0.5);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: rgba(139, 92, 246, 0.2);
}
```

---

## 10. Layout Principles

### 10.1 Grid System

- **Max content width:** 1280px
- **Horizontal padding:** 24px (mobile), 32px (tablet), 48px (desktop)
- **Column grid:** 12-column grid for complex layouts, flexbox for simpler layouts

### 10.2 Responsive Breakpoints

| Token | Width | Target |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### 10.3 Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `--z-base` | 0 | Default content |
| `--z-dropdown` | 10 | Dropdown menus |
| `--z-sticky` | 20 | Sticky header |
| `--z-overlay` | 30 | Background overlays |
| `--z-modal` | 40 | Modal dialogs |
| `--z-toast` | 50 | Toast notifications |

---

## 11. Footer Design Specification

### 11.1 Required Content

The footer must display the following on every page:

| Element | Content |
|---|---|
| Author name | Prosun Banerjee |
| Author email | prosunbanerjee8@gmail.com |
| CTA Button | Labeled exactly: **"Built for Digital Heroes"** |
| Button link | Links to the Digital Heroes website |

### 11.2 Footer Layout

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   SQLSense                              [Navigation Links] │
│   Understand SQL Instantly                                  │
│                                                            │
│   ─────────────────────────────────────────────────────    │
│                                                            │
│   Prosun Banerjee                                          │
│   prosunbanerjee8@gmail.com                                │
│                                                            │
│   [ Built for Digital Heroes ]  ← Links to DH website     │
│                                                            │
│   © 2026 SQLSense. All rights reserved.                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 11.3 Footer Button Styling

The "Built for Digital Heroes" button uses the secondary button variant:

```css
.footer-cta {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-normal);
}

.footer-cta:hover {
  background: rgba(139, 92, 246, 0.1);
  box-shadow: var(--shadow-glow);
}
```

---

## 12. Accessibility Requirements

### 12.1 Color Contrast

All text must meet WCAG 2.1 AA contrast ratios:

| Combination | Ratio | Status |
|---|---|---|
| `--color-text` on `--color-background` | 17.4:1 | ✅ AAA |
| `--color-muted` on `--color-background` | 5.8:1 | ✅ AA |
| `--color-primary` on `--color-background` | 5.2:1 | ✅ AA |
| White on `--gradient-primary` | 4.8:1 | ✅ AA |
| `--color-text` on `--color-surface` | 15.2:1 | ✅ AAA |

### 12.2 Focus Indicators

All interactive elements must have visible focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### 12.3 Motion Sensitivity

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13. Implementation Notes

### 13.1 CSS Custom Properties

All design tokens should be defined as CSS custom properties in a global stylesheet and mapped to Tailwind CSS configuration:

```css
:root {
  --color-background: #050816;
  --color-primary: #8B5CF6;
  --color-secondary: #6366F1;
  /* ... all tokens ... */
}
```

### 13.2 Tailwind Configuration

Extend the default Tailwind configuration with SQLSense design tokens:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: '#050816',
        primary: '#8B5CF6',
        secondary: '#6366F1',
        // ... etc
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
```

### 13.3 Font Loading

Load fonts via Google Fonts with `display=swap` for performance:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 14. Future Design Considerations

| Feature | Design Impact |
|---|---|
| Light theme | Define a complete light mode color palette; implement with CSS custom properties and a theme toggle |
| Mobile app | Adapt spacing and touch targets for native mobile; consider bottom navigation |
| AI explanations | Design a distinct visual treatment for AI-generated vs. rule-based explanations |
| Collaborative features | Design avatar stacks, real-time cursors, and sharing modals |
| Widget mode | Create a compact, embeddable version with reduced chrome |

---

*This Design Brief is the visual authority for SQLSense. All UI development must conform to the specifications documented here. Deviations require explicit approval and documentation.*

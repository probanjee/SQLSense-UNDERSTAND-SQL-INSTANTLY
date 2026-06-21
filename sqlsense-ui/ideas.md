# SQLSense Design Direction

## Chosen Approach: Modern Neo-Brutalist Developer Experience

### Design Movement

Neo-Brutalism meets contemporary developer tooling — bold, confident, technical, and intentionally designed. Inspired by Gumroad, Stripe Docs, and modern SaaS platforms that prioritize clarity and craftsmanship over decoration.

### Core Principles

1. **Intentional Borders & Shadows** — Every element has a purpose. Thick 4px borders and bold offset shadows create tactile, memorable components.
2. **Strong Hierarchy** — Large, bold typography establishes clear information flow. No visual clutter.
3. **Structured Simplicity** — Clean layouts with ample whitespace. Every pixel earns its place.
4. **Technical Confidence** — The interface feels intelligent and premium, not generic or trendy.

### Color Philosophy

- **Background**: #F8F8F8 (light, neutral, professional)
- **Text**: #111111 (high contrast, readable, authoritative)
- **Primary**: #6D28D9 (deep purple, premium, technical)
- **Secondary**: #8B5CF6 (lighter purple, accent, supportive)
- **Success**: #10B981 (green, positive feedback)
- **Warning**: #F59E0B (amber, cautionary)
- **Border**: #111111 (thick, intentional)

The palette feels premium and developer-focused—not playful or trendy.

### Layout Paradigm

- **Sidebar navigation** for persistent access
- **Asymmetric layouts** avoiding centered grids
- **Generous whitespace** between sections
- **Card-based organization** with strong borders
- **Mobile drawer** for responsive design

### Signature Elements

1. **4px Solid Black Borders** — Every card, input, and interactive element
2. **8px 8px 0px Offset Shadow** — Bold, intentional depth
3. **Uppercase Labels** — Strong visual hierarchy and technical feel

### Interaction Philosophy

- **Tactile hover effects** — Translate -4px -4px on button hover
- **Smooth transitions** — Cards and navigation transitions feel responsive
- **No excessive motion** — Subtle, purposeful animations only
- **Clear affordances** — Borders and shadows make interactivity obvious

### Animation

- Button hover: `transform: translate(-4px, -4px)` with smooth transition
- Card transitions: 150–200ms ease-out
- Navigation: 150ms fade/slide
- No entrance animations for keyboard-initiated actions
- Respect `prefers-reduced-motion`

### Typography System

- **Primary Font**: Space Grotesk (bold, confident, technical)
- **Fallback**: Inter (readable, clean)
- **Code Font**: JetBrains Mono (monospace, precise)
- **Hierarchy**:
  - H1: 48px, bold, Space Grotesk
  - H2: 36px, bold, Space Grotesk
  - H3: 24px, semibold, Space Grotesk
  - Body: 16px, regular, Inter
  - Small: 14px, regular, Inter
  - Code: 14px, JetBrains Mono

### Brand Essence

**One-line positioning**: A premium SQL Query Explainer for developers who demand clarity and craftsmanship.

**Personality adjectives**: Bold, Technical, Intelligent

### Brand Voice

- Headlines: Direct, commanding, technical
- CTAs: Action-oriented, uppercase, confident
- Microcopy: Clear, jargon-aware, no filler
- **Example lines**:
  - "UNDERSTAND SQL INSTANTLY" (headline)
  - "EXPLAIN QUERY" (CTA)
  - "Transform complex SQL queries into clear human-readable explanations" (subheading)

### Wordmark & Logo

A bold graphic symbol (no text) — think a stylized database icon or query flow diagram. Transparent background, visible at all sizes.

### Signature Brand Color

**#6D28D9** — Deep purple. Unmistakably SQLSense. Used for primary CTAs, accents, and brand touchpoints.

---

## Implementation Notes

- All cards use `border-4 border-black shadow-[8px_8px_0px_#111111]`
- All buttons use uppercase text with hover translate effect
- Sidebar navigation is persistent on desktop, drawer on mobile
- No rounded corners on primary components (sharp, intentional)
- Generous padding and spacing throughout
- Code blocks use JetBrains Mono with light background

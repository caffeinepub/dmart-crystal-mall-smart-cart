# DMart Crystal Mall Smart Cart

## Current State
New project — no existing files.

## Requested Changes (Diff)

### Add
- Single `index.html` file with embedded CSS and JS
- Fixed navbar with logo, nav links, mobile hamburger menu
- Hero section with animated gradient, headline, CTAs, floating cart illustration, badge
- How It Works: 4-step horizontal process flow with icons and arrows
- Features: 6 feature cards in a grid with hover effects
- Interactive Demo: barcode scanner panel + live cart panel + bill modal
- Benefits: two-column layout (customers vs retailers)
- Team: 4 member cards + project about section
- Footer: dark green with quick links and disclaimer
- Product database: 6 items (Atta, Toor Dal, Rice, Sunflower Oil, Biscuits, Milk)
- Cart state: add, quantity +/-, remove, real-time total
- Bill modal: itemized receipt, subtotal, GST 18%, grand total, timestamp
- CSS animations: scanning beam, floating hero, card hovers, fade-ins
- Intersection Observer for scroll-triggered animations
- Google Fonts (Poppins + Inter) + Font Awesome CDN

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Create `index.html` with full HTML structure for all 8 sections
2. Embed CSS: design tokens, layout, animations, responsive breakpoints
3. Embed JS: product DB, cart logic, scanner animation, bill modal, scroll animations, mobile menu
4. Validate all interactions work: scan, cart update, bill generation, smooth scroll, hamburger

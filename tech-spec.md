# Dandeli Wild Horse Tours — Technical Specification

## Dependencies

### Core (from webapp-building skill)
- react, react-dom, vite, typescript, tailwindcss
- GSAP + ScrollTrigger (animation)
- Lucide React (icons)

### Additional
- @studio-freight/lenis (smooth scroll — optional, desktop only)
- clsx + tailwind-merge (class utilities)

---

## Component Inventory

### Layout (persistent)
- **Navigation** — fixed top bar: wordmark left, nav links center, CTA pill right
- **FloatingWhatsApp** — fixed bottom-right WhatsApp button
- **GrainOverlay** — fixed full-screen noise texture overlay

### Sections

**Pinned Sections (3-phase GSAP timelines)**
- **HeroSection** — logo reveal, scroll cue, availability chip
- **ManifestoSection** — split layout: text left (55%), photo right (45%)
- **ExploreSection** — giant "EXPLORE" typography scene
- **Numerals04Section** — split: photo left (45%), "04" typography right (55%)
- **Numerals05Section** — "05" typography with edge image strip

**Flowing Sections**
- **AdventureRosterSection** — card grid with inline booking CTAs
- **WaterSportsSection** — masonry gallery + live availability calendar
- **HomestaySection** — feature cards with booking panels
- **SafetySection** — two-column: safety checklist + reviews
- **ContactSection** — contact info, form, footer

### Shared Components
- **AdventureCard** — image, title, meta, price, availability chip, CTA
- **HomestayCard** — image block + details + mini calendar
- **AvailabilityCalendar** — 14-day horizontal date chips with green availability dots
- **BookingModal** — date picker + guest count + contact form (reused across cards)
- **ReviewCard** — star rating + quote + name
- **GoldBar** — decorative accent block (animated scaleX)
- **SectionWrapper** — handles pin config and z-index stacking

### Hooks
- **useScrollTrigger** — GSAP ScrollTrigger setup + cleanup
- **useReducedMotion** — prefers-reduced-motion detection
- **useLenis** — smooth scroll instance (desktop only)

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|---|---|---|---|
| Hero load sequence (logo, microcopy, scroll cue) | GSAP timeline | Single timeline on mount, ends at settle state | Medium |
| Pinned section 3-phase (enter/settle/exit) | GSAP ScrollTrigger | `fromTo()` with scrub, `end: "+=130%"` | **High** |
| Giant text character stagger (EXPLORE, 04, 05) | GSAP + SplitText | Split into chars, stagger `x/y` + opacity | **High** |
| Split panel slide (left/right panels) | GSAP ScrollTrigger | `x: ±50vw` to `x: 0` with scrub | Medium |
| Gold bar scaleX reveal | GSAP ScrollTrigger | `scaleX: 0→1`, transform-origin left | Low |
| Flowing card entrance (stagger) | GSAP ScrollTrigger | `y: 60px, opacity: 0, rotateX: 6deg` per card | Medium |
| Image parallax | GSAP ScrollTrigger | `y: -20px → +20px` scrubbed | Low |
| Card hover lift | CSS transition | `translateY(-6px) scale(1.01)` | Low |
| Nav underline hover | CSS transition | `scaleX(0→1)` pseudo-element | Low |
| Grain overlay | CSS | Static, no animation | Low |
| Scroll snap | GSAP ScrollTrigger | Global snap derived from pinned ranges | **High** |

---

## State & Logic

### Booking Modal State
- **React Context** or **zustand** store:
  - `modalOpen: boolean`
  - `selectedService: string` (which adventure/homestay)
  - `selectedDate: Date | null`
  - `guestCount: number`
- Modal triggered from:
  - AdventureCard "VIEW & BOOK" buttons
  - HomestayCard "BOOK STAY" buttons
  - WaterSports calendar date chips
  - Nav "CHECK DATES" button

### Availability Data
- Static mock data for availability dates (14-day arrays per service)
- Green dot logic: `isAvailable(date)` check against mock data

### WhatsApp Integration
- All CTAs link to `https://wa.me/919483068577` with pre-filled message
- Floating button always visible

### Form Handling
- Contact form: client-side only (no backend), shows success toast
- Uses React state for inputs, basic validation

---

## Z-Index Stacking (Critical)

Pinned sections must stack above each other:
- S1 (Hero): z-10
- S2 (Manifesto): z-20
- S3 (Explore): z-30
- S5 (04): z-40
- S7 (05): z-50

Persistent elements above all:
- Navigation: z-100
- FloatingWhatsApp: z-100
- GrainOverlay: z-200 (pointer-events none)
- BookingModal: z-300 (when open)

---

## Performance Considerations

1. **Image optimization**: Use responsive images (srcset), lazy load below-fold
2. **GSAP cleanup**: Kill ScrollTriggers on unmount to prevent leaks
3. **Smooth scroll**: Lenis only on desktop; disabled for reduced-motion
4. **No runtime CSS filters**: Bake cinematic grade into images
5. **will-change**: Apply sparingly to pinned section elements only
6. **Scroll snap**: Only snap pinned sections; flowing sections remain free-scroll

---

## Responsive Breakpoints

- Desktop: > 1024px (full cinematic layout)
- Tablet: 768–1024px (reduced type sizes, preserved splits)
- Mobile: < 768px (stacked layouts, reduced animation distances)

---

## Asset Requirements (Generated)

1. Logo SVG (text-based "WILD HORSE" with gold "O")
2. 8+ adventure/landscape images (cinematic warm grade)
3. Grain overlay PNG (subtle noise texture)
4. Guide portrait image

All user-provided images will be used where available; generated images fill gaps.

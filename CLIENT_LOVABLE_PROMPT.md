# Copy‑Paste Prompt for Lovable (Client Site Only)

You are designing the Olatus client website UI. Output production-ready React + Vite + Tailwind components that look professional, trusted, and impressive. Prioritize SEO, accessibility, and performance. Use environment variables for email form providers. Follow this spec exactly.

- Goal: Enterprise-grade marketing site showcasing services, projects/case studies, documentation (coming soon), policies, careers/training, and contact. Dark teal theme, subtle neon cyan accents, high contrast, minimal motion.
- Tech: React + Vite + Tailwind CSS. Component-driven. Mobile-first. Light/dark support with user toggle. Use existing anchors and routes.
- Routes & Sections:
  - Home is a composed page with sections in this order: ScrollArt, Navbar, Hero, Services, About, Projects, Contact, Footer, FloatingBot.
  - Pages: /about, /documentation, /careers (+ #training), /pcb-manufacturing, /online-3d-printing, /product-development, /technology-lab, /web-development, /embedded-software, /privacy-policy, /terms-of-service, /cookie-policy, 404.
  - Anchors that must work from Navbar/Footer when on Home: #services, #projects, #contact.
- Design System:
  - Colors: base #002E3C on deep slate; accent cyan #22D3EE; muted purple accents; neutral grays; enforce WCAG AA+.
  - Type: Inter/System UI. One h1 per page; clear hierarchy; readable body; strong headings.
  - Components to include: ARIA-safe Navbar with Services dropdown, Footer with contact/policy links, trust badges, Hero, Services cards, Projects grid + Case Study modal, Contact form, Cookie/Consent banner, Contact modal, FloatingBot. Subtle glassmorphism only.
- Trust & Social Proof:
  - Show “ISO Certified” and “Made in India” badges with tooltips. Prominent email/phone/address + map link. Testimonial + metrics in projects. Optional partners/press carousel.
- Forms (email delivery, no backend):
  - Implement provider integration via Formspree or EmailJS. Use `.env` IDs/keys (do not hardcode). Add honeypot, consent, loading, error/success states, and reset on success.
  - Contact fields: firstName, lastName, email (required), phone, service (select), message (required, ≥10 chars), optional file (pdf/doc/txt ≤5MB).
  - Service Request: name, email, phone, serviceType, requirements, optional specifications JSON, optional files.
  - Careers/Internships: fullName, email, phone, programTitle, resume ≤10MB (+ optional links/notes). Newsletter email with double opt‑in placeholder.
- SEO (each page):
  - Semantic HTML5; one h1; good headings; descriptive alt text. Unique title/description; canonical from VITE_SITE_URL + route; OG/Twitter.
  - JSON‑LD: Home (Organization, Website, LocalBusiness), Service pages (Service), Projects (BreadcrumbList; optional CreativeWork), Careers (JobPosting if jobs open; Course for training), Contact (ContactPage).
  - Generate sitemap.xml and robots.txt. Documentation page is noindex until content exists.
- Accessibility:
  - Keyboard navigation; visible focus; skip‑to‑content. Proper roles/labels. Focus‑trap modals (Contact, Case Study). Navbar dropdown ARIA pattern.
- Performance:
  - Route‑level code splitting; lazy‑load heavy/3D/carousels. Prefer transforms; limit blur/ping. Responsive images with srcset/sizes and webp/avif. Prefetch above‑the‑fold assets.
- Analytics & Consent: Cookie banner; only load analytics after explicit consent; expose preference manager in Footer.
- Acceptance:
  - Professional, trustworthy visual design; consistent spacing and typography; polished hover/focus states.
  - Lighthouse targets on reference hardware: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
  - Forms submit to provider endpoints with `.env` IDs; no secret keys in code; working validation and states.

Output a cohesive set of components/pages wired to routing and anchors. Keep code readable, with small focused components and clear props.

---

## Business Goals & Audience Brief (Read & Design For This)

- What Olatus is: A tech innovation company engineering core electronics and smart technology in India. We deliver end‑to‑end solutions: PCB manufacturing, online 3D printing, product development, technology lab setup for institutions, IT/web development services, embedded systems & firmware, training and internships.
- Primary audiences:
  - Enterprises/Manufacturers (automation, PCB, embedded, product builds)
  - Startups (rapid prototyping, MVP hardware/software)
  - Educational institutions (ATL/STEM labs, robotics, IoT training)
  - Government/smart city projects (IoT, energy, infrastructure)
  - Premium homeowners (smart home ecosystems)
  - Secondary: Students (training, internships)
- Value propositions: End‑to‑end engineering, reliable delivery, India‑made capability, measurable outcomes (uptime, cost savings, energy reductions), ISO‑certified quality, pan‑India deployments.
- Differentiators: Integrated hardware + software teams; fast prototyping to production; mentorship & curriculum for education; full lab setup and support.
- Conversion goals (prioritize UI for these):
  - Submit Contact form (primary)
  - Submit Service Request from service pages
  - Apply for Internship/Training on Careers
  - Click‑to‑call, click‑to‑email, map open
  - Newsletter opt‑in
- Top journeys:
  - Services → Learn More → CTA (Contact/Service Request)
  - Projects → Case Study → CTA
  - Careers → Training tab → Internship application modal
  - Contact → form with validated submission → success confirmation
- Trust signals to surface: ISO/Made in India badges, address (Guwahati/Bangalore), phone + email, testimonials + metrics, partners/press placeholders, privacy note.
- Tone & copy: Professional, engineering‑first, credible, outcome‑focused. Minimal hype; emphasize reliability and measurable benefits.
- SEO focus: “PCB manufacturing India”, “online 3D printing India”, “embedded systems development”, “technology lab setup”, “web development services”, “IoT solutions India”, “ATL robotics”, plus branded “Olatus”.
- Region & contact: India; Email support@olatus.com; Phone +91 69001 05606; Address: House No: 346, 1st Floor, Zoo‑Narengi Rd, Ambikagirinagar, Guwahati, Assam 781024; operations in Bangalore.
- KPIs to optimize: Form conversion rate, time on page, bounce rate, performance (Core Web Vitals), accessibility compliance.

Design the UI to maximize trust and clarity, reduce friction to these conversions, and present services/projects with persuasive, scannable content.

---

## Master Prompt (Detailed Reference)

Build a production-ready Client site for Olatus using React + Vite + Tailwind CSS. No Admin views. Align with current structure and components:

- Routes & Sections (match codebase):
  - Home composed of `ScrollArt`, `Navbar`, `Hero`, `Services`, `About`, `Projects`, `Contact`, `Footer`, `FloatingBot`. Keep anchors `#services`, `#projects`, `#contact` working from `Navbar` and `Footer`.
  - Pages: About (`/about`), Documentation (`/documentation`), Careers & Training (`/careers` + `#training`), Service Details (`/pcb-manufacturing`, `/online-3d-printing`, `/product-development`, `/technology-lab`, `/web-development`, `/embedded-software`), Policies (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`). Include a friendly 404.

- Design Language (professional + trusted):
  - Palette: Dark teal base `#002E3C` over deep slate backgrounds; neon cyan `#22D3EE` and muted purple accents; neutral, readable grays. Maintain WCAG AA+ contrast.
  - Typography: Inter/System UI. Headings bold and confident; body text highly readable; tighten letter-spacing for labels; consistent h1–h6 hierarchy with one h1 per page.
  - Components: Enterprise Navbar with Services dropdown (ARIA-compliant), Footer with contact and policy links, Hero with strong value proposition, Services cards with gradients, Case Study modal, Contact form, Cookie/Consent banner, Contact modal, FloatingBot. Use subtle glassmorphism—limit heavy blur.
  - Motion: Subtle and restrained. Respect `prefers-reduced-motion`. Avoid large `ping` animations and heavy backdrops; prioritize performance and focus.

- Trust & Social Proof (visible and credible):
  - Add ISO-certified and “Made in India” badges near the brand (already present; refine styling and tooltips).
  - Prominent contact info in Footer (email, phone, address) and in Contact section; add clickable map link.
  - Case studies with metrics and client testimonials (use existing `Projects` content; provide structured layout and accessible modal).
  - Partners/brands carousel, awards/press mentions placeholder sections; use `sameAs` links for social profiles.
  - Security & privacy notes: data handling, consent, and non-spam policy messaging near forms.

- Global Layout & Navigation:
  - Sticky Navbar; highlight active route; keyboard navigation; focus rings.
  - Footer: company, services, resources columns; policies; newsletter signup.
  - Breadcrumbs on deeper pages; route-level meta injection.

- SEO (every page):
  - Semantic HTML5; single h1; logical heading order; descriptive alt text.
  - Unique meta title/description; canonical from `VITE_SITE_URL + route`; OpenGraph/Twitter cards.
  - JSON-LD:
    - Home: `Organization`, `Website`, optional `LocalBusiness` (address, phone, email, sameAs).
    - Service pages: `Service` schema with name/description/areaServed.
    - Projects/Case Study modal pages: `BreadcrumbList`; optionally `CreativeWork` summary.
    - Careers: `JobPosting` (for open roles) and training info as `Course` (optional).
    - Contact: `ContactPage`.
  - Generate `sitemap.xml` and `robots.txt`. For “Coming Soon” pages (Documentation), add `meta robots=noindex` until content is ready.

- Accessibility:
  - ARIA-compliant Services dropdown and mobile menu in `Navbar`; esc/Tab handling; focus trap for modals (Contact modal, Case Study).
  - Labels, descriptions, and error messaging on forms; visible focus state; skip-to-content.
  - Color contrast AA+; avoid color-only affordances.

- Performance:
  - Code-splitting per route; lazy-load heavy visuals (carousels, 3D, case-study images).
  - Minimize backdrop blurs and `animate-ping`; prefer CSS transforms; throttle/unobserve animations when off-screen.
  - Responsive images (`srcset`, `sizes`) with webp/avif; prefetch critical above-the-fold assets.

- Analytics & Consent:
  - Cookie banner gating analytics. Only load GA or alternative after explicit consent. Expose a preference manager in Footer.

- Forms (Email Delivery; no backend):
  - Replace local axios `POST http://localhost:5000/api/*` calls with Formspree or EmailJS. Use `.env` provider IDs/keys. Keep UX identical: inline validation, loading state, error/success banners, reset on success.
  - Anti-spam: honeypot hidden field, optional checkbox consent, basic rate-limit note.
  - Implement:
    - Contact Form (fields per current `Contact`: firstName, lastName, email, phone, service, message). Optional file upload (pdf/doc/txt ≤ 5MB).
    - Service Request Form (CTA from service pages): name, email, phone, service type, requirements, specs, optional files.
    - Careers/Internships Application: fullName, email, phone, program title, resume upload (≤ 10MB) and optional cover letter/links.
    - Newsletter signup: email + double opt-in placeholder.

Deliver a cohesive, elegant UI that projects engineering excellence and trust. Use environment variables and provider templates; do not hardcode secrets.

---

## Email Form Integration (tailored to current forms)

- Option A — Formspree:
  - Create forms per route and collect `FORM_ID`s for Contact, Service Request, Careers, Newsletter.
  - POST to `https://formspree.io/f/<FORM_ID>`.
  - Include: `_replyto` (email), `_subject` (e.g., “Olatus Contact”), `_honeypot`, and explicit consent field if required.
  - Map fields:
    - Contact: `{ firstName, lastName, email, phone, service, message }`.
    - Service: `{ customerName, email, phone, serviceType, description, specifications }` + files.
    - Careers: `{ fullName, email, phone, programTitle }` + resume file.
  - `.env`: `VITE_FORMSPREE_CONTACT_ID`, `VITE_FORMSPREE_SERVICE_ID`, `VITE_FORMSPREE_CAREERS_ID`, `VITE_FORMSPREE_NEWSLETTER_ID`.

- Option B — EmailJS:
  - Use `emailjs.send(serviceId, templateId, payload, publicKey)` on submit.
  - Templates reflect the same payloads as above.
  - `.env`: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID_CONTACT`, `VITE_EMAILJS_TEMPLATE_ID_SERVICE`, `VITE_EMAILJS_TEMPLATE_ID_CAREERS`, `VITE_EMAILJS_TEMPLATE_ID_NEWSLETTER`.

- Fallback — Mailto (CTA only):
  - Provide `mailto:support@olatus.com` links for quick contact, but do not use as primary submission.

---

## Environment Variables (.env)

- Define at build time (do not hardcode):
  - `VITE_FORMSPREE_*` IDs as above.
  - `VITE_EMAILJS_*` keys/ids as above.
  - `VITE_SITE_URL` for canonical/OG.
  - Optional: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` if storing leads from `FloatingBot`.
  - Optional: `VITE_JOBS_OPEN` to toggle Careers jobs section.

Use via `import.meta.env`.

---

## Page-Level Prompts (Client-only)

- Home:
  - "Compose a home page using existing sections and anchors: `ScrollArt`, `Navbar`, `Hero`, `Services`, `About`, `Projects`, `Contact`, `Footer`, `FloatingBot`. Clear value proposition, strong trust cues (badges, metrics), and prominent ‘Get In Touch’ CTA. SEO: title/description, canonical, OG/Twitter, Organization + Website + LocalBusiness JSON-LD (address/phone/email/social). Accessibility-first; restrained motion."

- About:
  - "Professional About page with mission, values, capabilities, and team teaser. Include address and contact highlights. Add breadcrumbs, semantic headings, and trust badges. SEO + BreadcrumbList JSON-LD."

- Services (each):
  - "Detail page for [Service Name] with hero, overview, features, benefits, process steps, FAQs, and CTA to Service Request form. Keep consistent card/gradient styling. Include `Service` JSON-LD, OG/Twitter, canonical."

- Projects / Case Studies:
  - "Grid of projects with categories and stats. On click, open accessible Case Study modal with challenge, solution, results, tech stack, and testimonial. Include BreadcrumbList JSON-LD and OG media."

- Documentation (Coming Soon):
  - "Polished Coming Soon overlay with progress indicators and CTA to Contact. Add minimal static content for SEO but mark page `noindex` until ready."

- Careers / Internships:
  - "Tabs for Training & Jobs. If `VITE_JOBS_OPEN` is false, default to Training. Rich program cards, benefits, and Internship application modal with validated fields and ≤10MB resume upload. Include `JobPosting` (when open) and optional `Course` JSON-LD."

- Contact:
  - "Contact page with info cards (email, phone, address + map), social icons, and validated form mapped to provider via `.env`. ARIA labels, inline errors, loading, success banner, and spam protection. Include `ContactPage` JSON-LD."

- Policies (Privacy / Cookie / Terms):
  - "Clean legal pages with table of contents, anchors, and strong SEO meta. Include `BreadcrumbList` JSON-LD."

- 404:
  - "Helpful 404 with clear message, link back to Home, and site map links."

---

## Form Field Specs & Validation (aligned to current components)

- Contact (`Contact` component):
  - Required: firstName, lastName, email, message (min length 10).
  - Optional: phone (E.164), service (select), file upload (pdf/doc/txt ≤ 5MB).
  - UX: Disable submit during loading; field-level errors; focus management; toasts + inline banners; reset on success.

- Service Request (triggered from service pages):
  - Required: name, email, phone, serviceType; message/requirements.
  - Optional: specifications (JSON), files (multi; validate size/types).

- Careers/Internships:
  - Required: fullName, email, phone, programTitle, resume (≤ 10MB).
  - Optional: coverLetter, portfolio, LinkedIn, GitHub.

- Newsletter:
  - Required: email; double opt-in placeholder.

---

## SEO Meta & JSON-LD Patterns

- Meta per route: title, description, canonical from `VITE_SITE_URL + route`, OG/Twitter image/site.
- JSON-LD examples:
  - Home: `Organization` + `Website` + `LocalBusiness` (include `sameAs` for social links).
  - Services: `Service` with `name`, `description`, `areaServed`.
  - Projects: `BreadcrumbList`; optional `CreativeWork` for case studies.
  - Careers: `JobPosting` when roles are open; `Course` for training programs.
  - Contact: `ContactPage` (include address/phone/email).

---

## Performance & Accessibility Checklist

- Code-split by route; lazy-load modals and heavy sections.
- Limit backdrop-blur and `animate-ping`; prefer transform-based animations.
- Responsive images with `srcset` and `sizes`; prefer webp/avif; descriptive alt texts.
- Keyboard navigation, visible focus rings, skip-to-content, ARIA roles/labels; focus-trap modals.
- Cookie consent gates analytics; preference manager in Footer.

---

## Microcopy & Tone Guidelines

- Voice: Clear, confident, engineering-first; avoid hype; emphasize outcomes and reliability.
- CTAs: “Get In Touch”, “Learn More”, “Apply Now”, “Enroll Now”. Keep consistent casing.
- Trust messaging: “ISO-certified”, “Made in India”, “Pan-India deployments”, real metrics (uptime, savings, units shipped).
- Content density: Favor scannable sections, concise bullets, meaningful headings.

---

## Notes

- Admin panel is excluded; you’ll add it later.
- Set provider destination to your domain email in Formspree/EmailJS settings; secrets via `.env`.
- If a backend is added later, swap provider calls to API endpoints while preserving UX.

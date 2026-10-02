# Kaviyarasan M — Full Stack Developer & Engineer Portfolio

A modern, high-performance developer portfolio built with **Next.js 15 (App Router)**, **React 19**, **GSAP 3**, **Lenis**, and **SplitType**.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI & Components**: React 19, Modular React Components
- **Animations**: GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, SplitType
- **Typography**: Google Font Outfit & Cinzel
- **Icons**: FontAwesome 6 Free & Brands
- **Styling**: Vanilla CSS, Modern Design System

## 📂 Project Structure

```text
├── public/
│   ├── css/           # Design system and section stylesheets
│   ├── fonts/         # Local icon fonts (FontAwesome, eicons)
│   ├── images/        # Optimized project, team, and hero assets
│   └── resume.pdf     # Downloadable resume
├── src/
│   ├── app/
│   │   ├── globals.css # Global styles, Outfit font, and design tokens
│   │   ├── layout.jsx  # Root layout with Google Outfit font preloads
│   │   └── page.jsx    # SmoothScroll wrapped portfolio page
│   └── components/
│       ├── AboutSection.jsx        # Experience summary & counter metrics
│       ├── AchievementsSection.jsx # Awards and certifications
│       ├── CtaSection.jsx          # Call to action & collaboration
│       ├── CustomCursor.jsx        # Dual-layer animated mouse follower
│       ├── ExperienceSection.jsx   # Interactive career timeline
│       ├── Footer.jsx              # Footer links, contact info, and copyright
│       ├── Header.jsx              # Navbar, mobile drawer, and offcanvas menu
│       ├── HeroSection.jsx         # Hero banner, clip-path mask, social links
│       ├── OpenSourceSection.jsx   # NPM packages & featured repositories
│       ├── Preloader.jsx           # SVG curve morphing loader animation
│       ├── ProjectsSection.jsx     # Symmetrical 2-column featured projects
│       ├── ScrollToTop.jsx         # Floating back-to-top button
│       ├── SkillsSection.jsx       # Technical capabilities & tool stack
│       └── SmoothScroll.jsx        # Lenis + GSAP ScrollTrigger engine
├── package.json
└── next.config.mjs
```

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Production Build

```bash
npm run build
npm start
```

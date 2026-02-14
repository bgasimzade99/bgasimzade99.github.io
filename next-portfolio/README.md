# BGDev Portfolio

Senior Front-End & Mobile Developer portfolio. Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## File tree

```
next-portfolio/
├── app/
│   ├── layout.tsx         # Root layout, Sora font, SEO metadata, favicon
│   ├── page.tsx           # Home page (all sections)
│   └── globals.css        # Tailwind, vignette, noise, gradient drift
├── components/
│   ├── Navbar.tsx         # BGDev logo, nav links (Home/Projects/About/Contact), Contact pill, mobile menu, IntersectionObserver active state
│   ├── Hero.tsx           # #home – heading, subtext, View Projects / Contact Me, tech badges, portrait
│   ├── NotableProjects.tsx # #projects – wave decoration, 4 glass cards (SalesMaster, SwiftShop, FinTrack, Portfolio)
│   ├── About.tsx          # #about – bio, highlights, metrics, Download CV, Let's talk
│   ├── Contact.tsx        # #contact – form (name/email/message), social links, email display
│   └── ScrollIndicator.tsx # Bottom center scroll cue (bounce animation)
├── public/
│   ├── image.png          # BG logo (favicon + navbar)
│   ├── meq2w.jpg         # Hero portrait
│   └── logo.svg           # Alternative logo
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── README.md
```

## Run locally

```bash
cd next-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Assets

- Place `CV-Babak-Gasimzade.pdf` in `public/` for the About "Download CV" button.
- Add project thumbnails in `public/` and update `NotableProjects.tsx` if desired.

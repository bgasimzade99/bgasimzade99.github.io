/**
 * Single source of truth for portfolio content.
 * Data from bgdev.dev, repo, and CV (Babak_Gasimzade_updated_EUR.pdf).
 * Update education/certifications from your CV when details are confirmed.
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech?: string[];
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  notes?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  category: string;
  role: string;
  keyResult: string;
  stack: string[];
  highlights?: string[];
  challenges?: string[];
  problem?: string;
  solution?: string;
  result?: string;
  metrics?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  gradient?: string;
}

export interface SkillItem {
  name: string;
  level?: number; // 0-100 for progress bar
}

export interface SkillGroup {
  label: string;
  icon?: string;
  skills: SkillItem[];
}

export const profile = {
  fullName: 'Babak Gasimzade',
  headline: 'Front-End & Mobile Developer',
  location: 'Riga, Latvia',
  positioning:
    'I build web and mobile applications with React and React Native — from product ideas to production delivery.',

  summary:
    'Front-end and mobile developer building production-ready React and React Native applications from idea to launch. Freelancer on Fiverr and founder of BGDev, where I design and ship AI-powered SaaS products like Convertonix and BGTasks. Focused on scalable architecture, performance, and clean user-centered UX across web and mobile platforms.',

  aboutHighlights: [
    'Delivering real-world web & mobile apps for international clients',
    'Leading full product lifecycle — from MVP to live SaaS platforms',
    'Strong React, TypeScript, Tailwind foundation for scalable systems',
  ],

  skillGroups: [
    {
      label: 'Core Stack',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'TypeScript' },
        { name: 'JavaScript' },
      ],
    },
    {
      label: 'Frontend Development',
      skills: [
        { name: 'HTML / CSS' },
        { name: 'Tailwind CSS' },
        { name: 'Responsive Design' },
        { name: 'Performance Optimization' },
        { name: 'Accessibility (a11y)' },
        { name: 'State Management' },
      ],
    },
    {
      label: 'Backend & Databases',
      skills: [
        { name: 'Node.js' },
        { name: 'REST APIs' },
        { name: 'Firebase' },
        { name: 'MongoDB' },
        { name: 'MySQL' },
        { name: 'Python' },
      ],
    },
    {
      label: 'Mobile Development',
      skills: [
        { name: 'React Native' },
        { name: 'Expo' },
        { name: 'Mobile UI/UX' },
        { name: 'Cross-platform' },
      ],
    },
    {
      label: 'Engineering & Tools',
      skills: [
        { name: 'Git' },
        { name: 'Figma' },
        { name: 'Jest / Testing' },
        { name: 'CI/CD' },
        { name: 'Postman' },
        { name: 'VS Code' },
        { name: 'SaaS Development' },
        { name: 'Agile / Scrum' },
      ],
    },
  ] as SkillGroup[],

  learning: ['Flutter', 'Swift', 'Kotlin', 'Advanced Testing', 'System Design'],

  experience: [
    {
      company: 'Fiverr',
      role: 'Front End Developer',
      period: '2024 – Present',
      bullets: [
        'Delivering production-ready web and mobile applications for clients worldwide.',
        'Building responsive UIs with React, Next.js, Tailwind CSS — from landing pages to SaaS dashboards.',
        'Collaborating with clients on full product lifecycle — concept to deployment and iteration.',
      ],
      tech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Firebase'],
    },
    {
      company: 'e-sayar MMC',
      role: 'Mobile Developer Intern',
      period: 'Jun – Sept 2025',
      bullets: [
        'Built real-time messaging system using Firebase Firestore & Storage with live updates and media uploads.',
        'Optimized UI performance and implemented scalable component architecture.',
        'Designed advanced UX flows including dynamic modals and long-press interactions.',
      ],
      tech: ['React Native', 'Firebase', 'Firestore', 'Expo'],
    },
    {
      company: 'BGDev',
      role: 'Founder & Lead Developer',
      period: '2024 – Present',
      bullets: [
        'Led development of AI-powered SaaS platforms including Convertonix and BGTasks.',
        'Built scalable front-end systems using React, Tailwind CSS, and Firebase.',
        'Managed full product lifecycle from concept to deployment and iteration.',
        'Delivered production-ready web platforms for startups and small businesses.',
      ],
      tech: ['React', 'Tailwind CSS', 'Firebase', 'AI Integrations', 'SaaS'],
    },
    {
      company: 'Venture Starters',
      role: 'Startup Research Intern',
      period: 'Oct 2025 – Jan 2026',
      bullets: [
        'Analyzed early-stage SaaS products, funding models, and growth strategies.',
        'Researched innovation trends across technology startups.',
      ],
      tech: ['SaaS', 'Market Research', 'Startup Analysis'],
    },
  ] as Experience[],

  education: [
    {
      school: 'Riga Technical University',
      degree: 'B.Sc. Computer Science & Information Technology',
      dates: '2022 – 2025',
      notes: 'Grade: 7.7',
    },
  ] as Education[],

  languages: [
    { lang: 'Azerbaijani', level: 'Native' },
    { lang: 'English', level: 'Fluent' },
    { lang: 'Turkish', level: 'Fluent' },
    { lang: 'Russian', level: 'Intermediate' },
    { lang: 'Latvian', level: 'Basic' },
  ] as { lang: string; level: string }[],

  certifications: [] as Certification[],

  projects: [
    {
      id: '1',
      slug: 'vesh',
      title: 'Vesh.az',
      shortDesc: 'Order from abroad — travel & shopping platform. Bookings, local experiences, real-time availability.',
      category: 'web',
      role: 'Frontend Developer',
      keyResult: 'Production platform for ordering from abroad and travel services.',
      stack: ['React', 'Next.js', 'TypeScript', 'REST API'],
      image: '/project-images/vesh.png',
      gradient: 'linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #0c4a6e 100%)',
      highlights: ['Səyahətlər', 'Order from abroad', 'Real-time availability', 'Responsive UI'],
      liveUrl: 'https://vesh.az/seyahetler/az',
    },
    {
      id: '2',
      slug: 'babak-auto-999',
      title: 'Babak Auto 999',
      shortDesc: 'Quality auto parts and accessories e-commerce. Product catalog, cart, responsive design.',
      category: 'ecommerce',
      role: 'Frontend Developer',
      keyResult: 'Live e-commerce site for automotive business — mobile-first, fast load.',
      stack: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      image: '/project-images/auto00.png',
      gradient: 'linear-gradient(135deg, #422006 0%, #292524 50%, #1c1917 100%)',
      highlights: ['Product catalog', 'Cart & checkout', 'Mobile-first', 'Quality auto parts'],
      liveUrl: 'https://babakauto999.com/',
    },
    {
      id: '3',
      slug: 'convertonix',
      title: 'Convertonix',
      shortDesc: 'AI-powered file converter — convert 100+ formats instantly. PDF, Word, images, videos.',
      category: 'saas',
      role: 'Frontend Developer',
      keyResult: 'AI-driven SaaS — multi-format conversion, instant results.',
      stack: ['React', 'AI Integration', 'TypeScript', 'Tailwind CSS', 'SaaS'],
      image: '/project-images/image.png',
      gradient: 'linear-gradient(135deg, #581c87 0%, #4c1d95 50%, #312e81 100%)',
      highlights: ['100+ formats', 'AI-powered', 'PDF, Word, images', 'Instant conversion'],
      liveUrl: 'https://convertonix.com/',
    },
    {
      id: '4',
      slug: 'bgdev',
      title: 'BGDev',
      shortDesc: 'Enterprise web development & AI solutions. Full-service agency for web and SaaS products.',
      category: 'web',
      role: 'Founder & Lead Developer',
      keyResult: 'Enterprise-grade web development and AI solutions agency.',
      stack: ['React', 'Next.js', 'AI Solutions', 'SaaS', 'Enterprise'],
      image: '/project-images/business.png',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)',
      highlights: ['Enterprise web', 'AI solutions', 'SaaS development', 'Full-stack'],
      liveUrl: 'https://bgdevofficial.com/',
    },
    {
      id: '5',
      slug: 'asnates-jsk',
      title: 'Asnates JSK',
      shortDesc: 'Corporate website and digital presence. Clean, professional design for Latvian market.',
      category: 'web',
      role: 'Frontend Developer',
      keyResult: 'Live corporate website — responsive, accessible.',
      stack: ['React', 'TypeScript', 'Responsive Design'],
      image: '/project-images/hooors.png',
      gradient: 'linear-gradient(135deg, #14532d 0%, #064e3b 50%, #134e4a 100%)',
      highlights: ['Corporate website', 'Responsive design', 'Latvian market'],
      liveUrl: 'https://asnatesjsk.lv/',
    },
    {
      id: '6',
      slug: 'portfolio',
      title: 'Portfolio Website',
      shortDesc: 'Modern portfolio with Next.js, TypeScript, Tailwind. Dark theme, case studies, accessible.',
      category: 'web',
      role: 'Developer',
      keyResult: 'Professional showcase — semantic HTML, performance, SEO.',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      image: '/meq2w.jpg',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)',
      highlights: ['Dark theme', 'Case studies', 'Accessibility', 'SEO'],
      liveUrl: 'https://bgasimzade99.github.io',
      githubUrl: 'https://github.com/bgasimzade99/bgasimzade99.github.io',
    },
  ] as Project[],

  socials: {
    linkedin: 'https://www.linkedin.com/in/babak-gasimzade-b939a5234/',
    github: 'https://github.com/bgasimzade99',
    instagram: 'https://www.instagram.com/bgdevofficial',
    email: 'gasimzadababak@gmail.com',
    phone: '+994 55 451 19 99',
  },

  cvUrl: '/Babak_Gasimzade_updated_EUR.pdf',
};

export type Profile = typeof profile;

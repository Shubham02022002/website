import type { Project } from '../types'

export const PROJECTS: Project[] = [
  {
    id: 'forge',
    title: 'Forge Studio',
    stack: 'Next.js · Express · Prisma',
    image: '/forgeStudio.png',
    links: [
      {
        label: 'forge-studio-kappa.vercel.app ↗',
        href: 'https://forge-studio-kappa.vercel.app',
      },
      {
        label: 'source ↗',
        href: 'https://github.com/Shubham02022002/forge-studio',
      },
    ],
    points: [
      'Built a full-stack AI app builder: describe an app in a sentence — or speak it — and it clarifies the spec, designs a blueprint, generates a real Vite + React codebase, and runs it live in the browser.',
      'Streamed generation token-by-token over SSE from Groq models (gpt-oss-20b / gpt-oss-120b) plus Whisper for voice input.',
      'Executed the generated project client-side in a WebContainer — a WebAssembly Node.js runtime that boots a real Vite dev server inside the browser tab.',
      'Proxied every browser request through a same-origin catch-all route so session cookies stay first-party across the Vercel and Render deployments.',
      'Engineered the backend with Express 5, Prisma and PostgreSQL (Neon), with Zod validation, bcrypt auth and GitHub OAuth.',
    ],
  },
  {
    id: 'paytm',
    title: 'Paytm',
    stack: 'MERN · JWT · Mongoose',
    image: '/paytm.png',
    links: [
      {
        label: 'paytmfintech.vercel.app ↗',
        href: 'https://paytmfintech.vercel.app/',
      },
    ],
    points: [
      'Built a full-stack Paytm clone using the MERN stack, handling secure end-to-end digital wallet transactions.',
      'Implemented MongoDB ACID transactions via Mongoose to ensure atomic payment transfers and prevent race conditions.',
      'Engineered secure auth pipelines using JWT for session management and Bcrypt for password hashing.',
      'Deployed frontend on Vercel and backend APIs on Render for continuous integration and delivery.',
      'Developing a cross-platform mobile client in React Native and migrating the codebase to TypeScript.',
    ],
  },
  {
    id: 'mirromind',
    title: 'MirroMind',
    stack: 'React Native · REST · STT / TTS',
    image: '/mirrorMind.png',
    links: [],
    points: [
      'Developing a voice-enabled system to create a context-aware digital replica using historical conversation data.',
      'Building a cross-platform mobile app using React Native.',
      'Designed and implemented backend services & RESTful APIs for storing and retrieving conversational context.',
      'Engineered context persistence and retrieval logic to enable personalized, real-time responses.',
      'Integrated speech-to-text and text-to-speech pipelines for seamless voice interaction.',
    ],
  },
  {
    id: 'strength',
    title: 'Strength Studio',
    stack: 'React · MUI · Rollup',
    image: '/strengthStudio.png',
    links: [
      {
        label: 'strength-studio-gamma.vercel.app ↗',
        href: 'https://strength-studio-gamma.vercel.app/',
      },
    ],
    points: [
      'Developed a gym website using React and MUI as a Single-Page Application (SPA).',
      'Created 5+ routes for features like payments and meeting booking, while maintaining clean, industry-level code.',
      'Packaged the whole project using the Rollup bundler.',
      'Used React-Toast for high user engagement and Email.js for handling customer queries.',
    ],
  },
]

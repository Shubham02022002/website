import type { SkillGroup } from "../types";

export const SKILLS: SkillGroup[] = [
  {
    label: "AI",
    items:
      "Agentic AI · LLM Tool-Use/Function Calling · Groq · Whisper · Claude · Google AI Studio · Agent Evaluation(Evals)",
  },
  {
    label: "Languages",
    items: "JavaScript · TypeScript · C++ · Python",
  },
  {
    label: "Frontend",
    items: "Next · React · Vite · Tailwind CSS · MUI",
  },
  {
    label: "Backend",
    items: "Node.js · Express · REST APIs · Server-Sent Events · Prisma · Zod",
  },
  {
    label: "Databases",
    items: "PostgreSQL · MongoDB · Mongoose · Redis",
  },
  {
    label: "Cloud & Infra",
    items:
      "Linux · AWS · Docker · Cloudflare Workers · Vercel · Render · CI/CD · Turborepo",
  },
];

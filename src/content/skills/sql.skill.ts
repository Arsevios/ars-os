import type { SkillProgress } from "../../types";

export const sqlInitialProgress: SkillProgress = {
  id: "sql",
  name: "SQL",
  category: "System Analysis",
  description: "Structured Query Language — основа технических собеседований",
  dependencies: [],
  color: "#6d28d9",
  maxLevel: 5,
  level: 0,
  xp: 0,
  xpToNext: 150,
  unlocked: [],
  locked: [
    "SELECT / WHERE / ORDER BY",
    "GROUP BY / HAVING",
    "JOIN (все виды)",
    "Подзапросы",
    "Window Functions",
    "Execution Plan",
  ],
};
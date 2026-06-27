import type { SkillProgress } from "../../types";

export const jiraInitialProgress: SkillProgress = {
  id: "jira",
  name: "Jira / Confluence",
  category: "System Analysis",
  description: "Задачи, баг-репорты, документация",
  dependencies: [],
  color: '#7c3aed',
  maxLevel: 3,
  level: 0,
  xp: 0,
  xpToNext: 80,
  unlocked: [],
  locked: [
    "Jira — задачи и эпики",
    "Баг-репорты",
    "Confluence документация",
  ],
};
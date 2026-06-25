import type { SkillProgress } from "../../types";

export const linkedinInitialProgress: SkillProgress = {
  id: "linkedin",
  name: "LinkedIn",
  category: "Personal Brand",
  description: "Профиль Junior SA для рынка США",
  dependencies: [],
  color: "#0a66c2",
  maxLevel: 3,
  level: 0,
  xp: 0,
  xpToNext: 90,
  unlocked: [],
  locked: [
    "Аудит профиля",
    "Headline + About",
    "Network building",
    "Контент-стратегия",
  ],
};
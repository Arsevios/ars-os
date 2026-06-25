import type { SkillProgress } from "../../types";

export const englishInitialProgress: SkillProgress = {
  id: "english",
  name: "English",
  category: "Soft Skills",
  description: "Цель: C1. Comprehensible input + shadowing + диктанты",
  dependencies: [],
  color: "#059669",
  maxLevel: 6,
  level: 0,
  xp: 0,
  xpToNext: 180,
  unlocked: ["A2 — базовый уровень"],
  locked: [
    "B1 Reading / Listening",
    "B1 Speaking (shadowing)",
    "B2 Technical vocabulary",
    "B2 → C1 переход",
    "C1 свободный",
  ],
};
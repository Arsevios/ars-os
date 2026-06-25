import type { SkillProgress } from "../../types";

export const bpmnInitialProgress: SkillProgress = {
  id: "bpmn",
  name: "BPMN / UML",
  category: "System Analysis",
  description: "Моделирование процессов и систем — Draw.io, Camunda",
  dependencies: ["sql"],
  color: "#b45309",
  maxLevel: 4,
  level: 0,
  xp: 0,
  xpToNext: 120,
  unlocked: [],
  locked: [
    "BPMN нотация",
    "UML Use Case",
    "UML Sequence",
    "Camunda / Draw.io",
  ],
};
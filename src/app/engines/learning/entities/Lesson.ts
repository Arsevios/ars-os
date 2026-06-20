import type { Step } from "./Step";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  steps: Step[];
  dependencies: string[];
  completionBonusXP: number;
  completionBonusCoins: number;
}
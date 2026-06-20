export interface StepProgress {
  stepId: string;
  skillId: string;
  completed: boolean;
  completedAt?: string;
}

export interface ReflectionAnswer {
  reflectionId: string;
  stepId: string;
  answer: string;
  answeredAt: string;
}

export interface SkillLevel {
  skillId: string;
  level: number;
  xp: number;
  xpToNext: number;
}

export interface UserProgress {
  steps: Record<string, StepProgress>;
  reflections: Record<string, ReflectionAnswer>;
  skillLevels: Record<string, SkillLevel>;
  totalXP: number;
  totalCoins: number;
}

export function createEmptyProgress(): UserProgress {
  return { steps: {}, reflections: {}, skillLevels: {}, totalXP: 0, totalCoins: 0 };
}
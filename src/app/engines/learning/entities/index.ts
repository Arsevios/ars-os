// =============================================================================
// src/app/engines/learning/entities/index.ts
//
// Central re-export for all entity types in the learning engine.
// No type definitions live here — each type is defined in its own file.
// =============================================================================

// Static content types (learning plan, never changes at runtime)
export type { Skill, SkillDefinition } from "./Skill";
export type { Module }                 from "./Module";
export type { Lesson }                 from "./Lesson";
export type { Step }                   from "./Step";
export type { Resource, ResourceType } from "./Resource";
export type { Verification, VerificationCriterion, VerificationType } from "./Verification";
export type { Reflection }             from "./Reflection";

// Runtime progress types (user state, changes during use)
export type {
  StepProgress,
  ReflectionAnswer,
  SkillLevel,
  UserProgress,
} from "./Progress";
export { createEmptyProgress } from "./Progress";

// Reward logic (pure functions, no side effects)
export {
  XP_PER_LEVEL,
  SKILL_XP_GROWTH_FACTOR,
  TASK_COMPLETION_BONUS_RATE,
  calculateLevel,
  calculateXPToNextLevel,
  calculatePomodoroXP,
  calculatePomodoroCoins,
  calculateTaskCompletionBonus,
  calculateStreakMultiplier,
  calculateNextSkillXPThreshold,
} from "./Reward";

// SkillProgress — runtime skill state, sourced from src/types
// Re-exported here so engine code imports from one place.
export type { SkillProgress } from "../../../../types";
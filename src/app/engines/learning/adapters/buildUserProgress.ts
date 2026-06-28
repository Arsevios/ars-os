// =============================================================================
// src/app/engines/learning/adapters/buildUserProgress.ts
//
// Data mapper: SkillProgress[] (Zustand store) → UserProgress (LearningEngine)
//
// Rules:
//   - No React, no Zustand, no side effects
//   - Pure function: input → new object
//   - Not business logic — only data shape conversion
//
// Note:
//   steps and reflections are empty until step-level persistence
//   is wired into the store (Phase 5).
// =============================================================================

import type { SkillProgress } from '../../../../types';
import type { UserProgress } from '../entities';

export const buildUserProgress = (
  skills: SkillProgress[],
  totalXP: number,
  totalCoins: number,
): UserProgress => ({
  steps: {},
  reflections: {},
  skillLevels: Object.fromEntries(
    skills.map(s => [
      s.id,
      { skillId: s.id, level: s.level, xp: s.xp, xpToNext: s.xpToNext },
    ]),
  ),
  totalXP,
  totalCoins,
});
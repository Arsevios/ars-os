// =============================================================================
// src/app/engines/learning/engine/LearningEngine.ts
//
// Pure domain service — the heart of ARS OS learning system.
//
// Rules:
//   - NO React, NO Zustand, NO localStorage, NO side effects
//   - Pure functions only: input → new object, never mutates
//   - Imports only from src/types and ../entities
//
// Dependency direction:
//   src/types + ../entities
//       ↓
//   LearningEngine   ← this file
//       ↓
//   src/store / src/features
// =============================================================================

import type { DayTask, Pomodoro } from '../../../../types';

import type {
  Skill,
  Lesson,
  Step,
  UserProgress,
  StepProgress,
  ReflectionAnswer,
  SkillLevel,
} from '../entities';

import {
  XP_PER_LEVEL,
  calculateNextSkillXPThreshold,
} from '../entities';

// ---------------------------------------------------------------------------
// Output types
// ---------------------------------------------------------------------------

export interface DayStats {
  totalStepsAvailable: number;
  completedToday: number;
  xpEarnedToday: number;
  coinsEarnedToday: number;
  completionPercent: number;
}

export interface LessonStatus {
  lesson: Lesson;
  isUnlocked: boolean;
  isComplete: boolean;
  completedSteps: number;
  totalSteps: number;
}

export interface SkillStatus {
  skillId: string;
  level: number;
  xp: number;
  xpToNext: number;
  completionPercent: number;
  nextLesson: Lesson | null;
  availableLessons: LessonStatus[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const todayISO = (): string => new Date().toISOString().slice(0, 10);

/**
 * Collect every Step across all modules and lessons of a skill.
 */
const getAllSteps = (skill: Skill): Step[] =>
  skill.modules.flatMap(m => m.lessons.flatMap(l => l.steps));

/**
 * Collect every Lesson across all modules of a skill, in order.
 */
const getAllLessons = (skill: Skill): Lesson[] =>
  skill.modules.flatMap(m => m.lessons);

// ---------------------------------------------------------------------------
// 1. isLessonComplete
// A lesson is complete when every one of its steps is marked completed
// in UserProgress.
// ---------------------------------------------------------------------------

export const isLessonComplete = (
  lesson: Lesson,
  progress: UserProgress,
): boolean =>
  lesson.steps.every(step => {
    const sp = progress.steps[step.id];
    return sp !== undefined && sp.completed;
  });

// ---------------------------------------------------------------------------
// 2. isLessonUnlocked
// A lesson is unlocked when every lesson listed in its dependencies
// has been completed. A lesson with no dependencies is always unlocked.
// ---------------------------------------------------------------------------

export const isLessonUnlocked = (
  lesson: Lesson,
  skill: Skill,
  progress: UserProgress,
): boolean => {
  if (lesson.dependencies.length === 0) return true;
  const allLessons = getAllLessons(skill);
  return lesson.dependencies.every(depId => {
    const dep = allLessons.find(l => l.id === depId);
    return dep !== undefined && isLessonComplete(dep, progress);
  });
};

// ---------------------------------------------------------------------------
// 3. getAvailableLessons
// Returns all lessons that are unlocked but not yet complete,
// with status metadata for each.
// ---------------------------------------------------------------------------

export const getAvailableLessons = (
  skill: Skill,
  progress: UserProgress,
): LessonStatus[] => {
  const allLessons = getAllLessons(skill);
  return allLessons
    .map(lesson => {
      const unlocked = isLessonUnlocked(lesson, skill, progress);
      const complete = isLessonComplete(lesson, progress);
      const completedSteps = lesson.steps.filter(s => {
        const sp = progress.steps[s.id];
        return sp?.completed === true;
      }).length;
      return {
        lesson,
        isUnlocked: unlocked,
        isComplete: complete,
        completedSteps,
        totalSteps: lesson.steps.length,
      };
    })
    .filter(ls => ls.isUnlocked && !ls.isComplete);
};

// ---------------------------------------------------------------------------
// 4. getNextLesson
// Returns the first unlocked, incomplete lesson in order.
// Respects module and lesson ordering.
// ---------------------------------------------------------------------------

export const getNextLesson = (
  skill: Skill,
  progress: UserProgress,
): Lesson | null => {
  for (const module of skill.modules) {
    for (const lesson of module.lessons) {
      if (
        isLessonUnlocked(lesson, skill, progress) &&
        !isLessonComplete(lesson, progress)
      ) {
        return lesson;
      }
    }
  }
  return null;
};

// ---------------------------------------------------------------------------
// 5. getNextStep
// Returns the first incomplete step in the given lesson.
// ---------------------------------------------------------------------------

export const getNextStep = (
  lesson: Lesson,
  progress: UserProgress,
): Step | null => {
  for (const step of lesson.steps) {
    const sp = progress.steps[step.id];
    if (!sp || !sp.completed) return step;
  }
  return null;
};

// ---------------------------------------------------------------------------
// 6. buildDayTasks
// Generates today's DayTask list from the active skill list and progress.
//
// Algorithm:
//   For each skill (in order):
//     1. Find the next lesson (unlocked + incomplete)
//     2. Find the next step in that lesson
//     3. Convert step → Pomodoro → DayTask
//   Stop when maxTasks is reached.
//
// Output is compatible with appStore.dayTasks shape.
// ---------------------------------------------------------------------------

const stepToPomodoro = (step: Step): Pomodoro => ({
  id: `pomo-${step.id}`,
  duration: step.estimatedMinutes,
  instruction: step.instruction,
  resource: step.resource?.title,
  resourceUrl: step.resource?.url,
  xpReward: step.baseXP,
  coinsReward: step.baseCoins,
  completed: false,
});

const stepToDayTask = (
  step: Step,
  lesson: Lesson,
  skill: Skill,
): DayTask => ({
  id: `task-${step.id}`,
  skillId: skill.id,
  title: `${skill.name}: ${lesson.title}`,
  xpReward: step.baseXP,
  coinsReward: step.baseCoins,
  completed: false,
  pomodoros: [stepToPomodoro(step)],
});

export const buildDayTasks = (
  skills: Skill[],
  progress: UserProgress,
  maxTasks = 3,
): DayTask[] => {
  const tasks: DayTask[] = [];

  for (const skill of skills) {
    if (tasks.length >= maxTasks) break;

    const lesson = getNextLesson(skill, progress);
    if (!lesson) continue;

    const step = getNextStep(lesson, progress);
    if (!step) continue;

    tasks.push(stepToDayTask(step, lesson, skill));
  }

  return tasks;
};

// ---------------------------------------------------------------------------
// 7. getSkillLevel
// Returns SkillLevel for a skill from UserProgress,
// or a safe default if the skill has not been started yet.
// ---------------------------------------------------------------------------

export const getSkillLevel = (
  skillId: string,
  progress: UserProgress,
): SkillLevel =>
  progress.skillLevels[skillId] ?? {
    skillId,
    level: 0,
    xp: 0,
    xpToNext: XP_PER_LEVEL,
  };

// ---------------------------------------------------------------------------
// 8. applyStepCompletion
// Pure function: takes a completed step and returns a new UserProgress.
//
// What it does:
//   - Marks the step as completed with a timestamp
//   - Adds baseXP to the skill's SkillLevel, checks for level-up
//   - Adds baseCoins to totalCoins
//   - Updates totalXP
//   - Never mutates the input
// ---------------------------------------------------------------------------

export const applyStepCompletion = (
  step: Step,
  skillId: string,
  progress: UserProgress,
): UserProgress => {
  const now = todayISO();

  // Mark step completed
  const updatedStepProgress: StepProgress = {
    stepId: step.id,
    skillId,
    completed: true,
    completedAt: now,
  };

  // Update skill XP and level
  const current = getSkillLevel(skillId, progress);
  let { level, xp, xpToNext } = current;

  xp += step.baseXP;

  // Level-up loop: handle multiple level-ups from a single step (edge case)
  while (xp >= xpToNext) {
    xp -= xpToNext;
    level += 1;
    xpToNext = calculateNextSkillXPThreshold(xpToNext);
  }

  const updatedSkillLevel: SkillLevel = {
    skillId,
    level,
    xp,
    xpToNext,
  };

  return {
    ...progress,
    steps: {
      ...progress.steps,
      [step.id]: updatedStepProgress,
    },
    skillLevels: {
      ...progress.skillLevels,
      [skillId]: updatedSkillLevel,
    },
    totalXP: progress.totalXP + step.baseXP,
    totalCoins: progress.totalCoins + step.baseCoins,
  };
};

// ---------------------------------------------------------------------------
// 9. applyReflection
// Pure function: records a reflection answer in UserProgress.
// ---------------------------------------------------------------------------

export const applyReflection = (
  reflectionId: string,
  stepId: string,
  answer: string,
  progress: UserProgress,
): UserProgress => {
  const reflectionAnswer: ReflectionAnswer = {
    reflectionId,
    stepId,
    answer,
    answeredAt: todayISO(),
  };

  return {
    ...progress,
    reflections: {
      ...progress.reflections,
      [reflectionId]: reflectionAnswer,
    },
  };
};

// ---------------------------------------------------------------------------
// 10. getSkillCompletionPercent
// Returns 0–100 representing how many steps have been completed
// across all modules and lessons of a skill.
// ---------------------------------------------------------------------------

export const getSkillCompletionPercent = (
  skill: Skill,
  progress: UserProgress,
): number => {
  const allSteps = getAllSteps(skill);
  if (allSteps.length === 0) return 0;

  const completed = allSteps.filter(s => {
    const sp = progress.steps[s.id];
    return sp?.completed === true;
  }).length;

  return Math.round((completed / allSteps.length) * 100);
};

// ---------------------------------------------------------------------------
// 11. getSkillStatus
// Composite function: returns the full status of a skill for the UI.
// ---------------------------------------------------------------------------

export const getSkillStatus = (
  skill: Skill,
  progress: UserProgress,
): SkillStatus => {
  const skillLevel = getSkillLevel(skill.id, progress);
  const availableLessons = getAvailableLessons(skill, progress);
  const nextLesson = getNextLesson(skill, progress);
  const completionPercent = getSkillCompletionPercent(skill, progress);

  return {
    skillId: skill.id,
    level: skillLevel.level,
    xp: skillLevel.xp,
    xpToNext: skillLevel.xpToNext,
    completionPercent,
    nextLesson,
    availableLessons,
  };
};

// ---------------------------------------------------------------------------
// 12. getDayStats
// Returns aggregate statistics for today across all skills.
// "Today" is determined by completedAt matching today's ISO date.
// ---------------------------------------------------------------------------

export const getDayStats = (
  skills: Skill[],
  progress: UserProgress,
): DayStats => {
  const today = todayISO();
  const allSteps = skills.flatMap(getAllSteps);

  const completedToday = Object.values(progress.steps).filter(
    sp => sp.completed && sp.completedAt === today,
  ).length;

  const xpEarnedToday = Object.values(progress.steps)
    .filter(sp => sp.completed && sp.completedAt === today)
    .reduce((sum, sp) => {
      const step = allSteps.find(s => s.id === sp.stepId);
      return sum + (step?.baseXP ?? 0);
    }, 0);

  const coinsEarnedToday = Object.values(progress.steps)
    .filter(sp => sp.completed && sp.completedAt === today)
    .reduce((sum, sp) => {
      const step = allSteps.find(s => s.id === sp.stepId);
      return sum + (step?.baseCoins ?? 0);
    }, 0);

  const totalStepsAvailable = skills.reduce((sum, skill) => {
    const lesson = getNextLesson(skill, progress);
    return sum + (lesson ? lesson.steps.length : 0);
  }, 0);

  const completionPercent =
    totalStepsAvailable > 0
      ? Math.round((completedToday / totalStepsAvailable) * 100)
      : 0;

  return {
    totalStepsAvailable,
    completedToday,
    xpEarnedToday,
    coinsEarnedToday,
    completionPercent,
  };
};
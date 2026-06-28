// =============================================================================
// src/app/engines/learning/engine/LearningEngine.ts
//
// Pure domain service — the heart of ARS OS learning system.
//
// Rules:
//   - NO React, NO Zustand, NO localStorage, NO side effects
//   - Pure functions only: input → new object, never mutates
//   - Imports only from src/types and ../entities
// =============================================================================

import type { DayTask, Pomodoro, Goal } from '../../../../types';

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

const getAllSteps = (skill: Skill): Step[] =>
  skill.modules.flatMap(m => m.lessons.flatMap(l => l.steps));

const getAllLessons = (skill: Skill): Lesson[] =>
  skill.modules.flatMap(m => m.lessons);

// ---------------------------------------------------------------------------
// 1. isLessonComplete
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
//
// Generates today's DayTask list sorted by goal priority.
// For each skill (sorted by priority from goals):
//   1. Find the next lesson
//   2. Find the next step
//   3. Convert step → Pomodoro → DayTask
//
// maxTasks: hard cap on number of tasks (default 5)
// goals: used for priority ordering — lower number = higher priority
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
  goals: Record<string, Goal>,
  maxTasks = 5,
): DayTask[] => {
  // Sort skills by goal priority (lower number = higher priority)
  // Skills without a goal go last
  const sorted = [...skills].sort((a, b) => {
    const pa = goals[a.id]?.priority ?? 99;
    const pb = goals[b.id]?.priority ?? 99;
    return pa - pb;
  });

  const tasks: DayTask[] = [];

  for (const skill of sorted) {
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
// ---------------------------------------------------------------------------

export const applyStepCompletion = (
  step: Step,
  skillId: string,
  progress: UserProgress,
): UserProgress => {
  const now = todayISO();

  const updatedStepProgress: StepProgress = {
    stepId: step.id,
    skillId,
    completed: true,
    completedAt: now,
  };

  const current = getSkillLevel(skillId, progress);
  let { level, xp, xpToNext } = current;

  xp += step.baseXP;

  while (xp >= xpToNext) {
    xp -= xpToNext;
    level += 1;
    xpToNext = calculateNextSkillXPThreshold(xpToNext);
  }

  const updatedSkillLevel: SkillLevel = { skillId, level, xp, xpToNext };

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
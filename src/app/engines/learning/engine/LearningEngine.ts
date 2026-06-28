// =============================================================================
// src/app/engines/learning/engine/LearningEngine.ts
//
// Pure domain service. No React, no Zustand, no side effects.
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
  name: string;
  category: string;
  description: string;
  color: string;
  maxLevel: number;
  level: number;
  xp: number;
  xpToNext: number;
  completionPercent: number;
  nextLesson: Lesson | null;
  availableLessons: LessonStatus[];
  totalLessons: number;
  completedLessons: number;
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
// Generates today's tasks sorted by goal priority.
// Skips steps already completed in UserProgress.
// Sets stepIds on DayTask to link back to learning content.
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
  stepIds: [step.id],            // links DayTask → Step without coupling Pomodoro
});

export const buildDayTasks = (
  skills: Skill[],
  progress: UserProgress,
  goals: Record<string, Goal>,
  maxTasks = 5,
): DayTask[] => {
  // Sort by goal priority (lower = higher priority), skills without goal go last
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

    // Find next incomplete step — UserProgress.steps drives this
    const step = getNextStep(lesson, progress);
    if (!step) continue;

    // Skip if already in today's task list (idempotent)
    if (tasks.some(t => t.stepIds.includes(step.id))) continue;

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
// Pure: returns new UserProgress with step marked complete + XP applied.
// ---------------------------------------------------------------------------

export const applyStepCompletion = (
  step: Step,
  skillId: string,
  progress: UserProgress,
): UserProgress => {
  // Idempotent — don't double-award XP
  if (progress.steps[step.id]?.completed) return progress;

  const now = todayISO();

  const updatedStep: StepProgress = {
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
    steps: { ...progress.steps, [step.id]: updatedStep },
    skillLevels: { ...progress.skillLevels, [skillId]: updatedSkillLevel },
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
    reflections: { ...progress.reflections, [reflectionId]: reflectionAnswer },
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
// Returns UI-ready status object — includes all fields needed for rendering.
// Store can cache this and expose it as skillStatuses[].
// ---------------------------------------------------------------------------

export const getSkillStatus = (
  skill: Skill,
  progress: UserProgress,
): SkillStatus => {
  const skillLevel = getSkillLevel(skill.id, progress);
  const availableLessons = getAvailableLessons(skill, progress);
  const nextLesson = getNextLesson(skill, progress);
  const completionPercent = getSkillCompletionPercent(skill, progress);
  const allLessons = getAllLessons(skill);
  const completedLessons = allLessons.filter(l =>
    isLessonComplete(l, progress),
  ).length;

  return {
    skillId: skill.id,
    name: skill.name,
    category: skill.category,
    description: skill.description,
    color: skill.color,
    maxLevel: skill.maxLevel,
    level: skillLevel.level,
    xp: skillLevel.xp,
    xpToNext: skillLevel.xpToNext,
    completionPercent,
    nextLesson,
    availableLessons,
    totalLessons: allLessons.length,
    completedLessons,
  };
};

// ---------------------------------------------------------------------------
// 12. computeSkillStatuses
// Batch version of getSkillStatus for the store to cache.
// ---------------------------------------------------------------------------

export const computeSkillStatuses = (
  skills: Skill[],
  progress: UserProgress,
): SkillStatus[] =>
  skills.map(skill => getSkillStatus(skill, progress));

// ---------------------------------------------------------------------------
// 13. getDayStats
// ---------------------------------------------------------------------------

export const getDayStats = (
  skills: Skill[],
  progress: UserProgress,
): DayStats => {
  const today = todayISO();
  const allSteps = skills.flatMap(getAllSteps);

  const completedTodaySteps = Object.values(progress.steps).filter(
    sp => sp.completed && sp.completedAt === today,
  );

  const completedToday = completedTodaySteps.length;

  const xpEarnedToday = completedTodaySteps.reduce((sum, sp) => {
    const step = allSteps.find(s => s.id === sp.stepId);
    return sum + (step?.baseXP ?? 0);
  }, 0);

  const coinsEarnedToday = completedTodaySteps.reduce((sum, sp) => {
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
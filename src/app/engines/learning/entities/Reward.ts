import type { Pomodoro, DayTask } from "../../../../types";

// ─── Константы ───────────────────────────────────────────────────────────────

export const XP_PER_LEVEL = 500;
export const SKILL_XP_GROWTH_FACTOR = 1.4;
export const TASK_COMPLETION_BONUS_RATE = 0.1; // 10% от награды задачи

// ─── Уровень персонажа ────────────────────────────────────────────────────────

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / XP_PER_LEVEL);
}

export function calculateXPToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  return (currentLevel + 1) * XP_PER_LEVEL - totalXP;
}

// ─── Помодоро ─────────────────────────────────────────────────────────────────

export function calculatePomodoroXP(pomo: Pomodoro): number {
  return pomo.xpReward;
}

export function calculatePomodoroCoins(pomo: Pomodoro): number {
  return pomo.coinsReward;
}

// ─── Бонус за завершение задачи ───────────────────────────────────────────────

export function calculateTaskCompletionBonus(
  task: DayTask
): { xp: number; coins: number } {
  const allDone = task.pomodoros.every((p) => p.completed);
  if (!allDone) return { xp: 0, coins: 0 };
  return {
    xp: Math.round(task.xpReward * TASK_COMPLETION_BONUS_RATE),
    coins: Math.round(task.coinsReward * TASK_COMPLETION_BONUS_RATE),
  };
}

// ─── Бонус стрика ─────────────────────────────────────────────────────────────

export function calculateStreakMultiplier(streak: number): number {
  if (streak >= 7) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
}

// ─── Рост XP до следующего уровня скилла ──────────────────────────────────────

export function calculateNextSkillXPThreshold(currentXPToNext: number): number {
  return Math.round(currentXPToNext * SKILL_XP_GROWTH_FACTOR);
}
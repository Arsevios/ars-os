// =============================================================================
// src/types/index.ts
// =============================================================================

// ---------------------------------------------------------------------------
// SkillDefinition — static learning content
// ---------------------------------------------------------------------------

export interface SkillDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  dependencies: string[];
  unlockRequiresLevel?: number;
  maxLevel: number;
  color: string;
}

// ---------------------------------------------------------------------------
// SkillProgress — runtime user state stored in Zustand
// ---------------------------------------------------------------------------

export interface SkillProgress {
  // Identity & display (duplicated from SkillDefinition until content split)
  id: string;
  name: string;
  category: string;
  description: string;
  dependencies: string[];
  color: string;

  // Rules
  maxLevel: number;

  // Runtime progress
  level: number;
  xp: number;
  xpToNext: number;
  unlocked: string[];
  locked: string[];
}

// Backward-compatibility alias
export type Skill = SkillProgress;

// ---------------------------------------------------------------------------
// Pomodoro — generic timer/work session unit
// Intentionally NOT coupled to learning Step.
// ---------------------------------------------------------------------------

export interface Pomodoro {
  id: string;
  duration: number;
  instruction: string;
  resource?: string;
  resourceUrl?: string;
  xpReward: number;
  coinsReward: number;
  completed: boolean;
}

// ---------------------------------------------------------------------------
// DayTask
// stepIds links this task to the learning Step(s) it covers.
// Kept separate from Pomodoro to preserve Pomodoro as a generic concept.
// ---------------------------------------------------------------------------

export interface DayTask {
  id: string;
  skillId: string;
  title: string;
  xpReward: number;
  coinsReward: number;
  completed: boolean;
  pomodoros: Pomodoro[];
  stepIds: string[];          // learning step IDs this task covers
}

// ---------------------------------------------------------------------------
// PomodoroSession
// ---------------------------------------------------------------------------

export type PomodoroPhase = "work" | "short-break" | "long-break";

export interface PomodoroSession {
  active: boolean;
  taskId: string | null;
  pomodoroId: string | null;
  phase: PomodoroPhase;
  secondsLeft: number;
  completedCycles: number;
}

// ---------------------------------------------------------------------------
// Goal
// ---------------------------------------------------------------------------

export interface Goal {
  category: string;
  dailyMinutes: number;
  xpPerMinute: number;
  priority: number;
}
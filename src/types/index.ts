// =============================================================================
// src/types/index.ts
// =============================================================================

// ---------------------------------------------------------------------------
// SkillDefinition — static learning content
// Identity, rules, structure metadata. No runtime state.
// Extended with modules[] in src/app/engines/learning/entities/Skill.ts
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
//
// Currently carries SkillDefinition fields as well because the store has not
// yet been split into separate definition + progress layers.
// Once the content layer (src/content/) is complete and the store reads
// definitions separately, the duplicated fields below will be removed.
// ---------------------------------------------------------------------------

export interface SkillProgress {
  // Identity & display (duplicated from SkillDefinition until content split)
  id: string;
  name: string;
  category: string;
  description: string;
  dependencies: string[];
  color: string;

  // Rules (static, but needed by addSkillXP logic in store)
  maxLevel: number;

  // Runtime progress (changes on every completed pomodoro)
  level: number;
  xp: number;
  xpToNext: number;
  unlocked: string[];
  locked: string[];
}

// Backward-compatibility alias — appStore and SkillTreePage import "Skill".
// Remove after full migration to SkillProgress.
export type Skill = SkillProgress;

// ---------------------------------------------------------------------------
// Pomodoro
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
// ---------------------------------------------------------------------------

export interface DayTask {
  id: string;
  skillId: string;
  title: string;
  xpReward: number;
  coinsReward: number;
  completed: boolean;
  pomodoros: Pomodoro[];
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
// =============================================================================
// src/types/index.ts
//
// Single source of truth for all shared domain types in ARS OS.
//
// Rules:
//   - No imports from store/, features/, components/, app/, services/
//   - No business logic
//   - No React
//   - Pure type declarations only
//
// Dependency direction:
//   src/types/index.ts  ← leaf node, no project imports
//       ↓
//   src/store/
//       ↓
//   src/features/ · src/components/
// =============================================================================

// ---------------------------------------------------------------------------
// Skill
// ---------------------------------------------------------------------------

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  level: number;
  maxLevel: number;
  xp: number;
  xpToNext: number;
  color: string;
  dependencies: string[];
  unlocked: string[];
  locked: string[];
}

// ---------------------------------------------------------------------------
// Pomodoro — a single work unit inside a DayTask
// ---------------------------------------------------------------------------

export interface Pomodoro {
  id: string;
  duration: number;        // minutes
  instruction: string;
  resource?: string;
  resourceUrl?: string;
  xpReward: number;
  coinsReward: number;
  completed: boolean;
}

// ---------------------------------------------------------------------------
// DayTask — today's task composed of one or more Pomodoros
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
// PomodoroSession — runtime timer state (not persisted between days)
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
// Goal — user-defined daily learning target per skill category
// ---------------------------------------------------------------------------

export interface Goal {
  category: string;
  dailyMinutes: number;
  xpPerMinute: number;
  priority: number;        // 1 = highest, 3 = lowest
}
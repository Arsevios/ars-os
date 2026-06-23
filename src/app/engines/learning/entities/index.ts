export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
  xp: number;
  xpToNext: number;
  description: string;
  unlocked: string[];
  locked: string[];
  dependencies: string[];
  color: string;
}

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

export interface DayTask {
  id: string;
  skillId: string;
  title: string;
  xpReward: number;
  coinsReward: number;
  pomodoros: Pomodoro[];
  completed: boolean;
}

export interface PomodoroSession {
  active: boolean;
  taskId: string | null;
  pomodoroId: string | null;
  phase: "work" | "short-break" | "long-break";
  secondsLeft: number;
  completedCycles: number;
}

export interface Goal {
  category: string;
  dailyMinutes: number;
  xpPerMinute: number;
  priority: number;
}
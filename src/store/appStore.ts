import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Skill, SkillProgress, SkillDefinition,
  Pomodoro, DayTask, PomodoroSession, Goal,
} from "../types";
import { INITIAL_SKILLS } from "../content";

// Re-export for backward compatibility
export type { Skill, SkillProgress, SkillDefinition, Pomodoro, DayTask, PomodoroSession, Goal };

// Skill definitions — static learning content
import { sqlSkill }     from "../app/engines/learning/data/skills/sql.skill";
import { restApiSkill } from "../app/engines/learning/data/skills/rest-api.skill";
import { englishSkill } from "../app/engines/learning/data/skills/english.skill";
import { bpmnSkill }    from "../app/engines/learning/data/skills/bpmn.skill";
import { jiraSkill }    from "../app/engines/learning/data/skills/jira.skill";

// Engine
import {
  buildDayTasks,
  applyStepCompletion,
  computeSkillStatuses,
  type SkillStatus,
} from "../app/engines/learning/engine/LearningEngine";

import type { UserProgress } from "../app/engines/learning/entities";
import { createEmptyProgress } from "../app/engines/learning/entities";

// Static registry — ordered by default priority
const SKILL_DEFINITIONS = [sqlSkill, restApiSkill, englishSkill, bpmnSkill, jiraSkill];

// Step lookup — maps stepId → Step for applyStepCompletion
import type { Step } from "../app/engines/learning/entities";

const ALL_STEPS: Record<string, { step: Step; skillId: string }> =
  SKILL_DEFINITIONS.reduce<Record<string, { step: Step; skillId: string }>>(
    (acc, skill) => {
      skill.modules.forEach(m =>
        m.lessons.forEach(l =>
          l.steps.forEach(s => {
            acc[s.id] = { step: s, skillId: skill.id };
          }),
        ),
      );
      return acc;
    },
    {},
  );

// ---------------------------------------------------------------------------
// AppState
// ---------------------------------------------------------------------------

interface AppState {
  // Identity
  name: string;
  title: string;
  dayStart: string;

  // XP & coins (summary counters — source of truth is userProgress)
  totalXP: number;
  todayXP: number;
  totalCoins: number;
  todayCoins: number;
  level: number;
  streak: number;
  xpGoalToday: number;
  coinsGoalToday: number;

  // Learning content state
  skills: Skill[];                   // SkillProgress[] for XP bar display
  userProgress: UserProgress;        // authoritative step-level progress
  skillStatuses: SkillStatus[];      // computed by LearningEngine, consumed by SkillTree

  // Daily work
  dayTasks: DayTask[];
  session: PomodoroSession;
  lastResetDate: string;
  goals: Record<string, Goal>;

  // Actions
  completePomodoro: (taskId: string, pomodoroId: string) => void;
  startPomodoro: (taskId: string, pomodoroId: string) => void;
  tickTimer: () => void;
  skipToBreak: () => void;
  endSession: () => void;
  addSkillXP: (skillId: string, xp: number) => void;
  resetDayIfNeeded: () => void;
  generateDayTasks: () => void;
  updateGoal: (category: string, patch: Partial<Goal>) => void;
  addGoal: (category: string, goal: Goal) => void;
  removeGoal: (category: string) => void;
}

// ---------------------------------------------------------------------------
// Initial goals
// ---------------------------------------------------------------------------

const INITIAL_GOALS: Record<string, Goal> = {
  sql:        { category: "sql",       dailyMinutes: 75,  xpPerMinute: 2,   priority: 1 },
  "rest-api": { category: "rest-api",  dailyMinutes: 50,  xpPerMinute: 2,   priority: 1 },
  english:    { category: "english",   dailyMinutes: 100, xpPerMinute: 1.5, priority: 1 },
  bpmn:       { category: "bpmn",      dailyMinutes: 50,  xpPerMinute: 2,   priority: 2 },
  jira:       { category: "jira",      dailyMinutes: 25,  xpPerMinute: 2,   priority: 3 },
};

const todayISO = () => new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      name: "Ars",
      title: "System Analyst",
      dayStart: todayISO(),
      totalXP: 0,
      todayXP: 0,
      totalCoins: 0,
      todayCoins: 0,
      level: 0,
      streak: 1,
      xpGoalToday: 540,
      coinsGoalToday: 108,
      skills: INITIAL_SKILLS,
      userProgress: createEmptyProgress(),
      skillStatuses: [],
      dayTasks: [],
      lastResetDate: todayISO(),
      goals: INITIAL_GOALS,
      session: {
        active: false,
        taskId: null,
        pomodoroId: null,
        phase: "work",
        secondsLeft: 25 * 60,
        completedCycles: 0,
      },

      // ---------------------------------------------------------------
      // generateDayTasks
      // Builds today's tasks from skill definitions + persisted progress.
      // ---------------------------------------------------------------
      generateDayTasks: () => {
        const state = get();
        const tasks = buildDayTasks(
          SKILL_DEFINITIONS,
          state.userProgress,
          state.goals,
          5,
        );
        const statuses = computeSkillStatuses(
          SKILL_DEFINITIONS,
          state.userProgress,
        );
        set({ dayTasks: tasks, skillStatuses: statuses });
      },

      // ---------------------------------------------------------------
      // resetDayIfNeeded
      // ---------------------------------------------------------------
      resetDayIfNeeded: () => {
        const today = todayISO();
        const state = get();
        if (state.lastResetDate !== today) {
          const tasks = buildDayTasks(
            SKILL_DEFINITIONS,
            state.userProgress,
            state.goals,
            5,
          );
          const statuses = computeSkillStatuses(
            SKILL_DEFINITIONS,
            state.userProgress,
          );
          set({
            todayXP: 0,
            todayCoins: 0,
            lastResetDate: today,
            dayTasks: tasks,
            skillStatuses: statuses,
          });
        }
      },

      // ---------------------------------------------------------------
      // startPomodoro
      // ---------------------------------------------------------------
      startPomodoro: (taskId, pomodoroId) => {
        const task = get().dayTasks.find((t) => t.id === taskId);
        const pomo = task?.pomodoros.find((p) => p.id === pomodoroId);
        if (!pomo) return;
        set({
          session: {
            active: true,
            taskId,
            pomodoroId,
            phase: "work",
            secondsLeft: pomo.duration * 60,
            completedCycles: get().session.completedCycles,
          },
        });
      },

      // ---------------------------------------------------------------
      // tickTimer
      // ---------------------------------------------------------------
      tickTimer: () => {
        const s = get().session;
        if (!s.active) return;
        if (s.secondsLeft > 0) {
          set((state) => ({
            session: { ...state.session, secondsLeft: state.session.secondsLeft - 1 },
          }));
        } else {
          if (s.phase === "work") {
            const cycles = s.completedCycles + 1;
            const breakDuration = cycles % 4 === 0 ? 30 : 5;
            set((state) => ({
              session: {
                ...state.session,
                phase: cycles % 4 === 0 ? "long-break" : "short-break",
                secondsLeft: breakDuration * 60,
                completedCycles: cycles,
              },
            }));
          } else {
            set((state) => ({
              session: { ...state.session, active: false },
            }));
          }
        }
      },

      // ---------------------------------------------------------------
      // skipToBreak
      // ---------------------------------------------------------------
      skipToBreak: () => {
        const s = get().session;
        const cycles = s.completedCycles + 1;
        const breakDuration = cycles % 4 === 0 ? 30 : 5;
        set((state) => ({
          session: {
            ...state.session,
            phase: cycles % 4 === 0 ? "long-break" : "short-break",
            secondsLeft: breakDuration * 60,
            completedCycles: cycles,
          },
        }));
      },

      // ---------------------------------------------------------------
      // endSession
      // ---------------------------------------------------------------
      endSession: () => {
        set((state) => ({
          session: { ...state.session, active: false, taskId: null, pomodoroId: null },
        }));
      },

      // ---------------------------------------------------------------
      // completePomodoro
      //
      // 1. Mark pomodoro done in dayTasks
      // 2. Look up the Step via task.stepIds
      // 3. Call LearningEngine.applyStepCompletion → new UserProgress
      // 4. Award XP + coins to summary counters
      // 5. Update SkillProgress (XP bar display)
      // 6. Recompute skillStatuses
      // 7. Regenerate dayTasks from new progress
      // ---------------------------------------------------------------
      completePomodoro: (taskId, pomodoroId) => {
        const state = get();
        const taskIdx = state.dayTasks.findIndex((t) => t.id === taskId);
        if (taskIdx === -1) return;
        const task = state.dayTasks[taskIdx];
        const pomoIdx = task.pomodoros.findIndex((p) => p.id === pomodoroId);
        if (pomoIdx === -1 || task.pomodoros[pomoIdx].completed) return;

        const pomo = task.pomodoros[pomoIdx];
        const newPomodoros = task.pomodoros.map((p, i) =>
          i === pomoIdx ? { ...p, completed: true } : p,
        );
        const allDone = newPomodoros.every((p) => p.completed);
        const updatedTasks = state.dayTasks.map((t, i) =>
          i === taskIdx ? { ...t, pomodoros: newPomodoros, completed: allDone } : t,
        );

        const xpGain = pomo.xpReward;
        const coinsGain = pomo.coinsReward;
        const newTotalXP = state.totalXP + xpGain;

        // Apply step completion to UserProgress via LearningEngine
        let newUserProgress = state.userProgress;
        for (const stepId of task.stepIds) {
          const entry = ALL_STEPS[stepId];
          if (entry) {
            newUserProgress = applyStepCompletion(
              entry.step,
              entry.skillId,
              newUserProgress,
            );
          }
        }

        // Recompute skill statuses and regenerate tasks from new progress
        const newStatuses = computeSkillStatuses(SKILL_DEFINITIONS, newUserProgress);
        const newDayTasks = buildDayTasks(
          SKILL_DEFINITIONS,
          newUserProgress,
          state.goals,
          5,
        ).map(t =>
          // Preserve completion state of tasks already done today
          updatedTasks.find(u => u.id === t.id) ?? t,
        );

        set({
          dayTasks: newDayTasks,
          userProgress: newUserProgress,
          skillStatuses: newStatuses,
          todayXP: state.todayXP + xpGain,
          todayCoins: state.todayCoins + coinsGain,
          totalXP: newTotalXP,
          totalCoins: state.totalCoins + coinsGain,
          level: Math.floor(newTotalXP / 500),
          session: { ...state.session, active: false, taskId: null, pomodoroId: null },
        });

        // Keep SkillProgress XP bars in sync
        get().addSkillXP(task.skillId, xpGain);
      },

      // ---------------------------------------------------------------
      // addSkillXP — updates SkillProgress XP bars (display only)
      // ---------------------------------------------------------------
      addSkillXP: (skillId, xp) => {
        set((state) => ({
          skills: state.skills.map((s) => {
            if (s.id !== skillId) return s;
            const newXP = s.xp + xp;
            if (newXP >= s.xpToNext && s.level < s.maxLevel) {
              const nextLocked = [...s.locked];
              const justUnlocked = nextLocked.shift() ?? "";
              return {
                ...s,
                xp: newXP - s.xpToNext,
                xpToNext: Math.round(s.xpToNext * 1.4),
                level: s.level + 1,
                unlocked: [...s.unlocked, justUnlocked],
                locked: nextLocked,
              };
            }
            return { ...s, xp: newXP };
          }),
        }));
      },

      // ---------------------------------------------------------------
      // Goal management
      // ---------------------------------------------------------------
      updateGoal: (category, patch) =>
        set((state) => ({
          goals: { ...state.goals, [category]: { ...state.goals[category], ...patch } },
        })),

      addGoal: (category, goal) =>
        set((state) => ({
          goals: { ...state.goals, [category]: goal },
        })),

      removeGoal: (category) =>
        set((state) => {
          const next = { ...state.goals };
          delete next[category];
          return { goals: next };
        }),
    }),
    { name: "ars-os-v1" },
  ),
);
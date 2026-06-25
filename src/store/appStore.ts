import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Skill, SkillProgress, SkillDefinition, Pomodoro, DayTask, PomodoroSession, Goal } from "../types";
// Re-export for backward compatibility — SkillTreePage, DashboardPage, SettingsPage не трогаем
export type { Skill, SkillProgress, SkillDefinition, Pomodoro, DayTask, PomodoroSession, Goal };
import { INITIAL_SKILLS } from "../content";

interface AppState {
  name: string;
  title: string;
  dayStart: string;
  totalXP: number;
  todayXP: number;
  totalCoins: number;
  todayCoins: number;
  level: number;
  streak: number;
  xpGoalToday: number;
  coinsGoalToday: number;
  skills: Skill[];
  dayTasks: DayTask[];
  session: PomodoroSession;
  lastResetDate: string;
  goals: Record<string, Goal>;

  completePomodoro: (taskId: string, pomodoroId: string) => void;
  startPomodoro: (taskId: string, pomodoroId: string) => void;
  tickTimer: () => void;
  skipToBreak: () => void;
  endSession: () => void;
  addSkillXP: (skillId: string, xp: number) => void;
  resetDayIfNeeded: () => void;
  updateGoal: (category: string, patch: Partial<Goal>) => void;
  addGoal: (category: string, goal: Goal) => void;
  removeGoal: (category: string) => void;
}


const INITIAL_GOALS: Record<string, Goal> = {
  sql:        { category: "sql",       dailyMinutes: 75,  xpPerMinute: 2,   priority: 1 },
  "rest-api": { category: "rest-api",  dailyMinutes: 50,  xpPerMinute: 2,   priority: 1 },
  english:    { category: "english",   dailyMinutes: 100, xpPerMinute: 1.5, priority: 1 },
  linkedin:   { category: "linkedin",  dailyMinutes: 25,  xpPerMinute: 3,   priority: 2 },
  bpmn:       { category: "bpmn",      dailyMinutes: 50,  xpPerMinute: 2,   priority: 2 },
  jira:       { category: "jira",      dailyMinutes: 25,  xpPerMinute: 2,   priority: 3 },
};

const TODAY_TASKS: DayTask[] = [
  {
    id: "task-sql",
    skillId: "sql",
    title: "SQL: SELECT / WHERE / ORDER BY",
    xpReward: 150,
    coinsReward: 30,
    completed: false,
    pomodoros: [
      {
        id: "sql-p1",
        duration: 25,
        instruction:
          "Пройди урок SELECT / WHERE на sqlbolt.com (Lessons 1–4). Напиши 5 своих запросов в редакторе.",
        resource: "SQLBolt — Lessons 1–4",
        resourceUrl: "https://sqlbolt.com",
        xpReward: 50,
        coinsReward: 10,
        completed: false,
      },
      {
        id: "sql-p2",
        duration: 25,
        instruction:
          "ORDER BY + LIMIT на sqlbolt.com (Lessons 5–6). Затем 5 запросов на mode.com/sql-tutorial.",
        resource: "Mode SQL Tutorial",
        resourceUrl: "https://mode.com/sql-tutorial",
        xpReward: 50,
        coinsReward: 10,
        completed: false,
      },
      {
        id: "sql-p3",
        duration: 25,
        instruction:
          "Без подсказок объясни вслух (запиши голос или напиши): разница между WHERE / ORDER BY / LIMIT. Потом проверь себя.",
        xpReward: 50,
        coinsReward: 10,
        completed: false,
      },
    ],
  },
  {
    id: "task-api",
    skillId: "rest-api",
    title: "REST / API: HTTP basics",
    xpReward: 120,
    coinsReward: 24,
    completed: false,
    pomodoros: [
      {
        id: "api-p1",
        duration: 25,
        instruction:
          "Смотри: 'HTTP Crash Course' — Traversy Media (YouTube). Выпиши методы GET/POST/PUT/DELETE и коды 200/201/400/401/404/500.",
        resource: "Traversy Media — HTTP Crash Course",
        resourceUrl: "https://youtube.com/watch?v=iYM2zFP3Zn0",
        xpReward: 60,
        coinsReward: 12,
        completed: false,
      },
      {
        id: "api-p2",
        duration: 25,
        instruction:
          "Открой Postman. Сделай 3 запроса к публичному API: GET https://jsonplaceholder.typicode.com/posts. POST /posts. GET /users/1.",
        resource: "JSONPlaceholder (публичный API)",
        resourceUrl: "https://jsonplaceholder.typicode.com",
        xpReward: 60,
        coinsReward: 12,
        completed: false,
      },
    ],
  },
  {
    id: "task-english",
    skillId: "english",
    title: "English: ежедневная рутина (2h)",
    xpReward: 180,
    coinsReward: 36,
    completed: false,
    pomodoros: [
      {
        id: "en-p1",
        duration: 25,
        instruction:
          "Comprehensible input B1: смотри 'English with Lucy' или 'BBC Learning English' на YouTube. Без субтитров. Напиши 3 вопроса по содержанию.",
        resource: "English with Lucy (YouTube)",
        resourceUrl: "https://youtube.com/@EnglishwithLucy",
        xpReward: 45,
        coinsReward: 9,
        completed: false,
      },
      {
        id: "en-p2",
        duration: 25,
        instruction:
          "Shadowing A2/B1: выбери любой эпизод 'Culips ESL Podcast'. Слушай 2 мин → повтори → запиши голос. Сравни произношение.",
        resource: "Culips ESL Podcast",
        resourceUrl: "https://culips.com",
        xpReward: 45,
        coinsReward: 9,
        completed: false,
      },
      {
        id: "en-p3",
        duration: 25,
        instruction:
          "Диктант: включи 'VOA Learning English' (Special English). Пиши текст на слух. Цель: менее 10 ошибок.",
        resource: "VOA Learning English",
        resourceUrl: "https://learningenglish.voanews.com",
        xpReward: 45,
        coinsReward: 9,
        completed: false,
      },
      {
        id: "en-p4",
        duration: 25,
        instruction:
          "Learning Log: напиши 5–10 предложений на английском — что изучил сегодня по SQL и API. Используй новые слова из диктанта.",
        xpReward: 45,
        coinsReward: 9,
        completed: false,
      },
    ],
  },
  {
    id: "task-linkedin",
    skillId: "linkedin",
    title: "LinkedIn: аудит профиля",
    xpReward: 90,
    coinsReward: 18,
    completed: false,
    pomodoros: [
      {
        id: "li-p1",
        duration: 25,
        instruction:
          "Найди 5 профилей 'Junior System Analyst' в LinkedIn (фильтр: США). Выпиши: 3 идеи для headline, 2 идеи для About, какие навыки они указывают.",
        resource: "LinkedIn Search",
        resourceUrl:
          "https://linkedin.com/search/results/people/?keywords=junior+system+analyst",
        xpReward: 90,
        coinsReward: 18,
        completed: false,
      },
    ],
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

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
      dayTasks: TODAY_TASKS,
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

      resetDayIfNeeded: () => {
        const today = todayISO();
        if (get().lastResetDate !== today) {
          set({
            todayXP: 0,
            todayCoins: 0,
            lastResetDate: today,
            dayTasks: TODAY_TASKS.map((t) => ({
              ...t,
              completed: false,
              pomodoros: t.pomodoros.map((p) => ({ ...p, completed: false })),
            })),
          });
        }
      },

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
            const breakDuration = cycles % 4 === 0 ? 15 : 5;
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

      skipToBreak: () => {
        const s = get().session;
        const cycles = s.completedCycles + 1;
        const breakDuration = cycles % 4 === 0 ? 15 : 5;
        set((state) => ({
          session: {
            ...state.session,
            phase: cycles % 4 === 0 ? "long-break" : "short-break",
            secondsLeft: breakDuration * 60,
            completedCycles: cycles,
          },
        }));
      },

      endSession: () => {
        set((state) => ({
          session: { ...state.session, active: false, taskId: null, pomodoroId: null },
        }));
      },

      completePomodoro: (taskId, pomodoroId) => {
        const state = get();
        const taskIdx = state.dayTasks.findIndex((t) => t.id === taskId);
        if (taskIdx === -1) return;
        const task = state.dayTasks[taskIdx];
        const pomoIdx = task.pomodoros.findIndex((p) => p.id === pomodoroId);
        if (pomoIdx === -1 || task.pomodoros[pomoIdx].completed) return;

        const pomo = task.pomodoros[pomoIdx];
        const newPomodoros = task.pomodoros.map((p, i) =>
          i === pomoIdx ? { ...p, completed: true } : p
        );
        const allDone = newPomodoros.every((p) => p.completed);
        const newTasks = state.dayTasks.map((t, i) =>
          i === taskIdx ? { ...t, pomodoros: newPomodoros, completed: allDone } : t
        );
        const xpGain = pomo.xpReward;
        const coinsGain = pomo.coinsReward;
        const newTotalXP = state.totalXP + xpGain;

        set({
          dayTasks: newTasks,
          todayXP: state.todayXP + xpGain,
          todayCoins: state.todayCoins + coinsGain,
          totalXP: newTotalXP,
          totalCoins: state.totalCoins + coinsGain,
          level: Math.floor(newTotalXP / 500),
          session: { ...state.session, active: false, taskId: null, pomodoroId: null },
        });

        get().addSkillXP(task.skillId, xpGain);
      },

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
    { name: "ars-os-v1" }
  )
);
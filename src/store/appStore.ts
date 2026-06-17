import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlannedTask {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  xp: number;
  category: string;
  timeSlot: string;
  completed: boolean;
}

export interface Goal {
  category: string;
  dailyMinutes: number;
  xpPerMinute: number;
  priority: number;
}

interface AppState {
  name: string;
  level: number;
  xp: number;
  currentMission: string;

  goals: Record<string, Goal>;

  dailyPlan: PlannedTask[];
  planDate: string | null;

  recentActivities: { id: string; text: string; xp: number; timestamp: number }[];

  setName: (name: string) => void;
  addXP: (value: number, text: string) => void;
  completeTask: (taskId: string) => void;
  generatePlan: () => void;
  setCurrentMission: (mission: string) => void;

  // Новые методы для целей
  updateGoal: (category: string, goal: Partial<Goal>) => void;
  addGoal: (category: string, goal: Goal) => void;
  removeGoal: (category: string) => void;
}

function generateTodayPlan(goals: Record<string, Goal>): PlannedTask[] {
  const plan: PlannedTask[] = [];
  let id = 1;

  const slots = [
    { start: "09:00", end: "09:30" },
    { start: "12:00", end: "12:30" },
    { start: "15:00", end: "15:30" },
    { start: "18:00", end: "18:30" },
    { start: "20:00", end: "20:30" },
  ];

  const sortedGoals = Object.values(goals).sort((a, b) => b.priority - a.priority);

  for (const goal of sortedGoals) {
    if (plan.length >= slots.length) break;
    const slot = slots[plan.length];
    plan.push({
      id: `task-${id++}`,
      title: getTaskTitle(goal.category),
      description: getTaskDescription(goal.category),
      durationMinutes: Math.min(goal.dailyMinutes, 60),
      xp: Math.floor(Math.min(goal.dailyMinutes, 60) * goal.xpPerMinute),
      category: goal.category,
      timeSlot: `${slot.start} – ${slot.end}`,
      completed: false,
    });
  }

  return plan;
}

function getTaskTitle(category: string): string {
  const titles: Record<string, string> = {
    sql: "SQL практика",
    english: "Английский язык",
    guitar: "Гитара",
    career: "Карьера / аналитика",
    creator: "Создание контента",
  };
  return titles[category] || category;
}

function getTaskDescription(category: string): string {
  const descs: Record<string, string> = {
    sql: "Оконные функции, JOIN, подзапросы — практика на sql-ex.ru",
    english: "Чтение статьи и перевод незнакомых слов",
    guitar: "Отработка аккордов CAGED и ритмических рисунков",
    career: "Изучение требований вакансий, обновление резюме",
    creator: "Написание сценария или съёмка видео",
  };
  return descs[category] || "Выполни задание из модуля";
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      name: "Arsen",
      level: 1,
      xp: 42,
      currentMission: "Стать Middle System Analyst",

      goals: {
        sql: { category: "sql", dailyMinutes: 30, xpPerMinute: 0.7, priority: 3 },
        english: { category: "english", dailyMinutes: 30, xpPerMinute: 0.5, priority: 2 },
        guitar: { category: "guitar", dailyMinutes: 30, xpPerMinute: 0.3, priority: 1 },
        career: { category: "career", dailyMinutes: 30, xpPerMinute: 0.6, priority: 3 },
        creator: { category: "creator", dailyMinutes: 30, xpPerMinute: 0.4, priority: 2 },
      },

      dailyPlan: [],
      planDate: null,
      recentActivities: [],

      setName: (name) => set({ name }),

      addXP: (value, text) =>
        set((state) => {
          const newXP = state.xp + value;
          const newLevel = Math.floor(newXP / 100) + 1;
          return {
            xp: newXP,
            level: newLevel,
            recentActivities: [
              { id: Date.now().toString(), text, xp: value, timestamp: Date.now() },
              ...state.recentActivities,
            ].slice(0, 10),
          };
        }),

      completeTask: (taskId) =>
        set((state) => {
          const task = state.dailyPlan.find((t) => t.id === taskId);
          if (!task || task.completed) return state;
          const newXP = state.xp + task.xp;
          const newLevel = Math.floor(newXP / 100) + 1;
          return {
            xp: newXP,
            level: newLevel,
            dailyPlan: state.dailyPlan.map((t) =>
              t.id === taskId ? { ...t, completed: true } : t
            ),
            recentActivities: [
              {
                id: Date.now().toString(),
                text: `Выполнено: ${task.title}`,
                xp: task.xp,
                timestamp: Date.now(),
              },
              ...state.recentActivities,
            ].slice(0, 10),
          };
        }),

      generatePlan: () => {
        const today = new Date().toISOString().slice(0, 10);
        const { goals, planDate } = get();
        if (planDate === today) return;
        const newPlan = generateTodayPlan(goals);
        set({ dailyPlan: newPlan, planDate: today });
      },

      setCurrentMission: (mission) => set({ currentMission: mission }),

      // Новые методы
      updateGoal: (category, partial) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [category]: { ...state.goals[category], ...partial },
          },
        })),

      addGoal: (category, goal) =>
        set((state) => ({
          goals: { ...state.goals, [category]: goal },
        })),

      removeGoal: (category) =>
        set((state) => {
          const { [category]: _, ...rest } = state.goals;
          return { goals: rest };
        }),
    }),
    { name: "ai-operating-system" }
  )
);
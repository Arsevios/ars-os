import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  name: string;
  level: number;
  xp: number;
  setName: (name: string) => void;
  addXP: (value: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      name: "Ars",
      level: 1,
      xp: 0,
      setName: (name) => set({ name }),
      addXP: (value) =>
        set((s) => {
          const xp = s.xp + value;
          return { xp, level: Math.floor(xp / 100) + 1 };
        }),
    }),
    { name: "ars-os-store" }
  )
);
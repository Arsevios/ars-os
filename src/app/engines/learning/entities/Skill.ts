import type { Module } from "./Module";

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  modules: Module[];
  dependencies: string[];
  unlockRequiresLevel?: number;
  maxLevel: number;
}
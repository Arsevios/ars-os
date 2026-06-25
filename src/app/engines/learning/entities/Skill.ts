import type { SkillDefinition } from "../../../../types";
import type { Module } from "./Module";

// SkillDefinition extended with the full module tree.
// src/types/index.ts defines the base (primitive fields only, no project imports).
// This interface adds modules[] which requires Module from the same entities layer.

export interface Skill extends SkillDefinition {
  modules: Module[];
}

// Re-export SkillDefinition so engine code can use the base type directly
// without importing from src/types when they only need the extended form.
export type { SkillDefinition };
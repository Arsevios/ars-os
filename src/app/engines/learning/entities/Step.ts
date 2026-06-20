import type { Resource } from "./Resource";
import type { Verification } from "./Verification";
import type { Reflection } from "./Reflection";

export interface Step {
  id: string;
  title: string;
  instruction: string;
  prerequisites: string[];
  resource?: Resource;
  estimatedMinutes: number;
  verification: Verification;
  reflection?: Reflection;
  baseXP: number;
  baseCoins: number;
}
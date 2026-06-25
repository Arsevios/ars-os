// =============================================================================
// src/content/index.ts
//
// Content layer — initial SkillProgress values for all skills.
//
// Rules:
//   - Imports only from src/types and other src/content files
//   - No React, no Zustand, no business logic
//   - Plain data only
//
// Dependency direction:
//   src/types/index.ts
//       ↓
//   src/content/  ← this layer
//       ↓
//   src/store/
// =============================================================================

import type { SkillProgress } from "../../types";

export { sqlInitialProgress }      from "./sql.skill";
export { restApiInitialProgress }  from "./rest-api.skill";
export { englishInitialProgress }  from "./english.skill";
export { linkedinInitialProgress } from "./skills/linkedin.skill";
export { bpmnInitialProgress }     from "./skills/bpmn.skill";
export { jiraInitialProgress }     from "./skills/jira.skill";

import { sqlInitialProgress }      from "./sql.skill";
import { restApiInitialProgress }  from "./rest-api.skill";
import { englishInitialProgress }  from "./english.skill";
import { linkedinInitialProgress } from "./skills/linkedin.skill";
import { bpmnInitialProgress }     from "./skills/bpmn.skill";
import { jiraInitialProgress }     from "./skills/jira.skill";

// ---------------------------------------------------------------------------
// INITIAL_SKILLS
// Ordered: System Analysis (by dependency order) → Soft Skills → Personal Brand
// This replaces INITIAL_SKILLS in src/store/appStore.ts
// ---------------------------------------------------------------------------

export const INITIAL_SKILLS: SkillProgress[] = [
  sqlInitialProgress,
  restApiInitialProgress,
  bpmnInitialProgress,
  jiraInitialProgress,
  englishInitialProgress,
  linkedinInitialProgress,
];
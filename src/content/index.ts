// =============================================================================
// src/content/index.ts
//
// Content layer — initial SkillProgress values for all skills.
//
// Rules:
//   - Imports only from src/types and other src/content files
//   - No React, no Zustand, no business logic
//   - Plain data only
// =============================================================================

import type { SkillProgress } from "../types";

export { sqlInitialProgress }      from "./skills/sql.skill";
export { restApiInitialProgress }  from "./skills/rest-api.skill";
export { englishInitialProgress }  from "./skills/english.skill";
export { linkedinInitialProgress } from "./skills/linkedin.skill";
export { bpmnInitialProgress }     from "./skills/bpmn.skill";
export { jiraInitialProgress }     from "./skills/jira.skill";

import { sqlInitialProgress }      from "./skills/sql.skill";
import { restApiInitialProgress }  from "./skills/rest-api.skill";
import { englishInitialProgress }  from "./skills/english.skill";
import { linkedinInitialProgress } from "./skills/linkedin.skill";
import { bpmnInitialProgress }     from "./skills/bpmn.skill";
import { jiraInitialProgress }     from "./skills/jira.skill";

export const INITIAL_SKILLS: SkillProgress[] = [
  sqlInitialProgress,
  restApiInitialProgress,
  bpmnInitialProgress,
  jiraInitialProgress,
  englishInitialProgress,
  linkedinInitialProgress,
];
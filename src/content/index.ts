import type { SkillProgress } from "../types";

export { sqlInitialProgress }     from "./skills/sql.skill";
export { restApiInitialProgress } from "./skills/rest-api.skill";
export { englishInitialProgress } from "./skills/english.skill";
export { bpmnInitialProgress }    from "./skills/bpmn.skill";
export { jiraInitialProgress }    from "./skills/jira.skill";

import { sqlInitialProgress }     from "./skills/sql.skill";
import { restApiInitialProgress } from "./skills/rest-api.skill";
import { englishInitialProgress } from "./skills/english.skill";
import { bpmnInitialProgress }    from "./skills/bpmn.skill";
import { jiraInitialProgress }    from "./skills/jira.skill";

export const INITIAL_SKILLS: SkillProgress[] = [
  sqlInitialProgress,
  restApiInitialProgress,
  bpmnInitialProgress,
  jiraInitialProgress,
  englishInitialProgress,
];
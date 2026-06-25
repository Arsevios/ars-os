import type { SkillProgress } from "../../types";

export const restApiInitialProgress: SkillProgress = {
  id: "rest-api",
  name: "REST / API",
  category: "System Analysis",
  description: "HTTP методы, коды ответов, Postman, Swagger, JSON",
  dependencies: [],
  color: "#0891b2",
  maxLevel: 4,
  level: 0,
  xp: 0,
  xpToNext: 120,
  unlocked: [],
  locked: [
    "HTTP методы GET/POST/PUT/DELETE",
    "Коды ответов",
    "Postman",
    "Swagger / OpenAPI",
    "JSON / XML",
  ],
};
import type { RouteDefinition } from "../../platform/http/types.js";
import { HomeworkService } from "./homework.service.js";

export function createHomeworkController(service: HomeworkService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/homework/assignments",
      handler: async () => service.listAssignments()
    },
    {
      method: "GET",
      path: "/api/homework/submissions",
      handler: async () => service.listSubmissions()
    }
  ];

  return { routes };
}

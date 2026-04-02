import type { RouteDefinition } from "../../platform/http/types.js";
import { CoursesService } from "./courses.service.js";

export function createCoursesController(service: CoursesService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/courses",
      handler: async () => service.listCourses()
    },
    {
      method: "GET",
      path: "/api/courses/enrollments",
      handler: async () => service.listEnrollments()
    }
  ];

  return { routes };
}

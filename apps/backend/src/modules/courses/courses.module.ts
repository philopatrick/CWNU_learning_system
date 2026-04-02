import { CoursesService } from "./courses.service.js";
import { createCoursesController } from "./courses.controller.js";

export function createCoursesModule() {
  const service = new CoursesService();
  const controller = createCoursesController(service);
  return { service, routes: controller.routes };
}

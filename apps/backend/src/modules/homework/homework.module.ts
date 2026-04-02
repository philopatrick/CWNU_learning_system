import { HomeworkService } from "./homework.service.js";
import { createHomeworkController } from "./homework.controller.js";

export function createHomeworkModule() {
  const service = new HomeworkService();
  const controller = createHomeworkController(service);
  return { service, routes: controller.routes };
}

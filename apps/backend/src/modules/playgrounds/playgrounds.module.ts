import { PlaygroundsService } from "./playgrounds.service.js";
import { createPlaygroundsController } from "./playgrounds.controller.js";

export function createPlaygroundsModule() {
  const service = new PlaygroundsService();
  const controller = createPlaygroundsController(service);
  return { service, routes: controller.routes };
}

import { AiService } from "./ai.service.js";
import { createAiController } from "./ai.controller.js";

export function createAiModule() {
  const service = new AiService();
  const controller = createAiController(service);
  return { service, routes: controller.routes };
}

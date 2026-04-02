import type { RouteDefinition } from "../../platform/http/types.js";
import { AiService } from "./ai.service.js";
import type { AiPromptRequest } from "./ai.types.js";

export function createAiController(service: AiService) {
  const routes: RouteDefinition[] = [
    {
      method: "POST",
      path: "/api/ai/prompt",
      handler: async ({ body }) => service.prompt(body as AiPromptRequest)
    }
  ];

  return { routes };
}

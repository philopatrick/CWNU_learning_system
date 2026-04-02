import type { RouteDefinition } from "../../platform/http/types.js";
import { PlaygroundsService } from "./playgrounds.service.js";
import type { CodeExecutionRequest } from "./playgrounds.types.js";

export function createPlaygroundsController(service: PlaygroundsService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/playgrounds",
      handler: async () => service.listSpecs()
    },
    {
      method: "POST",
      path: "/api/playgrounds/execute",
      handler: async ({ body }) => service.execute(body as CodeExecutionRequest)
    }
  ];

  return { routes };
}

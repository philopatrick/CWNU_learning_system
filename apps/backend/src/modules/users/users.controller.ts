import type { RouteDefinition } from "../../platform/http/types.js";
import { UsersService } from "./users.service.js";

export function createUsersController(service: UsersService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/users",
      handler: async () => service.listProfiles()
    },
    {
      method: "GET",
      path: "/api/users/:id",
      handler: async ({ params }) => service.getProfile(params.id)
    }
  ];

  return { routes };
}

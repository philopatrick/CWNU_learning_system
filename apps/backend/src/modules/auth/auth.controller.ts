import type { RouteDefinition } from "../../platform/http/types.js";
import { AuthService } from "./auth.service.js";

export function createAuthController(service: AuthService) {
  const routes: RouteDefinition[] = [
    {
      method: "POST",
      path: "/api/auth/login",
      handler: async ({ body }) => service.login(body as { email: string; password: string })
    },
    {
      method: "POST",
      path: "/api/auth/refresh",
      handler: async ({ body }) => service.refresh((body as { refreshToken: string }).refreshToken)
    }
  ];

  return { routes };
}

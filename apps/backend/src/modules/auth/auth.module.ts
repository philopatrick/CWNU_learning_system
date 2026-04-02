import { AuthService } from "./auth.service.js";
import { createAuthController } from "./auth.controller.js";
import type { AppEnv } from "../../config/env.js";

export function createAuthModule(env: AppEnv) {
  const service = new AuthService(env);
  const controller = createAuthController(service);
  return { service, routes: controller.routes };
}

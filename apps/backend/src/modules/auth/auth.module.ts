import { AuthService } from "./auth.service.js";
import { createAuthController } from "./auth.controller.js";

export function createAuthModule() {
  const service = new AuthService();
  const controller = createAuthController(service);
  return {
    service,
    routes: controller.routes
  };
}

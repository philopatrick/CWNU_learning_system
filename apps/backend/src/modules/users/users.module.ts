import { UsersService } from "./users.service.js";
import { createUsersController } from "./users.controller.js";

export function createUsersModule() {
  const service = new UsersService();
  const controller = createUsersController(service);
  return { service, routes: controller.routes };
}

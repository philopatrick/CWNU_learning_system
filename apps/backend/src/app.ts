import { createHttpApp } from "./platform/http/app.js";
import { createAuthModule } from "./modules/auth/auth.module.js";
import { createAttendanceModule } from "./modules/attendance/attendance.module.js";
import { createAiModule } from "./modules/ai/ai.module.js";
import { createCoursesModule } from "./modules/courses/courses.module.js";
import { createHomeworkModule } from "./modules/homework/homework.module.js";
import { createPlaygroundsModule } from "./modules/playgrounds/playgrounds.module.js";
import { createUsersModule } from "./modules/users/users.module.js";
import type { AppEnv } from "./config/env.js";

export function createBackendApp(env: AppEnv) {
  const app = createHttpApp({ name: "cwnu-backend", env });
  const auth = createAuthModule();
  const users = createUsersModule();
  const courses = createCoursesModule();
  const attendance = createAttendanceModule();
  const homework = createHomeworkModule();
  const playgrounds = createPlaygroundsModule();
  const ai = createAiModule();

  app.register(auth.routes);
  app.register(users.routes);
  app.register(courses.routes);
  app.register(attendance.routes);
  app.register(homework.routes);
  app.register(playgrounds.routes);
  app.register(ai.routes);

  app.get("/api/health", () => ({
    status: "ok",
    service: app.name,
    modules: [
      "auth",
      "users",
      "courses",
      "attendance",
      "homework",
      "playgrounds",
      "ai"
    ]
  }));

  return app;
}

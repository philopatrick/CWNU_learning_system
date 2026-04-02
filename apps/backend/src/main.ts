import { createBackendApp } from "./app.js";
import { loadEnv } from "./config/env.js";

async function bootstrap() {
  const env = loadEnv(process.env);
  const app = await createBackendApp(env);
  app.listen(env.port);
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

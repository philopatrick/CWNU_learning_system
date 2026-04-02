import { createBackendApp } from "./app.js";
import { loadEnv } from "./config/env.js";

const env = loadEnv(process.env);
const app = createBackendApp(env);

app.listen(env.port);

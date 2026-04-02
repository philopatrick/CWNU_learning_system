export interface AppEnv {
  nodeEnv: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  llmProvider: string;
  llmApiKey: string;
  llmModel: string;
}

export function loadEnv(source: NodeJS.ProcessEnv): AppEnv {
  return {
    nodeEnv: source.NODE_ENV ?? "development",
    port: Number(source.PORT ?? 4000),
    mongoUri: source.MONGODB_URI ?? "mongodb://127.0.0.1:27017/cwnu_learning_system",
    jwtSecret: source.JWT_SECRET ?? "replace-me",
    jwtRefreshSecret: source.JWT_REFRESH_SECRET ?? "replace-me-too",
    llmProvider: source.LLM_PROVIDER ?? "deepseek",
    llmApiKey: source.LLM_API_KEY ?? "",
    llmModel: source.LLM_MODEL ?? ""
  };
}

import { sharedSeed } from "@cwnu/shared/seed";
import type { AiPromptRequest, AiPromptResponse } from "./ai.types.js";

export class AiService {
  public async prompt(request: AiPromptRequest): Promise<AiPromptResponse> {
    const provider = request.provider ?? "deepseek";
    const capability = sharedSeed.aiProviderCapabilities.find((item) => item.provider === provider);

    return {
      conversationId: request.conversationId,
      provider,
      reply: "AI provider adapter is not wired yet. Use this endpoint for syntax help, compiler explanations, and guided hints after connecting a provider.",
      suggestions: [
        {
          kind: "next-step",
          title: "Connect provider adapter",
          detail: "Add a provider adapter before production use."
        },
        {
          kind: capability?.supportsCodeFixing ? "syntax" : "warning",
          title: "Planned teaching scope",
          detail: capability?.supportsTeachingHints
            ? "This provider is expected to support teaching hints and compiler explanation workflows."
            : "Current provider choice is intended for simple instructional prompts only."
        }
      ]
    };
  }
}

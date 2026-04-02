import { sharedSeed } from "@cwnu/shared/seed";
import { InMemoryRepository } from "../../common/memory-repository.js";
import type { CodeExecutionRequest, PlaygroundExecutionResult, PlaygroundSpec } from "./playgrounds.types.js";

export class PlaygroundsService {
  private readonly specs = new InMemoryRepository<PlaygroundSpec>(
    [...sharedSeed.playgroundLanguages] as PlaygroundSpec[]
  );

  public async listSpecs() {
    return this.specs.findAll();
  }

  public async execute(request: CodeExecutionRequest): Promise<PlaygroundExecutionResult> {
    return {
      success: false,
      stdout: "",
      stderr: `Runner service not connected yet for ${request.languageKey}.`,
      exitCode: 1,
      executionTimeMs: 0,
      memoryKb: 0,
      aiNotes: [
        "Wire a sandboxed runner service before enabling code execution.",
        "Keep compiler execution outside the main backend process."
      ]
    };
  }
}

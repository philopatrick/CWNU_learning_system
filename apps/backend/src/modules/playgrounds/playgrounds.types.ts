import type {
  CodeExecutionRequest as SharedCodeExecutionRequest,
  CodeExecutionResult,
  PlaygroundLanguage
} from "@cwnu/shared/playgrounds";

export type PlaygroundSpec = PlaygroundLanguage;
export type CodeExecutionRequest = SharedCodeExecutionRequest;
export type PlaygroundExecutionResult = CodeExecutionResult;

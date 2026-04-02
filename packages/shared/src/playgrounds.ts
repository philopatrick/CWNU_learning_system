import type { PlaygroundLanguageKey } from "./constants.js";

export interface PlaygroundLanguage {
  id: string;
  key: PlaygroundLanguageKey;
  displayName: string;
  extension: string;
  runtimeLabel: string;
  compiler?: string;
  docsUrl?: string;
  starterCode: string;
  learningTips: string[];
}

export interface PlaygroundExercise {
  id: string;
  languageId: string;
  title: string;
  prompt: string;
  starterCode?: string;
  solutionHints?: string[];
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export interface CodeExecutionRequest {
  languageKey: PlaygroundLanguageKey;
  sourceCode: string;
  stdin?: string;
  exerciseId?: string;
}

export interface CodeExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode?: number;
  executionTimeMs?: number;
  memoryKb?: number;
  aiNotes?: string[];
}

export interface PlaygroundLessonCard {
  id: string;
  languageId: string;
  title: string;
  summary: string;
  slug: string;
}

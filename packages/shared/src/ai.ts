import type { AiProviderName } from "./constants.js";

export interface AiMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface AiConversation {
  id: string;
  provider: AiProviderName;
  contextType: "playground" | "homework" | "attendance" | "general";
  contextId?: string;
  title: string;
  messages: AiMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AiAssistRequest {
  provider?: AiProviderName;
  conversationId?: string;
  contextType?: AiConversation["contextType"];
  contextId?: string;
  languageKey?: string;
  userPrompt: string;
  sourceCode?: string;
  errorOutput?: string;
  teachingMode?: "hint" | "explain" | "fix" | "review";
}

export interface AiAssistSuggestion {
  kind: "syntax" | "logic" | "explanation" | "next-step" | "warning";
  title: string;
  detail: string;
}

export interface AiAssistResponse {
  conversationId?: string;
  provider: AiProviderName;
  reply: string;
  suggestions?: AiAssistSuggestion[];
}

export interface AiProviderCapability {
  provider: AiProviderName;
  supportsCodeFixing: boolean;
  supportsTeachingHints: boolean;
  supportsMultilingual: boolean;
}

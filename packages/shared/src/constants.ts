export const USER_ROLES = ["student", "teacher", "admin"] as const;
export const USER_STATUSES = ["active", "pending", "suspended"] as const;
export const COURSE_STATUSES = ["draft", "active", "archived"] as const;
export const ATTENDANCE_STATUSES = ["present", "late", "absent", "excused"] as const;
export const HOMEWORK_STATUSES = ["draft", "published", "closed"] as const;
export const HOMEWORK_SUBMISSION_STATUSES = [
  "draft",
  "submitted",
  "returned",
  "graded",
] as const;
export const PLAYGROUND_LANGUAGES = [
  "html",
  "css",
  "javascript",
  "cpp",
  "java",
  "kotlin",
] as const;
export const AI_PROVIDER_NAMES = ["deepseek", "openai", "local"] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type CourseStatus = (typeof COURSE_STATUSES)[number];
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];
export type HomeworkStatus = (typeof HOMEWORK_STATUSES)[number];
export type HomeworkSubmissionStatus =
  (typeof HOMEWORK_SUBMISSION_STATUSES)[number];
export type PlaygroundLanguageKey = (typeof PLAYGROUND_LANGUAGES)[number];
export type AiProviderName = (typeof AI_PROVIDER_NAMES)[number];

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_CODE_TIMEOUT_MS = 5_000;
export const DEFAULT_CODE_MEMORY_MB = 256;

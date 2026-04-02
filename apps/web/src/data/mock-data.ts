import { sharedSeed } from "@cwnu/shared/seed";
import { PLAYGROUND_LANGUAGES } from "@cwnu/shared/constants";
import type { Metric } from "@/components/stat-grid";
import type { RoleCard } from "@/components/role-grid";
import type { TimelineItem } from "@/components/timeline-list";

export const systemMetrics: Metric[] = [
  { label: "students online", value: "248", detail: "12 active check-ins right now" },
  { label: "today's classes", value: "18", detail: "6 with attendance pending" },
  { label: "homework open", value: "31", detail: "9 due before midnight" }
];

export const adminMetrics: Metric[] = [
  { label: "users", value: "1,204", detail: "students, teachers, and admins" },
  { label: "courses", value: "42", detail: "language, coding, and seminar groups" },
  { label: "playground sessions", value: "87", detail: "editor runs and compiler requests" }
];

export const dashboardHighlights = [
  { title: "Attendance", detail: "Capture session presence with exceptions and notes." },
  { title: "Homework", detail: "Track assignments, submissions, feedback, and revisions." },
  { title: "Playgrounds", detail: "Pair compiler output with inline hints and guided fixes." }
];

export const roleCards: RoleCard[] = [
  {
    title: "Student",
    description: "View attendance, submit homework, and practice in playgrounds.",
    href: "/student",
    accent: "#0f766e",
    footer: "Attendance and coursework focused"
  },
  {
    title: "Teacher",
    description: "Take attendance, review submissions, and manage class groups.",
    href: "/teacher",
    accent: "#9a3412",
    footer: "Teaching operations and feedback loops"
  },
  {
    title: "Admin",
    description: "Oversee users, course structure, and system-level activity.",
    href: "/admin",
    accent: "#1d4ed8",
    footer: "Institution management and monitoring"
  }
];

export const studentAgenda: TimelineItem[] = [
  { label: "09:00", detail: "English reading class check-in opens" },
  { label: "11:10", detail: "C++ lab attendance pending confirmation" },
  { label: "15:30", detail: "Homework reminder for web fundamentals" }
];

export const studentHomework: TimelineItem[] = [
  { label: "HTML landing page", detail: "Submit by Wednesday with a short reflection" },
  { label: "Kotlin syntax drill", detail: "Complete 10 compiler-guided exercises" },
  { label: "Essay outline", detail: "Teacher comments available for revision" }
];

export const studentCourses = [
  ...sharedSeed.courses.map((course) => ({
    code: course.code,
    name: course.title,
    note: (course.tags ?? []).join(", ")
  }))
];

export const teacherAttendanceQueue = [
  { name: "Li Na", status: "present" },
  { name: "Amina Yusuf", status: "late by 8 minutes" },
  { name: "Maksym Chen", status: "excused" }
];

export const teacherHomeworkQueue = [
  { title: "HTML section review", detail: "14 submissions ready for feedback" },
  { title: "C++ loop exercise", detail: "3 submissions need syntax correction" },
  { title: "CSS layout task", detail: "2 students requested an AI hint" }
];

export const teacherClasses = [
  ...sharedSeed.courses.map((course) => ({
    code: course.code,
    name: course.title,
    note: `${course.semester} semester`
  }))
];

export const adminModules = [
  { title: "User directory", detail: "Search students, teachers, and permissions." },
  { title: "Course catalog", detail: "Map classes to teachers and sessions." },
  { title: "System logs", detail: "Review activity and service events." }
];

export const playgroundCatalog = [
  ...sharedSeed.playgroundLanguages.map((language) => ({
    title: language.displayName,
    detail: `${language.runtimeLabel} with learning tips and AI-assisted syntax support.`,
    tags: [language.key, language.compiler ?? "preview", ...language.learningTips.slice(0, 1)]
  }))
];

export const supportedPlaygroundKeys = PLAYGROUND_LANGUAGES;

import type { AttendanceStatus } from "@cwnu/shared/constants";

export interface AttendanceSession {
  id: string;
  courseId: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  checkInDeadline?: string;
  isOpen: boolean;
  createdBy: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  courseId: string;
  studentId: string;
  status: AttendanceStatus;
  checkedInAt?: string;
  note?: string;
  source?: "manual" | "qr" | "location" | "import";
}

export interface CreateAttendanceSessionRequest {
  courseId: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  checkInDeadline?: string;
}

export interface MarkAttendanceRequest {
  sessionId: string;
  studentId: string;
  status: AttendanceStatus;
  note?: string;
  source?: "manual" | "qr" | "location" | "import";
}

export interface AttendanceSummary {
  courseId: string;
  studentId: string;
  totalSessions: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  excusedCount: number;
  attendanceRate: number;
}

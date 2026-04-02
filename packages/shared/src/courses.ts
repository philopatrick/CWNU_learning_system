import type { CourseStatus } from "./constants.js";

export interface CourseMeetingTime {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description?: string;
  status: CourseStatus;
  teacherId: string;
  semester: string;
  credits?: number;
  capacity?: number;
  tags?: string[];
  meetingTimes?: CourseMeetingTime[];
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: string;
  status: "active" | "dropped" | "pending";
}

export interface CourseAssignment {
  courseId: string;
  teacherId: string;
  assignedAt: string;
}

export interface CreateCourseRequest {
  code: string;
  title: string;
  description?: string;
  semester: string;
  credits?: number;
  capacity?: number;
  meetingTimes?: CourseMeetingTime[];
  tags?: string[];
}

export interface EnrollStudentRequest {
  courseId: string;
  studentId: string;
}

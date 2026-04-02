import type { HomeworkStatus, HomeworkSubmissionStatus } from "./constants.js";

export interface HomeworkAttachment {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
}

export interface Homework {
  id: string;
  courseId: string;
  title: string;
  description: string;
  status: HomeworkStatus;
  dueAt: string;
  publishedAt?: string;
  maxScore?: number;
  attachments?: HomeworkAttachment[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  status: HomeworkSubmissionStatus;
  content?: string;
  attachments?: HomeworkAttachment[];
  submittedAt?: string;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
}

export interface CreateHomeworkRequest {
  courseId: string;
  title: string;
  description: string;
  dueAt: string;
  maxScore?: number;
  attachments?: HomeworkAttachment[];
}

export interface SubmitHomeworkRequest {
  homeworkId: string;
  studentId: string;
  content?: string;
  attachments?: HomeworkAttachment[];
}

export interface GradeHomeworkRequest {
  submissionId: string;
  score: number;
  feedback?: string;
}

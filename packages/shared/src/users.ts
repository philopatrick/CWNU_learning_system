import type { UserRole, UserStatus } from "./constants.js";

export interface UserIdentity {
  id: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  status: UserStatus;
  fullName: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  department?: string;
  bio?: string;
}

export interface StudentProfile extends UserProfile {
  role: "student";
  studentNumber: string;
  program?: string;
  gradeLevel?: string;
  nationality?: string;
}

export interface TeacherProfile extends UserProfile {
  role: "teacher";
  staffNumber: string;
  title?: string;
  office?: string;
}

export interface AdminProfile extends UserProfile {
  role: "admin";
  permissions: string[];
}

export type AppUser = StudentProfile | TeacherProfile | AdminProfile;

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AppUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterStudentRequest {
  fullName: string;
  email: string;
  password: string;
  studentNumber: string;
  program?: string;
  nationality?: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
}

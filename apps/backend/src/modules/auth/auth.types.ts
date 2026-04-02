import type { AuthSession as SharedAuthSession, LoginRequest, RegisterStudentRequest } from "@cwnu/shared/users";

export type LoginInput = LoginRequest;
export type AuthSession = SharedAuthSession;
export type RegisterStudentInput = RegisterStudentRequest;

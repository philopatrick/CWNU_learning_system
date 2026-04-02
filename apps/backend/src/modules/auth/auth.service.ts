import { hashPassword, verifyPassword, generateAccessToken, generateRefreshToken, verifyToken } from "../../platform/security/crypto.js";
import { UsersRepository } from "../users/users.repository.js";
import type { AppUser } from "@cwnu/shared/users";
import type { AuthSession, LoginInput, RegisterStudentInput } from "./auth.types.js";
import * as jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

export class AuthService {
  private readonly usersRepository = new UsersRepository();

  constructor(private env: { jwtSecret: string; jwtRefreshSecret: string }) {}

  async login(input: LoginInput): Promise<AuthSession | { error: string }> {
    const users = await this.usersRepository.findAll();
    const user = users.find((u: AppUser) => u.email === input.email);

    if (!user) {
      return { error: "Invalid email or password" };
    }

    // For initial setup, allow passwordless login for seed users
    // In production, this should always check password
    const passwordHash = (user as any).passwordHash;
    if (passwordHash) {
      const valid = await verifyPassword(input.password, passwordHash);
      if (!valid) {
        return { error: "Invalid email or password" };
      }
    }

    const tokens = this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      user
    };
  }

  async registerStudent(input: RegisterStudentInput): Promise<AuthSession | { error: string }> {
    const users = await this.usersRepository.findAll();

    if (users.some((u: AppUser) => u.email === input.email)) {
      return { error: "Email already registered" };
    }

    if (users.some((u: AppUser) => (u as any).studentNumber === input.studentNumber)) {
      return { error: "Student number already registered" };
    }

    const passwordHash = await hashPassword(input.password);

    const user: AppUser = {
      id: `u-student-${Date.now()}`,
      role: "student",
      status: "active",
      fullName: input.fullName,
      email: input.email,
      studentNumber: input.studentNumber,
      program: input.program,
      nationality: input.nationality
    };

    await this.usersRepository.saveWithPassword(user, passwordHash);

    const tokens = this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      user
    };
  }

  async refresh(refreshToken: string): Promise<AuthSession | { error: string }> {
    try {
      const decoded = verifyToken<{ userId: string }>(refreshToken, this.env.jwtRefreshSecret);

      if (!decoded) {
        return { error: "Invalid refresh token" };
      }

      const users = await this.usersRepository.findAll();
      const user = users.find((u: AppUser) => u.id === decoded.userId);

      if (!user) {
        return { error: "Invalid refresh token" };
      }

      const tokens = this.generateTokens(user);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        user
      };
    } catch {
      return { error: "Invalid refresh token" };
    }
  }

  private generateTokens(user: AppUser) {
    const accessToken = generateAccessToken(
      { userId: user.id, email: user.email, role: user.role },
      this.env.jwtSecret,
      "1h"
    );

    const refreshToken = generateRefreshToken(
      { userId: user.id, email: user.email, role: user.role },
      this.env.jwtRefreshSecret
    );

    return { accessToken, refreshToken };
  }
}

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import type { AppUser } from "@cwnu/shared/users";
import type { AppEnv } from "../../config/env.js";

const SALT_ROUNDS = 10;

export interface TokenPayload {
  userId: string;
  email: string;
  role: AppUser["role"];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateAccessToken(payload: TokenPayload, secret: string, expiresIn = "1h"): string {
  return jwt.sign(payload, secret as Secret, { expiresIn } as SignOptions);
}

export function generateRefreshToken(payload: TokenPayload, secret: string): string {
  return jwt.sign(payload, secret as Secret, { expiresIn: "30d" } as SignOptions);
}

export function verifyToken<T = TokenPayload>(token: string, secret: string): T | null {
  try {
    return jwt.verify(token, secret as Secret) as T;
  } catch {
    return null;
  }
}

export function decodeAccessToken(token: string): TokenPayload | null {
  return verifyToken(token, "placeholder") as TokenPayload | null;
}

export function getExpiryDate(): string {
  return new Date(Date.now() + 60 * 60 * 1000).toISOString();
}

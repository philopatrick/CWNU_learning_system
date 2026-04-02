import { sharedSeed } from "@cwnu/shared/seed";
import type { LoginInput, AuthSession } from "./auth.types.js";

export class AuthService {
  public async login(input: LoginInput): Promise<AuthSession> {
    const matchedUser =
      (sharedSeed.users.find((user) => user.email === input.email) ?? sharedSeed.users[0]) as AuthSession["user"];

    return {
      accessToken: `access.${input.email}`,
      refreshToken: `refresh.${input.email}`,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      user: matchedUser
    };
  }

  public async refresh(refreshToken: string): Promise<AuthSession> {
    const user = sharedSeed.users[0] as AuthSession["user"];

    return {
      accessToken: `access.${user.email}`,
      refreshToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      user
    };
  }
}

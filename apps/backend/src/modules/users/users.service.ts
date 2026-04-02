import { UsersRepository } from "./users.repository.js";
import type { UserProfile } from "./users.types.js";

export class UsersService {
  private readonly repository = new UsersRepository();

  public async listProfiles(): Promise<UserProfile[]> {
    return this.repository.findAll();
  }

  public async getProfile(id: string): Promise<UserProfile | undefined> {
    return this.repository.findById(id);
  }

  public async getProfileByEmail(email: string): Promise<UserProfile | undefined> {
    return this.repository.findByEmail(email);
  }
}

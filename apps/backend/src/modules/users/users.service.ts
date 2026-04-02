import { sharedSeed } from "@cwnu/shared/seed";
import { InMemoryRepository } from "../../common/memory-repository.js";
import type { UserProfile } from "./users.types.js";

export class UsersService {
  private readonly repository = new InMemoryRepository<UserProfile>([...sharedSeed.users] as UserProfile[]);

  public async listProfiles() {
    return this.repository.findAll();
  }

  public async getProfile(id: string) {
    return this.repository.findById(id);
  }
}

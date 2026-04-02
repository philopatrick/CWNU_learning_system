import { sharedSeed } from "@cwnu/shared/seed";
import { InMemoryRepository } from "../../common/memory-repository.js";
import type { HomeworkAssignment, HomeworkSubmission } from "./homework.types.js";

export class HomeworkService {
  private readonly assignments = new InMemoryRepository<HomeworkAssignment>(
    [...sharedSeed.homework] as HomeworkAssignment[]
  );
  private readonly submissions = new InMemoryRepository<HomeworkSubmission>(
    [...sharedSeed.homeworkSubmissions] as HomeworkSubmission[]
  );

  public async listAssignments() {
    return this.assignments.findAll();
  }

  public async listSubmissions() {
    return this.submissions.findAll();
  }
}

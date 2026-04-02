import { sharedSeed } from "@cwnu/shared/seed";
import { InMemoryRepository } from "../../common/memory-repository.js";
import type { Course, Enrollment } from "./courses.types.js";

export class CoursesService {
  private readonly courses = new InMemoryRepository<Course>([...sharedSeed.courses] as Course[]);
  private readonly enrollments = new InMemoryRepository<Enrollment>([...sharedSeed.enrollments] as Enrollment[]);

  public async listCourses() {
    return this.courses.findAll();
  }

  public async listEnrollments() {
    return this.enrollments.findAll();
  }
}

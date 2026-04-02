import { HomeworkRepository } from "./homework.repository.js";
import type { Homework, HomeworkSubmission, CreateHomeworkRequest, SubmitHomeworkRequest, GradeHomeworkRequest } from "./homework.types.js";
import type { HomeworkStatus, HomeworkSubmissionStatus } from "@cwnu/shared/constants";

export class HomeworkService {
  private readonly repository = new HomeworkRepository();

  public async listAssignments(): Promise<Homework[]> {
    return this.repository.findAllHomework();
  }

  public async getAssignment(id: string): Promise<Homework | undefined> {
    return this.repository.findHomeworkById(id);
  }

  public async getAssignmentsByCourse(courseId: string): Promise<Homework[]> {
    return this.repository.findHomeworkByCourse(courseId);
  }

  public async createAssignment(request: CreateHomeworkRequest, createdBy: string): Promise<Homework> {
    return this.repository.createHomework(request, createdBy);
  }

  public async publishAssignment(id: string): Promise<void> {
    return this.repository.updateHomeworkStatus(id, "published");
  }

  public async closeAssignment(id: string): Promise<void> {
    return this.repository.updateHomeworkStatus(id, "closed");
  }

  public async deleteAssignment(id: string): Promise<boolean> {
    return this.repository.deleteHomework(id);
  }

  public async listSubmissions(): Promise<HomeworkSubmission[]> {
    return this.repository.findAllSubmissions();
  }

  public async getSubmission(id: string): Promise<HomeworkSubmission | undefined> {
    return this.repository.findSubmissionById(id);
  }

  public async getSubmissionsByAssignment(homeworkId: string): Promise<HomeworkSubmission[]> {
    return this.repository.findSubmissionsByHomework(homeworkId);
  }

  public async getSubmissionsByStudent(studentId: string): Promise<HomeworkSubmission[]> {
    return this.repository.findSubmissionsByStudent(studentId);
  }

  public async getSubmissionByAssignmentAndStudent(homeworkId: string, studentId: string): Promise<HomeworkSubmission | undefined> {
    return this.repository.findSubmissionByHomeworkAndStudent(homeworkId, studentId);
  }

  public async submitHomework(request: SubmitHomeworkRequest): Promise<HomeworkSubmission> {
    return this.repository.submitHomework(request);
  }

  public async gradeSubmission(request: GradeHomeworkRequest, gradedBy: string): Promise<void> {
    return this.repository.gradeSubmission(request, gradedBy);
  }

  public async updateSubmissionStatus(id: string, status: HomeworkSubmissionStatus): Promise<void> {
    return this.repository.updateSubmissionStatus(id, status);
  }
}

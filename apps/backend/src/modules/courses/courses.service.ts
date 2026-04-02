import { CoursesRepository } from "./courses.repository.js";
import type { Course, Enrollment, CreateCourseRequest, EnrollStudentRequest } from "./courses.types.js";

export class CoursesService {
  private readonly repository = new CoursesRepository();

  public async listCourses(): Promise<Course[]> {
    return this.repository.findAllCourses();
  }

  public async getCourse(id: string): Promise<Course | undefined> {
    return this.repository.findCourseById(id);
  }

  public async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.repository.findCoursesByTeacherId(teacherId);
  }

  public async createCourse(request: CreateCourseRequest, teacherId: string): Promise<Course> {
    return this.repository.createCourse(request, teacherId);
  }

  public async deleteCourse(id: string): Promise<boolean> {
    return this.repository.deleteCourse(id);
  }

  public async listEnrollments(): Promise<Enrollment[]> {
    return this.repository.findAllEnrollments();
  }

  public async getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
    return this.repository.findEnrollmentsByCourseId(courseId);
  }

  public async getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
    return this.repository.findEnrollmentsByStudentId(studentId);
  }

  public async enrollStudent(request: EnrollStudentRequest): Promise<Enrollment> {
    return this.repository.enrollStudent(request);
  }

  public async updateEnrollmentStatus(id: string, status: "active" | "dropped" | "pending"): Promise<void> {
    return this.repository.updateEnrollmentStatus(id, status);
  }
}

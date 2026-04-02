import { ObjectId } from "mongodb";
import { getCollection } from "../../platform/mongodb/client.js";
import type { Course, Enrollment, CreateCourseRequest, EnrollStudentRequest, CourseMeetingTime } from "./courses.types.js";
import type { CourseStatus } from "@cwnu/shared/constants";

interface CourseDocument {
  _id?: ObjectId;
  id: string;
  code: string;
  title: string;
  description?: string;
  status: CourseStatus;
  teacherId: string;
  semester: string;
  credits?: number;
  capacity?: number;
  tags?: string[];
  meetingTimes?: { dayOfWeek: number; startTime: string; endTime: string; room?: string }[];
  createdAt: Date;
  updatedAt: Date;
}

interface EnrollmentDocument {
  _id?: ObjectId;
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  status: "active" | "dropped" | "pending";
}

export class CoursesRepository {
  private readonly coursesCollection = getCollection<CourseDocument>("courses");
  private readonly enrollmentsCollection = getCollection<EnrollmentDocument>("enrollments");

  // Course operations
  async findAllCourses(): Promise<Course[]> {
    const docs = await this.coursesCollection.find({}).toArray();
    return docs.map(this.toCourse);
  }

  async findCourseById(id: string): Promise<Course | undefined> {
    const doc = await this.coursesCollection.findOne({ id });
    return doc ? this.toCourse(doc) : undefined;
  }

  async findCoursesByTeacherId(teacherId: string): Promise<Course[]> {
    const docs = await this.coursesCollection.find({ teacherId }).toArray();
    return docs.map(this.toCourse);
  }

  async saveCourse(course: Course): Promise<Course> {
    const now = new Date();
    const doc: CourseDocument = {
      id: course.id,
      code: course.code,
      title: course.title,
      description: course.description,
      status: course.status,
      teacherId: course.teacherId,
      semester: course.semester,
      credits: course.credits,
      capacity: course.capacity,
      tags: course.tags,
      meetingTimes: course.meetingTimes,
      createdAt: course.createdAt ? new Date(course.createdAt) : now,
      updatedAt: now
    };

    await this.coursesCollection.updateOne({ id: course.id }, { $set: doc }, { upsert: true });
    return course;
  }

  async createCourse(request: CreateCourseRequest, teacherId: string): Promise<Course> {
    const now = new Date();
    const course: Course = {
      id: `course-${Date.now()}`,
      code: request.code,
      title: request.title,
      description: request.description,
      status: "draft",
      teacherId,
      semester: request.semester,
      credits: request.credits,
      capacity: request.capacity,
      tags: request.tags,
      meetingTimes: request.meetingTimes as CourseMeetingTime[] | undefined,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    await this.saveCourse(course);
    return course;
  }

  async deleteCourse(id: string): Promise<boolean> {
    await this.coursesCollection.deleteOne({ id });
    return true;
  }

  // Enrollment operations
  async findAllEnrollments(): Promise<Enrollment[]> {
    const docs = await this.enrollmentsCollection.find({}).toArray();
    return docs.map(this.toEnrollment);
  }

  async findEnrollmentsByCourseId(courseId: string): Promise<Enrollment[]> {
    const docs = await this.enrollmentsCollection.find({ courseId }).toArray();
    return docs.map(this.toEnrollment);
  }

  async findEnrollmentsByStudentId(studentId: string): Promise<Enrollment[]> {
    const docs = await this.enrollmentsCollection.find({ studentId }).toArray();
    return docs.map(this.toEnrollment);
  }

  async enrollStudent(request: EnrollStudentRequest): Promise<Enrollment> {
    const now = new Date();
    const enrollment: Enrollment = {
      id: `enrollment-${Date.now()}`,
      courseId: request.courseId,
      studentId: request.studentId,
      enrolledAt: now.toISOString(),
      status: "active"
    };

    const doc: EnrollmentDocument = {
      id: enrollment.id,
      courseId: enrollment.courseId,
      studentId: enrollment.studentId,
      enrolledAt: now,
      status: "active"
    };

    await this.enrollmentsCollection.updateOne({ id: enrollment.id }, { $set: doc }, { upsert: true });
    return enrollment;
  }

  async updateEnrollmentStatus(id: string, status: "active" | "dropped" | "pending"): Promise<void> {
    await this.enrollmentsCollection.updateOne({ id }, { $set: { status, updatedAt: new Date() } });
  }

  private toCourse(doc: CourseDocument): Course {
    return {
      id: doc.id,
      code: doc.code,
      title: doc.title,
      description: doc.description,
      status: doc.status,
      teacherId: doc.teacherId,
      semester: doc.semester,
      credits: doc.credits,
      capacity: doc.capacity,
      tags: doc.tags,
      meetingTimes: doc.meetingTimes as any,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    };
  }

  private toEnrollment(doc: EnrollmentDocument): Enrollment {
    return {
      id: doc.id,
      courseId: doc.courseId,
      studentId: doc.studentId,
      enrolledAt: doc.enrolledAt.toISOString(),
      status: doc.status
    };
  }
}

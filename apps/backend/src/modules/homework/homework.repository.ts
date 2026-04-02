import { ObjectId } from "mongodb";
import { getCollection } from "../../platform/mongodb/client.js";
import type { HomeworkStatus, HomeworkSubmissionStatus } from "@cwnu/shared/constants";
import type {
  Homework,
  HomeworkSubmission,
  CreateHomeworkRequest,
  SubmitHomeworkRequest,
  GradeHomeworkRequest
} from "./homework.types.js";

interface HomeworkAttachmentDocument {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
}

interface HomeworkDocument {
  _id?: ObjectId;
  id: string;
  courseId: string;
  title: string;
  description: string;
  status: HomeworkStatus;
  dueAt: Date;
  publishedAt?: Date;
  maxScore?: number;
  attachments?: HomeworkAttachmentDocument[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HomeworkSubmissionDocument {
  _id?: ObjectId;
  id: string;
  homeworkId: string;
  studentId: string;
  status: HomeworkSubmissionStatus;
  content?: string;
  attachments?: HomeworkAttachmentDocument[];
  submittedAt?: Date;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class HomeworkRepository {
  private readonly homeworkCollection = getCollection<HomeworkDocument>("homework");
  private readonly submissionsCollection = getCollection<HomeworkSubmissionDocument>("homeworkSubmissions");

  // Homework operations
  async findAllHomework(): Promise<Homework[]> {
    const docs = await this.homeworkCollection.find({}).toArray();
    return docs.map(this.toHomework);
  }

  async findHomeworkById(id: string): Promise<Homework | undefined> {
    const doc = await this.homeworkCollection.findOne({ id });
    return doc ? this.toHomework(doc) : undefined;
  }

  async findHomeworkByCourse(courseId: string): Promise<Homework[]> {
    const docs = await this.homeworkCollection.find({ courseId }).toArray();
    return docs.map(this.toHomework);
  }

  async createHomework(request: CreateHomeworkRequest, createdBy: string): Promise<Homework> {
    const now = new Date();
    const homework: Homework = {
      id: `homework-${Date.now()}`,
      courseId: request.courseId,
      title: request.title,
      description: request.description,
      status: "draft",
      dueAt: request.dueAt,
      publishedAt: undefined,
      maxScore: request.maxScore,
      attachments: request.attachments,
      createdBy,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    const doc: HomeworkDocument = {
      id: homework.id,
      courseId: homework.courseId,
      title: homework.title,
      description: homework.description,
      status: homework.status,
      dueAt: new Date(homework.dueAt),
      publishedAt: undefined,
      maxScore: homework.maxScore,
      attachments: homework.attachments,
      createdBy: homework.createdBy,
      createdAt: now,
      updatedAt: now
    };

    await this.homeworkCollection.insertOne(doc);
    return homework;
  }

  async updateHomeworkStatus(id: string, status: HomeworkStatus): Promise<void> {
    const update: Record<string, unknown> = { status, updatedAt: new Date() };
    if (status === "published") {
      update.publishedAt = new Date();
    }
    await this.homeworkCollection.updateOne({ id }, { $set: update });
  }

  async deleteHomework(id: string): Promise<boolean> {
    await this.homeworkCollection.deleteOne({ id });
    return true;
  }

  // Submission operations
  async findAllSubmissions(): Promise<HomeworkSubmission[]> {
    const docs = await this.submissionsCollection.find({}).toArray();
    return docs.map(this.toSubmission);
  }

  async findSubmissionById(id: string): Promise<HomeworkSubmission | undefined> {
    const doc = await this.submissionsCollection.findOne({ id });
    return doc ? this.toSubmission(doc) : undefined;
  }

  async findSubmissionsByHomework(homeworkId: string): Promise<HomeworkSubmission[]> {
    const docs = await this.submissionsCollection.find({ homeworkId }).toArray();
    return docs.map(this.toSubmission);
  }

  async findSubmissionsByStudent(studentId: string): Promise<HomeworkSubmission[]> {
    const docs = await this.submissionsCollection.find({ studentId }).toArray();
    return docs.map(this.toSubmission);
  }

  async findSubmissionByHomeworkAndStudent(homeworkId: string, studentId: string): Promise<HomeworkSubmission | undefined> {
    const doc = await this.submissionsCollection.findOne({ homeworkId, studentId });
    return doc ? this.toSubmission(doc) : undefined;
  }

  async submitHomework(request: SubmitHomeworkRequest): Promise<HomeworkSubmission> {
    const now = new Date();
    const submission: HomeworkSubmission = {
      id: `submission-${Date.now()}`,
      homeworkId: request.homeworkId,
      studentId: request.studentId,
      status: "submitted",
      content: request.content,
      attachments: request.attachments,
      submittedAt: now.toISOString()
    };

    const doc: HomeworkSubmissionDocument = {
      id: submission.id,
      homeworkId: submission.homeworkId,
      studentId: submission.studentId,
      status: submission.status,
      content: submission.content,
      attachments: submission.attachments,
      submittedAt: now,
      createdAt: now,
      updatedAt: now
    };

    await this.submissionsCollection.insertOne(doc);
    return submission;
  }

  async gradeSubmission(request: GradeHomeworkRequest, gradedBy: string): Promise<void> {
    const now = new Date();
    await this.submissionsCollection.updateOne(
      { id: request.submissionId },
      {
        $set: {
          score: request.score,
          feedback: request.feedback,
          gradedBy,
          gradedAt: now,
          status: "graded" as HomeworkSubmissionStatus,
          updatedAt: now
        }
      }
    );
  }

  async updateSubmissionStatus(id: string, status: HomeworkSubmissionStatus): Promise<void> {
    await this.submissionsCollection.updateOne(
      { id },
      { $set: { status, updatedAt: new Date() } }
    );
  }

  private toHomework(doc: HomeworkDocument): Homework {
    return {
      id: doc.id,
      courseId: doc.courseId,
      title: doc.title,
      description: doc.description,
      status: doc.status,
      dueAt: doc.dueAt.toISOString(),
      publishedAt: doc.publishedAt?.toISOString(),
      maxScore: doc.maxScore,
      attachments: doc.attachments?.map((a) => ({
        id: a.id,
        name: a.name,
        url: a.url,
        mimeType: a.mimeType
      })),
      createdBy: doc.createdBy,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    };
  }

  private toSubmission(doc: HomeworkSubmissionDocument): HomeworkSubmission {
    return {
      id: doc.id,
      homeworkId: doc.homeworkId,
      studentId: doc.studentId,
      status: doc.status,
      content: doc.content,
      attachments: doc.attachments?.map((a) => ({
        id: a.id,
        name: a.name,
        url: a.url,
        mimeType: a.mimeType
      })),
      submittedAt: doc.submittedAt?.toISOString(),
      score: doc.score,
      feedback: doc.feedback,
      gradedBy: doc.gradedBy,
      gradedAt: doc.gradedAt?.toISOString()
    };
  }
}

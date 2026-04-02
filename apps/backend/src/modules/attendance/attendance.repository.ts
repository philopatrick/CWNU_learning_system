import { ObjectId } from "mongodb";
import { getCollection } from "../../platform/mongodb/client.js";
import type { AttendanceStatus } from "@cwnu/shared/constants";
import type {
  AttendanceSession,
  AttendanceRecord,
  CreateAttendanceSessionRequest,
  MarkAttendanceRequest
} from "./attendance.types.js";

interface AttendanceSessionDocument {
  _id?: ObjectId;
  id: string;
  courseId: string;
  title: string;
  startsAt: Date;
  endsAt?: Date;
  checkInDeadline?: Date;
  isOpen: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AttendanceRecordDocument {
  _id?: ObjectId;
  id: string;
  sessionId: string;
  courseId: string;
  studentId: string;
  status: AttendanceStatus;
  checkedInAt?: Date;
  note?: string;
  source?: "manual" | "qr" | "location" | "import";
  createdAt: Date;
  updatedAt: Date;
}

export class AttendanceRepository {
  private readonly sessionsCollection = getCollection<AttendanceSessionDocument>("attendanceSessions");
  private readonly recordsCollection = getCollection<AttendanceRecordDocument>("attendanceRecords");

  // Session operations
  async findAllSessions(): Promise<AttendanceSession[]> {
    const docs = await this.sessionsCollection.find({}).toArray();
    return docs.map(this.toSession);
  }

  async findSessionById(id: string): Promise<AttendanceSession | undefined> {
    const doc = await this.sessionsCollection.findOne({ id });
    return doc ? this.toSession(doc) : undefined;
  }

  async findSessionsByCourse(courseId: string): Promise<AttendanceSession[]> {
    const docs = await this.sessionsCollection.find({ courseId }).toArray();
    return docs.map(this.toSession);
  }

  async findOpenSessions(): Promise<AttendanceSession[]> {
    const docs = await this.sessionsCollection.find({ isOpen: true }).toArray();
    return docs.map(this.toSession);
  }

  async createSession(request: CreateAttendanceSessionRequest, createdBy: string): Promise<AttendanceSession> {
    const now = new Date();
    const session: AttendanceSession = {
      id: `session-${Date.now()}`,
      courseId: request.courseId,
      title: request.title,
      startsAt: request.startsAt,
      endsAt: request.endsAt,
      checkInDeadline: request.checkInDeadline,
      isOpen: true,
      createdBy
    };

    const doc: AttendanceSessionDocument = {
      id: session.id,
      courseId: session.courseId,
      title: session.title,
      startsAt: new Date(session.startsAt),
      endsAt: session.endsAt ? new Date(session.endsAt) : undefined,
      checkInDeadline: session.checkInDeadline ? new Date(session.checkInDeadline) : undefined,
      isOpen: session.isOpen,
      createdBy: session.createdBy,
      createdAt: now,
      updatedAt: now
    };

    await this.sessionsCollection.insertOne(doc);
    return session;
  }

  async updateSessionStatus(id: string, isOpen: boolean): Promise<void> {
    await this.sessionsCollection.updateOne({ id }, { $set: { isOpen, updatedAt: new Date() } });
  }

  async deleteSession(id: string): Promise<boolean> {
    await this.sessionsCollection.deleteOne({ id });
    return true;
  }

  // Record operations
  async findAllRecords(): Promise<AttendanceRecord[]> {
    const docs = await this.recordsCollection.find({}).toArray();
    return docs.map(this.toRecord);
  }

  async findRecordsBySession(sessionId: string): Promise<AttendanceRecord[]> {
    const docs = await this.recordsCollection.find({ sessionId }).toArray();
    return docs.map(this.toRecord);
  }

  async findRecordsByCourse(courseId: string): Promise<AttendanceRecord[]> {
    const docs = await this.recordsCollection.find({ courseId }).toArray();
    return docs.map(this.toRecord);
  }

  async findRecordsByStudent(studentId: string): Promise<AttendanceRecord[]> {
    const docs = await this.recordsCollection.find({ studentId }).toArray();
    return docs.map(this.toRecord);
  }

  async findRecordBySessionAndStudent(sessionId: string, studentId: string): Promise<AttendanceRecord | undefined> {
    const doc = await this.recordsCollection.findOne({ sessionId, studentId });
    return doc ? this.toRecord(doc) : undefined;
  }

  async markAttendance(request: MarkAttendanceRequest, courseId: string): Promise<AttendanceRecord> {
    const now = new Date();
    const record: AttendanceRecord = {
      id: `record-${Date.now()}`,
      sessionId: request.sessionId,
      courseId,
      studentId: request.studentId,
      status: request.status,
      checkedInAt: now.toISOString(),
      note: request.note,
      source: request.source || "manual"
    };

    const doc: AttendanceRecordDocument = {
      id: record.id,
      sessionId: record.sessionId,
      courseId: record.courseId,
      studentId: record.studentId,
      status: record.status,
      checkedInAt: now,
      note: record.note,
      source: record.source,
      createdAt: now,
      updatedAt: now
    };

    await this.recordsCollection.insertOne(doc);
    return record;
  }

  async updateAttendanceRecord(id: string, status: AttendanceStatus, note?: string): Promise<void> {
    await this.recordsCollection.updateOne(
      { id },
      { $set: { status, note, updatedAt: new Date() } }
    );
  }

  async getAttendanceSummary(courseId: string, studentId: string) {
    const records = await this.findRecordsByCourse(courseId);
    const studentRecords = records.filter((r) => r.studentId === studentId);

    const totalSessions = studentRecords.length;
    const presentCount = studentRecords.filter((r) => r.status === "present").length;
    const lateCount = studentRecords.filter((r) => r.status === "late").length;
    const absentCount = studentRecords.filter((r) => r.status === "absent").length;
    const excusedCount = studentRecords.filter((r) => r.status === "excused").length;
    const attendanceRate = totalSessions > 0 ? (presentCount + lateCount) / totalSessions : 0;

    return {
      courseId,
      studentId,
      totalSessions,
      presentCount,
      lateCount,
      absentCount,
      excusedCount,
      attendanceRate
    };
  }

  private toSession(doc: AttendanceSessionDocument): AttendanceSession {
    return {
      id: doc.id,
      courseId: doc.courseId,
      title: doc.title,
      startsAt: doc.startsAt.toISOString(),
      endsAt: doc.endsAt?.toISOString(),
      checkInDeadline: doc.checkInDeadline?.toISOString(),
      isOpen: doc.isOpen,
      createdBy: doc.createdBy
    };
  }

  private toRecord(doc: AttendanceRecordDocument): AttendanceRecord {
    return {
      id: doc.id,
      sessionId: doc.sessionId,
      courseId: doc.courseId,
      studentId: doc.studentId,
      status: doc.status,
      checkedInAt: doc.checkedInAt?.toISOString(),
      note: doc.note,
      source: doc.source
    };
  }
}

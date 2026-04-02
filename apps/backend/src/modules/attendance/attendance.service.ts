import { AttendanceRepository } from "./attendance.repository.js";
import type { AttendanceSession, AttendanceRecord, CreateAttendanceSessionRequest, MarkAttendanceRequest } from "./attendance.types.js";
import type { AttendanceSummary } from "@cwnu/shared/attendance";

export class AttendanceService {
  private readonly repository = new AttendanceRepository();

  public async listSessions(): Promise<AttendanceSession[]> {
    return this.repository.findAllSessions();
  }

  public async getSession(id: string): Promise<AttendanceSession | undefined> {
    return this.repository.findSessionById(id);
  }

  public async getSessionsByCourse(courseId: string): Promise<AttendanceSession[]> {
    return this.repository.findSessionsByCourse(courseId);
  }

  public async getOpenSessions(): Promise<AttendanceSession[]> {
    return this.repository.findOpenSessions();
  }

  public async createSession(request: CreateAttendanceSessionRequest, createdBy: string): Promise<AttendanceSession> {
    return this.repository.createSession(request, createdBy);
  }

  public async closeSession(id: string): Promise<void> {
    return this.repository.updateSessionStatus(id, false);
  }

  public async openSession(id: string): Promise<void> {
    return this.repository.updateSessionStatus(id, true);
  }

  public async deleteSession(id: string): Promise<boolean> {
    return this.repository.deleteSession(id);
  }

  public async listRecords(): Promise<AttendanceRecord[]> {
    return this.repository.findAllRecords();
  }

  public async getRecordsBySession(sessionId: string): Promise<AttendanceRecord[]> {
    return this.repository.findRecordsBySession(sessionId);
  }

  public async getRecordsByCourse(courseId: string): Promise<AttendanceRecord[]> {
    return this.repository.findRecordsByCourse(courseId);
  }

  public async getRecordsByStudent(studentId: string): Promise<AttendanceRecord[]> {
    return this.repository.findRecordsByStudent(studentId);
  }

  public async markAttendance(request: MarkAttendanceRequest, courseId: string): Promise<AttendanceRecord> {
    return this.repository.markAttendance(request, courseId);
  }

  public async updateRecord(id: string, status: string, note?: string): Promise<void> {
    return this.repository.updateAttendanceRecord(id, status as any, note);
  }

  public async getAttendanceSummary(courseId: string, studentId: string): Promise<AttendanceSummary> {
    return this.repository.getAttendanceSummary(courseId, studentId);
  }
}

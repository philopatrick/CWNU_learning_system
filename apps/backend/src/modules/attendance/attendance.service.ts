import { sharedSeed } from "@cwnu/shared/seed";
import { InMemoryRepository } from "../../common/memory-repository.js";
import type { AttendanceRecord, AttendanceSession } from "./attendance.types.js";

export class AttendanceService {
  private readonly sessions = new InMemoryRepository<AttendanceSession>(
    [...sharedSeed.attendanceSessions] as AttendanceSession[]
  );
  private readonly records = new InMemoryRepository<AttendanceRecord>(
    [...sharedSeed.attendanceRecords] as AttendanceRecord[]
  );

  public async listSessions() {
    return this.sessions.findAll();
  }

  public async listRecords() {
    return this.records.findAll();
  }
}

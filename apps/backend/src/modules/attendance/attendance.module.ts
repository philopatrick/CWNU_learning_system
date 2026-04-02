import { AttendanceService } from "./attendance.service.js";
import { createAttendanceController } from "./attendance.controller.js";

export function createAttendanceModule() {
  const service = new AttendanceService();
  const controller = createAttendanceController(service);
  return { service, routes: controller.routes };
}

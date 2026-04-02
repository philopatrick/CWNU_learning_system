import type { RouteDefinition } from "../../platform/http/types.js";
import { AttendanceService } from "./attendance.service.js";

export function createAttendanceController(service: AttendanceService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/attendance/sessions",
      handler: async () => service.listSessions()
    },
    {
      method: "GET",
      path: "/api/attendance/records",
      handler: async () => service.listRecords()
    }
  ];

  return { routes };
}

import type { RouteDefinition } from "../../platform/http/types.js";
import type { AttendanceService } from "./attendance.service.js";
import { runValidations, validateRequired, validateString } from "../../platform/validation/validator.js";

export function createAttendanceController(service: AttendanceService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/attendance/sessions",
      handler: async ({ query }) => {
        const courseId = query?.get("courseId");
        if (courseId) {
          return service.getSessionsByCourse(courseId.toString());
        }
        return service.listSessions();
      }
    },
    {
      method: "GET",
      path: "/api/attendance/sessions/:id",
      handler: async ({ params }) => service.getSession(params.id)
    },
    {
      method: "GET",
      path: "/api/attendance/sessions/open",
      handler: async () => service.getOpenSessions()
    },
    {
      method: "POST",
      path: "/api/attendance/sessions",
      handler: async ({ body }) => {
        const { courseId, title, startsAt, endsAt, checkInDeadline } = body as {
          courseId?: string;
          title?: string;
          startsAt?: string;
          endsAt?: string;
          checkInDeadline?: string;
        };

        const errors = runValidations(
          validateRequired(courseId, "courseId"),
          validateRequired(title, "title"),
          validateRequired(startsAt, "startsAt"),
          validateString(title, "title", 200)
        );

        if (errors.length > 0) {
          return {
            ok: false,
            error: {
              code: "VALIDATION_ERROR" as const,
              message: "Invalid request body",
              details: errors
            }
          };
        }

        // TODO: Get creator ID from authenticated session
        const createdBy = "u-teacher-001";

        const session = await service.createSession({
          courseId: courseId!,
          title: title!,
          startsAt: startsAt!,
          endsAt: endsAt,
          checkInDeadline
        }, createdBy);

        return { ok: true, data: session };
      }
    },
    {
      method: "POST",
      path: "/api/attendance/sessions/:id/close",
      handler: async ({ params }) => {
        await service.closeSession(params.id);
        return { ok: true, data: { message: "Session closed" } };
      }
    },
    {
      method: "GET",
      path: "/api/attendance/records",
      handler: async ({ query }) => {
        const courseId = query?.get("courseId");
        const studentId = query?.get("studentId");

        if (courseId) {
          return service.getRecordsByCourse(courseId.toString());
        }
        if (studentId) {
          return service.getRecordsByStudent(studentId.toString());
        }
        return service.listRecords();
      }
    },
    {
      method: "POST",
      path: "/api/attendance/records",
      handler: async ({ body }) => {
        const { sessionId, studentId, status, note, source } = body as {
          sessionId?: string;
          studentId?: string;
          status?: string;
          note?: string;
          source?: "manual" | "qr" | "location" | "import";
        };

        const errors = runValidations(
          validateRequired(sessionId, "sessionId"),
          validateRequired(studentId, "studentId"),
          validateRequired(status, "status")
        );

        if (errors.length > 0) {
          return {
            ok: false,
            error: {
              code: "VALIDATION_ERROR" as const,
              message: "Invalid request body",
              details: errors
            }
          };
        }

        // TODO: Get course ID from session
        const session = await service.getSession(sessionId!);
        if (!session) {
          return {
            ok: false,
            error: { code: "NOT_FOUND" as const, message: "Session not found" }
          };
        }

        const record = await service.markAttendance({
          sessionId: sessionId!,
          studentId: studentId!,
          status: status as any,
          note,
          source
        }, session.courseId);

        return { ok: true, data: record };
      }
    },
    {
      method: "GET",
      path: "/api/attendance/summary",
      handler: async ({ query }) => {
        const courseId = query?.get("courseId");
        const studentId = query?.get("studentId");

        if (!courseId || !studentId) {
          return {
            ok: false,
            error: {
              code: "VALIDATION_ERROR" as const,
              message: "courseId and studentId are required"
            }
          };
        }

        const summary = await service.getAttendanceSummary(courseId.toString(), studentId.toString());
        return { ok: true, data: summary };
      }
    }
  ];

  return { routes };
}

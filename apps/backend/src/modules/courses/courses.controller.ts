import type { RouteDefinition } from "../../platform/http/types.js";
import type { CoursesService } from "./courses.service.js";
import { runValidations, validateRequired, validateString } from "../../platform/validation/validator.js";

export function createCoursesController(service: CoursesService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/courses",
      handler: async () => service.listCourses()
    },
    {
      method: "GET",
      path: "/api/courses/:id",
      handler: async ({ params }) => service.getCourse(params.id)
    },
    {
      method: "GET",
      path: "/api/courses/teacher/:teacherId",
      handler: async ({ params }) => service.getCoursesByTeacher(params.teacherId)
    },
    {
      method: "GET",
      path: "/api/courses/enrollments",
      handler: async () => service.listEnrollments()
    },
    {
      method: "GET",
      path: "/api/courses/:courseId/enrollments",
      handler: async ({ params }) => service.getEnrollmentsByCourse(params.courseId)
    },
    {
      method: "POST",
      path: "/api/courses",
      handler: async ({ body }) => {
        const { code, title, description, semester, credits, capacity, tags, meetingTimes } = body as {
          code?: string;
          title?: string;
          description?: string;
          semester?: string;
          credits?: number;
          capacity?: number;
          tags?: string[];
          meetingTimes?: { dayOfWeek: number; startTime: string; endTime: string; room?: string }[];
        };

        const errors = runValidations(
          validateRequired(code, "code"),
          validateString(code, "code", 50),
          validateRequired(title, "title"),
          validateString(title, "title", 200),
          validateRequired(semester, "semester")
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

        // TODO: Get teacherId from authenticated session
        const teacherId = "u-teacher-001";

        const course = await service.createCourse({
          code: code!,
          title: title!,
          description,
          semester: semester!,
          credits,
          capacity,
          tags,
          meetingTimes: meetingTimes as any
        }, teacherId);

        return { ok: true, data: course };
      }
    },
    {
      method: "POST",
      path: "/api/courses/enrollments",
      handler: async ({ body }) => {
        const { courseId, studentId } = body as { courseId?: string; studentId?: string };

        const errors = runValidations(
          validateRequired(courseId, "courseId"),
          validateRequired(studentId, "studentId")
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

        const enrollment = await service.enrollStudent({ courseId: courseId!, studentId: studentId! });
        return { ok: true, data: enrollment };
      }
    }
  ];

  return { routes };
}

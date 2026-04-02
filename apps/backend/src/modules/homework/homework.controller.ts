import type { RouteDefinition } from "../../platform/http/types.js";
import type { HomeworkService } from "./homework.service.js";
import { runValidations, validateRequired, validateString, validateNumber } from "../../platform/validation/validator.js";

export function createHomeworkController(service: HomeworkService) {
  const routes: RouteDefinition[] = [
    {
      method: "GET",
      path: "/api/homework/assignments",
      handler: async ({ query }) => {
        const courseId = query?.get("courseId");
        if (courseId) {
          return service.getAssignmentsByCourse(courseId.toString());
        }
        return service.listAssignments();
      }
    },
    {
      method: "GET",
      path: "/api/homework/assignments/:id",
      handler: async ({ params }) => service.getAssignment(params.id)
    },
    {
      method: "POST",
      path: "/api/homework/assignments",
      handler: async ({ body }) => {
        const { courseId, title, description, dueAt, maxScore, attachments } = body as {
          courseId?: string;
          title?: string;
          description?: string;
          dueAt?: string;
          maxScore?: number;
          attachments?: { id: string; name: string; url: string; mimeType?: string }[];
        };

        const errors = runValidations(
          validateRequired(courseId, "courseId"),
          validateRequired(title, "title"),
          validateString(title, "title", 200),
          validateRequired(description, "description"),
          validateRequired(dueAt, "dueAt")
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

        const assignment = await service.createAssignment({
          courseId: courseId!,
          title: title!,
          description: description!,
          dueAt: dueAt!,
          maxScore,
          attachments
        }, createdBy);

        return { ok: true, data: assignment };
      }
    },
    {
      method: "POST",
      path: "/api/homework/assignments/:id/publish",
      handler: async ({ params }) => {
        await service.publishAssignment(params.id);
        return { ok: true, data: { message: "Assignment published" } };
      }
    },
    {
      method: "POST",
      path: "/api/homework/assignments/:id/close",
      handler: async ({ params }) => {
        await service.closeAssignment(params.id);
        return { ok: true, data: { message: "Assignment closed" } };
      }
    },
    {
      method: "GET",
      path: "/api/homework/submissions",
      handler: async ({ query }) => {
        const homeworkId = query?.get("homeworkId");
        const studentId = query?.get("studentId");

        if (homeworkId) {
          return service.getSubmissionsByAssignment(homeworkId.toString());
        }
        if (studentId) {
          return service.getSubmissionsByStudent(studentId.toString());
        }
        return service.listSubmissions();
      }
    },
    {
      method: "GET",
      path: "/api/homework/submissions/:id",
      handler: async ({ params }) => service.getSubmission(params.id)
    },
    {
      method: "POST",
      path: "/api/homework/submissions",
      handler: async ({ body }) => {
        const { homeworkId, studentId, content, attachments } = body as {
          homeworkId?: string;
          studentId?: string;
          content?: string;
          attachments?: { id: string; name: string; url: string; mimeType?: string }[];
        };

        const errors = runValidations(
          validateRequired(homeworkId, "homeworkId"),
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

        const submission = await service.submitHomework({
          homeworkId: homeworkId!,
          studentId: studentId!,
          content,
          attachments
        });

        return { ok: true, data: submission };
      }
    },
    {
      method: "POST",
      path: "/api/homework/submissions/:id/grade",
      handler: async ({ params, body }) => {
        const { score, feedback } = body as { score?: number; feedback?: string };

        const errors = runValidations(
          validateRequired(score, "score"),
          validateNumber(score, "score", 0, 100)
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

        // TODO: Get grader ID from authenticated session
        const gradedBy = "u-teacher-001";

        await service.gradeSubmission({
          submissionId: params.id,
          score: score!,
          feedback
        }, gradedBy);

        return { ok: true, data: { message: "Submission graded" } };
      }
    }
  ];

  return { routes };
}

import type { RouteDefinition } from "../../platform/http/types.js";
import type { AuthService } from "./auth.service.js";
import { runValidations, validateEmail, validateRequired, validateString } from "../../platform/validation/validator.js";

export function createAuthController(service: AuthService) {
  const routes: RouteDefinition[] = [
    {
      method: "POST",
      path: "/api/auth/login",
      handler: async ({ body }) => {
        const { email, password } = body as { email?: string; password?: string };

        const errors = runValidations(
          validateEmail(email, "email"),
          validateRequired(password, "password")
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

        const result = await service.login({ email: email!, password: password! });
        if ("error" in result) {
          return { ok: false, error: { code: "UNAUTHORIZED" as const, message: result.error } };
        }
        return { ok: true, data: result };
      }
    },
    {
      method: "POST",
      path: "/api/auth/register",
      handler: async ({ body }) => {
        const { fullName, email, password, studentNumber, program, nationality } = body as {
          fullName?: string;
          email?: string;
          password?: string;
          studentNumber?: string;
          program?: string;
          nationality?: string;
        };

        const errors = runValidations(
          validateRequired(fullName, "fullName"),
          validateString(fullName, "fullName", 100),
          validateEmail(email, "email"),
          validateRequired(password, "password"),
          validateString(password, "password", 128),
          validateRequired(studentNumber, "studentNumber")
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

        const result = await service.registerStudent({
          fullName: fullName!,
          email: email!,
          password: password!,
          studentNumber: studentNumber!,
          program: program || undefined,
          nationality: nationality || undefined
        });

        if ("error" in result) {
          return { ok: false, error: { code: "CONFLICT" as const, message: result.error } };
        }
        return { ok: true, data: result };
      }
    },
    {
      method: "POST",
      path: "/api/auth/refresh",
      handler: async ({ body }) => {
        const { refreshToken } = body as { refreshToken?: string };

        const errors = runValidations(
          validateRequired(refreshToken, "refreshToken")
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

        const result = await service.refresh(refreshToken!);
        if ("error" in result) {
          return { ok: false, error: { code: "UNAUTHORIZED" as const, message: result.error } };
        }
        return { ok: true, data: result };
      }
    }
  ];

  return { routes };
}

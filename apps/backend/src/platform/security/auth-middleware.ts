import type { IncomingMessage, ServerResponse } from "node:http";
import { verifyToken, type TokenPayload } from "./crypto.js";

export interface AuthenticatedRequest extends IncomingMessage {
  user?: TokenPayload;
}

export function createAuthMiddleware(secret: string) {
  return function authMiddleware(
    request: IncomingMessage,
    response: ServerResponse,
    next: () => void
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.statusCode = 401;
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Missing or invalid authorization header" }
      }));
      return;
    }

    const token = authHeader.substring(7);
    const payload = verifyToken<TokenPayload>(token, secret);

    if (!payload) {
      response.statusCode = 401;
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Invalid or expired token" }
      }));
      return;
    }

    (request as AuthenticatedRequest).user = payload;
    next();
  };
}

export function optionalAuthMiddleware(secret: string) {
  return function optionalAuthMiddleware(
    request: IncomingMessage,
    response: ServerResponse,
    next: () => void
  ): void {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const payload = verifyToken<TokenPayload>(token, secret);
      if (payload) {
        (request as AuthenticatedRequest).user = payload;
      }
    }

    next();
  };
}

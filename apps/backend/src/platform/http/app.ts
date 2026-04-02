import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { SimpleRouter } from "./router.js";
import type { AppEnv } from "../../config/env.js";
import type { RouteDefinition } from "./types.js";
import type { ApiFailureResponse, ApiSuccessResponse } from "@cwnu/shared/api";

function writeJson(response: ServerResponse, statusCode: number, payload: unknown) {
  response.statusCode = statusCode;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function writeSuccess(response: ServerResponse, data: unknown) {
  const payload: ApiSuccessResponse<unknown> = {
    ok: true,
    data
  };

  writeJson(response, 200, payload);
}

function writeFailure(response: ServerResponse, statusCode: number, code: ApiFailureResponse["error"]["code"], message: string) {
  const payload: ApiFailureResponse = {
    ok: false,
    error: {
      code,
      message
    }
  };

  writeJson(response, statusCode, payload);
}

async function readBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf-8");
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function createHttpApp({ name, env }: { name: string; env: AppEnv }) {
  const router = new SimpleRouter();

  const app = {
    name,
    env,
    register(routes: RouteDefinition[]) {
      router.register(routes);
    },
    get(path: string, handler: RouteDefinition["handler"]) {
      router.register([{ method: "GET", path, handler }]);
    },
    listen(port = env.port) {
      const server = createServer(async (request, response) => {
        const method = request.method ?? "GET";
        const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
        const route = router.resolve(method, url.pathname);

        if (!route) {
          writeFailure(response, 404, "NOT_FOUND", "Route not found");
          return;
        }

        try {
          const body = await readBody(request);
          const result = await route.handler({
            method,
            path: url.pathname,
            body,
            query: url.searchParams,
            params: router.paramsFor(url.pathname, route.path)
          });

          writeSuccess(response, result);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unexpected server error";
          writeFailure(response, 500, "INTERNAL_ERROR", message);
        }
      });

      server.listen(port, () => {
        // Keep boot output short and deterministic.
        console.log(`[${name}] listening on :${port}`);
      });

      return server;
    }
  };

  return app;
}

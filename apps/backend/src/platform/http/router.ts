import type { RouteDefinition } from "./types.js";

function toSegments(path: string) {
  return path.split("/").filter(Boolean);
}

function matchPath(routePath: string, requestPath: string) {
  const routeSegments = toSegments(routePath);
  const requestSegments = toSegments(requestPath);

  if (routeSegments.length !== requestSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let index = 0; index < routeSegments.length; index += 1) {
    const routeSegment = routeSegments[index];
    const requestSegment = requestSegments[index];

    if (routeSegment.startsWith(":")) {
      params[routeSegment.slice(1)] = decodeURIComponent(requestSegment);
      continue;
    }

    if (routeSegment !== requestSegment) {
      return null;
    }
  }

  return params;
}

export class SimpleRouter {
  private readonly routes: RouteDefinition[] = [];

  public register(routes: RouteDefinition[]) {
    this.routes.push(...routes);
  }

  public resolve(method: string, path: string) {
    return this.routes.find((route) => {
      if (route.method !== method.toUpperCase()) {
        return false;
      }

      return matchPath(route.path, path) !== null;
    });
  }

  public paramsFor(path: string, routePath: string) {
    return matchPath(routePath, path) ?? {};
  }
}

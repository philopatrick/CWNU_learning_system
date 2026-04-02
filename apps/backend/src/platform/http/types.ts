export interface RequestContext {
  method: string;
  path: string;
  body?: unknown;
  query: URLSearchParams;
  params: Record<string, string>;
}

export type ResponseBody = unknown;
export type RouteHandler = (context: RequestContext) => Promise<ResponseBody> | ResponseBody;

export interface RouteDefinition {
  method: string;
  path: string;
  handler: RouteHandler;
}

import type { ApiResponse } from "@cwnu/shared/api";

const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

export async function fetchApi<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${DEFAULT_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  return response.json() as Promise<ApiResponse<T>>;
}

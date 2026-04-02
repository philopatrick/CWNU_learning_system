import type { ApiResponse } from "@cwnu/shared/api";
import type { AuthSession, LoginRequest, RegisterStudentRequest } from "@cwnu/shared/users";

const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return authToken ?? localStorage.getItem("authToken");
}

export async function fetchApi<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const response = await fetch(`${DEFAULT_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  return response.json() as Promise<ApiResponse<T>>;
}

export const authApi = {
  login: async (body: LoginRequest): Promise<AuthSession | null> => {
    const result = await fetchApi<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body)
    });

    if (!result.ok || !result.data) {
      return null;
    }

    setAuthToken(result.data.accessToken);
    return result.data;
  },

  register: async (body: RegisterStudentRequest): Promise<AuthSession | null> => {
    const result = await fetchApi<AuthSession>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body)
    });

    if (!result.ok || !result.data) {
      return null;
    }

    setAuthToken(result.data.accessToken);
    return result.data;
  },

  logout: () => {
    setAuthToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthSession | null> => {
    const result = await fetchApi<AuthSession>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    });

    if (!result.ok || !result.data) {
      return null;
    }

    setAuthToken(result.data.accessToken);
    return result.data;
  }
};

export const usersApi = {
  getProfile: async (id: string) => {
    const result = await fetchApi(`/users/${id}`);
    return result.ok ? result.data : null;
  },

  listUsers: async () => {
    const result = await fetchApi("/users");
    return result.ok ? result.data : null;
  }
};

export const coursesApi = {
  listCourses: async () => {
    const result = await fetchApi("/courses");
    return result.ok ? result.data : null;
  },

  getCourse: async (id: string) => {
    const result = await fetchApi(`/courses/${id}`);
    return result.ok ? result.data : null;
  }
};

export const attendanceApi = {
  listSessions: async (courseId?: string) => {
    const query = courseId ? `?courseId=${courseId}` : "";
    const result = await fetchApi(`/attendance/sessions${query}`);
    return result.ok ? result.data : null;
  },

  markAttendance: async (body: { sessionId: string; studentId: string; status: string }) => {
    const result = await fetchApi("/attendance/records", {
      method: "POST",
      body: JSON.stringify(body)
    });
    return result.ok ? result.data : null;
  }
};

export const homeworkApi = {
  listAssignments: async (courseId?: string) => {
    const query = courseId ? `?courseId=${courseId}` : "";
    const result = await fetchApi(`/homework/assignments${query}`);
    return result.ok ? result.data : null;
  },

  submitHomework: async (body: { homeworkId: string; content: string }) => {
    const result = await fetchApi("/homework/submissions", {
      method: "POST",
      body: JSON.stringify(body)
    });
    return result.ok ? result.data : null;
  }
};

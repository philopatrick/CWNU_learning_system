export type UserRole = "student" | "teacher" | "admin";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EntityPage<T> {
  items: T[];
  total: number;
}

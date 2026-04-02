export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export class ValidationException extends Error {
  public readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("Validation failed");
    this.errors = errors;
  }
}

export function validateRequired(value: unknown, field: string): ValidationError | null {
  if (value === undefined || value === null || value === "") {
    return { field, message: `${field} is required` };
  }
  return null;
}

export function validateString(value: unknown, field: string, maxLength?: number): ValidationError | null {
  if (typeof value !== "string") {
    return { field, message: `${field} must be a string`, value };
  }
  if (maxLength && value.length > maxLength) {
    return { field, message: `${field} must be at most ${maxLength} characters`, value };
  }
  return null;
}

export function validateEmail(value: unknown, field: string): ValidationError | null {
  const emailError = validateString(value, field);
  if (emailError) return emailError;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value as string)) {
    return { field, message: `${field} must be a valid email`, value };
  }
  return null;
}

export function validateNumber(value: unknown, field: string, min?: number, max?: number): ValidationError | null {
  if (typeof value !== "number") {
    return { field, message: `${field} must be a number`, value };
  }
  if (min !== undefined && value < min) {
    return { field, message: `${field} must be at least ${min}`, value };
  }
  if (max !== undefined && value > max) {
    return { field, message: `${field} must be at most ${max}`, value };
  }
  return null;
}

export function validateArray(value: unknown, field: string): ValidationError | null {
  if (!Array.isArray(value)) {
    return { field, message: `${field} must be an array`, value };
  }
  return null;
}

export function validateObject(value: unknown, field: string): ValidationError | null {
  if (value === null || value === undefined || typeof value !== "object") {
    return { field, message: `${field} must be an object`, value };
  }
  return null;
}

export function validateEnum<T extends string>(value: unknown, allowed: readonly T[], field: string): ValidationError | null {
  if (!allowed.includes(value as T)) {
    return { field, message: `${field} must be one of: ${allowed.join(", ")}`, value };
  }
  return null;
}

export function runValidations(...validations: (ValidationError | null)[]): ValidationError[] {
  return validations.filter((e): e is ValidationError => e !== null);
}

export function assertValid(errors: ValidationError[]): asserts errors is [] {
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }
}

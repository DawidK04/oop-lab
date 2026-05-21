export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };

export function ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

export function fail<E>(error: E): Result<never, E> {
  return { success: false, error };
}

export function isSuccess<T, E>(
  result: Result<T, E>
): result is { success: true; data: T } {
  return result.success;
}

export function map<T, E, U>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> {
  if (isSuccess(result)) {
    return ok(fn(result.data));
  }
  return result as Result<U, E>;
}

export function flatMap<T, E, U>(
  result: Result<T, E>,
  fn: (data: T) => Result<U, E>
): Result<U, E> {
  if (isSuccess(result)) {
    return fn(result.data);
  }
  return result as Result<U, E>;
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (isSuccess(result)) {
    return result.data;
  }
  throw new Error(`Cannot unwrap Result. Failure: ${result.error}`);
}

export function match<T, E, R>(
  result: Result<T, E>,
  onSuccess: (data: T) => R,
  onFailure: (error: E) => R
): R {
  if (isSuccess(result)) {
    return onSuccess(result.data);
  }
  return onFailure(result.error);
}

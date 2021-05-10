export interface Result<T> {
    unwrapOrThrow(): T;
    isSuccess: boolean;
    isFailure: boolean;
    map<R>(f: (t: T) => R): Result<R>;
    fmap<R>(f: (t: T) => Result<R>): Result<R>;
}
class Success<T> implements Result<T> {
    constructor(public readonly value: T) {}
    unwrapOrThrow(): T {
        return this.value;
    }
    isSuccess = true;
    isFailure = false;
    map<R>(f: (t: T) => R): Result<R> {
        return success(f(this.value));
    }
    fmap<R>(f: (t: T) => Result<R>): Result<R> {
        return f(this.value);
    }
}
class Failure<T> {
    constructor(public readonly err: Error) {}
    unwrapOrThrow(): T {
        throw this.err;
    }
    isSuccess = false;
    isFailure = true;
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    map<R>(f: (t: T) => R): Result<R> {
        return failure(this.err);
    }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    fmap<R>(f: (t: T) => Result<R>): Result<R> {
        return failure(this.err);
    }
}

export function success<T>(t: T): Result<T> {
    return new Success<T>(t);
}

export function failure<T>(e: Error): Result<T> {
    return new Failure<T>(e);
}

export function isSuccess<T>(r: Result<T>): r is Success<T> {
    return r.isSuccess;
}

export function isFailure<T>(r: Result<T>): r is Failure<T> {
    return r.isFailure;
}

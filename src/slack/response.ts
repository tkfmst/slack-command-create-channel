export interface Response {
    ok: boolean;
}

export interface ResponseError {
    ok: boolean;
    error: string;
}

export const isResponse = (r: unknown): r is Response => {
    const res = r as Response;
    return res.ok === true;
};

export const isResponseError = (r: unknown): r is ResponseError => {
    const res = r as ResponseError;
    return res.ok === false && res.error !== undefined;
};

export const emptyResponse: Response = {
    ok: true,
};

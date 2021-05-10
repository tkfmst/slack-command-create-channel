export interface Response {
    ok: boolean;
}

// FIXME res確認する
export const isResponse = (r: unknown): r is Response => {
    const res = r as Response;
    return res.ok === true;
};

export interface Response {
    ok: boolean;
    members: User[];
    response_metadata: {
        next_cursor: string;
    };
}

export interface User {
    id: string;
    name: string;
    real_name: string;
    deleted: boolean;
    is_bot: boolean;
    is_app_user: boolean;
}

// FIXME res確認する
export const isResponse = (r: unknown): r is Response => {
    const res = r as Response;
    return (
        res.ok === true &&
        res.members !== undefined &&
        res.members.length > 0 &&
        res.response_metadata !== undefined &&
        // next_cursor無くても空で返ってくる
        typeof res.response_metadata.next_cursor === 'string'
    );
};

export interface Response {
    ok: boolean;
    usergroups: UserGroup[];
}

export interface UserGroup {
    id: string;
    name: string;
    handle: string;
    users: string[];
}

export const isResponse = (r: unknown): r is Response => {
    const res = r as Response;
    return res.ok === true && res.usergroups !== undefined;
};

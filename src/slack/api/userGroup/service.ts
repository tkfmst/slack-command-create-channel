import { isArray } from '../../../util/is';
import { failure, Result, success } from '../../../util/result';
import { GroupUsersLike } from '.';

export class Service {
    constructor(private readonly map: GroupUsersLike) {}

    getUserIdsFromGroupName(handle: string): Result<string[]> {
        const ids = this.map[handle];

        if (!isArray(ids)) {
            return failure(
                new Error(`not find user id in group from handle:${handle}`)
            );
        } else if (ids.length === 0) {
            return failure(
                new Error(`no user belongs to the usergroup handle:${handle}`)
            );
        }

        // TODO もっとよい方法ないか？
        const arr: string[] = [];
        for (const s in ids) {
            if (typeof s === 'string') {
                arr.push(s);
            } else {
                return failure(
                    new Error(
                        `invalid group user, handle:${handle}, invalid user id:${s}`
                    )
                );
            }
        }
        return success(arr);
    }
}

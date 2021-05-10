import {
    failure,
    isFailure,
    isSuccess,
    Result,
    success,
} from '../../../util/result';
import * as Slack from '../..';
import { ActiveUser } from '.';
import { Payload } from './payload';
import { isResponse, Response } from './response';

export class Api implements Slack.Api {
    constructor(public http: Slack.Http) {}

    request(userNames: string[], limitPerFetch = 100): Result<string[]> {
        return success(
            this.getAllUsers(limitPerFetch)
                .unwrapOrThrow()
                .filter((u) => userNames.includes(u.name))
                .map((u) => u.id)
        );
    }

    getAllUsers(limitPerFetch = 100): Result<ActiveUser[]> {
        let cursor = '';
        let users: ActiveUser[] = [];
        do {
            const res = this.getPartOfUserList(limitPerFetch, cursor);
            if (isSuccess(res)) {
                const fetchUsers: ActiveUser[] = res.value.members
                    .filter(
                        (u) =>
                            u.deleted === false &&
                            u.is_bot === false &&
                            u.is_app_user === false &&
                            u.id.length > 0 &&
                            u.name.length > 0
                    )
                    .map((u) => {
                        return {
                            id: u.id,
                            name: u.name,
                            real_name: u.real_name,
                        };
                    });
                users = users.concat(fetchUsers);
                cursor = res.value.response_metadata.next_cursor;
            } else if (isFailure(res)) {
                return failure(res.err);
            } else {
                return failure(new Error('unknown error'));
            }
        } while (cursor !== '');

        if (users.length > 0) {
            return success(Array.from(new Set(users)));
        } else {
            return failure(new Error('user not found'));
        }
    }

    private getPartOfUserList(
        limitPerFetch: number,
        cursor: string
    ): Result<Response> {
        const payload: Payload = {
            limit: limitPerFetch,
            cursor: cursor,
        };

        const result = this.http.request(payload);

        if (isSuccess(result) && isResponse(result.value)) {
            return success(result.value);
        } else if (isFailure(result)) {
            return failure(result.err);
        } else {
            return failure(new Error('unknown error'));
        }
    }
}

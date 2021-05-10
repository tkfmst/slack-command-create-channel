import {
    failure,
    isFailure,
    isSuccess,
    Result,
    success,
} from '../../../util/result';
import * as Slack from '../..';
import { Payload } from './payload';
import { isResponse, UserGroup } from './response';

export class Api implements Slack.Api {
    constructor(public http: Slack.Http) {}

    request(usergroupNames: string[]): Result<string[]> {
        try {
            let ar: string[] = [];

            this.getAllUserGroups()
                .unwrapOrThrow()
                .filter((ug) => usergroupNames.includes(ug.handle))
                .map((ug) => {
                    ar = ar.concat(ug.users);
                });

            return success(Array.from(new Set(ar)));
        } catch (err) {
            return failure(err);
        }
    }

    getAllUserGroups(): Result<UserGroup[]> {
        const payload: Payload = {
            isQueryString: true,
            querystrings: {
                include_users: true,
            },
        };
        const result = this.http.request(payload);

        if (isSuccess(result) && isResponse(result.value)) {
            return success(
                result.value.usergroups.filter(
                    (ug) =>
                        ug.id.length > 0 &&
                        ug.handle.length > 0 &&
                        ug.users.length > 0
                )
            );
        } else if (isFailure(result)) {
            return failure(result.err);
        } else {
            return failure(new Error('unknown error'));
        }
    }
}

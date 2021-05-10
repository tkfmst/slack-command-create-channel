import {
    failure,
    isFailure,
    isSuccess,
    Result,
    success,
} from '../../../util/result';
import * as Slack from '../..';
import { Payload } from './payload';
import { isResponse, Response } from './response';

export class Api implements Slack.Api {
    constructor(public http: Slack.Http) {}

    inviteUsers(channelId: string, userIds: string[]): Result<Response> {
        const payload: Payload = {
            channel: channelId,
            users: userIds.join(','),
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

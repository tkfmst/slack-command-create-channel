import {
    failure,
    isFailure,
    isSuccess,
    Result,
    success,
} from '../../util/result';
import * as Slack from '..';
import { Payload } from './payload';
import { isResponse, Response } from './response';

export class Api implements Slack.Api {
    constructor(public http: Slack.Http) {}

    request(text: string, endpoint: string): Result<Response> {
        const payload: Payload = {
            response_type: 'in_channel',
            text: text,
            replace_original: false,
            delete_original: false,
        };

        const result = this.http.request(payload, endpoint, true);

        if (isSuccess(result) && isResponse(result.value)) {
            return success(result.value);
        } else if (isFailure(result)) {
            return failure(result.err);
        } else {
            return failure(new Error('unknown error'));
        }
    }
}

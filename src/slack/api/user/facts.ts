import * as Slack from '../..';

export class Facts implements Slack.Facts {
    endpoint = 'https://slack.com/api/users.list';
    method: 'post' = 'post';
    contentType = 'application/json; charset=utf-8';

    headers: Slack.Headers;

    constructor(readonly token: string) {
        this.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
}

import * as Slack from '../..';

export class Facts implements Slack.Facts {
    endpoint = 'https://slack.com/api/usergroups.list';
    method: 'get' = 'get';
    contentType = 'application/x-www-form-urlencoded';

    headers: Slack.Headers;

    constructor(readonly token: string) {
        this.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
}

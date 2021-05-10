import * as Slack from '..';

export class Facts implements Slack.Facts {
    endpoint = 'dummy';
    method: 'post' = 'post';
    contentType = 'application/json; charset=utf-8';

    headers: Slack.Headers = {
        Authorization: '',
    };
}

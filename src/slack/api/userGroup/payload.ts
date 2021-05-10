import * as Slack from '../..';

export interface Payload extends Slack.QueryString {
    querystrings: {
        include_users: true;
    };
}

import * as Slack from '../..';

/**
 * @see https://api.slack.com/methods/users.list
 */
export interface Payload extends Slack.Payload {
    limit: number;
    cursor: string;
}

import * as Slack from '../..';

/**
 * @see https://api.slack.com/methods/conversations.create
 */
export interface Payload extends Slack.Payload {
    name: string;
    is_private?: boolean; // default true
    team_id?: string;
}

import * as Slack from '../..';

/**
 * @see https://api.slack.com/methods/conversations.invite
 */
export interface Payload extends Slack.Payload {
    channel: string;
    users: string; // e.g. ta_sato1,ta_sato2
}

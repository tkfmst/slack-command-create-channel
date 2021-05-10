import * as Slack from '..';

/**
 * @see https://api.slack.com/methods/conversations.invite
 */
export interface Payload extends Slack.Payload {
    response_type?: string; // in_channel: 全体公開メッセージ
    text: string;
    replace_original?: boolean; // default true
    delete_original?: boolean; // default true
}

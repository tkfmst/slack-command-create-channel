import * as Slack from '../..';

export interface Response extends Slack.Response {
    ok: boolean;
    channel: {
        id: string;
    };
}
export const isResponse = (r: unknown): r is Response => {
    const res = r as Response;
    return (
        res.ok === true &&
        res.channel !== undefined &&
        res.channel.id !== undefined &&
        typeof res.channel.id === 'string' &&
        res.channel.id.length > 0
    );
};

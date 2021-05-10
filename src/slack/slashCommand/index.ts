import { failure, Result, success } from '../../util/result';

export interface Payload {
    parameter: {
        command: string;
        text: string;
        response_url: string;
    };
}

export const isPayload = (e: unknown): e is Payload => {
    const req = e as Payload;
    return (
        req.parameter !== undefined &&
        req.parameter.command !== undefined &&
        req.parameter.text !== undefined &&
        req.parameter.response_url !== undefined
    );
};

export type NecessaryParameter = {
    fullCommand: string;
    inviteUserNames: string[];
    channelSuffix: string;
    responseUrl: string;
};

export function extract(p: Payload): NecessaryParameter {
    return {
        fullCommand: `${p.parameter.command} ${p.parameter.text}`,
        inviteUserNames: getUserNames(p.parameter.text).unwrapOrThrow(),
        channelSuffix: getChannelSuffix(p.parameter.text).unwrapOrThrow(),
        responseUrl: p.parameter.response_url,
    };
}

function getUserNames(text: string): Result<string[]> {
    const names: string[] = splitArgs(text)
        .filter((u) => u.match(/^@/))
        .map((u) => u.replace('@', ''));

    if (names.length > 0) {
        return success(names);
    } else {
        return failure(new Error('no user or usergroup mentions'));
    }
}

function getChannelSuffix(text: string): Result<string> {
    const suffix: string[] = splitArgs(text).filter((u) => !u.match(/^@/));

    if (suffix.length === 1) {
        return success(suffix[0]);
    } else if (suffix.length === 0) {
        return success('');
    } else {
        return failure(new Error('command text has invalid channel suffix'));
    }
}

/**
 * usergroupが`<!subteam^S0AAAAA0A|@usergroup_name>`こんな感じで来る事がある
 * ので名前だけ抜き出す処理が入る
 */
function splitArgs(text: string): string[] {
    return text
        .split(' ')
        .map((s) => s.replace(/<.+(@.+?)>/, '$1'))
        .filter((s) => s !== ' ' && s.length > 0);
}

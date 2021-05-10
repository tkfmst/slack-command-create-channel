import * as Slack from '../slack';
import { failure, Result, success } from '../util/result';

export class Http implements Slack.Http {
    constructor(public readonly facts: Slack.Facts) {}

    request(
        payload: Slack.Payload,
        endpoint?: string,
        noRes?: boolean
    ): Result<Slack.Response> {
        let data = '';
        if (endpoint === undefined) {
            endpoint = this.facts.endpoint;
        }

        if (Slack.isQueryString(payload)) {
            const ar: string[] = [];
            for (const [k, v] of Object.entries(payload.querystrings)) {
                ar.push(`${k}=${v}`);
            }
            data = ar.join('&');
        } else {
            data = JSON.stringify(payload);
        }

        const opts: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: this.facts.method,
            contentType: this.facts.contentType,
            headers: this.facts.headers,
            payload: data,
            /**
             * @see https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#advanced-parameters
             * If true the fetch doesn't throw an exception if the response code indicates failure, and instead returns the HTTPResponse. The default is false.
             */
            muteHttpExceptions: true,
        };

        const rawResponse = UrlFetchApp.fetch(endpoint, opts);
        // TODO respons_url使った時に空が返ってくる事ある?
        const res =
            noRes === true
                ? Slack.emptyResponse
                : this.res2unknown(rawResponse);

        if (Slack.isResponse(res)) {
            return success(res);
        } else if (Slack.isResponseError(res)) {
            return failure(new Error(res.error));
        } else {
            return failure(new Error('unknown error'));
        }
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private res2unknown(res: GoogleAppsScript.URL_Fetch.HTTPResponse): any {
        return JSON.parse(res.getContentText('UTF-8'));
    }
}

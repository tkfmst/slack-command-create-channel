import * as Slack from '../slack';

export class Storage implements Slack.Storage {
    constructor(public key: string) {}

    set(data: unknown): void {
        PropertiesService.getScriptProperties().setProperty(
            this.key,
            JSON.stringify(data)
        );
    }

    get(): unknown {
        const data: unknown = PropertiesService.getScriptProperties().getProperty(
            this.key
        );
        if (typeof data === 'string') {
            return JSON.parse(data);
        } else {
            return {};
        }
    }
}

import * as SlashCommand from '../slack/slashCommand';
import * as UseCase from '../slack/useCase';
import { Factory } from './factory';

export class CreateChannelAndInviteUsers {
    useCase: UseCase.CreateChannelAndInviteUsers;

    constructor(factory: Factory) {
        this.useCase = new UseCase.CreateChannelAndInviteUsers(
            factory.baseChannelName,
            factory.api.channel,
            factory.api.invite,
            factory.api.responseUrl,
            factory.service.user,
            factory.service.userGroup
        );
    }

    /**
     * main処理
     */
    main(
        ev: GoogleAppsScript.Events.AppsScriptHttpRequestEvent
    ): GoogleAppsScript.Content.TextOutput {
        const output = ContentService.createTextOutput();
        output.setMimeType(ContentService.MimeType.JSON);

        let responseUrl = '';
        try {
            if (!SlashCommand.isPayload(ev)) {
                throw new Error('unexpected request parameter');
            }
            const p: SlashCommand.NecessaryParameter = SlashCommand.extract(ev);
            responseUrl = p.responseUrl;

            /**
             * 非同期処理のrootメソッド
             * TODO (要確認)おそらくGASではasyncはrootメソッドとなるdoPostより遅くは終われない
             * TODO (要確認)そのためGASでは実質同期的な処理になる
             */
            this.useCase.executeApis(p);
        } catch (err) {
            const ts: number = Date.now();
            console.log(ts, 'main', {
                error: err.message,
                stack: err.stack,
                line: err.line,
                do_post_event: JSON.stringify(ev),
            });
            if (responseUrl.length > 0) {
                this.useCase.notifyError(
                    JSON.stringify({
                        message: `invalid request, see GCP log:${ts}`,
                        error: err.message,
                    }),
                    responseUrl
                );
            }
        }

        return output;
    }
}

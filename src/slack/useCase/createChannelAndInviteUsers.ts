import { failure, isSuccess, Result, success } from '../../util/result';
import * as Channel from '../api/channel';
import * as Invite from '../api/invite';
import * as User from '../api/user';
import * as UserGroup from '../api/userGroup';
import * as ResponseUrl from '../responseUrl';
import * as SlashCommand from '../slashCommand';

export class CreateChannelAndInviteUsers {
    constructor(
        private readonly baseChannelName: string,
        private readonly channelApi: Channel.Api,
        private readonly inviteApi: Invite.Api,
        private readonly responseUrlApi: ResponseUrl.Api,
        private readonly userService: User.Service,
        private readonly userGroupService: UserGroup.Service
    ) {}

    async executeApis(p: SlashCommand.NecessaryParameter): Promise<void> {
        const debugProgress: string[] = [];
        try {
            // Notify the start
            this.responseUrlApi
                .request(`recived command: ${p.fullCommand}`, p.responseUrl)
                .unwrapOrThrow();

            const userIds: string[] = this.getUserIds(
                p.inviteUserNames
            ).unwrapOrThrow();
            debugProgress.push(`userIds: ${userIds}`);

            const newChannelName = this.createChannelName(p.channelSuffix);
            debugProgress.push(`newChannelName: ${newChannelName}`);

            const resCreateChannel: Channel.Response = this.channelApi
                .createNewChannel(newChannelName)
                .unwrapOrThrow();
            debugProgress.push(`channel: ${resCreateChannel.channel.id}`);

            const resInviteUsers = this.inviteApi
                .inviteUsers(resCreateChannel.channel.id, userIds)
                .unwrapOrThrow();
            debugProgress.push(`invite: ${resInviteUsers}`);

            // Notify finished
            const resResponseUrl = this.responseUrlApi
                .request(`created channel: #${newChannelName}`, p.responseUrl)
                .unwrapOrThrow();
            debugProgress.push(`responseUrl: ${resResponseUrl}`);

            return;
        } catch (err) {
            const ts: number = Date.now();
            console.log(ts, 'executeSlackApi', {
                progress: debugProgress,
                error: err.message,
                stack: err.stack,
                line: err.line,
                parameter: p,
            });
            this.notifyError(
                JSON.stringify({
                    message: `slack api failed, see GCP log:${ts}`,
                    error: err.message,
                }),
                p.responseUrl
            );
        }
    }

    notifyError(message: string, url: string): void {
        this.responseUrlApi.request(message, url);
    }

    private getUserIds(names: string[]): Result<string[]> {
        try {
            const ids: string[] = [];

            names.map((name) => {
                const ret: Result<
                    string[]
                > = this.userGroupService.getUserIdsFromGroupName(name);
                if (isSuccess(ret)) {
                    ids.concat(ret.value);
                } else {
                    ids.push(
                        this.userService.getIdFromName(name).unwrapOrThrow()
                    );
                }
            });

            return success(ids);
        } catch (err) {
            return failure(err);
        }
    }

    private createChannelName(suffix: string): string {
        if (suffix.length === 0) {
            return this.baseChannelName + this.getFormatedDate();
        } else {
            return this.baseChannelName + this.getFormatedDate() + '_' + suffix;
        }
    }

    private getFormatedDate() {
        const now: string[] = new Date().toLocaleString('ja-JP').split(/[/ :]/);
        return now[0] + now[1].padStart(2, '0') + now[2].padStart(2, '0');
    }
}

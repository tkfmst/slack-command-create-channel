import * as GAS from '../gas';
import * as Channel from '../slack/api/channel';
import * as Invite from '../slack/api/invite';
import * as User from '../slack/api/user';
import * as UserGroup from '../slack/api/userGroup';
import * as ResponseUrl from '../slack/responseUrl';

export class Factory {
    readonly baseChannelName: string;
    readonly api: {
        channel: Channel.Api;
        invite: Invite.Api;
        user: User.Api;
        userGroup: UserGroup.Api;
        responseUrl: ResponseUrl.Api;
    };
    readonly service: {
        user: User.Service;
        userGroup: UserGroup.Service;
    };
    readonly repository: {
        user: User.Repository;
        userGroup: UserGroup.Repository;
    };

    constructor(
        token: string,
        keyBaseChannelName: string,
        keyForUsers: string,
        keyForGroupUsers: string
    ) {
        /**
         * FIXME
         * new Storage(key).get()
         * とすると、GASでエラーになるため
         * ここだけ直接取得で書いている
         */
        const s: unknown = PropertiesService.getScriptProperties().getProperty(
            keyBaseChannelName
        );
        if (typeof s === 'string' && s.length > 0) {
            this.baseChannelName = s;
        } else {
            // TODO factoryに入れない方がこのチェックの関係でよいかも
            console.log(
                `NOTICE: empty base channel name or invalid string: ${keyBaseChannelName}=${s}`,
                'SET: NO_BASE_CHANNEL_NAME'
            );
            this.baseChannelName = 'NO_BASE_CHANNEL_NAME';
        }

        this.api = {
            channel: new Channel.Api(new GAS.Http(new Channel.Facts(token))),
            invite: new Invite.Api(new GAS.Http(new Invite.Facts(token))),
            user: new User.Api(new GAS.Http(new User.Facts(token))),
            userGroup: new UserGroup.Api(
                new GAS.Http(new UserGroup.Facts(token))
            ),
            responseUrl: new ResponseUrl.Api(
                new GAS.Http(new ResponseUrl.Facts())
            ),
        };
        this.repository = {
            user: new User.Repository(new GAS.Storage(keyForUsers)),
            userGroup: new UserGroup.Repository(
                new GAS.Storage(keyForGroupUsers)
            ),
        };
        this.service = {
            user: new User.Service(this.repository.user.getUserNameAndIds()),
            userGroup: new UserGroup.Service(
                this.repository.userGroup.getGroupUsers()
            ),
        };
    }
}

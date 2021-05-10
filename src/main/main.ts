import { CreateChannelAndInviteUsers } from './createChannelAndInviteUsers';
import { Factory } from './factory';
import { SetUsersAndGroups } from './setUsersAndGroups';

// Script Property >>>
// GoogleAppsScriptのプロパティに保存してあるSlack token
const token = PropertiesService.getScriptProperties().getProperty('TOKEN');
if (typeof token !== 'string' || token.length === 0) {
    throw new Error('No token set.');
}
const keyBaseChannelName = 'BASENAME';
const keyForUsres = 'USERS';
const keyForGroupUsers = 'GROUPUSERS';
// <<< Script Property

const factory = new Factory(
    token,
    keyBaseChannelName,
    keyForUsres,
    keyForGroupUsers
);
const createChannelAndInviteUsers = new CreateChannelAndInviteUsers(factory);
const setUsersAndGroups = new SetUsersAndGroups(factory);

/* gas-webpack-pluginの設定 >>> */
declare const global: {
    [x: string]: unknown;
};

// function通さずglobalに直接入れると壊れる?
global.doPost = function (
    ev: GoogleAppsScript.Events.AppsScriptHttpRequestEvent
): GoogleAppsScript.Content.TextOutput {
    return createChannelAndInviteUsers.main(ev);
};

global.trigger = function (): void {
    return setUsersAndGroups.main();
};
/* <<< gas-webpack-pluginの設定 */

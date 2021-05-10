import { isRecord } from '../../../util/is';
import * as Slack from '../..';
import { GroupUsers, GroupUsersLike, UserGroup } from '.';

export class Repository {
    constructor(private readonly storage: Slack.Storage) {}

    /**
     * FIXME
     * throw Error
     */
    getGroupUsers(): GroupUsersLike {
        const unknownData = this.storage.get();
        if (isRecord(unknownData)) {
            return unknownData;
        } else {
            const err = JSON.stringify(unknownData);
            throw new Error(`usergroups data is not Record: ${err}`);
        }
    }

    setGroupNameAndUserIds(groups: UserGroup[]): void {
        const map: GroupUsers = {};
        groups.map((g) => {
            map[g.handle] = g.users;
        });

        this.storage.set(map);
    }
}

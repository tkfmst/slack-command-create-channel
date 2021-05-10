import { isRecord } from '../../../util/is';
import * as Slack from '../..';
import { ActiveUser, NameAndIdMap, NameAndIdMapLike } from '.';

export class Repository {
    constructor(private readonly storage: Slack.Storage) {}

    /**
     * FIXME
     * throw Error
     */
    getUserNameAndIds(): NameAndIdMapLike {
        const unknownData = this.storage.get();
        if (isRecord(unknownData)) {
            return unknownData;
        } else {
            const err = JSON.stringify(unknownData);
            throw new Error(`users data is not Record: ${err}`);
        }
    }

    setUserNameAndIds(users: ActiveUser[]): void {
        const map: NameAndIdMap = {};
        users.map((u) => {
            map[u.name] = u.id;
        });

        this.storage.set(map);
    }
}

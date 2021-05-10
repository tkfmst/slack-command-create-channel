import { failure, Result, success } from '../../../util/result';
import { NameAndIdMapLike } from '.';

export class Service {
    constructor(private readonly map: NameAndIdMapLike) {}

    getIdFromName(name: string): Result<string> {
        const id: unknown = this.map[name];
        if (typeof id === 'string') {
            return success(id);
        } else {
            // TODO Option欲しい
            return failure(new Error(`not find user id from name:${name}`));
        }
    }
}

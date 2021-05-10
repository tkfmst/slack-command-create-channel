import { Result } from '../util/result';
import { Facts } from './facts';
import { Payload } from './payload';
import { Response } from './response';

export interface Http {
    facts: Facts;

    request(
        payload: Payload,
        endpoint?: string,
        noRes?: boolean
    ): Result<Response>;
}

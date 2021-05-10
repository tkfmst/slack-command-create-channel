export { Api } from './api';
export { Facts } from './facts';
export { Payload } from './payload';
export { Response, UserGroup, isResponse } from './response';
export { Repository } from './repository';
export { Service } from './service';

export type GroupUsers = {
    [group: string]: string[];
};

export type GroupUsersLike = Record<string | number | symbol, unknown>;

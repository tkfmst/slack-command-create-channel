export { Api } from './api';
export { Facts } from './facts';
export { Payload } from './payload';
export { Response, isResponse, User } from './response';
export { Repository } from './repository';
export { Service } from './service';

export type ActiveUser = {
    id: string;
    name: string;
    real_name: string;
};

export type NameAndIdMap = {
    [name: string]: string;
};

export type NameAndIdMapLike = Record<string | number | symbol, unknown>;

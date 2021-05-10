import { Payload } from './payload';

export interface Request {
    url: string;
    method: 'get' | 'post';
    contentType: string;
    headers: Headers;
    payload: Payload;
}

export type Headers = {
    Authorization: string;
};

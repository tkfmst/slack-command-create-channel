import { Headers } from './request';

export interface Facts {
    endpoint: string;
    method: 'get' | 'post';
    contentType: string;
    headers: Headers;
}

import { Http } from './http';

// slack api実行の処理を集約する
export interface Api {
    http: Http;
}

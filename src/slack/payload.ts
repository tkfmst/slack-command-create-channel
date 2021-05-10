// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Payload {}

export interface QueryString extends Payload {
    isQueryString: true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    querystrings: { [k in string]: any };
}

export const isQueryString = (p: unknown): p is QueryString => {
    return (p as QueryString).isQueryString === true;
};

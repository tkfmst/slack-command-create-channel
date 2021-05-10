export const isRecord = (
    o: unknown
): o is Record<string | number | symbol, unknown> => {
    return typeof o === 'object';
};

export const isArray = (a: unknown): a is Array<unknown> => {
    return Array.isArray(a);
};

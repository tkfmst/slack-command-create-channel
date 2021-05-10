export function failed(msg: string): never {
    throw new Error(msg);
}

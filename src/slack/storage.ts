export interface Storage {
    key: string;

    set(ata: unknown): void;
    get(): unknown;
}

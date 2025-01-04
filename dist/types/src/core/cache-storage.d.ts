import { Context } from './context';
export declare const cache: {
    [key: string]: Promise<any>;
};
export declare class CacheStorage {
    private static _link?;
    private static _origin;
    static getOrigin(url: string): string;
    static isSameOrigin(src: string): boolean;
    static setContext(window: Window): void;
}
export interface ResourceOptions {
    imageTimeout: number;
    useCORS: boolean;
    allowTaint: boolean;
    proxy?: string;
}
export declare class Cache {
    private readonly context;
    private readonly _options;
    constructor(context: Context, _options: ResourceOptions);
    deleteImage(src: string): boolean;
    addImage(src: string): boolean;
    match(src: string): Promise<any>;
    private loadImage;
    private has;
    keys(): Promise<string[]>;
    private proxy;
}

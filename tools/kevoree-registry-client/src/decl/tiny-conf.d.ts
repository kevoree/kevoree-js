// TODO stop the monkey patching and put that in tiny-conf
declare module 'tiny-conf' {
  interface IStore {
    get(key?: string): any;
    set(key: string|any, value?: any): void;
    merge(key: string, value: any): boolean;
    clear(): void;
    print(): void;
    save(key?: string): Promise<void>;
  }

  const config: IStore;
  export = config;
}

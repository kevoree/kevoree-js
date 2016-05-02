export interface Registry {
  register(name: string, type: any);
  get(name: string): any;
  getAll(): any[];
}

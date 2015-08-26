declare interface ElemCallback<T> {
  (err: Error, result: T): void;
}

declare interface Elem {
  pos: number[];
  children: Elem[];
  type: string
}

declare interface Statements {
  [key: string]: Statement<any>
}

declare interface Statement<T> {
  (elem: Elem, stmts: Statements, model: org.kevoree.Model, cb: ElemCallback<T>): void;
}

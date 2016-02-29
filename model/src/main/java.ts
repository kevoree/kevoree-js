export namespace lang {
  export class System {
    static gc() {
    }

    static arraycopy(src: any[]| Float64Array | Int32Array, srcPos: number, dest: any[]| Float64Array | Int32Array, destPos: number, numElements: number): void {
      for (var i = 0; i < numElements; i++) {
        dest[destPos + i] = src[srcPos + i];
      }
    }
  }
  export interface Runnable {
    run(): void;
  }
  export class StringBuilder {
    private _buffer: string = '';
    public length = 0;

    append(val: any): StringBuilder {
      this._buffer = this._buffer + val;
      this.length = this._buffer.length;
      return this;
    }

    toString(): string {
      return this._buffer;
    }
  }
}
export namespace util {
  export namespace concurrent {
    export namespace atomic {
      export class AtomicIntegerArray {
        _internal: Int32Array;

        constructor(p: Int32Array) {
          this._internal = p;
        }

        set(index: number, newVal: number) {
          this._internal[index] = newVal;
        }

        get(index: number) {
          return this._internal[index];
        }

        getAndSet(index: number, newVal: number) {
          var temp = this._internal[index];
          this._internal[index] = newVal;
          return temp;
        }

        compareAndSet(index: number, expect: number, update: number): boolean {
          if (this._internal[index] == expect) {
            this._internal[index] = update;
            return true;
          } else {
            return false;
          }
        }

      }

      export class AtomicReference<A> {
        _internal: A = null;

        compareAndSet(expect: A, update: A): boolean {
          if (this._internal == expect) {
            this._internal = update;
            return true;
          } else {
            return false;
          }
        }

        get(): A {
          return this._internal
        }

        set(newRef: A) {
          this._internal = newRef;
        }

        getAndSet(newVal: A): A {
          var temp = this._internal;
          this._internal = newVal;
          return temp;
        }
      }

      export class AtomicLong {
        _internal = 0;

        constructor(init: number) {
          this._internal = init;
        }

        compareAndSet(expect: number, update: number): boolean {
          if (this._internal == expect) {
            this._internal = update;
            return true;
          } else {
            return false;
          }
        }

        get(): number {
          return this._internal;
        }

        incrementAndGet(): number {
          this._internal++;
          return this._internal;
        }

        decrementAndGet(): number {
          this._internal--;
          return this._internal;
        }
      }

      export class AtomicInteger {
        _internal = 0;

        constructor(init: number) {
          this._internal = init;
        }

        compareAndSet(expect: number, update: number): boolean {
          if (this._internal == expect) {
            this._internal = update;
            return true;
          } else {
            return false;
          }
        }

        get(): number {
          return this._internal;
        }

        set(newVal: number) {
          this._internal = newVal
        }

        getAndSet(newVal: number): number {
          var temp = this._internal;
          this._internal = newVal;
          return temp;
        }

        incrementAndGet(): number {
          this._internal++;
          return this._internal;
        }

        decrementAndGet(): number {
          this._internal--;
          return this._internal;
        }

        getAndIncrement(): number {
          var temp = this._internal;
          this._internal++;
          return temp;
        }

        getAndDecrement(): number {
          var temp = this._internal;
          this._internal--;
          return temp;
        }
      }
    }
  }

  export class Random {
    public nextInt(max?: number): number {
      if (typeof max === 'undefined') {
        max = Math.pow(2, 32);
      }
      return Math.floor(Math.random() * max);
    }

    public nextDouble(): number {
      return Math.random();
    }

    public nextBoolean(): boolean {
      return Math.random() >= 0.5;
    }
  }

  export class Arrays {
    public static fill(data: any, begin: number, nbElem: number, param: number): void {
      var max = begin + nbElem;
      for (var i = begin; i < max; i++) {
        data[i] = param;
      }
    }
  }

  export class Collections {

    public static reverse<A>(p: List<A>): void {
      var temp = new List<A>();
      for (var i = 0; i < p.size(); i++) {
        temp.add(p.get(i));
      }
      p.clear();
      for (var i = temp.size() - 1; i >= 0; i--) {
        p.add(temp.get(i));
      }
    }

    public static sort<A>(p: List<A>): void {
      p.sort();
    }
  }

  export interface Collection<T> {
    add(val: T): void
    addAll(vals: Collection<T>): void
    remove(val: T): void
    clear(): void
    isEmpty(): boolean
    size(): number
    contains(val: T): boolean
    toArray(a: Array<T>): T[]
  }

  export class XArray {
    length: number;

    constructor() {
      Array.apply(this, arguments);
      return new Array();
    }

    pop(): any {
      return "";
    }

    push(val: any): number {
      return 0;
    }

    splice(newS: any, arrL: any): void {
    }

    indexOf(val: any): number {
      return 0;
    }

    shift(): any {
      return "";
    }

    sort(): void {
    }
  }

  XArray.prototype = new Array();

  export class List<T> extends XArray implements Collection<T> {

    addAll(vals: Collection<T>) {
      var tempArray = vals.toArray(null);
      for (var i = 0; i < tempArray.length; i++) {
        this.push(tempArray[i]);
      }
    }

    clear() {
      this.length = 0;
    }

    poll(): T {
      return this.shift();
    }

    remove(val: T) {

    }

    toArray(a: Array<T>): T[] {
      return <T[]><any>this;
    }

    size(): number {
      return this.length;
    }

    add(val: T): void {
      this.push(val);
    }

    get(index: number): T {
      return this[index];
    }

    contains(val: T): boolean {
      return this.indexOf(val) != -1;
    }

    isEmpty(): boolean {
      return this.length == 0;
    }
  }

  export class ArrayList<T> extends List<T> {
  }

  export class LinkedList<T> extends List<T> {
  }

  export class Stack<T> {
    content = new Array();

    pop(): T {
      return this.content.pop();
    }

    push(t: T): void {
      this.content.push(t);
    }

    isEmpty(): boolean {
      return this.content.length == 0;
    }

    peek(): T {
      return this.content.slice(-1)[0];
    }

  }


  export class Map<K, V> {

    get(key: K): V {
      return this[<any>key];
    }

    put(key: K, value: V): V {
      var previous_val = this[<any>key];
      this[<any>key] = value;
      return previous_val;
    }

    containsKey(key: K): boolean {
      return this.hasOwnProperty(<any>key);
    }

    remove(key: K): V {
      var tmp = this[<any>key];
      delete this[<any>key];
      return tmp;
    }

    keySet(): Set<K> {
      var result = new HashSet<K>();
      for (var p in this) {
          if (this.hasOwnProperty(p)) {
              result.add(<any> p);
          }
      }
      return result;
    }

    isEmpty(): boolean {
      return Object.keys(this).length == 0;
    }

    values(): Set<V> {
      var result = new HashSet<V>();
      for (var p in this) {
        if (this.hasOwnProperty(p)) {
          result.add(this[p]);
        }
      }
      return result;
    }

    clear(): void {
      for (var p in this) {
        if (this.hasOwnProperty(p)) {
          delete this[p];
        }
      }
    }

  }

  export class HashMap<K, V> extends Map<K, V> {
  }

  export class Set<T> implements Collection<T> {

    add(val: T) {
      this[<any>val] = val;
    }

    clear() {
      for (var p in this) {
        if (this.hasOwnProperty(p)) {
          delete this[p];
        }
      }
    }

    contains(val: T): boolean {
      return this.hasOwnProperty(<any>val);
    }

    addAll(vals: Collection<T>) {
      var tempArray = vals.toArray(null);
      for (var i = 0; i < tempArray.length; i++) {
        this[<any>tempArray[i]] = tempArray[i];
      }
    }

    remove(val: T) {
      delete this[<any>val];
    }

    size(): number {
      return Object.keys(this).length;
    }

    isEmpty(): boolean {
      return this.size() == 0;
    }

    toArray(a: Array<T>): T[] {
      for (var ik in this) {
        a.push(this[ik]);
      }
      return a;
    }
  }

  export class HashSet<T> extends Set<T> {
  }
}

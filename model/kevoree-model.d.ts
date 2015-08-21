declare module java {
    module lang {
        class System {
            static gc(): void;
            static arraycopy(src: any[] | Float64Array | Int32Array, srcPos: number, dest: any[] | Float64Array | Int32Array, destPos: number, numElements: number): void;
        }
        interface Runnable {
            run(): void;
        }
        class StringBuilder {
            private _buffer;
            length: number;
            append(val: any): StringBuilder;
            toString(): string;
        }
    }
    module util {
        module concurrent {
            module atomic {
                class AtomicIntegerArray {
                    _internal: Int32Array;
                    constructor(p: Int32Array);
                    set(index: number, newVal: number): void;
                    get(index: number): number;
                    getAndSet(index: number, newVal: number): number;
                    compareAndSet(index: number, expect: number, update: number): boolean;
                }
                class AtomicReference<A> {
                    _internal: A;
                    compareAndSet(expect: A, update: A): boolean;
                    get(): A;
                    set(newRef: A): void;
                    getAndSet(newVal: A): A;
                }
                class AtomicLong {
                    _internal: number;
                    constructor(init: number);
                    compareAndSet(expect: number, update: number): boolean;
                    get(): number;
                    incrementAndGet(): number;
                    decrementAndGet(): number;
                }
                class AtomicInteger {
                    _internal: number;
                    constructor(init: number);
                    compareAndSet(expect: number, update: number): boolean;
                    get(): number;
                    set(newVal: number): void;
                    getAndSet(newVal: number): number;
                    incrementAndGet(): number;
                    decrementAndGet(): number;
                    getAndIncrement(): number;
                    getAndDecrement(): number;
                }
            }
        }
        class Random {
            nextInt(max?: number): number;
            nextDouble(): number;
            nextBoolean(): boolean;
        }
        class Arrays {
            static fill(data: any, begin: number, nbElem: number, param: number): void;
        }
        class Collections {
            static reverse<A>(p: List<A>): void;
            static sort<A>(p: List<A>): void;
        }
        interface Collection<T> {
            add(val: T): void;
            addAll(vals: Collection<T>): void;
            remove(val: T): void;
            clear(): void;
            isEmpty(): boolean;
            size(): number;
            contains(val: T): boolean;
            toArray(a: Array<T>): T[];
        }
        class XArray {
            length: number;
            constructor();
            pop(): any;
            push(val: any): number;
            splice(newS: any, arrL: any): void;
            indexOf(val: any): number;
            shift(): any;
            sort(): void;
        }
        class List<T> extends XArray implements Collection<T> {
            addAll(vals: Collection<T>): void;
            clear(): void;
            poll(): T;
            remove(val: T): void;
            toArray(a: Array<T>): T[];
            size(): number;
            add(val: T): void;
            get(index: number): T;
            contains(val: T): boolean;
            isEmpty(): boolean;
        }
        class ArrayList<T> extends List<T> {
        }
        class LinkedList<T> extends List<T> {
        }
        class Stack<T> {
            content: any[];
            pop(): T;
            push(t: T): void;
            isEmpty(): boolean;
            peek(): T;
        }
        class Map<K, V> {
            get(key: K): V;
            put(key: K, value: V): V;
            containsKey(key: K): boolean;
            remove(key: K): V;
            keySet(): Set<K>;
            isEmpty(): boolean;
            values(): Set<V>;
            clear(): void;
        }
        class HashMap<K, V> extends Map<K, V> {
        }
        class Set<T> implements Collection<T> {
            add(val: T): void;
            clear(): void;
            contains(val: T): boolean;
            addAll(vals: Collection<T>): void;
            remove(val: T): void;
            size(): number;
            isEmpty(): boolean;
            toArray(a: Array<T>): T[];
        }
        class HashSet<T> extends Set<T> {
        }
    }
}
declare module org {
    module kevoree {
        module modeling {
            class KActionType {
                static CALL: KActionType;
                static CALL_RESPONSE: KActionType;
                static SET: KActionType;
                static ADD: KActionType;
                static REMOVE: KActionType;
                static NEW: KActionType;
                equals(other: any): boolean;
                static _KActionTypeVALUES: KActionType[];
                static values(): KActionType[];
            }
            interface KCallback<A> {
                (a: A): void;
            }
            class KConfig {
                static CAS_MAX_TRY: number;
                static CALLBACK_HISTORY: number;
                static LONG_SIZE: number;
                static PREFIX_SIZE: number;
                static BEGINNING_OF_TIME: number;
                static END_OF_TIME: number;
                static NULL_LONG: number;
                static KEY_PREFIX_MASK: number;
                static KEY_SEP: string;
                static CACHE_INIT_SIZE: number;
                static CACHE_LOAD_FACTOR: number;
            }
            class KContentKey {
                static NULL_KEY: Float64Array;
                static GLOBAL_UNIVERSE_KEY: Float64Array;
                universe: number;
                time: number;
                obj: number;
                static toString(keys: Float64Array, keyIndex: number): string;
                constructor(p_universeID: number, p_timeID: number, p_objID: number);
                static createObject(p_universeID: number, p_quantaID: number, p_objectID: number): org.kevoree.modeling.KContentKey;
                static createGlobalUniverseTree(): org.kevoree.modeling.KContentKey;
                static createRootUniverseTree(): org.kevoree.modeling.KContentKey;
                static createLastPrefix(): org.kevoree.modeling.KContentKey;
                static create(payload: string): org.kevoree.modeling.KContentKey;
                equals(param: any): boolean;
            }
            interface KListener {
                universe(): number;
                listenObjects(): Float64Array;
                listen(obj: org.kevoree.modeling.KObject): void;
                delete(): void;
                then(updatedObjects: org.kevoree.modeling.KCallback<any>): void;
            }
            interface KModel<A extends org.kevoree.modeling.KUniverse<any, any>> {
                key(): number;
                newUniverse(): A;
                universe(key: number): A;
                manager(): org.kevoree.modeling.memory.manager.KDataManager;
                setClassOperation(metaOperation: org.kevoree.modeling.meta.KMetaOperation, operation: org.kevoree.modeling.KOperation<any, any>): void;
                setInstanceOperation(metaOperation: org.kevoree.modeling.meta.KMetaOperation, target: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.KOperation<any, any>): void;
                metaModel(): org.kevoree.modeling.meta.KMetaModel;
                defer(): org.kevoree.modeling.defer.KDefer;
                save(cb: org.kevoree.modeling.KCallback<any>): void;
                connect(cb: org.kevoree.modeling.KCallback<any>): void;
                close(cb: org.kevoree.modeling.KCallback<any>): void;
                createByName(metaClassName: string, universe: number, time: number): org.kevoree.modeling.KObject;
                create(clazz: org.kevoree.modeling.meta.KMetaClass, universe: number, time: number): org.kevoree.modeling.KObject;
                lookup(universe: number, time: number, uuid: number, cb: org.kevoree.modeling.KCallback<any>): void;
                lookupAll(universe: number, time: number, uuids: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                createListener(universe: number): org.kevoree.modeling.KListener;
                createModelContext(): org.kevoree.modeling.KModelContext;
            }
            interface KModelContext {
                set(originTime: number, maxTime: number, originUniverse: number, maxUniverse: number): void;
                originTime(): number;
                originUniverse(): number;
                maxTime(): number;
                maxUniverse(): number;
                listen(callback: org.kevoree.modeling.KCallback<any>): void;
                model(): org.kevoree.modeling.KModel<any>;
            }
            interface KObject {
                universe(): number;
                now(): number;
                uuid(): number;
                metaClass(): org.kevoree.modeling.meta.KMetaClass;
                visitAttributes(visitor: org.kevoree.modeling.traversal.visitor.KModelAttributeVisitor): void;
                visit(visitor: org.kevoree.modeling.traversal.visitor.KModelVisitor, cb: org.kevoree.modeling.KCallback<any>): void;
                traversal(): org.kevoree.modeling.traversal.KTraversal;
                jump(time: number, callback: org.kevoree.modeling.KCallback<any>): void;
                select(query: string, cb: org.kevoree.modeling.KCallback<any>): void;
                delete(cb: org.kevoree.modeling.KCallback<any>): void;
                mutate(actionType: org.kevoree.modeling.KActionType, metaReference: org.kevoree.modeling.meta.KMetaReference, param: org.kevoree.modeling.KObject): void;
                ref(metaReference: org.kevoree.modeling.meta.KMetaReference, cb: org.kevoree.modeling.KCallback<any>): void;
                get(attribute: org.kevoree.modeling.meta.KMetaAttribute): any;
                getByName(atributeName: string): any;
                set(attribute: org.kevoree.modeling.meta.KMetaAttribute, payload: any): void;
                setByName(atributeName: string, payload: any): void;
                getRefValuesByName(refName: string): Float64Array;
                addByName(relationName: string, objToAdd: org.kevoree.modeling.KObject): void;
                removeByName(relationName: string, objToAdd: org.kevoree.modeling.KObject): void;
                timeDephasing(): number;
                allTimes(cb: org.kevoree.modeling.KCallback<any>): void;
                timesBefore(endOfSearch: number, cb: org.kevoree.modeling.KCallback<any>): void;
                timesAfter(beginningOfSearch: number, cb: org.kevoree.modeling.KCallback<any>): void;
                timesBetween(beginningOfSearch: number, endOfSearch: number, cb: org.kevoree.modeling.KCallback<any>): void;
                toJSON(): string;
                equals(other: any): boolean;
                referencesWith(o: org.kevoree.modeling.KObject): org.kevoree.modeling.meta.KMetaReference[];
                call(operation: org.kevoree.modeling.meta.KMetaOperation, params: any[], cb: org.kevoree.modeling.KCallback<any>): void;
                manager(): org.kevoree.modeling.memory.manager.KDataManager;
            }
            interface KObjectInfer extends org.kevoree.modeling.KObject {
                genericTrain(dependencies: org.kevoree.modeling.KObject[], expectedOutputs: any[], callback: org.kevoree.modeling.KCallback<any>): void;
                genericTrainAll(trainingSet: org.kevoree.modeling.KObject[][], expectedResultSet: any[][], callback: org.kevoree.modeling.KCallback<any>): void;
                genericInfer(features: org.kevoree.modeling.KObject[], callback: org.kevoree.modeling.KCallback<any>): void;
                genericInferAll(features: org.kevoree.modeling.KObject[][], callback: org.kevoree.modeling.KCallback<any>): void;
                resetLearning(): void;
            }
            interface KOperation<SourceObject extends org.kevoree.modeling.KObject, ResultType> {
                (source: SourceObject, params: any[], result: org.kevoree.modeling.KCallback<any>): void;
            }
            interface KType {
                name(): string;
                isEnum(): boolean;
                id(): number;
            }
            interface KUniverse<A extends org.kevoree.modeling.KView, B extends org.kevoree.modeling.KUniverse<any, any>> {
                key(): number;
                time(timePoint: number): A;
                diverge(): B;
                equals(other: any): boolean;
                lookupAllTimes(uuid: number, times: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                createListener(): org.kevoree.modeling.KListener;
            }
            interface KView {
                createByName(metaClassName: string): org.kevoree.modeling.KObject;
                create(clazz: org.kevoree.modeling.meta.KMetaClass): org.kevoree.modeling.KObject;
                select(query: string, cb: org.kevoree.modeling.KCallback<any>): void;
                lookup(key: number, cb: org.kevoree.modeling.KCallback<any>): void;
                lookupAll(keys: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                universe(): number;
                now(): number;
                json(): org.kevoree.modeling.format.KModelFormat;
                xmi(): org.kevoree.modeling.format.KModelFormat;
                equals(other: any): boolean;
                setRoot(elem: org.kevoree.modeling.KObject, cb: org.kevoree.modeling.KCallback<any>): void;
                getRoot(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            module abs {
                class AbstractDataType implements org.kevoree.modeling.KType {
                    private _name;
                    private _isEnum;
                    private _id;
                    constructor(p_name: string, p_isEnum: boolean, p_id: number);
                    name(): string;
                    isEnum(): boolean;
                    id(): number;
                }
                class AbstractKModel<A extends org.kevoree.modeling.KUniverse<any, any>> implements org.kevoree.modeling.KModel<any> {
                    _manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager;
                    private _key;
                    constructor(p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                    metaModel(): org.kevoree.modeling.meta.KMetaModel;
                    connect(cb: org.kevoree.modeling.KCallback<any>): void;
                    close(cb: org.kevoree.modeling.KCallback<any>): void;
                    manager(): org.kevoree.modeling.memory.manager.KDataManager;
                    newUniverse(): A;
                    internalCreateUniverse(universe: number): A;
                    internalCreateObject(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): org.kevoree.modeling.KObject;
                    createProxy(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): org.kevoree.modeling.KObject;
                    universe(key: number): A;
                    save(cb: org.kevoree.modeling.KCallback<any>): void;
                    setClassOperation(metaOperation: org.kevoree.modeling.meta.KMetaOperation, operation: org.kevoree.modeling.KOperation<any, any>): void;
                    setInstanceOperation(metaOperation: org.kevoree.modeling.meta.KMetaOperation, target: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.KOperation<any, any>): void;
                    defer(): org.kevoree.modeling.defer.KDefer;
                    key(): number;
                    create(clazz: org.kevoree.modeling.meta.KMetaClass, universe: number, time: number): org.kevoree.modeling.KObject;
                    createByName(metaClassName: string, universe: number, time: number): org.kevoree.modeling.KObject;
                    lookup(p_universe: number, p_time: number, p_uuid: number, cb: org.kevoree.modeling.KCallback<any>): void;
                    lookupAll(p_universe: number, p_time: number, p_uuids: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                    createListener(universe: number): org.kevoree.modeling.KListener;
                    createModelContext(): org.kevoree.modeling.KModelContext;
                }
                class AbstractKModelContext implements org.kevoree.modeling.KModelContext {
                    static ORIGIN_TIME: number;
                    static MAX_TIME: number;
                    static ORIGIN_UNIVERSE: number;
                    static MAX_UNIVERSE: number;
                    static NB_ELEM: number;
                    private _callbacks;
                    private _bounds;
                    private _origin;
                    constructor(p_origin: org.kevoree.modeling.KModel<any>);
                    set(p_originTime: number, p_maxTime: number, p_originUniverse: number, p_maxUniverse: number): void;
                    originTime(): number;
                    originUniverse(): number;
                    maxTime(): number;
                    maxUniverse(): number;
                    listen(new_callback: org.kevoree.modeling.KCallback<any>): void;
                    model(): org.kevoree.modeling.KModel<any>;
                }
                class AbstractKObject implements org.kevoree.modeling.KObject {
                    _uuid: number;
                    _time: number;
                    _universe: number;
                    _metaClass: org.kevoree.modeling.meta.KMetaClass;
                    _manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager;
                    private static OUT_OF_CACHE_MSG;
                    private _previousResolveds;
                    static UNIVERSE_PREVIOUS_INDEX: number;
                    static TIME_PREVIOUS_INDEX: number;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_actualUniverse: number, p_actualTime: number);
                    previousResolved(): java.util.concurrent.atomic.AtomicReference<Float64Array>;
                    timeDephasing(): number;
                    uuid(): number;
                    metaClass(): org.kevoree.modeling.meta.KMetaClass;
                    now(): number;
                    universe(): number;
                    delete(cb: org.kevoree.modeling.KCallback<any>): void;
                    select(query: string, cb: org.kevoree.modeling.KCallback<any>): void;
                    get(p_attribute: org.kevoree.modeling.meta.KMetaAttribute): any;
                    getByName(attributeName: string): any;
                    set(p_attribute: org.kevoree.modeling.meta.KMetaAttribute, payload: any): void;
                    setByName(attributeName: string, payload: any): void;
                    addByName(relationName: string, objToAdd: org.kevoree.modeling.KObject): void;
                    removeByName(relationName: string, objToAdd: org.kevoree.modeling.KObject): void;
                    mutate(actionType: org.kevoree.modeling.KActionType, metaReference: org.kevoree.modeling.meta.KMetaReference, param: org.kevoree.modeling.KObject): void;
                    internal_mutate(actionType: org.kevoree.modeling.KActionType, metaReferenceP: org.kevoree.modeling.meta.KMetaReference, param: org.kevoree.modeling.KObject, setOpposite: boolean): void;
                    size(p_metaReference: org.kevoree.modeling.meta.KMetaReference): number;
                    ref(p_metaReference: org.kevoree.modeling.meta.KMetaReference, cb: org.kevoree.modeling.KCallback<any>): void;
                    getRefValuesByName(p_refName: string): Float64Array;
                    visitAttributes(visitor: org.kevoree.modeling.traversal.visitor.KModelAttributeVisitor): void;
                    visit(p_visitor: org.kevoree.modeling.traversal.visitor.KModelVisitor, cb: org.kevoree.modeling.KCallback<any>): void;
                    private internal_visit(visitor, end, visited, traversed);
                    toJSON(): string;
                    toString(): string;
                    equals(obj: any): boolean;
                    hashCode(): number;
                    jump(p_time: number, p_callback: org.kevoree.modeling.KCallback<any>): void;
                    internal_transpose_ref(p: org.kevoree.modeling.meta.KMetaReference): org.kevoree.modeling.meta.KMetaReference;
                    internal_transpose_att(p: org.kevoree.modeling.meta.KMetaAttribute): org.kevoree.modeling.meta.KMetaAttribute;
                    internal_transpose_op(p: org.kevoree.modeling.meta.KMetaOperation): org.kevoree.modeling.meta.KMetaOperation;
                    traversal(): org.kevoree.modeling.traversal.KTraversal;
                    referencesWith(o: org.kevoree.modeling.KObject): org.kevoree.modeling.meta.KMetaReference[];
                    call(p_operation: org.kevoree.modeling.meta.KMetaOperation, p_params: any[], cb: org.kevoree.modeling.KCallback<any>): void;
                    manager(): org.kevoree.modeling.memory.manager.KDataManager;
                    private internal_times(start, end, cb);
                    allTimes(cb: org.kevoree.modeling.KCallback<any>): void;
                    timesBefore(endOfSearch: number, cb: org.kevoree.modeling.KCallback<any>): void;
                    timesAfter(beginningOfSearch: number, cb: org.kevoree.modeling.KCallback<any>): void;
                    timesBetween(beginningOfSearch: number, endOfSearch: number, cb: org.kevoree.modeling.KCallback<any>): void;
                }
                class AbstractKObjectInfer extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.modeling.KObjectInfer {
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, currentUniverse: number, currentTime: number);
                    private dependenciesResolver(dependencies);
                    genericTrain(dependencies: org.kevoree.modeling.KObject[], expectedOutputs: any[], callback: org.kevoree.modeling.KCallback<any>): void;
                    genericTrainAll(p_dependencies: org.kevoree.modeling.KObject[][], p_outputs: any[][], callback: org.kevoree.modeling.KCallback<any>): void;
                    genericInfer(dependencies: org.kevoree.modeling.KObject[], callback: org.kevoree.modeling.KCallback<any>): void;
                    genericInferAll(p_dependencies: org.kevoree.modeling.KObject[][], callback: org.kevoree.modeling.KCallback<any>): void;
                    resetLearning(): void;
                    private internalConvertOutput(output, metaOutput);
                    private internalReverseOutput(inferred, metaOutput);
                    private math_ceil(toCeilValue);
                }
                class AbstractKUniverse<A extends org.kevoree.modeling.KView, B extends org.kevoree.modeling.KUniverse<any, any>> implements org.kevoree.modeling.KUniverse<any, any> {
                    _universe: number;
                    _manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager;
                    constructor(p_key: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                    key(): number;
                    time(timePoint: number): A;
                    internal_create(timePoint: number): A;
                    equals(obj: any): boolean;
                    diverge(): B;
                    lookupAllTimes(uuid: number, times: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                    createListener(): org.kevoree.modeling.KListener;
                }
                class AbstractKView implements org.kevoree.modeling.KView {
                    _time: number;
                    _universe: number;
                    _manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager;
                    constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                    now(): number;
                    universe(): number;
                    setRoot(elem: org.kevoree.modeling.KObject, cb: org.kevoree.modeling.KCallback<any>): void;
                    getRoot(cb: org.kevoree.modeling.KCallback<any>): void;
                    select(query: string, cb: org.kevoree.modeling.KCallback<any>): void;
                    lookup(kid: number, cb: org.kevoree.modeling.KCallback<any>): void;
                    lookupAll(keys: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                    create(clazz: org.kevoree.modeling.meta.KMetaClass): org.kevoree.modeling.KObject;
                    createByName(metaClassName: string): org.kevoree.modeling.KObject;
                    json(): org.kevoree.modeling.format.KModelFormat;
                    xmi(): org.kevoree.modeling.format.KModelFormat;
                    equals(obj: any): boolean;
                }
            }
            module cdn {
                interface KContentDeliveryDriver {
                    get(keys: Float64Array, callback: org.kevoree.modeling.KCallback<any>): void;
                    atomicGetIncrement(key: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                    put(keys: Float64Array, values: string[], error: org.kevoree.modeling.KCallback<any>, excludeListener: number): void;
                    remove(keys: Float64Array, error: org.kevoree.modeling.KCallback<any>): void;
                    connect(callback: org.kevoree.modeling.KCallback<any>): void;
                    close(callback: org.kevoree.modeling.KCallback<any>): void;
                    addUpdateListener(interceptor: org.kevoree.modeling.cdn.KContentUpdateListener): number;
                    removeUpdateListener(id: number): void;
                }
                interface KContentUpdateListener {
                    (updatedKeys: Float64Array): void;
                }
                module impl {
                    class MemoryContentDeliveryDriver implements org.kevoree.modeling.cdn.KContentDeliveryDriver {
                        private backend;
                        private additionalInterceptors;
                        atomicGetIncrement(key: Float64Array, cb: org.kevoree.modeling.KCallback<any>): void;
                        get(keys: Float64Array, callback: org.kevoree.modeling.KCallback<any>): void;
                        put(p_keys: Float64Array, p_values: string[], p_callback: org.kevoree.modeling.KCallback<any>, excludeListener: number): void;
                        remove(p_keys: Float64Array, callback: org.kevoree.modeling.KCallback<any>): void;
                        connect(callback: org.kevoree.modeling.KCallback<any>): void;
                        close(callback: org.kevoree.modeling.KCallback<any>): void;
                        private nextListenerID();
                        addUpdateListener(p_interceptor: org.kevoree.modeling.cdn.KContentUpdateListener): number;
                        removeUpdateListener(id: number): void;
                    }
                }
            }
            module defer {
                interface KDefer {
                    waitResult(): org.kevoree.modeling.KCallback<any>;
                    then(cb: org.kevoree.modeling.KCallback<any>): void;
                }
                module impl {
                    class Defer implements org.kevoree.modeling.defer.KDefer {
                        private _end;
                        private _nbExpectedResult;
                        private _nbRecResult;
                        private _results;
                        private _resultSize;
                        waitResult(): org.kevoree.modeling.KCallback<any>;
                        then(cb: org.kevoree.modeling.KCallback<any>): void;
                        private informEndOrRegister(p_indexToInsert, p_result, p_end);
                    }
                }
            }
            module extrapolation {
                interface Extrapolation {
                    extrapolate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.KMetaAttribute, dataManager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): any;
                    mutate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.KMetaAttribute, payload: any, dataManager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                }
                module impl {
                    class DiscreteExtrapolation implements org.kevoree.modeling.extrapolation.Extrapolation {
                        private static INSTANCE;
                        static instance(): org.kevoree.modeling.extrapolation.Extrapolation;
                        extrapolate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.KMetaAttribute, dataManager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): any;
                        mutate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.KMetaAttribute, payload: any, dataManager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        private convert(attribute, payload);
                    }
                    class PolynomialExtrapolation implements org.kevoree.modeling.extrapolation.Extrapolation {
                        private static _maxDegree;
                        private static DEGREE;
                        private static NUMSAMPLES;
                        private static STEP;
                        private static LASTTIME;
                        private static WEIGHTS;
                        private static INSTANCE;
                        extrapolate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.KMetaAttribute, dataManager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): any;
                        private extrapolateValue(segment, meta, index, time, timeOrigin);
                        private maxErr(precision, degree);
                        insert(time: number, value: number, timeOrigin: number, raw: org.kevoree.modeling.memory.chunk.KObjectChunk, index: number, precision: number, metaClass: org.kevoree.modeling.meta.KMetaClass): boolean;
                        private tempError(computedWeights, times, values);
                        private internal_extrapolate(t, raw, index, metaClass);
                        private initial_feed(time, value, raw, index, metaClass);
                        mutate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.KMetaAttribute, payload: any, dataManager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        private castNumber(payload);
                        static instance(): org.kevoree.modeling.extrapolation.Extrapolation;
                    }
                }
            }
            module format {
                interface KModelFormat {
                    save(model: org.kevoree.modeling.KObject, cb: org.kevoree.modeling.KCallback<any>): void;
                    saveRoot(cb: org.kevoree.modeling.KCallback<any>): void;
                    load(payload: string, cb: org.kevoree.modeling.KCallback<any>): void;
                }
                module json {
                    class JsonFormat implements org.kevoree.modeling.format.KModelFormat {
                        static KEY_META: string;
                        static KEY_UUID: string;
                        static KEY_ROOT: string;
                        private _manager;
                        private _universe;
                        private _time;
                        private static NULL_PARAM_MSG;
                        constructor(p_universe: number, p_time: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                        save(model: org.kevoree.modeling.KObject, cb: org.kevoree.modeling.KCallback<any>): void;
                        saveRoot(cb: org.kevoree.modeling.KCallback<any>): void;
                        load(payload: string, cb: org.kevoree.modeling.KCallback<any>): void;
                    }
                    class JsonModelLoader {
                        static load(manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, universe: number, time: number, payload: string, callback: org.kevoree.modeling.KCallback<any>): void;
                        private static loadObj(p_param, manager, universe, time, p_mappedKeys, p_rootElem);
                        private static transposeArr(plainRawSet, p_mappedKeys);
                        private static sizeOfList(plainRawSet);
                        private static getString(plainRawSet, l);
                    }
                    class JsonModelSerializer {
                        static serialize(model: org.kevoree.modeling.KObject, callback: org.kevoree.modeling.KCallback<any>): void;
                        static printJSON(elem: org.kevoree.modeling.KObject, builder: java.lang.StringBuilder, isRoot: boolean): void;
                    }
                    class JsonObjectReader {
                        private readObject;
                        parseObject(payload: string): void;
                        get(name: string): any;
                        getAsStringArray(name: string): string[];
                        keys(): string[];
                    }
                    class JsonRaw {
                        static encode(raw: org.kevoree.modeling.memory.chunk.KObjectChunk, uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, isRoot: boolean): string;
                    }
                    class JsonString {
                        private static ESCAPE_CHAR;
                        static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void;
                        static encode(p_chain: string): string;
                        static unescape(p_src: string): string;
                    }
                }
                module xmi {
                    class SerializationContext {
                        ignoreGeneratedID: boolean;
                        model: org.kevoree.modeling.KObject;
                        finishCallback: org.kevoree.modeling.KCallback<any>;
                        printer: java.lang.StringBuilder;
                        attributesVisitor: org.kevoree.modeling.traversal.visitor.KModelAttributeVisitor;
                        addressTable: org.kevoree.modeling.memory.chunk.impl.ArrayLongMap<any>;
                        elementsCount: org.kevoree.modeling.memory.chunk.impl.ArrayStringMap<any>;
                        packageList: java.util.ArrayList<string>;
                    }
                    class XMILoadingContext {
                        xmiReader: org.kevoree.modeling.format.xmi.XmlParser;
                        loadedRoots: org.kevoree.modeling.KObject;
                        resolvers: java.util.ArrayList<org.kevoree.modeling.format.xmi.XMIResolveCommand>;
                        map: org.kevoree.modeling.memory.chunk.impl.ArrayStringMap<any>;
                        elementsCount: org.kevoree.modeling.memory.chunk.impl.ArrayStringMap<any>;
                        successCallback: org.kevoree.modeling.KCallback<any>;
                    }
                    class XMIModelLoader {
                        static LOADER_XMI_LOCAL_NAME: string;
                        static LOADER_XMI_XSI: string;
                        static LOADER_XMI_NS_URI: string;
                        static unescapeXml(src: string): string;
                        static load(manager: org.kevoree.modeling.memory.manager.KDataManager, universe: number, time: number, str: string, callback: org.kevoree.modeling.KCallback<any>): void;
                        private static deserialize(manager, universe, time, context);
                        private static callFactory(manager, universe, time, ctx, objectType);
                        private static loadObject(manager, universe, time, ctx, xmiAddress, objectType);
                    }
                    class XMIModelSerializer {
                        static save(model: org.kevoree.modeling.KObject, callback: org.kevoree.modeling.KCallback<any>): void;
                    }
                    class XMIResolveCommand {
                        private context;
                        private target;
                        private mutatorType;
                        private refName;
                        private ref;
                        constructor(context: org.kevoree.modeling.format.xmi.XMILoadingContext, target: org.kevoree.modeling.KObject, mutatorType: org.kevoree.modeling.KActionType, refName: string, ref: string);
                        run(): void;
                    }
                    class XmiFormat implements org.kevoree.modeling.format.KModelFormat {
                        private _manager;
                        private _universe;
                        private _time;
                        constructor(p_universe: number, p_time: number, p_manager: org.kevoree.modeling.memory.manager.KDataManager);
                        save(model: org.kevoree.modeling.KObject, cb: org.kevoree.modeling.KCallback<any>): void;
                        saveRoot(cb: org.kevoree.modeling.KCallback<any>): void;
                        load(payload: string, cb: org.kevoree.modeling.KCallback<any>): void;
                    }
                    class XmlParser {
                        private payload;
                        private current;
                        private currentChar;
                        private tagName;
                        private tagPrefix;
                        private attributePrefix;
                        private readSingleton;
                        private attributesNames;
                        private attributesPrefixes;
                        private attributesValues;
                        private attributeName;
                        private attributeValue;
                        constructor(str: string);
                        getTagPrefix(): string;
                        hasNext(): boolean;
                        getLocalName(): string;
                        getAttributeCount(): number;
                        getAttributeLocalName(i: number): string;
                        getAttributePrefix(i: number): string;
                        getAttributeValue(i: number): string;
                        private readChar();
                        next(): org.kevoree.modeling.format.xmi.XmlToken;
                        private read_lessThan();
                        private read_upperThan();
                        private read_xmlHeader();
                        private read_closingTag();
                        private read_openTag();
                        private read_tagName();
                        private read_attributes();
                    }
                    class XmlToken {
                        static XML_HEADER: XmlToken;
                        static END_DOCUMENT: XmlToken;
                        static START_TAG: XmlToken;
                        static END_TAG: XmlToken;
                        static COMMENT: XmlToken;
                        static SINGLETON_TAG: XmlToken;
                        equals(other: any): boolean;
                        static _XmlTokenVALUES: XmlToken[];
                        static values(): XmlToken[];
                    }
                }
            }
            module infer {
                interface KInferAlg {
                    train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, currentInferObject: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                    infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, currentInferObject: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                }
                class KInferAlgFactory {
                    static build(name: string): org.kevoree.modeling.infer.KInferAlg;
                }
                module impl {
                    class BinaryPerceptronAlg implements org.kevoree.modeling.infer.KInferAlg {
                        private iterations;
                        private alpha;
                        private rand;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        private addUp(features, row, state);
                        private sigmoid(features, row, state);
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                    }
                    class GaussianClassifierAlg implements org.kevoree.modeling.infer.KInferAlg {
                        private static MIN;
                        private static MAX;
                        private static SUM;
                        private static SUMSQUARE;
                        private static NUMOFFIELDS;
                        private getIndex(input, output, field, meta);
                        private getCounter(output, meta);
                        getAvg(output: number, state: org.kevoree.modeling.util.maths.structure.KArray1D, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        getVariance(output: number, state: org.kevoree.modeling.util.maths.structure.KArray1D, avg: Float64Array, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                        getProba(features: org.kevoree.modeling.util.maths.structure.KArray2D, row: number, output: number, state: org.kevoree.modeling.util.maths.structure.KArray1D, meta: org.kevoree.modeling.meta.KMetaDependencies): number;
                        getAllProba(features: Float64Array, state: org.kevoree.modeling.util.maths.structure.impl.Array1D, meta: org.kevoree.modeling.meta.KMetaDependencies, maxOutput: number): Float64Array;
                    }
                    class GaussianProfiler implements org.kevoree.modeling.infer.KInferAlg {
                        private static MIN;
                        private static MAX;
                        private static SUM;
                        private static SUMSQUARE;
                        private static NUMOFFIELDS;
                        maxTimeSlots: number;
                        private getIndex(input, output, field, meta);
                        private getCounter(output, meta);
                        getAvg(output: number, state: org.kevoree.modeling.util.maths.structure.impl.Array1D, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        getVariance(output: number, state: org.kevoree.modeling.util.maths.structure.impl.Array1D, avg: Float64Array, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResult: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                        getProba(features: Float64Array, output: number, state: org.kevoree.modeling.util.maths.structure.impl.Array1D, meta: org.kevoree.modeling.meta.KMetaDependencies): number;
                    }
                    class KMeanClusterAlg implements org.kevoree.modeling.infer.KInferAlg {
                        private k;
                        private iterations;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        private classify(features, row, state);
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                    }
                    class LinearRegressionAlg implements org.kevoree.modeling.infer.KInferAlg {
                        private alpha;
                        private gamma;
                        private iterations;
                        private static rand;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        private estimate(training, row, state);
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                    }
                    class RecommendationAlg implements org.kevoree.modeling.infer.KInferAlg {
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, currentInferObject: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, currentInferObject: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                    }
                    class StatInferAlg implements org.kevoree.modeling.infer.KInferAlg {
                        private static MIN;
                        private static MAX;
                        private static SUM;
                        private static SUMSQuare;
                        private static NUMOFFIELDS;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                        getAvgAll(ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        getMinAll(ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        getMaxAll(ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies): Float64Array;
                        getVarianceAll(ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies, avgs: Float64Array): Float64Array;
                        getAvg(featureNum: number, ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies): number;
                        getMin(featureNum: number, ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies): number;
                        getMax(featureNum: number, ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies): number;
                        getVariance(featureNum: number, ks: org.kevoree.modeling.memory.chunk.KObjectChunk, meta: org.kevoree.modeling.meta.KMetaDependencies, avg: number): number;
                    }
                    class WinnowAlg implements org.kevoree.modeling.infer.KInferAlg {
                        private alpha;
                        private beta;
                        private iterations;
                        private rand;
                        train(trainingSet: org.kevoree.modeling.util.maths.structure.KArray2D, expectedResultSet: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): void;
                        private calculate(features, row, state);
                        infer(features: org.kevoree.modeling.util.maths.structure.KArray2D, origin: org.kevoree.modeling.KObject, manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.util.maths.structure.KArray2D;
                    }
                }
            }
            module memory {
                interface KChunk {
                    serialize(metaModel: org.kevoree.modeling.meta.KMetaModel): string;
                    init(payload: string, metaModel: org.kevoree.modeling.meta.KMetaModel, metaClassIndex: number): void;
                    counter(): number;
                    inc(): number;
                    dec(): number;
                    free(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                    type(): number;
                    space(): org.kevoree.modeling.memory.space.KChunkSpace;
                    getFlags(): number;
                    setFlags(bitsToEnable: number, bitsToDisable: number): void;
                    universe(): number;
                    time(): number;
                    obj(): number;
                }
                class KChunkFlags {
                    static DIRTY_BIT_INDEX: number;
                    static DIRTY_BIT: number;
                    static REMOVED_BIT_INDEX: number;
                    static REMOVED_BIT: number;
                }
                interface KOffHeapChunk extends org.kevoree.modeling.memory.KChunk {
                    memoryAddress(): number;
                    setMemoryAddress(address: number): void;
                }
                module chunk {
                    interface KIntMap<V> {
                        contains(key: number): boolean;
                        get(key: number): V;
                        put(key: number, value: V): void;
                        each(callback: org.kevoree.modeling.memory.chunk.KIntMapCallBack<any>): void;
                    }
                    interface KIntMapCallBack<V> {
                        (key: number, value: V): void;
                    }
                    interface KLongLongMap extends org.kevoree.modeling.memory.KChunk {
                        metaClassIndex(): number;
                        contains(key: number): boolean;
                        get(key: number): number;
                        put(key: number, value: number): void;
                        remove(key: number): void;
                        each(callback: org.kevoree.modeling.memory.chunk.KLongLongMapCallBack<any>): void;
                        size(): number;
                        clear(): void;
                    }
                    interface KLongLongMapCallBack<V> {
                        (key: number, value: number): void;
                    }
                    interface KLongLongTree extends org.kevoree.modeling.memory.chunk.KTree {
                        insert(key: number, value: number): void;
                        previousOrEqualValue(key: number): number;
                        lookupValue(key: number): number;
                    }
                    interface KLongMap<V> {
                        contains(key: number): boolean;
                        get(key: number): V;
                        put(key: number, value: V): void;
                        each(callback: org.kevoree.modeling.memory.chunk.KLongMapCallBack<any>): void;
                        size(): number;
                        clear(): void;
                    }
                    interface KLongMapCallBack<V> {
                        (key: number, value: V): void;
                    }
                    interface KLongTree extends org.kevoree.modeling.memory.chunk.KTree {
                        insert(key: number): void;
                        previousOrEqual(key: number): number;
                        lookup(key: number): number;
                        range(startKey: number, endKey: number, walker: org.kevoree.modeling.memory.chunk.KTreeWalker): void;
                    }
                    interface KObjectChunk extends org.kevoree.modeling.memory.KChunk {
                        clone(p_universe: number, p_time: number, p_obj: number, p_metaClass: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                        metaClassIndex(): number;
                        toJSON(metaModel: org.kevoree.modeling.meta.KMetaModel): string;
                        setPrimitiveType(index: number, content: any, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                        getPrimitiveType(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): any;
                        getLongArray(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): Float64Array;
                        getLongArraySize(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                        getLongArrayElem(index: number, refIndex: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                        addLongToArray(index: number, newRef: number, metaClass: org.kevoree.modeling.meta.KMetaClass): boolean;
                        removeLongToArray(index: number, previousRef: number, metaClass: org.kevoree.modeling.meta.KMetaClass): boolean;
                        clearLongArray(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                        getDoubleArray(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): Float64Array;
                        getDoubleArraySize(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                        getDoubleArrayElem(index: number, arrayIndex: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                        setDoubleArrayElem(index: number, arrayIndex: number, valueToInsert: number, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                        extendDoubleArray(index: number, newSize: number, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                    }
                    interface KStringMap<V> {
                        contains(key: string): boolean;
                        get(key: string): V;
                        put(key: string, value: V): void;
                        each(callback: org.kevoree.modeling.memory.chunk.KStringMapCallBack<any>): void;
                        size(): number;
                        clear(): void;
                        remove(key: string): void;
                    }
                    interface KStringMapCallBack<V> {
                        (key: string, value: V): void;
                    }
                    interface KTree extends org.kevoree.modeling.memory.KChunk {
                        size(): number;
                    }
                    interface KTreeWalker {
                        (t: number): void;
                    }
                    module impl {
                        class AbstractArrayTree implements org.kevoree.modeling.memory.KChunk {
                            private static BLACK_LEFT;
                            private static BLACK_RIGHT;
                            private static RED_LEFT;
                            private static RED_RIGHT;
                            private static META_SIZE;
                            private static LOAD_FACTOR;
                            kvSize: number;
                            private _threshold;
                            private _root_index;
                            private _size;
                            private state;
                            private _space;
                            private _flags;
                            private _counter;
                            private _universe;
                            private _time;
                            private _obj;
                            constructor(p_universe: number, p_time: number, p_obj: number, p_space: org.kevoree.modeling.memory.space.KChunkSpace);
                            counter(): number;
                            inc(): number;
                            dec(): number;
                            universe(): number;
                            time(): number;
                            obj(): number;
                            getFlags(): number;
                            setFlags(bitsToEnable: number, bitsToDisable: number): void;
                            space(): org.kevoree.modeling.memory.space.KChunkSpace;
                            private allocate(capacity);
                            private reallocate(newCapacity);
                            size(): number;
                            key(p_currentIndex: number): number;
                            private setKey(p_currentIndex, p_paramIndex);
                            value(p_currentIndex: number): number;
                            private setValue(p_currentIndex, p_paramIndex);
                            private left(p_currentIndex);
                            private setLeft(p_currentIndex, p_paramIndex);
                            private right(p_currentIndex);
                            private setRight(p_currentIndex, p_paramIndex);
                            private parent(p_currentIndex);
                            private setParent(p_currentIndex, p_paramIndex);
                            private color(p_currentIndex);
                            private setColor(p_currentIndex, p_paramIndex);
                            private grandParent(p_currentIndex);
                            private sibling(p_currentIndex);
                            private uncle(p_currentIndex);
                            private previous(p_index);
                            private next(p_index);
                            lookup(p_key: number): number;
                            range(startKey: number, endKey: number, walker: org.kevoree.modeling.memory.chunk.KTreeWalker): void;
                            internal_previousOrEqual_index(p_key: number): number;
                            private rotateLeft(n);
                            private rotateRight(n);
                            private replaceNode(oldn, newn);
                            private insertCase1(n);
                            private insertCase2(n);
                            private insertCase3(n);
                            private insertCase4(n_n);
                            private insertCase5(n);
                            serialize(metaModel: org.kevoree.modeling.meta.KMetaModel): string;
                            init(payload: string, metaModel: org.kevoree.modeling.meta.KMetaModel, metaClassIndex: number): void;
                            free(p_metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                            internal_insert(p_key: number, p_value: number): void;
                            internal_lookup_value(p_key: number): number;
                            private internal_set_dirty();
                            type(): number;
                        }
                        module AbstractArrayTree {
                            class InternalState {
                                _back_meta: Int32Array;
                                _back_kv: Float64Array;
                                _back_colors: boolean[];
                                constructor(_back_meta: Int32Array, _back_kv: Float64Array, _back_colors: boolean[]);
                            }
                        }
                        class ArrayIntMap<V> implements org.kevoree.modeling.memory.chunk.KIntMap<any> {
                            constructor(initalCapacity: number, loadFactor: number);
                            clear(): void;
                            get(key: number): V;
                            put(key: number, pval: V): V;
                            contains(key: number): boolean;
                            remove(key: number): V;
                            size(): number;
                            each(callback: (p: number, p1: V) => void): void;
                        }
                        class ArrayLongLongMap implements org.kevoree.modeling.memory.chunk.KLongLongMap {
                            elementCount: number;
                            droppedCount: number;
                            state: org.kevoree.modeling.memory.chunk.impl.ArrayLongLongMap.InternalState;
                            threshold: number;
                            private initialCapacity;
                            private static loadFactor;
                            private _flags;
                            private _counter;
                            private _space;
                            private _universe;
                            private _time;
                            private _obj;
                            private _metaClassIndex;
                            constructor(p_universe: number, p_time: number, p_obj: number, p_space: org.kevoree.modeling.memory.space.KChunkSpace);
                            counter(): number;
                            inc(): number;
                            dec(): number;
                            clear(): void;
                            rehashCapacity(capacity: number): void;
                            each(callback: org.kevoree.modeling.memory.chunk.KLongLongMapCallBack<any>): void;
                            metaClassIndex(): number;
                            contains(key: number): boolean;
                            get(key: number): number;
                            put(key: number, value: number): void;
                            findNonNullKeyEntry(key: number, index: number): number;
                            remove(key: number): void;
                            size(): number;
                            init(payload: string, metaModel: org.kevoree.modeling.meta.KMetaModel, metaClassIndex: number): void;
                            serialize(metaModel: org.kevoree.modeling.meta.KMetaModel): string;
                            free(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                            type(): number;
                            space(): org.kevoree.modeling.memory.space.KChunkSpace;
                            private internal_set_dirty();
                            getFlags(): number;
                            setFlags(bitsToEnable: number, bitsToDisable: number): void;
                            universe(): number;
                            time(): number;
                            obj(): number;
                        }
                        module ArrayLongLongMap {
                            class InternalState {
                                elementDataSize: number;
                                elementKV: Float64Array;
                                elementNext: Int32Array;
                                elementHash: Int32Array;
                                constructor(elementDataSize: number, elementKV: Float64Array, elementNext: Int32Array, elementHash: Int32Array);
                            }
                        }
                        class ArrayLongLongTree extends org.kevoree.modeling.memory.chunk.impl.AbstractArrayTree implements org.kevoree.modeling.memory.chunk.KLongLongTree {
                            constructor(p_universe: number, p_time: number, p_obj: number, p_space: org.kevoree.modeling.memory.space.KChunkSpace);
                            previousOrEqualValue(p_key: number): number;
                            lookupValue(p_key: number): number;
                            insert(p_key: number, p_value: number): void;
                            type(): number;
                        }
                        class ArrayLongMap<V> implements org.kevoree.modeling.memory.chunk.KLongMap<any> {
                            constructor(initalCapacity: number, loadFactor: number);
                            clear(): void;
                            get(key: number): V;
                            put(key: number, pval: V): V;
                            contains(key: number): boolean;
                            remove(key: number): V;
                            size(): number;
                            each(callback: (p: number, p1: V) => void): void;
                        }
                        class ArrayLongTree extends org.kevoree.modeling.memory.chunk.impl.AbstractArrayTree implements org.kevoree.modeling.memory.chunk.KLongTree {
                            constructor(p_universe: number, p_time: number, p_obj: number, p_space: org.kevoree.modeling.memory.space.KChunkSpace);
                            previousOrEqual(key: number): number;
                            insert(p_key: number): void;
                            type(): number;
                        }
                        class ArrayStringMap<V> implements org.kevoree.modeling.memory.chunk.KStringMap<any> {
                            constructor(initalCapacity: number, loadFactor: number);
                            clear(): void;
                            get(key: string): V;
                            put(key: string, pval: V): V;
                            contains(key: string): boolean;
                            remove(key: string): V;
                            size(): number;
                            each(callback: (p: string, p1: V) => void): void;
                        }
                        class HeapObjectChunk implements org.kevoree.modeling.memory.chunk.KObjectChunk {
                            private _space;
                            private _flags;
                            private _counter;
                            private _universe;
                            private _time;
                            private _obj;
                            private raw;
                            private _metaClassIndex;
                            constructor(p_universe: number, p_time: number, p_obj: number, p_space: org.kevoree.modeling.memory.space.KChunkSpace);
                            space(): org.kevoree.modeling.memory.space.KChunkSpace;
                            metaClassIndex(): number;
                            serialize(metaModel: org.kevoree.modeling.meta.KMetaModel): string;
                            private doubleArrayToBuffer(builder, i, encoded);
                            private longArrayToBuffer(builder, i, encoded);
                            init(payload: string, metaModel: org.kevoree.modeling.meta.KMetaModel, metaClassIndex: number): void;
                            counter(): number;
                            inc(): number;
                            dec(): number;
                            free(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                            type(): number;
                            getPrimitiveType(index: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass): any;
                            getLongArraySize(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                            getLongArrayElem(index: number, refIndex: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                            getLongArray(index: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass): Float64Array;
                            addLongToArray(index: number, newRef: number, metaClass: org.kevoree.modeling.meta.KMetaClass): boolean;
                            removeLongToArray(index: number, refToRemove: number, metaClass: org.kevoree.modeling.meta.KMetaClass): boolean;
                            clearLongArray(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                            getDoubleArray(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): Float64Array;
                            getDoubleArraySize(index: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                            getDoubleArrayElem(index: number, arrayIndex: number, metaClass: org.kevoree.modeling.meta.KMetaClass): number;
                            setDoubleArrayElem(index: number, arrayIndex: number, valueToInsert: number, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                            extendDoubleArray(index: number, newSize: number, metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                            setPrimitiveType(index: number, content: any, p_metaClass: org.kevoree.modeling.meta.KMetaClass): void;
                            clone(p_universe: number, p_time: number, p_obj: number, p_metaClass: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            toJSON(metaModel: org.kevoree.modeling.meta.KMetaModel): string;
                            private internal_set_dirty();
                            getFlags(): number;
                            setFlags(bitsToEnable: number, bitsToDisable: number): void;
                            universe(): number;
                            time(): number;
                            obj(): number;
                        }
                    }
                }
                module manager {
                    class DataManagerBuilder {
                        private _driver;
                        private _scheduler;
                        private _strategy;
                        driver(): org.kevoree.modeling.cdn.KContentDeliveryDriver;
                        scheduler(): org.kevoree.modeling.scheduler.KScheduler;
                        strategy(): org.kevoree.modeling.memory.strategy.KMemoryStrategy;
                        static create(): org.kevoree.modeling.memory.manager.DataManagerBuilder;
                        withContentDeliveryDriver(p_driver: org.kevoree.modeling.cdn.KContentDeliveryDriver): org.kevoree.modeling.memory.manager.DataManagerBuilder;
                        withScheduler(p_scheduler: org.kevoree.modeling.scheduler.KScheduler): org.kevoree.modeling.memory.manager.DataManagerBuilder;
                        withMemoryStrategy(p_strategy: org.kevoree.modeling.memory.strategy.KMemoryStrategy): org.kevoree.modeling.memory.manager.DataManagerBuilder;
                        build(): org.kevoree.modeling.memory.manager.internal.KInternalDataManager;
                        static buildDefault(): org.kevoree.modeling.memory.manager.internal.KInternalDataManager;
                    }
                    interface KDataManager {
                        lookup(universe: number, time: number, uuid: number, callback: org.kevoree.modeling.KCallback<any>): void;
                        lookupAllObjects(universe: number, time: number, uuids: Float64Array, callback: org.kevoree.modeling.KCallback<any>): void;
                        lookupAllTimes(universe: number, times: Float64Array, uuid: number, callback: org.kevoree.modeling.KCallback<any>): void;
                        save(callback: org.kevoree.modeling.KCallback<any>): void;
                        getRoot(universe: number, time: number, callback: org.kevoree.modeling.KCallback<any>): void;
                        setRoot(newRoot: org.kevoree.modeling.KObject, callback: org.kevoree.modeling.KCallback<any>): void;
                        model(): org.kevoree.modeling.KModel<any>;
                        connect(callback: org.kevoree.modeling.KCallback<any>): void;
                        close(callback: org.kevoree.modeling.KCallback<any>): void;
                    }
                    module impl {
                        class DataManager implements org.kevoree.modeling.memory.manager.KDataManager, org.kevoree.modeling.memory.manager.internal.KInternalDataManager {
                            private static UNIVERSE_NOT_CONNECTED_ERROR;
                            private _operationManager;
                            private _db;
                            private _scheduler;
                            private _listenerManager;
                            private _modelKeyCalculator;
                            private _resolver;
                            private _space;
                            private _spaceManager;
                            private _objectKeyCalculator;
                            private _universeKeyCalculator;
                            private isConnected;
                            private prefix;
                            private _model;
                            private static UNIVERSE_INDEX;
                            private static OBJ_INDEX;
                            private static GLO_TREE_INDEX;
                            private static zeroPrefix;
                            private currentCdnListener;
                            private static PREFIX_TO_SAVE_SIZE;
                            private static KEY_SIZE;
                            setModel(p_model: org.kevoree.modeling.KModel<any>): void;
                            constructor(p_cdn: org.kevoree.modeling.cdn.KContentDeliveryDriver, p_scheduler: org.kevoree.modeling.scheduler.KScheduler, p_factory: org.kevoree.modeling.memory.strategy.KMemoryStrategy);
                            model(): org.kevoree.modeling.KModel<any>;
                            close(callback: org.kevoree.modeling.KCallback<any>): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            nextModelKey(): number;
                            initUniverse(p_universe: number, p_parent: number): void;
                            save(callback: org.kevoree.modeling.KCallback<any>): void;
                            initKObject(obj: org.kevoree.modeling.KObject): void;
                            preciseChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            closestChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            connect(connectCallback: org.kevoree.modeling.KCallback<any>): void;
                            delete(p_universe: org.kevoree.modeling.KUniverse<any, any>, callback: org.kevoree.modeling.KCallback<any>): void;
                            lookup(universe: number, time: number, uuid: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            lookupAllObjects(universe: number, time: number, uuids: Float64Array, callback: org.kevoree.modeling.KCallback<any>): void;
                            lookupAllTimes(universe: number, times: Float64Array, uuid: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            getRoot(universe: number, time: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            setRoot(newRoot: org.kevoree.modeling.KObject, callback: org.kevoree.modeling.KCallback<any>): void;
                            cdn(): org.kevoree.modeling.cdn.KContentDeliveryDriver;
                            private attachContentDeliveryDriver(p_dataBase);
                            operationManager(): org.kevoree.modeling.operation.KOperationManager;
                            createListener(p_universe: number): org.kevoree.modeling.KListener;
                            resolveTimes(currentUniverse: number, currentUuid: number, startTime: number, endTime: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            spaceSize(): number;
                            printDebug(): void;
                        }
                        class HeapListener implements org.kevoree.modeling.KListener {
                            private _universe;
                            private _listenerManager;
                            private _id;
                            cb: org.kevoree.modeling.KCallback<any>;
                            listenerID(): number;
                            constructor(p_universe: number, p_listenerManager: org.kevoree.modeling.memory.manager.impl.ListenerManager, p_id: number);
                            universe(): number;
                            listenObjects(): Float64Array;
                            listen(obj: org.kevoree.modeling.KObject): void;
                            delete(): void;
                            then(p_cb: org.kevoree.modeling.KCallback<any>): void;
                        }
                        class KeyCalculator {
                            private _prefix;
                            private _currentIndex;
                            constructor(prefix: number, currentIndex: number);
                            nextKey(): number;
                            lastComputedIndex(): number;
                            prefix(): number;
                        }
                        class ListenerManager {
                            private _keyGen;
                            _listeners: org.kevoree.modeling.memory.chunk.impl.ArrayLongMap<any>;
                            _listener2Objects: org.kevoree.modeling.memory.chunk.impl.ArrayLongMap<any>;
                            _obj2Listener: org.kevoree.modeling.memory.chunk.impl.ArrayLongMap<any>;
                            constructor();
                            clear(): void;
                            createListener(p_universe: number): org.kevoree.modeling.KListener;
                            manageRegistration(listenerID: number, origin: org.kevoree.modeling.KObject): void;
                            isListened(obj: number): boolean;
                            dispatch(objects: org.kevoree.modeling.KObject[]): void;
                        }
                    }
                    module internal {
                        interface KInternalDataManager extends org.kevoree.modeling.memory.manager.KDataManager {
                            createListener(universe: number): org.kevoree.modeling.KListener;
                            cdn(): org.kevoree.modeling.cdn.KContentDeliveryDriver;
                            preciseChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            closestChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            initKObject(obj: org.kevoree.modeling.KObject): void;
                            initUniverse(universe: number, parent: number): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            nextModelKey(): number;
                            delete(universe: org.kevoree.modeling.KUniverse<any, any>, callback: org.kevoree.modeling.KCallback<any>): void;
                            operationManager(): org.kevoree.modeling.operation.KOperationManager;
                            setModel(model: org.kevoree.modeling.KModel<any>): void;
                            resolveTimes(currentUniverse: number, currentUuid: number, startTime: number, endTime: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            spaceSize(): number;
                            printDebug(): void;
                        }
                    }
                }
                module resolver {
                    interface KResolver {
                        lookup(universe: number, time: number, uuid: number, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                        lookupAllObjects(universe: number, time: number, uuids: Float64Array, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                        lookupAllTimes(universe: number, times: Float64Array, uuid: number, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                        lookupPreciseKeys(keys: Float64Array, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                        preciseChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                        closestChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                        indexObject(obj: org.kevoree.modeling.KObject): void;
                        typeFromKey(universe: number, time: number, uuid: number): number;
                        resolveTimes(currentUniverse: number, currentUuid: number, startTime: number, endTime: number, callback: org.kevoree.modeling.KCallback<any>): void;
                        getRoot(universe: number, time: number, callback: org.kevoree.modeling.KCallback<any>): void;
                        setRoot(newRoot: org.kevoree.modeling.KObject, callback: org.kevoree.modeling.KCallback<any>): void;
                        getRelatedKeys(uuid: number, previousResolution: Float64Array): Float64Array;
                    }
                    module impl {
                        class DistortedTimeResolver implements org.kevoree.modeling.memory.resolver.KResolver {
                            private static KEYS_SIZE;
                            private _spaceManager;
                            private _manager;
                            constructor(p_cache: org.kevoree.modeling.memory.space.KChunkSpaceManager, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                            lookup(universe: number, time: number, uuid: number, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                            lookupAllObjects(universe: number, time: number, uuids: Float64Array, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                            lookupPreciseKeys(keys: Float64Array, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                            lookupAllTimes(universe: number, times: Float64Array, uuid: number, callback: org.kevoree.modeling.KCallback<any>): java.lang.Runnable;
                            preciseChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            closestChunk(universe: number, time: number, uuid: number, metaClass: org.kevoree.modeling.meta.KMetaClass, previousResolution: java.util.concurrent.atomic.AtomicReference<Float64Array>): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            private internal_chunk(universe, requestedTime, uuid, useClosest, metaClass, previousResolution);
                            indexObject(obj: org.kevoree.modeling.KObject): void;
                            typeFromKey(universe: number, time: number, uuid: number): number;
                            getOrLoadAndMark(universe: number, time: number, uuid: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            getOrLoadAndMarkAll(keys: Float64Array, callback: org.kevoree.modeling.KCallback<any>): void;
                            getRoot(universe: number, time: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            setRoot(newRoot: org.kevoree.modeling.KObject, callback: org.kevoree.modeling.KCallback<any>): void;
                            resolveTimes(currentUniverse: number, currentUuid: number, startTime: number, endTime: number, callback: org.kevoree.modeling.KCallback<any>): void;
                            static resolve_universe(globalTree: org.kevoree.modeling.memory.chunk.KLongLongMap, objUniverseTree: org.kevoree.modeling.memory.chunk.KLongLongMap, timeToResolve: number, originUniverseId: number): number;
                            static universeSelectByRange(globalTree: org.kevoree.modeling.memory.chunk.KLongLongMap, objUniverseTree: org.kevoree.modeling.memory.chunk.KLongLongMap, rangeMin: number, rangeMax: number, originUniverseId: number): Float64Array;
                            private load(keys, callback);
                            getRelatedKeys(uuid: number, previousResolution: Float64Array): Float64Array;
                        }
                    }
                }
                module space {
                    interface KChunkIterator {
                        hasNext(): boolean;
                        next(): Float64Array;
                        size(): number;
                    }
                    interface KChunkSpace {
                        get(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KChunk;
                        create(universe: number, time: number, obj: number, type: number): org.kevoree.modeling.memory.KChunk;
                        clone(previousElement: org.kevoree.modeling.memory.chunk.KObjectChunk, newUniverse: number, newTime: number, newObj: number, metaModel: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                        clear(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                        delete(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                        remove(universe: number, time: number, obj: number, metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                        size(): number;
                        detachDirties(): org.kevoree.modeling.memory.space.KChunkIterator;
                        declareDirty(dirtyChunk: org.kevoree.modeling.memory.KChunk): void;
                        printDebug(p_metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                    }
                    interface KChunkSpaceManager {
                        getAndMark(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KChunk;
                        unmark(universe: number, time: number, obj: number): void;
                        createAndMark(universe: number, time: number, obj: number, type: number): org.kevoree.modeling.memory.KChunk;
                        unmarkMemoryElement(element: org.kevoree.modeling.memory.KChunk): void;
                        unmarkAllMemoryElements(elements: org.kevoree.modeling.memory.KChunk[]): void;
                        cloneMarkAndUnmark(previous: org.kevoree.modeling.memory.chunk.KObjectChunk, newUniverse: number, newTime: number, obj: number, metaModel: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                        clear(): void;
                        register(object: org.kevoree.modeling.KObject): void;
                        registerAll(objects: org.kevoree.modeling.KObject[]): void;
                        setResolver(resolver: org.kevoree.modeling.memory.resolver.KResolver): void;
                    }
                    class KChunkTypes {
                        static OBJECT_CHUNK: number;
                        static LONG_TREE: number;
                        static LONG_LONG_TREE: number;
                        static LONG_LONG_MAP: number;
                    }
                    module impl {
                        class AbstractCountingChunkSpaceManager implements org.kevoree.modeling.memory.space.KChunkSpaceManager {
                            _space: org.kevoree.modeling.memory.space.KChunkSpace;
                            _metaModel: org.kevoree.modeling.meta.KMetaModel;
                            constructor(p_storage: org.kevoree.modeling.memory.space.KChunkSpace);
                            getAndMark(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KChunk;
                            unmark(universe: number, time: number, obj: number): void;
                            createAndMark(universe: number, time: number, obj: number, type: number): org.kevoree.modeling.memory.KChunk;
                            unmarkMemoryElement(element: org.kevoree.modeling.memory.KChunk): void;
                            unmarkAllMemoryElements(elements: org.kevoree.modeling.memory.KChunk[]): void;
                            cloneMarkAndUnmark(previous: org.kevoree.modeling.memory.chunk.KObjectChunk, newUniverse: number, newTime: number, obj: number, metaModel: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            clear(): void;
                            register(object: org.kevoree.modeling.KObject): void;
                            registerAll(objects: org.kevoree.modeling.KObject[]): void;
                            setResolver(resolver: org.kevoree.modeling.memory.resolver.KResolver): void;
                        }
                        class ChunkIterator implements org.kevoree.modeling.memory.space.KChunkIterator {
                            private _dirties;
                            private _origin;
                            private currentIndex;
                            private maxIndex;
                            private tempKeys;
                            constructor(p_dirties: Float64Array, p_origin: org.kevoree.modeling.memory.space.KChunkSpace);
                            hasNext(): boolean;
                            next(): Float64Array;
                            size(): number;
                        }
                        class HeapChunkSpace implements org.kevoree.modeling.memory.space.KChunkSpace {
                            private static LOAD_FACTOR;
                            private _state;
                            private _dirtyState;
                            constructor();
                            get(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KChunk;
                            create(universe: number, time: number, obj: number, type: number): org.kevoree.modeling.memory.KChunk;
                            clone(previousElement: org.kevoree.modeling.memory.chunk.KObjectChunk, newUniverse: number, newTime: number, newObj: number, metaModel: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            private internal_createElement(p_universe, p_time, p_obj, type);
                            private internal_put(universe, time, p_obj, payload);
                            private complex_insert(universe, time, p_obj, payload, prehash, nextValueIndex);
                            private rehashCapacity(previousState);
                            findNonNullKeyEntry(universe: number, time: number, obj: number, index: number, internalState: org.kevoree.modeling.memory.space.impl.HeapChunkSpace.InternalState): number;
                            size(): number;
                            detachDirties(): org.kevoree.modeling.memory.space.KChunkIterator;
                            declareDirty(dirtyChunk: org.kevoree.modeling.memory.KChunk): void;
                            remove(universe: number, time: number, obj: number, p_metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                            clear(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                            delete(metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                            printDebug(p_metaModel: org.kevoree.modeling.meta.KMetaModel): void;
                        }
                        module HeapChunkSpace {
                            class InternalState {
                                sparse: boolean;
                                elementDataSize: number;
                                elementK3: Float64Array;
                                elementNext: Int32Array;
                                elementHash: java.util.concurrent.atomic.AtomicIntegerArray;
                                values: org.kevoree.modeling.memory.KChunk[];
                                _elementCount: java.util.concurrent.atomic.AtomicInteger;
                                _valuesIndex: java.util.concurrent.atomic.AtomicInteger;
                                _threshold: number;
                                constructor(p_elementDataSize: number, p_elementKE: Float64Array, p_elementNext: Int32Array, p_elementHash: Int32Array, p_values: org.kevoree.modeling.memory.KChunk[]);
                            }
                            class InternalDirtyState {
                                _dirtyList: Float64Array;
                                _dirtyIndex: java.util.concurrent.atomic.AtomicInteger;
                                constructor();
                                declareDirty(universe: number, time: number, obj: number): void;
                                private reallocate(wantedIndex);
                            }
                        }
                        class NoopChunkSpaceManager implements org.kevoree.modeling.memory.space.KChunkSpaceManager {
                            private _space;
                            constructor(p_space: org.kevoree.modeling.memory.space.KChunkSpace);
                            getAndMark(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KChunk;
                            unmark(universe: number, time: number, obj: number): void;
                            createAndMark(universe: number, time: number, obj: number, type: number): org.kevoree.modeling.memory.KChunk;
                            unmarkMemoryElement(element: org.kevoree.modeling.memory.KChunk): void;
                            unmarkAllMemoryElements(elements: org.kevoree.modeling.memory.KChunk[]): void;
                            cloneMarkAndUnmark(previous: org.kevoree.modeling.memory.chunk.KObjectChunk, newUniverse: number, newTime: number, obj: number, metaModel: org.kevoree.modeling.meta.KMetaModel): org.kevoree.modeling.memory.chunk.KObjectChunk;
                            clear(): void;
                            register(object: org.kevoree.modeling.KObject): void;
                            registerAll(objects: org.kevoree.modeling.KObject[]): void;
                            setResolver(resolver: org.kevoree.modeling.memory.resolver.KResolver): void;
                        }
                    }
                }
                module strategy {
                    interface KMemoryStrategy {
                        newSpace(): org.kevoree.modeling.memory.space.KChunkSpace;
                        newSpaceManager(space: org.kevoree.modeling.memory.space.KChunkSpace): org.kevoree.modeling.memory.space.KChunkSpaceManager;
                    }
                    module impl {
                        class HeapMemoryStrategy implements org.kevoree.modeling.memory.strategy.KMemoryStrategy {
                            newSpace(): org.kevoree.modeling.memory.space.KChunkSpace;
                            newSpaceManager(p_space: org.kevoree.modeling.memory.space.KChunkSpace): org.kevoree.modeling.memory.space.KChunkSpaceManager;
                        }
                    }
                }
            }
            module message {
                interface KMessage {
                    json(): string;
                    type(): number;
                }
                class KMessageLoader {
                    static TYPE_NAME: string;
                    static OPERATION_NAME: string;
                    static KEY_NAME: string;
                    static KEYS_NAME: string;
                    static ID_NAME: string;
                    static VALUE_NAME: string;
                    static VALUES_NAME: string;
                    static CLASS_IDX_NAME: string;
                    static PARAMETERS_NAME: string;
                    static EVENTS_TYPE: number;
                    static GET_REQ_TYPE: number;
                    static GET_RES_TYPE: number;
                    static PUT_REQ_TYPE: number;
                    static PUT_RES_TYPE: number;
                    static OPERATION_CALL_TYPE: number;
                    static OPERATION_RESULT_TYPE: number;
                    static ATOMIC_GET_INC_REQUEST_TYPE: number;
                    static ATOMIC_GET_INC_RESULT_TYPE: number;
                    static load(payload: string): org.kevoree.modeling.message.KMessage;
                }
                module impl {
                    class AtomicGetIncrementRequest implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        keys: Float64Array;
                        json(): string;
                        type(): number;
                    }
                    class AtomicGetIncrementResult implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        value: number;
                        json(): string;
                        type(): number;
                    }
                    class Events implements org.kevoree.modeling.message.KMessage {
                        _keys: Float64Array;
                        allKeys(): Float64Array;
                        constructor(p_keys: Float64Array);
                        json(): string;
                        type(): number;
                    }
                    class GetRequest implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        keys: Float64Array;
                        json(): string;
                        type(): number;
                    }
                    class GetResult implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        values: string[];
                        json(): string;
                        type(): number;
                    }
                    class MessageHelper {
                        static printJsonStart(builder: java.lang.StringBuilder): void;
                        static printJsonEnd(builder: java.lang.StringBuilder): void;
                        static printType(builder: java.lang.StringBuilder, type: number): void;
                        static printElem(elem: any, name: string, builder: java.lang.StringBuilder): void;
                    }
                    class OperationCallMessage implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        classIndex: number;
                        opIndex: number;
                        params: string[];
                        key: Float64Array;
                        json(): string;
                        type(): number;
                    }
                    class OperationResultMessage implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        value: string;
                        key: org.kevoree.modeling.KContentKey;
                        json(): string;
                        type(): number;
                    }
                    class PutRequest implements org.kevoree.modeling.message.KMessage {
                        keys: Float64Array;
                        values: string[];
                        id: number;
                        json(): string;
                        type(): number;
                    }
                    class PutResult implements org.kevoree.modeling.message.KMessage {
                        id: number;
                        json(): string;
                        type(): number;
                    }
                }
            }
            module meta {
                interface KLiteral extends org.kevoree.modeling.meta.KMeta {
                }
                interface KMeta {
                    index(): number;
                    metaName(): string;
                    metaType(): org.kevoree.modeling.meta.MetaType;
                }
                interface KMetaAttribute extends org.kevoree.modeling.meta.KMeta {
                    key(): boolean;
                    attributeTypeId(): number;
                    strategy(): org.kevoree.modeling.extrapolation.Extrapolation;
                    precision(): number;
                    setExtrapolation(extrapolation: org.kevoree.modeling.extrapolation.Extrapolation): void;
                    setPrecision(precision: number): void;
                }
                interface KMetaClass extends org.kevoree.modeling.meta.KMeta {
                    metaElements(): org.kevoree.modeling.meta.KMeta[];
                    meta(index: number): org.kevoree.modeling.meta.KMeta;
                    metaByName(name: string): org.kevoree.modeling.meta.KMeta;
                    attribute(name: string): org.kevoree.modeling.meta.KMetaAttribute;
                    reference(name: string): org.kevoree.modeling.meta.KMetaReference;
                    operation(name: string): org.kevoree.modeling.meta.KMetaOperation;
                    addAttribute(attributeName: string, p_type: org.kevoree.modeling.KType): org.kevoree.modeling.meta.KMetaAttribute;
                    addReference(referenceName: string, metaClass: org.kevoree.modeling.meta.KMetaClass, oppositeName: string, toMany: boolean): org.kevoree.modeling.meta.KMetaReference;
                    addDependency(dependencyName: string, referredMetaClassIndex: number): org.kevoree.modeling.meta.KMetaDependency;
                    addInput(name: string, extractor: string): org.kevoree.modeling.meta.KMetaInferInput;
                    addOutput(name: string, metaClass: org.kevoree.modeling.KType): org.kevoree.modeling.meta.KMetaInferOutput;
                    addOperation(operationName: string): org.kevoree.modeling.meta.KMetaOperation;
                    inferAlg(): org.kevoree.modeling.infer.KInferAlg;
                    dependencies(): org.kevoree.modeling.meta.KMetaDependencies;
                    inputs(): org.kevoree.modeling.meta.KMetaInferInput[];
                    outputs(): org.kevoree.modeling.meta.KMetaInferOutput[];
                    temporalResolution(): number;
                    setTemporalResolution(tempo: number): void;
                }
                interface KMetaDependencies extends org.kevoree.modeling.meta.KMeta {
                    origin(): org.kevoree.modeling.meta.KMetaClass;
                    allDependencies(): org.kevoree.modeling.meta.KMetaDependency[];
                    dependencyByName(dependencyName: string): org.kevoree.modeling.meta.KMetaDependency;
                    addDependency(dependencyName: string, p_referredMetaClassIndex: number): org.kevoree.modeling.meta.KMetaDependency;
                }
                interface KMetaDependency extends org.kevoree.modeling.meta.KMeta {
                    referredMetaClassIndex(): number;
                }
                interface KMetaEnum extends org.kevoree.modeling.KType, org.kevoree.modeling.meta.KMeta {
                    literals(): org.kevoree.modeling.meta.KLiteral[];
                    literalByName(name: string): org.kevoree.modeling.meta.KLiteral;
                    literal(index: number): org.kevoree.modeling.meta.KLiteral;
                    addLiteral(name: string): org.kevoree.modeling.meta.KLiteral;
                }
                interface KMetaInferInput extends org.kevoree.modeling.meta.KMeta {
                    extractorQuery(): string;
                    extractor(): org.kevoree.modeling.traversal.KTraversal;
                }
                interface KMetaInferOutput extends org.kevoree.modeling.meta.KMeta {
                    attributeTypeId(): number;
                }
                interface KMetaModel extends org.kevoree.modeling.meta.KMeta {
                    metaClasses(): org.kevoree.modeling.meta.KMetaClass[];
                    metaClassByName(name: string): org.kevoree.modeling.meta.KMetaClass;
                    metaClass(index: number): org.kevoree.modeling.meta.KMetaClass;
                    addMetaClass(metaClassName: string): org.kevoree.modeling.meta.KMetaClass;
                    addInferMetaClass(metaClassName: string, inferAlg: org.kevoree.modeling.infer.KInferAlg): org.kevoree.modeling.meta.KMetaClass;
                    metaTypes(): org.kevoree.modeling.meta.KMetaEnum[];
                    metaTypeByName(name: string): org.kevoree.modeling.meta.KMetaEnum;
                    addMetaEnum(enumName: string): org.kevoree.modeling.meta.KMetaEnum;
                    createModel(manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.KModel<any>;
                }
                interface KMetaOperation extends org.kevoree.modeling.meta.KMeta {
                    originMetaClassIndex(): number;
                }
                interface KMetaReference extends org.kevoree.modeling.meta.KMeta {
                    visible(): boolean;
                    single(): boolean;
                    referredMetaClassIndex(): number;
                    oppositeName(): string;
                    originMetaClassIndex(): number;
                }
                class KPrimitiveTypes {
                    static BOOL_ID: number;
                    static STRING_ID: number;
                    static LONG_ID: number;
                    static INT_ID: number;
                    static DOUBLE_ID: number;
                    static CONTINUOUS_ID: number;
                    static BOOL: org.kevoree.modeling.KType;
                    static STRING: org.kevoree.modeling.KType;
                    static LONG: org.kevoree.modeling.KType;
                    static INT: org.kevoree.modeling.KType;
                    static DOUBLE: org.kevoree.modeling.KType;
                    static CONTINUOUS: org.kevoree.modeling.KType;
                    static isEnum(attributeTypeId: number): boolean;
                }
                class MetaType {
                    static ATTRIBUTE: MetaType;
                    static REFERENCE: MetaType;
                    static DEPENDENCY: MetaType;
                    static DEPENDENCIES: MetaType;
                    static INPUT: MetaType;
                    static OUTPUT: MetaType;
                    static OPERATION: MetaType;
                    static CLASS: MetaType;
                    static MODEL: MetaType;
                    static ENUM: MetaType;
                    static LITERAL: MetaType;
                    equals(other: any): boolean;
                    static _MetaTypeVALUES: MetaType[];
                    static values(): MetaType[];
                }
                module impl {
                    class GenericModel extends org.kevoree.modeling.abs.AbstractKModel<any> {
                        private _p_metaModel;
                        constructor(mm: org.kevoree.modeling.meta.KMetaModel, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                        metaModel(): org.kevoree.modeling.meta.KMetaModel;
                        internalCreateUniverse(universe: number): org.kevoree.modeling.KUniverse<any, any>;
                        internalCreateObject(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): org.kevoree.modeling.KObject;
                    }
                    class GenericObject extends org.kevoree.modeling.abs.AbstractKObject {
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, currentUniverse: number, currentTime: number);
                    }
                    class GenericObjectInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, currentUniverse: number, currentTime: number);
                    }
                    class GenericUniverse extends org.kevoree.modeling.abs.AbstractKUniverse<any, any> {
                        constructor(p_key: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                        internal_create(timePoint: number): org.kevoree.modeling.KView;
                    }
                    class GenericView extends org.kevoree.modeling.abs.AbstractKView {
                        constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
                    }
                    class MetaAttribute implements org.kevoree.modeling.meta.KMetaAttribute {
                        private _name;
                        private _index;
                        _precision: number;
                        private _key;
                        private _attributeTypeId;
                        private _extrapolation;
                        attributeTypeId(): number;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        precision(): number;
                        key(): boolean;
                        strategy(): org.kevoree.modeling.extrapolation.Extrapolation;
                        setExtrapolation(extrapolation: org.kevoree.modeling.extrapolation.Extrapolation): void;
                        setPrecision(p_precision: number): void;
                        constructor(p_name: string, p_index: number, p_precision: number, p_key: boolean, p_attributeTypeId: number, p_extrapolation: org.kevoree.modeling.extrapolation.Extrapolation);
                    }
                    class MetaClass implements org.kevoree.modeling.meta.KMetaClass {
                        private _name;
                        private _index;
                        private _meta;
                        private _indexes;
                        private _alg;
                        private _cachedInputs;
                        private _cachedOutputs;
                        private _temporalResolution;
                        constructor(p_name: string, p_index: number, p_alg: org.kevoree.modeling.infer.KInferAlg);
                        init(p_metaElements: org.kevoree.modeling.meta.KMeta[]): void;
                        metaByName(name: string): org.kevoree.modeling.meta.KMeta;
                        attribute(name: string): org.kevoree.modeling.meta.KMetaAttribute;
                        reference(name: string): org.kevoree.modeling.meta.KMetaReference;
                        operation(name: string): org.kevoree.modeling.meta.KMetaOperation;
                        metaElements(): org.kevoree.modeling.meta.KMeta[];
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        meta(index: number): org.kevoree.modeling.meta.KMeta;
                        addAttribute(attributeName: string, p_type: org.kevoree.modeling.KType): org.kevoree.modeling.meta.KMetaAttribute;
                        private internal_addatt(attributeName, p_type);
                        addReference(referenceName: string, p_metaClass: org.kevoree.modeling.meta.KMetaClass, oppositeName: string, toMany: boolean): org.kevoree.modeling.meta.KMetaReference;
                        private internal_addref(referenceName, p_metaClass, oppositeName, toMany);
                        private getOrCreate(p_name, p_oppositeName, p_oppositeClass, p_visible, p_single);
                        addOperation(operationName: string): org.kevoree.modeling.meta.KMetaOperation;
                        inferAlg(): org.kevoree.modeling.infer.KInferAlg;
                        addDependency(dependencyName: string, referredMetaClassIndex: number): org.kevoree.modeling.meta.KMetaDependency;
                        addInput(p_name: string, p_extractor: string): org.kevoree.modeling.meta.KMetaInferInput;
                        addOutput(p_name: string, p_type: org.kevoree.modeling.KType): org.kevoree.modeling.meta.KMetaInferOutput;
                        dependencies(): org.kevoree.modeling.meta.KMetaDependencies;
                        inputs(): org.kevoree.modeling.meta.KMetaInferInput[];
                        private cacheInputs();
                        outputs(): org.kevoree.modeling.meta.KMetaInferOutput[];
                        temporalResolution(): number;
                        setTemporalResolution(p_tempo: number): void;
                        private cacheOuputs();
                        private clearCached();
                        private internal_add_meta(p_new_meta);
                    }
                    class MetaDependencies implements org.kevoree.modeling.meta.KMetaDependencies {
                        private _origin;
                        private _dependencies;
                        static DEPENDENCIES_NAME: string;
                        private _index;
                        private _indexes;
                        constructor(p_index: number, p_origin: org.kevoree.modeling.meta.KMetaClass);
                        origin(): org.kevoree.modeling.meta.KMetaClass;
                        allDependencies(): org.kevoree.modeling.meta.KMetaDependency[];
                        dependencyByName(dependencyName: string): org.kevoree.modeling.meta.KMetaDependency;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        addDependency(p_dependencyName: string, p_referredMetaClassIndex: number): org.kevoree.modeling.meta.KMetaDependency;
                        private internal_add_dep(p_new_meta);
                    }
                    class MetaDependency implements org.kevoree.modeling.meta.KMetaDependency {
                        private _name;
                        private _index;
                        private _referredMetaClassIndex;
                        referredMetaClassIndex(): number;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        constructor(p_name: string, p_index: number, p_origin: org.kevoree.modeling.meta.KMetaDependencies, p_referredMetaClassIndex: number);
                    }
                    class MetaEnum implements org.kevoree.modeling.meta.KMetaEnum {
                        private _name;
                        private _index;
                        private _literals;
                        private _indexes;
                        constructor(p_name: string, p_index: number);
                        init(lits: org.kevoree.modeling.meta.KLiteral[]): void;
                        literals(): org.kevoree.modeling.meta.KLiteral[];
                        literalByName(p_name: string): org.kevoree.modeling.meta.KLiteral;
                        literal(p_index: number): org.kevoree.modeling.meta.KLiteral;
                        addLiteral(p_name: string): org.kevoree.modeling.meta.KLiteral;
                        name(): string;
                        isEnum(): boolean;
                        id(): number;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        private internal_add_meta(p_new_meta);
                    }
                    class MetaInferInput implements org.kevoree.modeling.meta.KMetaInferInput {
                        private _name;
                        private _index;
                        private _extractor;
                        private _cachedTraversal;
                        constructor(p_name: string, p_index: number, p_extractor: string);
                        extractorQuery(): string;
                        extractor(): org.kevoree.modeling.traversal.KTraversal;
                        private cacheTraversal();
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                    }
                    class MetaInferOutput implements org.kevoree.modeling.meta.KMetaInferOutput {
                        private _name;
                        private _index;
                        private _type;
                        constructor(p_name: string, p_index: number, p_type: number);
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        attributeTypeId(): number;
                    }
                    class MetaLiteral implements org.kevoree.modeling.meta.KLiteral {
                        private _name;
                        private _index;
                        private _className;
                        constructor(p_name: string, p_index: number, p_className: string);
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        toString(): string;
                    }
                    class MetaModel implements org.kevoree.modeling.meta.KMetaModel {
                        private _name;
                        private _index;
                        private _metaClasses;
                        private _metaClasses_indexes;
                        private _metaTypes;
                        private _metaTypes_indexes;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        constructor(p_name: string);
                        init(p_metaClasses: org.kevoree.modeling.meta.KMetaClass[], p_metaEnums: org.kevoree.modeling.meta.KMetaEnum[]): void;
                        metaClasses(): org.kevoree.modeling.meta.KMetaClass[];
                        metaClassByName(name: string): org.kevoree.modeling.meta.KMetaClass;
                        metaClass(index: number): org.kevoree.modeling.meta.KMetaClass;
                        addMetaClass(metaClassName: string): org.kevoree.modeling.meta.KMetaClass;
                        addInferMetaClass(metaClassName: string, inferAlg: org.kevoree.modeling.infer.KInferAlg): org.kevoree.modeling.meta.KMetaClass;
                        metaTypes(): org.kevoree.modeling.meta.KMetaEnum[];
                        metaTypeByName(p_name: string): org.kevoree.modeling.meta.KMetaEnum;
                        addMetaEnum(enumName: string): org.kevoree.modeling.meta.KMetaEnum;
                        private internal_addmetaclass(metaClassName, alg);
                        private internal_add_meta_class(p_newMetaClass);
                        private internal_add_type(p_newType);
                        createModel(p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager): org.kevoree.modeling.KModel<any>;
                    }
                    class MetaOperation implements org.kevoree.modeling.meta.KMetaOperation {
                        private _name;
                        private _index;
                        private _originMetaClassIndex;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        originMetaClassIndex(): number;
                        constructor(p_name: string, p_index: number, p_originMetaClassIndex: number);
                    }
                    class MetaReference implements org.kevoree.modeling.meta.KMetaReference {
                        private _name;
                        private _index;
                        private _visible;
                        private _single;
                        private _referredMetaClassIndex;
                        private _op_name;
                        private _originMetaClassIndex;
                        single(): boolean;
                        referredMetaClassIndex(): number;
                        oppositeName(): string;
                        originMetaClassIndex(): number;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.meta.MetaType;
                        visible(): boolean;
                        constructor(p_name: string, p_index: number, p_visible: boolean, p_single: boolean, p_referredMetaClassIndex: number, op_name: string, p_originMetaClassIndex: number);
                    }
                }
            }
            module operation {
                interface KOperationManager {
                    registerOperation(operation: org.kevoree.modeling.meta.KMetaOperation, callback: org.kevoree.modeling.KOperation<any, any>, target: org.kevoree.modeling.KObject): void;
                    call(source: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.meta.KMetaOperation, param: any[], callback: org.kevoree.modeling.KCallback<any>): void;
                    operationEventReceived(operationEvent: org.kevoree.modeling.message.KMessage): void;
                }
                module impl {
                    class HashOperationManager implements org.kevoree.modeling.operation.KOperationManager {
                        private staticOperations;
                        private instanceOperations;
                        private remoteCallCallbacks;
                        private _manager;
                        private _callbackId;
                        constructor(p_manager: org.kevoree.modeling.memory.manager.KDataManager);
                        registerOperation(operation: org.kevoree.modeling.meta.KMetaOperation, callback: org.kevoree.modeling.KOperation<any, any>, target: org.kevoree.modeling.KObject): void;
                        private searchOperation(source, clazz, operation);
                        call(source: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.meta.KMetaOperation, param: any[], callback: org.kevoree.modeling.KCallback<any>): void;
                        private sendToRemote(source, operation, param, callback);
                        nextKey(): number;
                        operationEventReceived(operationEvent: org.kevoree.modeling.message.KMessage): void;
                    }
                }
            }
            module scheduler {
                interface KScheduler {
                    dispatch(runnable: java.lang.Runnable): void;
                    stop(): void;
                }
                module impl {
                    class DirectScheduler implements org.kevoree.modeling.scheduler.KScheduler {
                        dispatch(runnable: java.lang.Runnable): void;
                        stop(): void;
                    }
                    class ExecutorServiceScheduler implements org.kevoree.modeling.scheduler.KScheduler {
                        dispatch(p_runnable: java.lang.Runnable): void;
                        stop(): void;
                    }
                }
            }
            module traversal {
                interface KTraversal {
                    traverse(metaReference: org.kevoree.modeling.meta.KMetaReference): org.kevoree.modeling.traversal.KTraversal;
                    traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.traversal.KTraversal;
                    attributeQuery(attributeQuery: string): org.kevoree.modeling.traversal.KTraversal;
                    withAttribute(attribute: org.kevoree.modeling.meta.KMetaAttribute, expectedValue: any): org.kevoree.modeling.traversal.KTraversal;
                    withoutAttribute(attribute: org.kevoree.modeling.meta.KMetaAttribute, expectedValue: any): org.kevoree.modeling.traversal.KTraversal;
                    filter(filter: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                    then(cb: org.kevoree.modeling.KCallback<any>): void;
                    eval(expression: string, callback: org.kevoree.modeling.KCallback<any>): void;
                    map(attribute: org.kevoree.modeling.meta.KMetaAttribute, cb: org.kevoree.modeling.KCallback<any>): void;
                    collect(metaReference: org.kevoree.modeling.meta.KMetaReference, continueCondition: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                    traverseTime(timeOffset: number, steps: number, continueCondition: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                    traverseUniverse(universeOffset: number, continueCondition: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                    traverseIndex(indexName: string): org.kevoree.modeling.traversal.KTraversal;
                    exec(origins: org.kevoree.modeling.KObject[], resolver: org.kevoree.modeling.traversal.KTraversalIndexResolver, callback: org.kevoree.modeling.KCallback<any>): void;
                }
                interface KTraversalAction {
                    chain(next: org.kevoree.modeling.traversal.KTraversalAction): void;
                    execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                }
                interface KTraversalActionContext {
                    inputObjects(): org.kevoree.modeling.KObject[];
                    setInputObjects(newSet: org.kevoree.modeling.KObject[]): void;
                    indexResolver(): org.kevoree.modeling.traversal.KTraversalIndexResolver;
                    finalCallback(): org.kevoree.modeling.KCallback<any>;
                }
                interface KTraversalFilter {
                    (obj: org.kevoree.modeling.KObject): boolean;
                }
                interface KTraversalIndexResolver {
                    (indexName: string): org.kevoree.modeling.KObject[];
                }
                module impl {
                    class Traversal implements org.kevoree.modeling.traversal.KTraversal {
                        private static TERMINATED_MESSAGE;
                        private _initObjs;
                        private _initAction;
                        private _lastAction;
                        private _terminated;
                        constructor(p_roots: org.kevoree.modeling.KObject[]);
                        private internal_chain_action(p_action);
                        traverse(p_metaReference: org.kevoree.modeling.meta.KMetaReference): org.kevoree.modeling.traversal.KTraversal;
                        traverseQuery(p_metaReferenceQuery: string): org.kevoree.modeling.traversal.KTraversal;
                        withAttribute(p_attribute: org.kevoree.modeling.meta.KMetaAttribute, p_expectedValue: any): org.kevoree.modeling.traversal.KTraversal;
                        withoutAttribute(p_attribute: org.kevoree.modeling.meta.KMetaAttribute, p_expectedValue: any): org.kevoree.modeling.traversal.KTraversal;
                        attributeQuery(p_attributeQuery: string): org.kevoree.modeling.traversal.KTraversal;
                        filter(p_filter: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                        collect(metaReference: org.kevoree.modeling.meta.KMetaReference, continueCondition: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                        traverseIndex(p_indexName: string): org.kevoree.modeling.traversal.KTraversal;
                        traverseTime(timeOffset: number, steps: number, continueCondition: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                        traverseUniverse(universeOffset: number, continueCondition: org.kevoree.modeling.traversal.KTraversalFilter): org.kevoree.modeling.traversal.KTraversal;
                        then(cb: org.kevoree.modeling.KCallback<any>): void;
                        eval(p_expression: string, callback: org.kevoree.modeling.KCallback<any>): void;
                        map(attribute: org.kevoree.modeling.meta.KMetaAttribute, cb: org.kevoree.modeling.KCallback<any>): void;
                        exec(origins: org.kevoree.modeling.KObject[], resolver: org.kevoree.modeling.traversal.KTraversalIndexResolver, callback: org.kevoree.modeling.KCallback<any>): void;
                    }
                    class TraversalContext implements org.kevoree.modeling.traversal.KTraversalActionContext {
                        private _inputs;
                        private _resolver;
                        private _finalCallback;
                        constructor(_inputs: org.kevoree.modeling.KObject[], _resolver: org.kevoree.modeling.traversal.KTraversalIndexResolver, p_finalCallback: org.kevoree.modeling.KCallback<any>);
                        inputObjects(): org.kevoree.modeling.KObject[];
                        setInputObjects(p_newSet: org.kevoree.modeling.KObject[]): void;
                        indexResolver(): org.kevoree.modeling.traversal.KTraversalIndexResolver;
                        finalCallback(): org.kevoree.modeling.KCallback<any>;
                    }
                    module actions {
                        class DeepCollectAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            private _continueCondition;
                            private _alreadyPassed;
                            private _finalElements;
                            constructor(p_reference: org.kevoree.modeling.meta.KMetaReference, p_continueCondition: org.kevoree.modeling.traversal.KTraversalFilter);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                            private executeStep(p_inputStep, private_callback);
                        }
                        class FilterAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _filter;
                            constructor(p_filter: org.kevoree.modeling.traversal.KTraversalFilter);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class FilterAttributeAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: org.kevoree.modeling.meta.KMetaAttribute, p_expectedValue: any);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class FilterAttributeQueryAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _attributeQuery;
                            constructor(p_attributeQuery: string);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                            private buildParams(p_paramString);
                        }
                        module FilterAttributeQueryAction {
                            class QueryParam {
                                private _name;
                                private _value;
                                private _negative;
                                constructor(p_name: string, p_value: string, p_negative: boolean);
                                name(): string;
                                value(): string;
                                isNegative(): boolean;
                            }
                        }
                        class FilterNotAttributeAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: org.kevoree.modeling.meta.KMetaAttribute, p_expectedValue: any);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class MapAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _attribute;
                            constructor(p_attribute: org.kevoree.modeling.meta.KMetaAttribute);
                            chain(next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class MathExpressionAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _expression;
                            private _engine;
                            constructor(p_expression: string);
                            chain(next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class RemoveDuplicateAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class TraverseAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            constructor(p_reference: org.kevoree.modeling.meta.KMetaReference);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class TraverseIndexAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _indexName;
                            constructor(p_indexName: string);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class TraverseQueryAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private SEP;
                            private _next;
                            private _referenceQuery;
                            constructor(p_referenceQuery: string);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                        class TraverseTimeAction implements org.kevoree.modeling.traversal.KTraversalAction {
                            private _next;
                            private _timeOffset;
                            private _steps;
                            private _continueContition;
                            constructor(p_timeOffset: number, p_steps: number, p_continueCondition: org.kevoree.modeling.traversal.KTraversalFilter);
                            chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void;
                            execute(context: org.kevoree.modeling.traversal.KTraversalActionContext): void;
                        }
                    }
                }
                module query {
                    interface KQueryEngine {
                        eval(query: string, origins: org.kevoree.modeling.KObject[], callback: org.kevoree.modeling.KCallback<any>): void;
                        buildTraversal(query: string): org.kevoree.modeling.traversal.KTraversal;
                    }
                    module impl {
                        class QueryEngine implements org.kevoree.modeling.traversal.query.KQueryEngine {
                            private static INSTANCE;
                            static OPEN_BRACKET: string;
                            static CLOSE_BRACKET: string;
                            static PIPE_SEP: string;
                            static getINSTANCE(): org.kevoree.modeling.traversal.query.KQueryEngine;
                            eval(query: string, origins: org.kevoree.modeling.KObject[], callback: org.kevoree.modeling.KCallback<any>): void;
                            buildTraversal(query: string): org.kevoree.modeling.traversal.KTraversal;
                        }
                    }
                }
                module visitor {
                    interface KModelAttributeVisitor {
                        (metaAttribute: org.kevoree.modeling.meta.KMetaAttribute, value: any): void;
                    }
                    interface KModelVisitor {
                        (elem: org.kevoree.modeling.KObject): org.kevoree.modeling.traversal.visitor.KVisitResult;
                    }
                    class KVisitResult {
                        static CONTINUE: KVisitResult;
                        static SKIP: KVisitResult;
                        static STOP: KVisitResult;
                        equals(other: any): boolean;
                        static _KVisitResultVALUES: KVisitResult[];
                        static values(): KVisitResult[];
                    }
                }
            }
            module util {
                class Checker {
                    static isDefined(param: any): boolean;
                }
                class PrimitiveHelper {
                    static startsWith(src: string, prefix: string): boolean;
                    static endsWith(src: string, prefix: string): boolean;
                    static matches(src: string, regex: string): boolean;
                    static equals(src: string, other: string): boolean;
                    static parseInt(val: string): number;
                    static parseLong(val: string): number;
                    static parseDouble(val: string): number;
                    static parseShort(val: string): number;
                    static parseBoolean(val: string): boolean;
                    static SHORT_MIN_VALUE(): number;
                    static SHORT_MAX_VALUE(): number;
                    static isNaN(val: number): boolean;
                    static DOUBLE_MIN_VALUE(): number;
                    static DOUBLE_MAX_VALUE(): number;
                }
                module maths {
                    class Base64 {
                        private static encodeArray;
                        private static decodeArray;
                        static encodeLong(l: number): string;
                        static encodeLongToBuffer(l: number, buffer: java.lang.StringBuilder): void;
                        static encodeInt(l: number): string;
                        static encodeIntToBuffer(l: number, buffer: java.lang.StringBuilder): void;
                        static decodeToLong(s: any): number;
                        static decodeToLongWithBounds(s: string, offsetBegin: number, offsetEnd: number): number;
                        static decodeToInt(s: any): number;
                        static decodeToIntWithBounds(s: string, offsetBegin: number, offsetEnd: number): number;
                        static encodeDouble(d: number): string;
                        static encodeDoubleToBuffer(d: number, buffer: java.lang.StringBuilder): void;
                        static decodeToDouble(s: string): number;
                        static decodeToDoubleWithBounds(s: string, offsetBegin: number, offsetEnd: number): number;
                        static encodeBoolArray(boolArr: Array<boolean>): string;
                        static encodeBoolArrayToBuffer(boolArr: Array<boolean>, buffer: java.lang.StringBuilder): void;
                        static decodeBoolArray(s: string, arraySize: number): any[];
                        static decodeToBoolArrayWithBounds(s: string, offsetBegin: number, offsetEnd: number, arraySize: number): any[];
                    }
                    class Correlations {
                        static pearson(x: Float64Array, y: Float64Array): number;
                    }
                    class Distribution {
                        static inverseNormalCDF(q: number): number;
                        static gaussian(features: Float64Array, means: Float64Array, variances: Float64Array): number;
                        static gaussianArray(features: org.kevoree.modeling.util.maths.structure.KArray2D, row: number, means: Float64Array, variances: Float64Array): number;
                        static parallelGaussian(features: Float64Array, means: Float64Array, variances: Float64Array): Float64Array;
                        static gaussianOneFeature(feature: number, mean: number, variance: number): number;
                    }
                    class PolynomialFit {
                        A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                        coef: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                        y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                        solver: org.kevoree.modeling.util.maths.matrix.solvers.AdjLinearSolverQr;
                        constructor(degree: number);
                        getCoef(): Float64Array;
                        fit(samplePoints: Float64Array, observations: Float64Array): void;
                        static extrapolate(time: number, weights: Float64Array): number;
                    }
                    class Ranking {
                        static wilsonRank(positive: number, negative: number, confidence: number): number;
                    }
                    class Statistic {
                        static calcHistogram(data: Float64Array, dataratings: Float64Array, numBins: number): void;
                    }
                    class StringDistance {
                        static levenshtein(s0: string, s1: string): number;
                    }
                    module expression {
                        interface KMathExpressionEngine {
                            eval(p_expression: string): number;
                            setVarResolver(resolver: org.kevoree.modeling.util.maths.expression.KMathVariableResolver): void;
                        }
                        interface KMathVariableResolver {
                            (potentialVarName: string): number;
                        }
                        module impl {
                            class MathEntities {
                                private static INSTANCE;
                                operators: org.kevoree.modeling.memory.chunk.KStringMap<any>;
                                functions: org.kevoree.modeling.memory.chunk.KStringMap<any>;
                                static getINSTANCE(): org.kevoree.modeling.util.maths.expression.impl.MathEntities;
                                constructor();
                            }
                            class MathExpressionEngine implements org.kevoree.modeling.util.maths.expression.KMathExpressionEngine {
                                private varResolver;
                                static decimalSeparator: string;
                                static minusSign: string;
                                constructor();
                                static isNumber(st: string): boolean;
                                static isDigit(c: string): boolean;
                                static isLetter(c: string): boolean;
                                static isWhitespace(c: string): boolean;
                                private shuntingYard(expression);
                                eval(p_expression: string): number;
                                setVarResolver(p_resolver: org.kevoree.modeling.util.maths.expression.KMathVariableResolver): void;
                            }
                            class MathExpressionTokenizer {
                                private pos;
                                private input;
                                private previousToken;
                                constructor(input: string);
                                hasNext(): boolean;
                                private peekNextChar();
                                next(): string;
                                getPos(): number;
                            }
                            class MathFunction {
                                private name;
                                private numParams;
                                constructor(name: string, numParams: number);
                                getName(): string;
                                getNumParams(): number;
                                eval(p: Float64Array): number;
                                private date_to_seconds(value);
                                private date_to_minutes(value);
                                private date_to_hours(value);
                                private date_to_days(value);
                                private date_to_months(value);
                                private date_to_year(value);
                                private date_to_dayofweek(value);
                            }
                            class MathOperation {
                                private oper;
                                private precedence;
                                private leftAssoc;
                                constructor(oper: string, precedence: number, leftAssoc: boolean);
                                getOper(): string;
                                getPrecedence(): number;
                                isLeftAssoc(): boolean;
                                eval(v1: number, v2: number): number;
                            }
                        }
                    }
                    module gmm {
                        class BaseSampleDistribution {
                            mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mGlobalWeight: number;
                            mGlobalMean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mGlobalCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mSubspaceGlobalCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mSubspaceInverseCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mForgettingFactor: number;
                            getForgettingFactor(): number;
                            setForgettingFactor(forgettingFactor: number): void;
                            getGlobalWeight(): number;
                            getBandwidthMatrix(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setBandwidthMatrix(mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getGlobalCovariance(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setGlobalCovariance(globalCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getSubspaceGlobalCovariance(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setGlobalWeight(weight: number): void;
                            scaleGlobalWeight(scaleFactor: number): void;
                            setSubspaceGlobalCovariance(subspaceCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getSubspaceInverseCovariance(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setSubspaceInverseCovariance(subspaceInverseCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            evaluateMatrix(pointVector: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                            evaluate(points: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): Float64Array;
                            getGlobalMean(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setGlobalMean(globalMean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getmGlobalCovarianceSmoothed(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                        }
                        class Compressor {
                            private static CONST_SMALL_TOLERANCE;
                            private static MAX;
                            private static MIN_EM_DISTANCE;
                            private static INC_TH_SCALE;
                            private static DEC_TH_SCALE;
                            private static CHECK_IF_DEC_SCALE;
                            private static setNoOfComponentsThreshold(dist, noOfCompsBeforeCompression, noOfCompsAfterCompression);
                            static emUpdate(dist: org.kevoree.modeling.util.maths.gmm.SampleModel, updatePoints: Int32Array): boolean;
                            static compress(dist: org.kevoree.modeling.util.maths.gmm.SampleModel, newComponents: Int32Array): void;
                            private static revitalizeComponents(dist);
                            private static mergeTwoClosestComps(dist);
                            static euclidianDistance(columnVector1: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, columnVector2: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                        }
                        class ConditionalDistribution {
                            conditionalMeans: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            conditionalCovs: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            conditionalWeights: Float64Array;
                            constructor(conditionalMeans: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], conditionalCovs: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], conditionalWeights: Float64Array);
                        }
                        class Hellinger {
                            private static MIN_TOL;
                            private static HALF;
                            static calculateUnscentedHellingerDistance(dist1: org.kevoree.modeling.util.maths.gmm.OneComponentDistribution, dist2: org.kevoree.modeling.util.maths.gmm.TwoComponentDistribution): number;
                            private static mergeSampleDists(dist1, dist2, w1, w2);
                            static getAllSigmaPoints(distribution: org.kevoree.modeling.util.maths.gmm.ThreeComponentDistribution, max: number): java.util.List<org.kevoree.modeling.util.maths.gmm.SigmaPoint>;
                            private static getSigmaPoints(mean, cov, no, k);
                        }
                        class MomentMatcher {
                            static matchMoments(distribution: org.kevoree.modeling.util.maths.gmm.SampleModel): void;
                            static matchMoments2Comp(distribution: org.kevoree.modeling.util.maths.gmm.TwoComponentDistribution): void;
                        }
                        class MultipleComponentDistribution extends org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution {
                            private mSubDistributions;
                            constructor();
                            setValues(weights: Float64Array, means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], covariances: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], bandwidth: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            setComponent(dist: org.kevoree.modeling.util.maths.gmm.MultipleComponentDistribution): void;
                            evaluateMatrix(pointVector: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                            setSubComponents(subComponents: org.kevoree.modeling.util.maths.gmm.OneComponentDistribution[]): void;
                            getSubComponents(): org.kevoree.modeling.util.maths.gmm.OneComponentDistribution[];
                            getSubMeans(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            getSubCovariances(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            getSubWeights(): number[];
                            setSubMeans(means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): void;
                            setSubCovariances(covariances: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): void;
                            setBandwidthMatrix(mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                        }
                        class OneComponentDistribution extends org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution {
                            constructor();
                            setValues(w: number, mean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, covariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, bandwidth: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            setComponent(oneComponentDistribution: org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution): void;
                            split(parentWeight: number): org.kevoree.modeling.util.maths.gmm.TwoComponentDistribution;
                            evaluateMatrix(pointVector: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                            setBandwidthMatrix(mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                        }
                        class SampleModel {
                            private static DEFAULT_NO_OF_COMPS_THRES;
                            private mProbabilityCache;
                            private static MAX_MAHALANOBIS_DIST;
                            mCompressionThreshold: number;
                            mEffectiveNoOfSamples: number;
                            mSubDistributions: org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution[];
                            mNoOfCompsThreshold: number;
                            mEMError: number;
                            mEMCount: number;
                            mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mGlobalWeight: number;
                            mGlobalMean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mGlobalCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mSubspaceGlobalCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mSubspaceInverseCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            mForgettingFactor: number;
                            private mSubspace;
                            getForgettingFactor(): number;
                            setForgettingFactor(forgettingFactor: number): void;
                            getGlobalWeight(): number;
                            getBandwidthMatrix(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            getGlobalCovariance(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setGlobalCovariance(globalCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getSubspaceGlobalCovariance(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setGlobalWeight(weight: number): void;
                            scaleGlobalWeight(scaleFactor: number): void;
                            setSubspaceGlobalCovariance(subspaceCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getSubspaceInverseCovariance(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setSubspaceInverseCovariance(subspaceInverseCovariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            evaluateArray(points: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): Float64Array;
                            getGlobalMean(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setGlobalMean(globalMean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getmGlobalCovarianceSmoothed(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setSampleModelForget(forgettingFactor: number, compressionThreshold: number): void;
                            constructor();
                            setSampleModel(dist: org.kevoree.modeling.util.maths.gmm.SampleModel): void;
                            overWirite(dist: org.kevoree.modeling.util.maths.gmm.SampleModel): void;
                            getmSubspace(): Int32Array;
                            setmSubspace(mSubspace: Int32Array): void;
                            updateDistributionArrayMatrix(means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], covariances: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], weights: Float64Array): void;
                            updateDistributionValues(mean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, covariance: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, weight: number): void;
                            private updateDistributionArray(newPoints);
                            private checkInputParams(means, covariances, weights);
                            private addDistributions(weights, means, covariances);
                            private addDistribution(weight, mean, covariance);
                            private static projectToSubspace(dist);
                            static containsVal(i: number, j: number, subspace: Int32Array): boolean;
                            private static projectBandwidthToOriginalSpace(distribution, bandwidthFactor);
                            private reestimateBandwidth(means, covariance, weights, Cov_smp, N_eff);
                            private getIntSquaredHessian(means, weights, covariance, F, g);
                            setSubDistributions(subDistributions: org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution[]): void;
                            getSubDistributions(): org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution[];
                            addToSubDistribution(dist: org.kevoree.modeling.util.maths.gmm.BaseSampleDistribution): void;
                            setSubMeans(means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): void;
                            setSubCovariances(covariances: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): void;
                            getSubSmoothedCovariances(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            getSubMeans(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            getSubCovariances(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix[];
                            getSubWeights(): Float64Array;
                            setSubWeights(weights: Float64Array): void;
                            getMarginalDistribution(n: number): org.kevoree.modeling.util.maths.gmm.ConditionalDistribution;
                            getConditionalDistribution(condition: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.gmm.ConditionalDistribution;
                            gradQuadrSearch(start: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.gmm.SearchResult;
                            evaluateMatrix(pointVector: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                            evaluate(pointVector: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], covs: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], weights: Float64Array): number;
                            mahalanobis(x: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], covs: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[]): Float64Array;
                            resetProbabilityCache(): void;
                            setBandwidthMatrix(mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            setNoOfCompsThreshold(threshold: number): void;
                            getNoOfCompsThreshold(): number;
                            removeSubDistributions(index: number): void;
                        }
                        class SearchResult {
                            point: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            probability: number;
                            constructor(point: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, probability: number);
                        }
                        class SigmaPoint {
                            private mPointVecor;
                            private mWeightInComponent;
                            private mWeight;
                            getmWeightInComponent(): number;
                            setmWeightInComponent(mWeightInComponent: number): void;
                            constructor(mPointVecor: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, weight: number, weightInComponent: number);
                            getmPointVecor(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            setmPointVecor(mPointVecor: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                            getmWeight(): number;
                            setmWeight(mWeight: number): void;
                        }
                        class ThreeComponentDistribution extends org.kevoree.modeling.util.maths.gmm.MultipleComponentDistribution {
                            private static NO_OF_COMPONENTS;
                            constructor(weights: Float64Array, means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], covariances: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], bandwidth: org.kevoree.modeling.util.maths.matrix.SimpleMatrix);
                        }
                        class TwoComponentDistribution extends org.kevoree.modeling.util.maths.gmm.MultipleComponentDistribution {
                            private static NO_OF_COMPONENTS;
                            constructor(weights: Float64Array, means: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], covariances: org.kevoree.modeling.util.maths.matrix.SimpleMatrix[], bandwidth: org.kevoree.modeling.util.maths.matrix.SimpleMatrix);
                        }
                        module projection {
                            class ProjectionData {
                                mSVD: org.kevoree.modeling.util.maths.matrix.solvers.SimpleSVD<any>;
                                mValidElements: Float64Array;
                                mCountValidElements: number;
                                mBandwidthMatrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                                mGlobalMean: org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            }
                            class Projector {
                                private static MIN_VALUE;
                                private static CONST_SMALL_FACTOR;
                                static projectSampleDistToSubspace(distribution: org.kevoree.modeling.util.maths.gmm.SampleModel): org.kevoree.modeling.util.maths.gmm.projection.ProjectionData;
                                private static transformMatrix(trnsF, matrix, validElements, countValidElements);
                                private static backTransformMatrix(matrix, matrixToTransform, validElements);
                                static projectSampleDistToOriginalSpace(distribution: org.kevoree.modeling.util.maths.gmm.SampleModel, projectionData: org.kevoree.modeling.util.maths.gmm.projection.ProjectionData): void;
                                private static setVectorElements(v1, v2, elementsInV1);
                            }
                        }
                    }
                    module matrix {
                        class CommonOps {
                            static BLOCK_WIDTH: number;
                            static TRANSPOSE_SWITCH: number;
                            static MULT_COLUMN_SWITCH: number;
                            static MULT_TRANAB_COLUMN_SWITCH: number;
                            static MULT_INNER_SWITCH: number;
                            static EPS: number;
                            static TOL32: number;
                            static TOL64: number;
                            static CMULT_COLUMN_SWITCH: number;
                            static SWITCH_BLOCK64_CHOLESKY: number;
                            static SWITCH_BLOCK64_QR: number;
                            static BLOCK_WIDTH_CHOL: number;
                            static BLOCK_SIZE: number;
                            static mult(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static memset(data: Float64Array, val: number): void;
                            static multalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransalphaA(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransalphaB(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransAB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransalphaAB(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static dot(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static multInner(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multOuter(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransA(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransAalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransBalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransAB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static subvector(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, rowA: number, colA: number, length: number, row: boolean, offsetV: number, v: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static abs(matrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static elemSqrt(matrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static elemPow(matrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, p: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static deleteElementsFromVector(vector: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, elements: Float64Array, vectorSize: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static ones(rows: number, cols: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static doubleListToMatrix(valueList: Float64Array): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static setNegativeValuesToZero(valueList: Float64Array): Float64Array;
                            static maxVectorElement(matrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                            static maxVectorElementIndex(matrix: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): number;
                            static multAddTransABalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static trace(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static transposeMatrix(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A_tran: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static transpose(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static det(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static invert(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, result: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static extractImpl(src: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, srcY0: number, srcX0: number, dst: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, dstY0: number, dstX0: number, numRows: number, numCols: number): void;
                            static extractInsert(src: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, srcY0: number, srcY1: number, srcX0: number, srcX1: number, dst: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, dstY0: number, dstX0: number): void;
                            static insert(src: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, dest: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, destY0: number, destX0: number): void;
                            static extract4Int(src: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, srcY0: number, srcY1: number, srcX0: number, srcX1: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static columnsToVector(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, v: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F[]): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F[];
                            static rowsToVector(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, v: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F[]): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F[];
                            static setIdentity(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static identity1D(width: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static identity(numRows: number, numCols: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static diag(diagEl: Float64Array): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static diagMatrix(ret: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, width: number, diagEl: Float64Array): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static kron(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static extractDiag(src: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, dst: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static extractRow(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, row: number, out: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static extractColumn(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, column: number, out: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static elementMax(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static elementMaxAbs(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static elementMin(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static elementMinAbs(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static elementMult2mat(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementMult(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementDiv2mat(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementDiv(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementSum(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static elementSumAbs(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static elementPower(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementPoweralpha(a: number, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementPowerMat(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: number, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementLog(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static elementExp(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static sumRows(input: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, output: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static sumCols(input: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, output: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static addEquals(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static addEqualsbeta(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, beta: number, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static add(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static addbeta(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, beta: number, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static addalphabeta(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, beta: number, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static add3Mat(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static addval(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, val: number): void;
                            static addval2mat(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, val: number, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static subtract(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, val: number, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static subtract1(val: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static subtractEquals(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static subtract3mat(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static scale(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static scalemat(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static divide0(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static divide(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, alpha: number): void;
                            static divide2(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static divide3(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, alpha: number, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static changeSign(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static changeSign2mat(input: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, output: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static fill(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, value: number): void;
                            static normalizeF(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static normF(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static extract6M(src: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, srcY0: number, srcY1: number, srcX0: number, srcX1: number, dst: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, dstY0: number, dstX0: number): void;
                        }
                        class Complex64F {
                            real: number;
                            imaginary: number;
                            constructor();
                            getReal(): number;
                            getMagnitude(): number;
                            getMagnitude2(): number;
                            setReal(real: number): void;
                            getImaginary(): number;
                            setImaginary(imaginary: number): void;
                            setValues(real: number, imaginary: number): void;
                            setComplex(a: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            isReal(): boolean;
                            toString(): string;
                            plus(a: org.kevoree.modeling.util.maths.matrix.Complex64F): org.kevoree.modeling.util.maths.matrix.Complex64F;
                            minus(a: org.kevoree.modeling.util.maths.matrix.Complex64F): org.kevoree.modeling.util.maths.matrix.Complex64F;
                            times(a: org.kevoree.modeling.util.maths.matrix.Complex64F): org.kevoree.modeling.util.maths.matrix.Complex64F;
                            divide(a: org.kevoree.modeling.util.maths.matrix.Complex64F): org.kevoree.modeling.util.maths.matrix.Complex64F;
                        }
                        class ComplexMath64F {
                            static conj(input: org.kevoree.modeling.util.maths.matrix.Complex64F, conj: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            static plus(a: org.kevoree.modeling.util.maths.matrix.Complex64F, b: org.kevoree.modeling.util.maths.matrix.Complex64F, result: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            static minus(a: org.kevoree.modeling.util.maths.matrix.Complex64F, b: org.kevoree.modeling.util.maths.matrix.Complex64F, result: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            static multiply(a: org.kevoree.modeling.util.maths.matrix.Complex64F, b: org.kevoree.modeling.util.maths.matrix.Complex64F, result: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            static divide(a: org.kevoree.modeling.util.maths.matrix.Complex64F, b: org.kevoree.modeling.util.maths.matrix.Complex64F, result: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            static root(a: org.kevoree.modeling.util.maths.matrix.Complex64F, N: number, k: number, result: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                            static sqrt(input: org.kevoree.modeling.util.maths.matrix.Complex64F, root: org.kevoree.modeling.util.maths.matrix.Complex64F): void;
                        }
                        class DenseMatrix64F {
                            numRows: number;
                            numCols: number;
                            data: Float64Array;
                            static MULT_COLUMN_SWITCH: number;
                            constructor(numRows: number, numCols: number);
                            constructorDenseMatrix(orig: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static setIdentity(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static widentity(width: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static identity(numRows: number, numCols: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            constructor1dArray(length: number): void;
                            isInBounds(row: number, col: number): boolean;
                            zero(): void;
                            copy(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            static fill(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, value: number): void;
                            reshapeBoolean(numRows: number, numCols: number, saveValues: boolean): void;
                            cset(row: number, col: number, value: number): void;
                            add(row: number, col: number, value: number): void;
                            plus(index: number, val: number): number;
                            plusMatrix(matrix2: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            scale(value: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            minus(index: number, val: number): number;
                            times(index: number, val: number): number;
                            div(index: number, val: number): number;
                            reshape(numRows: number, numCols: number): void;
                            getNumRows(): number;
                            getNumCols(): number;
                            getData(): Float64Array;
                            get(row: number, col: number): number;
                            getNumElements(): number;
                            getIndex(row: number, col: number): number;
                            getValueAtIndex(index: number): number;
                            setValueAtIndex(index: number, val: number): number;
                            setNumRows(numRows: number): void;
                            setNumCols(numCols: number): void;
                            setData(data: Float64Array): void;
                            setMatrix(b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            set(row: number, col: number, value: number): void;
                            setArray(numRows: number, numCols: number, rowMajor: boolean, data: Float64Array): void;
                        }
                        class MatrixFeatures {
                            static isZeros(m: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isVector(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static isSquare(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static isSymmetricDouble(m: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isSymmetric(m: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static isSkewSymmetric(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isInverse(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isEqualsDouble(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isEquals(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static isIdentical(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isIdentity(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isConstantVal(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, val: number, tol: number): boolean;
                            static isDiagonalPositive(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static isFullRank(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            static isNegative(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tol: number): boolean;
                            static isUpperTriangle(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, hessenberg: number, tol: number): boolean;
                        }
                        class MatrixMatrixMult {
                            static MULT_COLUMN_SWITCH: number;
                            static multTransA_smallMV(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_reorderMV(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_reorderMM(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_smallMM(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static mult_reorder(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static mult_small(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static mult_aux(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multTransA_reorder(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_small(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransAB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransAB_aux(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multTransB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd_reorder(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd_small(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd_aux(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multAddTransA_reorder(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransA_small(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransAB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransAB_aux(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multAddTransB(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static mult_reorderalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static mult_smallalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static mult_auxalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multTransA_reorderalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_smallalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransABalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransAB_auxalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multTransBalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd_reorderalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd_smallalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd_auxalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multAddTransA_reorderalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransA_smallalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransABalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransAB_auxalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, aux: Float64Array): void;
                            static multAddTransBalpha(alpha: number, a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                        }
                        class MatrixMultProduct {
                            static outer(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static inner_small(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static inner_reorder(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static inner_reorder_upper(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, c: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                        }
                        class MatrixVectorMult {
                            static mult(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAdd(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_small(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multTransA_reorder(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransA_small(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static multAddTransA_reorder(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, C: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                        }
                        class SimpleMatrix {
                            mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            getMatrix(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                            setValue2D(row: number, col: number, value: number): void;
                            setValue1D(index: number, value: number): void;
                            getValue2D(row: number, col: number): number;
                            getValue1D(index: number): number;
                            getIndex(row: number, col: number): number;
                            mult(b: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            scale(val: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            plus(b: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            copy(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            numRows(): number;
                            numCols(): number;
                            getNumElements(): number;
                            extractDiag(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            isIdentical(a: org.kevoree.modeling.util.maths.matrix.SimpleMatrix, tol: number): boolean;
                            trace(): number;
                            elementMaxAbs(): number;
                            elementSum(): number;
                            elementMult(b: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            elementDiv(b: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            elementPowerMatrix(b: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            elementPower(b: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            elementExp(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            elementLog(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            negative(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            isInBounds(row: number, col: number): boolean;
                            printDimensions(): void;
                            transpose(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            constructor(numRows: number, numCols: number);
                            static wrap(internalMat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            static identity(width: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            minus(b: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            invert(): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            determinant(): number;
                            createMatrix(numRows: number, numCols: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            extractVector(extractRow: boolean, element: number): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            eig(): org.kevoree.modeling.util.maths.matrix.solvers.SimpleEVD<any>;
                            svd(compact: boolean): org.kevoree.modeling.util.maths.matrix.solvers.SimpleSVD<any>;
                            combine(insertRow: number, insertCol: number, B: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): org.kevoree.modeling.util.maths.matrix.SimpleMatrix;
                            insertIntoThis(insertRow: number, insertCol: number, B: org.kevoree.modeling.util.maths.matrix.SimpleMatrix): void;
                        }
                        class SimpleMatrixHashable extends org.kevoree.modeling.util.maths.matrix.SimpleMatrix {
                            constructor(m: org.kevoree.modeling.util.maths.matrix.SimpleMatrix);
                            equals(obj: any): boolean;
                            hashCode(): number;
                        }
                        class TransposeAlgs {
                            static square(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static block(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A_tran: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, blockLength: number): void;
                            static standard(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A_tran: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                        }
                        class VectorVectorMult {
                            static innerProd(x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static innerProdA(x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static innerProdTranA(x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): number;
                            static outerProd(x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static addOuterProd(gamma: number, x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static householder(gamma: number, u: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, y: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static rank1Update4Mat(gamma: number, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, w: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            static rank1Update(gamma: number, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, w: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                        }
                        module solvers {
                            class AdjLinearSolverQr {
                                numRows: number;
                                numCols: number;
                                private decomposer;
                                maxRows: number;
                                maxCols: number;
                                Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                R: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                private Y;
                                private Z;
                                setA(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                private solveU(U, b, n);
                                solve(B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, X: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                constructor();
                                setMaxSize(maxRows: number, maxCols: number): void;
                            }
                            class LUDecompositionAlt_D64 {
                                LU: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                maxWidth: number;
                                m: number;
                                n: number;
                                dataLU: Float64Array;
                                vv: Float64Array;
                                indx: Int32Array;
                                pivot: Int32Array;
                                pivsign: number;
                                setExpectedMaxSize(numRows: number, numCols: number): void;
                                getLU(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                getIndx(): Int32Array;
                                getPivot(): Int32Array;
                                getLower(lower: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                getUpper(upper: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                decomposeCommonInit(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                _solveVectorInternal(vv: Float64Array): void;
                                _getVV(): Float64Array;
                                computeDeterminant(): number;
                                decompose(a: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                            }
                            class LinearSolverLu_D64 {
                                A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                numRows: number;
                                numCols: number;
                                decomp: org.kevoree.modeling.util.maths.matrix.solvers.LUDecompositionAlt_D64;
                                doImprove: boolean;
                                getA(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                _setA(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                constructor(decomp: org.kevoree.modeling.util.maths.matrix.solvers.LUDecompositionAlt_D64);
                                setA(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                invert(A_inv: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                improveSol(b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                modifiesA(): boolean;
                                modifiesB(): boolean;
                                solve(b: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, x: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                            }
                            class SimpleEVD<T extends org.kevoree.modeling.util.maths.matrix.SimpleMatrix> {
                                private eig;
                                mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                constructor(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F);
                                getNumberOfEigenvalues(): number;
                                getEigenvalue(index: number): org.kevoree.modeling.util.maths.matrix.Complex64F;
                                getEigenVector(index: number): T;
                                getEVD(): org.kevoree.modeling.util.maths.matrix.solvers.decomposition.SwitchingEigenDecomposition;
                                getIndexMax(): number;
                                getIndexMin(): number;
                            }
                            class SimpleSVD<T extends org.kevoree.modeling.util.maths.matrix.SimpleMatrix> {
                                private svd;
                                private U;
                                private W;
                                private V;
                                private mat;
                                tol: number;
                                private static swapRowOrCol(M, tran, i, bigIndex);
                                static singularThreshold(svd: org.kevoree.modeling.util.maths.matrix.solvers.SvdImplicitQrDecompose_D64): number;
                                static descendingOrder(U: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tranU: boolean, W: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, V: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, tranV: boolean): void;
                                constructor(mat: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean);
                                getU(): T;
                                getW(): T;
                                getV(): T;
                            }
                            class SvdImplicitQrAlgorithm {
                                rand: java.util.Random;
                                Ut: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                Vt: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                totalSteps: number;
                                maxValue: number;
                                N: number;
                                eigenSmall: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.EigenvalueSmall;
                                numExceptional: number;
                                nextExceptional: number;
                                diag: Float64Array;
                                off: Float64Array;
                                bulge: number;
                                x1: number;
                                x2: number;
                                steps: number;
                                splits: Int32Array;
                                numSplits: number;
                                private exceptionalThresh;
                                private maxIterations;
                                followScript: boolean;
                                private static giveUpOnKnown;
                                private values;
                                private fastValues;
                                private findingZeros;
                                c: number;
                                s: number;
                                constructor();
                                getUt(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                setUt(ut: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                getVt(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                setVt(vt: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                setMatrix(numRows: number, numCols: number, diag: Float64Array, off: Float64Array): void;
                                swapDiag(diag: Float64Array): Float64Array;
                                swapOff(off: Float64Array): Float64Array;
                                setMaxValue(maxValue: number): void;
                                initParam(M: number, N: number): void;
                                process(): boolean;
                                processValues(values: Float64Array): boolean;
                                _process(): boolean;
                                private performDynamicStep();
                                private performScriptedStep();
                                incrementSteps(): void;
                                isOffZero(i: number): boolean;
                                isDiagonalZero(i: number): boolean;
                                resetSteps(): void;
                                nextSplit(): boolean;
                                performImplicitSingleStep(scale: number, lambda: number, byAngle: boolean): void;
                                updateRotator(Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, m: number, n: number, c: number, s: number): void;
                                private computeBulgeScale();
                                createBulge(x1: number, p: number, scale: number, byAngle: boolean): void;
                                computeRotator(rise: number, run: number): void;
                                removeBulgeLeft(x1: number, notLast: boolean): void;
                                removeBulgeRight(x1: number): void;
                                setSubmatrix(x1: number, x2: number): void;
                                selectWilkinsonShift(scale: number): number;
                                static signum(d: number): number;
                                eigenBB_2x2(x1: number): void;
                                checkForAndHandleZeros(): boolean;
                                private pushRight(row);
                                private rotatorPushRight(m);
                                private rotatorPushRight2(m, offset);
                                exceptionShift(): void;
                                getNumberOfSingularValues(): number;
                                getSingularValue(index: number): number;
                                setFastValues(b: boolean): void;
                                getSingularValues(): Float64Array;
                                getDiag(): Float64Array;
                                getOff(): Float64Array;
                                getMaxValue(): number;
                            }
                            class SvdImplicitQrDecompose_D64 {
                                private numRows;
                                private numCols;
                                private numRowsT;
                                private numColsT;
                                private canUseTallBidiagonal;
                                private bidiag;
                                private qralg;
                                diag: Float64Array;
                                off: Float64Array;
                                private Ut;
                                private Vt;
                                private singularValues;
                                private numSingular;
                                private compact;
                                private computeU;
                                private computeV;
                                private prefComputeU;
                                private prefComputeV;
                                private transposed;
                                private A_mod;
                                constructor(compact: boolean, computeU: boolean, computeV: boolean, canUseTallBidiagonal: boolean);
                                getSingularValues(): Float64Array;
                                numberOfSingularValues(): number;
                                isCompact(): boolean;
                                getU(U: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                getV(V: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                getW(W: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                decompose(orig: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                inputModified(): boolean;
                                private bidiagonalization(orig);
                                private undoTranspose();
                                private computeUWV();
                                private setup(orig);
                                private makeSingularPositive();
                                getNumRows(): number;
                                getNumCols(): number;
                            }
                            class TriangularSolver {
                                static invertLower(L: Float64Array, m: number): void;
                                static invertLower2arr(L: Float64Array, L_inv: Float64Array, m: number): void;
                                static solveL2arr(L: Float64Array, b: Float64Array, n: number): void;
                                static solveL(L: Float64Array, b: Float64Array, m: number, n: number): void;
                                static solveTranL(L: Float64Array, b: Float64Array, n: number): void;
                                static solveU2arr(U: Float64Array, b: Float64Array, n: number): void;
                                static solveU(U: Float64Array, b: Float64Array, sideLength: number, minRow: number, maxRow: number): void;
                                static solveUArray(U: Float64Array, startU: number, strideU: number, widthU: number, b: Float64Array, startB: number, strideB: number, widthB: number): void;
                            }
                            module decomposition {
                                interface BidiagonalDecomposition<T extends org.kevoree.modeling.util.maths.matrix.DenseMatrix64F> {
                                    getB(B: T, compact: boolean): T;
                                    getU(U: T, transpose: boolean, compact: boolean): T;
                                    getV(V: T, transpose: boolean, compact: boolean): T;
                                    getDiagonal(diag: Float64Array, off: Float64Array): void;
                                    decompose(orig: T): boolean;
                                    inputModified(): boolean;
                                }
                                class BidiagonalDecompositionRow_D64 implements org.kevoree.modeling.util.maths.matrix.solvers.decomposition.BidiagonalDecomposition<any> {
                                    private UBV;
                                    private m;
                                    private n;
                                    private min;
                                    private gammasU;
                                    private gammasV;
                                    private b;
                                    private u;
                                    constructor(numElements: number);
                                    decompose(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    init(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    getUBV(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getDiagonal(diag: Float64Array, off: Float64Array): void;
                                    getB(B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    static handleB(B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean, m: number, n: number, min: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getU(U: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    static handleU(U: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean, compact: boolean, m: number, n: number, min: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getV(V: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    static handleV(V: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean, compact: boolean, m: number, n: number, min: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    private _decompose();
                                    computeU(k: number): void;
                                    computeV(k: number): void;
                                    getGammasU(): Float64Array;
                                    getGammasV(): Float64Array;
                                    inputModified(): boolean;
                                }
                                class BidiagonalDecompositionTall_D64 implements org.kevoree.modeling.util.maths.matrix.solvers.decomposition.BidiagonalDecomposition<any> {
                                    decompQRP: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.QRxColPivDecompositionHouseholderColumn_D64;
                                    decompBi: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.BidiagonalDecomposition<any>;
                                    B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    m: number;
                                    n: number;
                                    min: number;
                                    getDiagonal(diag: Float64Array, off: Float64Array): void;
                                    getB(B: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getU(U: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getV(V: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transpose: boolean, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    decompose(orig: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    inputModified(): boolean;
                                }
                                class EigenvalueSmall {
                                    value0: org.kevoree.modeling.util.maths.matrix.Complex64F;
                                    value1: org.kevoree.modeling.util.maths.matrix.Complex64F;
                                    value2x2(a11: number, a12: number, a21: number, a22: number): void;
                                    value2x2_fast(a11: number, a12: number, a21: number, a22: number): void;
                                    symm2x2_fast(a11: number, a12: number, a22: number): void;
                                }
                                class HessenbergSimilarDecomposition_D64 {
                                    private QH;
                                    private N;
                                    private gammas;
                                    private b;
                                    private u;
                                    constructor(initialSize: number);
                                    decompose(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    inputModified(): boolean;
                                    getQH(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getH(H: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getQ(Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    private _decompose();
                                    getGammas(): Float64Array;
                                }
                                class QRDecompositionHouseholderColumn_D64 {
                                    dataQR: org.kevoree.modeling.util.maths.structure.KArray2D;
                                    v: Float64Array;
                                    numCols: number;
                                    numRows: number;
                                    minLength: number;
                                    gammas: Float64Array;
                                    gamma: number;
                                    tau: number;
                                    error: boolean;
                                    setExpectedMaxSize(numRows: number, numCols: number): void;
                                    getQ(Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getR(R: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    decompose(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    convertToColumnMajor(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    householder(j: number): void;
                                    updateA(w: number): void;
                                    static findMax(u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, startU: number, length: number): number;
                                    static divideElements(j: number, numRows: number, u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, u_0: number): void;
                                    static computeTauAndDivide(j: number, numRows: number, u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, max: number): number;
                                    inputModified(): boolean;
                                    static rank1UpdateMultR(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, gamma: number, colA0: number, w0: number, w1: number, _temp: Float64Array): void;
                                }
                                class QRxColPivDecompositionHouseholderColumn_D64 extends org.kevoree.modeling.util.maths.matrix.solvers.decomposition.QRDecompositionHouseholderColumn_D64 {
                                    pivots: Int32Array;
                                    normsCol: Float64Array;
                                    maxAbs: number;
                                    singularThreshold: number;
                                    rank: number;
                                    constructor();
                                    setSingularThreshold(threshold: number): void;
                                    setExpectedMaxSize(numRows: number, numCols: number): void;
                                    getQ(Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, compact: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    decompose(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    private setupPivotInfo();
                                    private updateNorms(j);
                                    private swapColumns(j);
                                    householderPivot(j: number): boolean;
                                    getRank(): number;
                                    getPivots(): Int32Array;
                                    getPivotMatrix(P: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                }
                                class QrHelperFunctions_D64 {
                                    static findMax(u: Float64Array, startU: number, length: number): number;
                                    static findMaxArray(u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, startU: number, length: number): number;
                                    static divideElements4arg(j: number, numRows: number, u: Float64Array, u_0: number): void;
                                    static divideElements4argArray(j: number, numRows: number, u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, u_0: number): void;
                                    static divideElements(j: number, numRows: number, u: Float64Array, startU: number, u_0: number): void;
                                    static divideElements_Brow(j: number, numRows: number, u: Float64Array, b: Float64Array, startB: number, u_0: number): void;
                                    static divideElements_Bcol(j: number, numRows: number, numCols: number, u: Float64Array, b: Float64Array, startB: number, u_0: number): void;
                                    static computeTauAndDivide(j: number, numRows: number, u: Float64Array, startU: number, max: number): number;
                                    static computeTauAndDivide4arg(j: number, numRows: number, u: Float64Array, max: number): number;
                                    static computeTauAndDivide4argArray(j: number, numRows: number, u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, max: number): number;
                                    static rank1UpdateMultR(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: Float64Array, gamma: number, colA0: number, w0: number, w1: number, _temp: Float64Array): void;
                                    static rank1UpdateMultRArray(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: org.kevoree.modeling.util.maths.structure.KArray2D, col: number, gamma: number, colA0: number, w0: number, w1: number, _temp: Float64Array): void;
                                    static rank1UpdateMultR8param(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: Float64Array, offsetU: number, gamma: number, colA0: number, w0: number, w1: number, _temp: Float64Array): void;
                                    static rank1UpdateMultL(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, u: Float64Array, gamma: number, colA0: number, w0: number, w1: number): void;
                                }
                                class SwitchingEigenDecomposition {
                                    private tol;
                                    symmetricAlg: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.SymmetricQRAlgorithmDecomposition_D64;
                                    generalAlg: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQRDecomposition_D64;
                                    symmetric: boolean;
                                    computeVectors: boolean;
                                    A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    constructor(matrixSize: number, computeVectors: boolean, tol: number);
                                    getNumberOfEigenvalues(): number;
                                    getEigenvalue(index: number): org.kevoree.modeling.util.maths.matrix.Complex64F;
                                    getEigenVector(index: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    decompose(orig: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    inputModified(): boolean;
                                }
                                class SymmetricQRAlgorithmDecomposition_D64 {
                                    private decomp;
                                    private helper;
                                    private vector;
                                    private computeVectorsWithValues;
                                    private values;
                                    private diag;
                                    private off;
                                    private diagSaved;
                                    private offSaved;
                                    private V;
                                    private eigenvectors;
                                    computeVectors: boolean;
                                    constructor(decomp: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.TridiagonalDecompositionHouseholder_D64, computeVectors: boolean);
                                    setComputeVectorsWithValues(computeVectorsWithValues: boolean): void;
                                    setMaxIterations(max: number): void;
                                    getNumberOfEigenvalues(): number;
                                    getEigenvalue(index: number): org.kevoree.modeling.util.maths.matrix.Complex64F;
                                    getEigenVector(index: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    decompose(orig: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    inputModified(): boolean;
                                    private extractTogether();
                                    private extractSeparate(numCols);
                                    private computeEigenValues();
                                }
                                class SymmetricQREigenHelper {
                                    rand: java.util.Random;
                                    steps: number;
                                    numExceptional: number;
                                    lastExceptional: number;
                                    eigenSmall: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.EigenvalueSmall;
                                    Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    N: number;
                                    diag: Float64Array;
                                    off: Float64Array;
                                    x1: number;
                                    x2: number;
                                    splits: Int32Array;
                                    numSplits: number;
                                    private bulge;
                                    private c;
                                    private s;
                                    private c2;
                                    private s2;
                                    private cs;
                                    constructor();
                                    setQ(q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    incrementSteps(): void;
                                    init(diag: Float64Array, off: Float64Array, numCols: number): void;
                                    swapDiag(diag: Float64Array): Float64Array;
                                    swapOff(off: Float64Array): Float64Array;
                                    reset(N: number): void;
                                    copyDiag(ret: Float64Array): Float64Array;
                                    copyOff(ret: Float64Array): Float64Array;
                                    copyEigenvalues(ret: Float64Array): Float64Array;
                                    setSubmatrix(x1: number, x2: number): void;
                                    isZero(index: number): boolean;
                                    performImplicitSingleStep(lambda: number, byAngle: boolean): void;
                                    updateQ(m: number, n: number, c: number, s: number): void;
                                    createBulge(x1: number, p: number, byAngle: boolean): void;
                                    createBulge2by2(x1: number, p: number, byAngle: boolean): void;
                                    private computeRotation(run, rise);
                                    removeBulge(x1: number): void;
                                    removeBulgeEnd(x1: number): void;
                                    eigenvalue2by2(x1: number): void;
                                    exceptionalShift(): void;
                                    nextSplit(): boolean;
                                    computeShift(): number;
                                    computeWilkinsonShift(): number;
                                    getMatrixSize(): number;
                                    resetSteps(): void;
                                }
                                class SymmetricQrAlgorithm {
                                    private helper;
                                    private Q;
                                    private eigenvalues;
                                    private exceptionalThresh;
                                    private maxIterations;
                                    private fastEigenvalues;
                                    private followingScript;
                                    constructor(helper: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.SymmetricQREigenHelper);
                                    setMaxIterations(maxIterations: number): void;
                                    getQ(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    setQ(q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    setFastEigenvalues(fastEigenvalues: boolean): void;
                                    getEigenvalue(index: number): number;
                                    getNumberOfEigenvalues(): number;
                                    process(sideLength: number, diag: Float64Array, off: Float64Array, eigenvalues: Float64Array): boolean;
                                    process3arg(sideLength: number, diag: Float64Array, off: Float64Array): boolean;
                                    private _process();
                                    performStep(): void;
                                }
                                class TridiagonalDecompositionHouseholder_D64 {
                                    private QT;
                                    private N;
                                    private w;
                                    private gammas;
                                    private b;
                                    constructor();
                                    getQT(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getDiagonal(diag: Float64Array, off: Float64Array): void;
                                    getT(T: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getQ(Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, transposed: boolean): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    decompose(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    private similarTransform(k);
                                    householderSymmetric(row: number, gamma: number): void;
                                    init(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    inputModified(): boolean;
                                }
                                class WatchedDoubleStepQRDecomposition_D64 {
                                    hessenberg: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.HessenbergSimilarDecomposition_D64;
                                    algValue: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigenvalue;
                                    algVector: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigenvector;
                                    H: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    computeVectors: boolean;
                                    constructor(computeVectors: boolean);
                                    decompose(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    inputModified(): boolean;
                                    getNumberOfEigenvalues(): number;
                                    getEigenvalue(index: number): org.kevoree.modeling.util.maths.matrix.Complex64F;
                                    getEigenVector(index: number): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                }
                                class WatchedDoubleStepQREigen {
                                    private rand;
                                    private N;
                                    A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    private u;
                                    private gamma;
                                    private _temp;
                                    numStepsFind: Int32Array;
                                    steps: number;
                                    eigenvalues: org.kevoree.modeling.util.maths.matrix.Complex64F[];
                                    numEigen: number;
                                    private valueSmall;
                                    private temp;
                                    private printHumps;
                                    checkHessenberg: boolean;
                                    private checkOrthogonal;
                                    private checkUncountable;
                                    private useStandardEq;
                                    private useCareful2x2;
                                    private normalize;
                                    lastExceptional: number;
                                    numExceptional: number;
                                    exceptionalThreshold: number;
                                    maxIterations: number;
                                    createR: boolean;
                                    Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    incrementSteps(): void;
                                    setQ(Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    private addEigenvalue(v);
                                    private addEigenvalue2arg(v, i);
                                    setChecks(hessenberg: boolean, orthogonal: boolean, uncountable: boolean): void;
                                    isZero(x1: number, x2: number): boolean;
                                    setup(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    exceptionalShift(x1: number, x2: number): void;
                                    implicitDoubleStep(x1: number, x2: number): void;
                                    performImplicitDoubleStep(x1: number, x2: number, real: number, img: number): void;
                                    private performImplicitDoubleStep5arg(x1, x2, b11, b21, b31);
                                    performImplicitSingleStep(x1: number, x2: number, eigenvalue: number): void;
                                    createBulgeSingleStep(x1: number, eigenvalue: number): boolean;
                                    bulgeDoubleStepQn(i: number): boolean;
                                    bulgeDoubleStepQn6arg(i: number, a11: number, a21: number, a31: number, threshold: number, set: boolean): boolean;
                                    bulgeSingleStepQn(i: number): boolean;
                                    bulgeSingleStepQn5arg(i: number, a11: number, a21: number, threshold: number, set: boolean): boolean;
                                    eigen2by2_scale(a11: number, a12: number, a21: number, a22: number): void;
                                    getNumberOfEigenvalues(): number;
                                    getEigenvalues(): org.kevoree.modeling.util.maths.matrix.Complex64F[];
                                    addComputedEigen2x2(x1: number, x2: number): void;
                                    isReal2x2(x1: number, x2: number): boolean;
                                    addEigenAt(x1: number): void;
                                    printSteps(): void;
                                }
                                class WatchedDoubleStepQREigenvalue {
                                    implicitQR: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigen;
                                    splits: Int32Array;
                                    numSplits: number;
                                    x1: number;
                                    x2: number;
                                    constructor();
                                    setup(A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): void;
                                    process(origA: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    private moveToNextSplit();
                                    private performIteration();
                                    getNumberOfEigenvalues(): number;
                                    getEigenvalues(): org.kevoree.modeling.util.maths.matrix.Complex64F[];
                                    getImplicitQR(): org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigen;
                                }
                                class WatchedDoubleStepQREigenvector {
                                    implicit: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigen;
                                    Q: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    eigenvectors: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F[];
                                    eigenvectorTemp: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    solver: org.kevoree.modeling.util.maths.matrix.solvers.LinearSolverLu_D64;
                                    origEigenvalues: org.kevoree.modeling.util.maths.matrix.Complex64F[];
                                    N: number;
                                    splits: Int32Array;
                                    numSplits: number;
                                    x1: number;
                                    x2: number;
                                    indexVal: number;
                                    onscript: boolean;
                                    process(implicit: org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigen, A: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F, Q_h: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    extractVectors(Q_h: org.kevoree.modeling.util.maths.matrix.DenseMatrix64F): boolean;
                                    private solveEigenvectorDuplicateEigenvalue(real, first, isTriangle);
                                    private solveUsingTriangle(real, index, r);
                                    private solveWithLU(real, index, r);
                                    findQandR(): boolean;
                                    private findNextEigenvalue();
                                    private checkSplitPerformImplicit();
                                    private moveToNextSplit();
                                    getQ(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F;
                                    getImplicit(): org.kevoree.modeling.util.maths.matrix.solvers.decomposition.WatchedDoubleStepQREigen;
                                    getEigenvectors(): org.kevoree.modeling.util.maths.matrix.DenseMatrix64F[];
                                    getEigenvalues(): org.kevoree.modeling.util.maths.matrix.Complex64F[];
                                }
                            }
                        }
                    }
                    module structure {
                        interface KArray1D {
                            size(): number;
                            get(index: number): number;
                            set(index: number, value: number): number;
                            add(index: number, value: number): number;
                        }
                        interface KArray2D {
                            nbRows(): number;
                            nbColumns(): number;
                            get(rowIndex: number, columnIndex: number): number;
                            set(rowIndex: number, columnIndex: number, value: number): number;
                            add(rowIndex: number, columnIndex: number, value: number): number;
                        }
                        interface KArray3D {
                            nbRows(): number;
                            nbColumns(): number;
                            nbDeeps(): number;
                            get(rowIndex: number, columnIndex: number, deepIndex: number): number;
                            set(rowIndex: number, columnIndex: number, deepIndex: number, value: number): number;
                            add(p_rowIndex: number, p_columnIndex: number, p_deepIndex: number, value: number): number;
                        }
                        module impl {
                            class Array1D implements org.kevoree.modeling.util.maths.structure.KArray1D {
                                private _size;
                                private _offset;
                                private _segmentIndex;
                                private _segment;
                                private _metaClass;
                                constructor(p_size: number, p_offset: number, p_segmentIndex: number, p_segment: org.kevoree.modeling.memory.chunk.KObjectChunk, p_metaClass: org.kevoree.modeling.meta.KMetaClass);
                                size(): number;
                                get(p_index: number): number;
                                set(p_index: number, p_value: number): number;
                                add(index: number, value: number): number;
                            }
                            class Array2D implements org.kevoree.modeling.util.maths.structure.KArray2D {
                                private _nbRows;
                                private _nbColumns;
                                private _offset;
                                private _segmentIndex;
                                private _segment;
                                private _metaClass;
                                constructor(p_nbRows: number, p_nbColumns: number, p_offset: number, p_segmentIndex: number, p_segment: org.kevoree.modeling.memory.chunk.KObjectChunk, p_metaClass: org.kevoree.modeling.meta.KMetaClass);
                                nbRows(): number;
                                nbColumns(): number;
                                get(p_rowIndex: number, p_columnIndex: number): number;
                                set(p_rowIndex: number, p_columnIndex: number, value: number): number;
                                add(rawIndex: number, columnIndex: number, value: number): number;
                            }
                            class Array3D implements org.kevoree.modeling.util.maths.structure.KArray3D {
                                private _nbrows;
                                private _nbColumns;
                                private _nbDeeps;
                                private _offset;
                                private _segmentIndex;
                                private _segment;
                                private _metaClass;
                                constructor(p_nbrows: number, p_nbColumns: number, p_nbDeeps: number, p_offset: number, p_segmentIndex: number, p_segment: org.kevoree.modeling.memory.chunk.KObjectChunk, p_metaClass: org.kevoree.modeling.meta.KMetaClass);
                                nbRows(): number;
                                nbColumns(): number;
                                nbDeeps(): number;
                                get(p_rowIndex: number, p_columnIndex: number, p_deepIndex: number): number;
                                set(p_rowIndex: number, p_columnIndex: number, p_deepIndex: number, p_value: number): number;
                                add(p_rowIndex: number, p_columnIndex: number, p_deepIndex: number, value: number): number;
                            }
                            class NativeArray2D implements org.kevoree.modeling.util.maths.structure.KArray2D {
                                private _nbRows;
                                private _nbColumns;
                                private _back;
                                constructor(p_nbRows: number, p_nbColumns: number);
                                nbRows(): number;
                                nbColumns(): number;
                                get(p_rowIndex: number, p_columnIndex: number): number;
                                set(p_rowIndex: number, p_columnIndex: number, value: number): number;
                                add(rawIndex: number, columnIndex: number, value: number): number;
                            }
                        }
                    }
                }
            }
        }
    }
}
declare module org {
    class KevoreeModel extends org.kevoree.modeling.abs.AbstractKModel<org.KevoreeUniverse> {
        private _metaModel;
        constructor(p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
        internalCreateUniverse(key: number): org.KevoreeUniverse;
        metaModel(): org.kevoree.modeling.meta.KMetaModel;
        internalCreateObject(universe: number, time: number, uuid: number, p_clazz: org.kevoree.modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): org.kevoree.modeling.KObject;
        createNamedElement(universe: number, time: number): org.kevoree.NamedElement;
        createDictionary(universe: number, time: number): org.kevoree.Dictionary;
        createPortType(universe: number, time: number): org.kevoree.PortType;
        createNode(universe: number, time: number): org.kevoree.Node;
        createPort(universe: number, time: number): org.kevoree.Port;
        createFragmentDictionary(universe: number, time: number): org.kevoree.FragmentDictionary;
        createNodeType(universe: number, time: number): org.kevoree.NodeType;
        createNetworkInfo(universe: number, time: number): org.kevoree.NetworkInfo;
        createGroupType(universe: number, time: number): org.kevoree.GroupType;
        createInstance(universe: number, time: number): org.kevoree.Instance;
        createValue(universe: number, time: number): org.kevoree.Value;
        createNamespace(universe: number, time: number): org.kevoree.Namespace;
        createTypeDefinition(universe: number, time: number): org.kevoree.TypeDefinition;
        createDeployUnit(universe: number, time: number): org.kevoree.DeployUnit;
        createAttributeType(universe: number, time: number): org.kevoree.AttributeType;
        createChannelType(universe: number, time: number): org.kevoree.ChannelType;
        createChannel(universe: number, time: number): org.kevoree.Channel;
        createDictionaryType(universe: number, time: number): org.kevoree.DictionaryType;
        createGroup(universe: number, time: number): org.kevoree.Group;
        createComponent(universe: number, time: number): org.kevoree.Component;
        createComponentType(universe: number, time: number): org.kevoree.ComponentType;
        createTypedElement(universe: number, time: number): org.kevoree.TypedElement;
        createModel(universe: number, time: number): org.kevoree.Model;
    }
    class KevoreeUniverse extends org.kevoree.modeling.abs.AbstractKUniverse<org.KevoreeVieworg.KevoreeUniverse, org.KevoreeUniverse> {
        constructor(p_key: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
        internal_create(timePoint: number): org.KevoreeView;
    }
    interface KevoreeView extends org.kevoree.modeling.KView {
        createNamedElement(): org.kevoree.NamedElement;
        createDictionary(): org.kevoree.Dictionary;
        createPortType(): org.kevoree.PortType;
        createNode(): org.kevoree.Node;
        createPort(): org.kevoree.Port;
        createFragmentDictionary(): org.kevoree.FragmentDictionary;
        createNodeType(): org.kevoree.NodeType;
        createNetworkInfo(): org.kevoree.NetworkInfo;
        createGroupType(): org.kevoree.GroupType;
        createInstance(): org.kevoree.Instance;
        createValue(): org.kevoree.Value;
        createNamespace(): org.kevoree.Namespace;
        createTypeDefinition(): org.kevoree.TypeDefinition;
        createDeployUnit(): org.kevoree.DeployUnit;
        createAttributeType(): org.kevoree.AttributeType;
        createChannelType(): org.kevoree.ChannelType;
        createChannel(): org.kevoree.Channel;
        createDictionaryType(): org.kevoree.DictionaryType;
        createGroup(): org.kevoree.Group;
        createComponent(): org.kevoree.Component;
        createComponentType(): org.kevoree.ComponentType;
        createTypedElement(): org.kevoree.TypedElement;
        createModel(): org.kevoree.Model;
    }
    module impl {
        class KevoreeViewImpl extends org.kevoree.modeling.abs.AbstractKView implements org.KevoreeView {
            constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager);
            createNamedElement(): org.kevoree.NamedElement;
            createDictionary(): org.kevoree.Dictionary;
            createPortType(): org.kevoree.PortType;
            createNode(): org.kevoree.Node;
            createPort(): org.kevoree.Port;
            createFragmentDictionary(): org.kevoree.FragmentDictionary;
            createNodeType(): org.kevoree.NodeType;
            createNetworkInfo(): org.kevoree.NetworkInfo;
            createGroupType(): org.kevoree.GroupType;
            createInstance(): org.kevoree.Instance;
            createValue(): org.kevoree.Value;
            createNamespace(): org.kevoree.Namespace;
            createTypeDefinition(): org.kevoree.TypeDefinition;
            createDeployUnit(): org.kevoree.DeployUnit;
            createAttributeType(): org.kevoree.AttributeType;
            createChannelType(): org.kevoree.ChannelType;
            createChannel(): org.kevoree.Channel;
            createDictionaryType(): org.kevoree.DictionaryType;
            createGroup(): org.kevoree.Group;
            createComponent(): org.kevoree.Component;
            createComponentType(): org.kevoree.ComponentType;
            createTypedElement(): org.kevoree.TypedElement;
            createModel(): org.kevoree.Model;
        }
    }
    module kevoree {
        interface AttributeType extends org.kevoree.modeling.KObject, org.kevoree.TypedElement {
            getDatatype(): org.kevoree.DataType;
            setDatatype(p_obj: org.kevoree.DataType): org.kevoree.AttributeType;
            getDefaultValue(): string;
            setDefaultValue(p_obj: string): org.kevoree.AttributeType;
            getFragmentDependant(): boolean;
            setFragmentDependant(p_obj: boolean): org.kevoree.AttributeType;
            getName(): string;
            setName(p_obj: string): org.kevoree.AttributeType;
            getOptional(): boolean;
            setOptional(p_obj: boolean): org.kevoree.AttributeType;
            addGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.AttributeType;
            removeGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.AttributeType;
            getGenericTypes(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfGenericTypes(): number;
        }
        interface Channel extends org.kevoree.modeling.KObject, org.kevoree.Instance {
            getName(): string;
            setName(p_obj: string): org.kevoree.Channel;
            getStarted(): boolean;
            setStarted(p_obj: boolean): org.kevoree.Channel;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Channel;
            getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
            setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Channel;
            getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
            addPorts(p_obj: org.kevoree.Port): org.kevoree.Channel;
            removePorts(p_obj: org.kevoree.Port): org.kevoree.Channel;
            getPorts(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfPorts(): number;
            addFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel;
            removeFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel;
            getFragmentDictionaries(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfFragmentDictionaries(): number;
        }
        interface ChannelType extends org.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
            getName(): string;
            setName(p_obj: string): org.kevoree.ChannelType;
            getAbstract(): boolean;
            setAbstract(p_obj: boolean): org.kevoree.ChannelType;
            getVersion(): string;
            setVersion(p_obj: string): org.kevoree.ChannelType;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType;
            removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType;
            getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfDeployUnits(): number;
            setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.ChannelType;
            getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface Component extends org.kevoree.modeling.KObject, org.kevoree.Instance {
            getName(): string;
            setName(p_obj: string): org.kevoree.Component;
            getStarted(): boolean;
            setStarted(p_obj: boolean): org.kevoree.Component;
            addOutputs(p_obj: org.kevoree.Port): org.kevoree.Component;
            removeOutputs(p_obj: org.kevoree.Port): org.kevoree.Component;
            getOutputs(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfOutputs(): number;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.Component;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Component;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Component;
            getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
            addInputs(p_obj: org.kevoree.Port): org.kevoree.Component;
            removeInputs(p_obj: org.kevoree.Port): org.kevoree.Component;
            getInputs(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfInputs(): number;
            setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Component;
            getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface ComponentType extends org.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
            getName(): string;
            setName(p_obj: string): org.kevoree.ComponentType;
            getAbstract(): boolean;
            setAbstract(p_obj: boolean): org.kevoree.ComponentType;
            getVersion(): string;
            setVersion(p_obj: string): org.kevoree.ComponentType;
            addOutputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
            removeOutputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
            getOutputs(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfOutputs(): number;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addInputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
            removeInputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
            getInputs(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfInputs(): number;
            addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType;
            removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType;
            getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfDeployUnits(): number;
            setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.ComponentType;
            getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface DataType extends org.kevoree.modeling.meta.KLiteral {
        }
        interface DeployUnit extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getHashcode(): string;
            setHashcode(p_obj: string): org.kevoree.DeployUnit;
            getName(): string;
            setName(p_obj: string): org.kevoree.DeployUnit;
            getVersion(): string;
            setVersion(p_obj: string): org.kevoree.DeployUnit;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addRequiredLibs(p_obj: org.kevoree.DeployUnit): org.kevoree.DeployUnit;
            removeRequiredLibs(p_obj: org.kevoree.DeployUnit): org.kevoree.DeployUnit;
            getRequiredLibs(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfRequiredLibs(): number;
        }
        interface Dictionary extends org.kevoree.modeling.KObject {
            addValues(p_obj: org.kevoree.Value): org.kevoree.Dictionary;
            removeValues(p_obj: org.kevoree.Value): org.kevoree.Dictionary;
            getValues(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfValues(): number;
        }
        interface DictionaryType extends org.kevoree.modeling.KObject {
            addAttributes(p_obj: org.kevoree.AttributeType): org.kevoree.DictionaryType;
            removeAttributes(p_obj: org.kevoree.AttributeType): org.kevoree.DictionaryType;
            getAttributes(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfAttributes(): number;
        }
        interface FragmentDictionary extends org.kevoree.modeling.KObject, org.kevoree.Dictionary {
            setNode(p_obj: org.kevoree.Node): org.kevoree.FragmentDictionary;
            getNode(cb: org.kevoree.modeling.KCallback<any>): void;
            addValues(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary;
            removeValues(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary;
            getValues(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfValues(): number;
        }
        interface Group extends org.kevoree.modeling.KObject, org.kevoree.Instance {
            getName(): string;
            setName(p_obj: string): org.kevoree.Group;
            getStarted(): boolean;
            setStarted(p_obj: boolean): org.kevoree.Group;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.Group;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Group;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addNodes(p_obj: org.kevoree.Node): org.kevoree.Group;
            removeNodes(p_obj: org.kevoree.Node): org.kevoree.Group;
            getNodes(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfNodes(): number;
            setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Group;
            getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
            setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Group;
            getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
            addFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Group;
            removeFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Group;
            getFragmentDictionaries(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfFragmentDictionaries(): number;
        }
        interface GroupType extends org.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
            getName(): string;
            setName(p_obj: string): org.kevoree.GroupType;
            getAbstract(): boolean;
            setAbstract(p_obj: boolean): org.kevoree.GroupType;
            getVersion(): string;
            setVersion(p_obj: string): org.kevoree.GroupType;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.GroupType;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.GroupType;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.GroupType;
            removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.GroupType;
            getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfDeployUnits(): number;
            setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.GroupType;
            getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface Instance extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.Instance;
            getStarted(): boolean;
            setStarted(p_obj: boolean): org.kevoree.Instance;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Instance;
            getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
            setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Instance;
            getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface Model extends org.kevoree.modeling.KObject {
            addNodes(p_obj: org.kevoree.Node): org.kevoree.Model;
            removeNodes(p_obj: org.kevoree.Node): org.kevoree.Model;
            getNodes(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfNodes(): number;
            addChannels(p_obj: org.kevoree.Channel): org.kevoree.Model;
            removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Model;
            getChannels(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfChannels(): number;
            addGroups(p_obj: org.kevoree.Group): org.kevoree.Model;
            removeGroups(p_obj: org.kevoree.Group): org.kevoree.Model;
            getGroups(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfGroups(): number;
            addNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model;
            removeNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model;
            getNamespaces(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfNamespaces(): number;
        }
        interface NamedElement extends org.kevoree.modeling.KObject {
            getName(): string;
            setName(p_obj: string): org.kevoree.NamedElement;
        }
        interface Namespace extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.Namespace;
            addTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace;
            removeTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace;
            getTypeDefinitions(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfTypeDefinitions(): number;
        }
        interface NetworkInfo extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.NetworkInfo;
            addValues(p_obj: org.kevoree.Value): org.kevoree.NetworkInfo;
            removeValues(p_obj: org.kevoree.Value): org.kevoree.NetworkInfo;
            getValues(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfValues(): number;
        }
        interface Node extends org.kevoree.modeling.KObject, org.kevoree.Instance {
            getName(): string;
            setName(p_obj: string): org.kevoree.Node;
            getStarted(): boolean;
            setStarted(p_obj: boolean): org.kevoree.Node;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.Node;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Node;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addComponents(p_obj: org.kevoree.Component): org.kevoree.Node;
            removeComponents(p_obj: org.kevoree.Component): org.kevoree.Node;
            getComponents(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfComponents(): number;
            setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Node;
            getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
            addChildren(p_obj: org.kevoree.Node): org.kevoree.Node;
            removeChildren(p_obj: org.kevoree.Node): org.kevoree.Node;
            getChildren(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfChildren(): number;
            setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Node;
            getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
            addHost(p_obj: org.kevoree.Node): org.kevoree.Node;
            removeHost(p_obj: org.kevoree.Node): org.kevoree.Node;
            getHost(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfHost(): number;
            addGroups(p_obj: org.kevoree.Group): org.kevoree.Node;
            removeGroups(p_obj: org.kevoree.Group): org.kevoree.Node;
            getGroups(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfGroups(): number;
            addNetworks(p_obj: org.kevoree.NetworkInfo): org.kevoree.Node;
            removeNetworks(p_obj: org.kevoree.NetworkInfo): org.kevoree.Node;
            getNetworks(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfNetworks(): number;
        }
        interface NodeType extends org.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
            getName(): string;
            setName(p_obj: string): org.kevoree.NodeType;
            getAbstract(): boolean;
            setAbstract(p_obj: boolean): org.kevoree.NodeType;
            getVersion(): string;
            setVersion(p_obj: string): org.kevoree.NodeType;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType;
            removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType;
            getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfDeployUnits(): number;
            setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.NodeType;
            getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface Port extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.Port;
            addChannels(p_obj: org.kevoree.Channel): org.kevoree.Port;
            removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Port;
            getChannels(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfChannels(): number;
        }
        interface PortType extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.PortType;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
        }
        interface TypeDefinition extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.TypeDefinition;
            getAbstract(): boolean;
            setAbstract(p_obj: boolean): org.kevoree.TypeDefinition;
            getVersion(): string;
            setVersion(p_obj: string): org.kevoree.TypeDefinition;
            addMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition;
            removeMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition;
            getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfMetaData(): number;
            addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition;
            removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition;
            getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfDeployUnits(): number;
            setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.TypeDefinition;
            getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
        }
        interface TypedElement extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.TypedElement;
            addGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.TypedElement;
            removeGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.TypedElement;
            getGenericTypes(cb: org.kevoree.modeling.KCallback<any>): void;
            sizeOfGenericTypes(): number;
        }
        interface Value extends org.kevoree.modeling.KObject, org.kevoree.NamedElement {
            getName(): string;
            setName(p_obj: string): org.kevoree.Value;
            getValue(): string;
            setValue(p_obj: string): org.kevoree.Value;
        }
        module impl {
            class AttributeTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.AttributeType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getDatatype(): org.kevoree.DataType;
                setDatatype(p_obj: org.kevoree.DataType): org.kevoree.AttributeType;
                getDefaultValue(): string;
                setDefaultValue(p_obj: string): org.kevoree.AttributeType;
                getFragmentDependant(): boolean;
                setFragmentDependant(p_obj: boolean): org.kevoree.AttributeType;
                getName(): string;
                setName(p_obj: string): org.kevoree.AttributeType;
                getOptional(): boolean;
                setOptional(p_obj: boolean): org.kevoree.AttributeType;
                addGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.AttributeType;
                removeGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.AttributeType;
                getGenericTypes(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfGenericTypes(): number;
            }
            class ChannelImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Channel {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Channel;
                getStarted(): boolean;
                setStarted(p_obj: boolean): org.kevoree.Channel;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Channel;
                getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
                setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Channel;
                getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
                addPorts(p_obj: org.kevoree.Port): org.kevoree.Channel;
                removePorts(p_obj: org.kevoree.Port): org.kevoree.Channel;
                getPorts(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfPorts(): number;
                addFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel;
                removeFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel;
                getFragmentDictionaries(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfFragmentDictionaries(): number;
            }
            class ChannelTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ChannelType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.ChannelType;
                getAbstract(): boolean;
                setAbstract(p_obj: boolean): org.kevoree.ChannelType;
                getVersion(): string;
                setVersion(p_obj: string): org.kevoree.ChannelType;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType;
                removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType;
                getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfDeployUnits(): number;
                setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.ChannelType;
                getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class ComponentImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Component {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Component;
                getStarted(): boolean;
                setStarted(p_obj: boolean): org.kevoree.Component;
                addOutputs(p_obj: org.kevoree.Port): org.kevoree.Component;
                removeOutputs(p_obj: org.kevoree.Port): org.kevoree.Component;
                getOutputs(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfOutputs(): number;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.Component;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Component;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Component;
                getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
                addInputs(p_obj: org.kevoree.Port): org.kevoree.Component;
                removeInputs(p_obj: org.kevoree.Port): org.kevoree.Component;
                getInputs(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfInputs(): number;
                setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Component;
                getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class ComponentTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ComponentType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.ComponentType;
                getAbstract(): boolean;
                setAbstract(p_obj: boolean): org.kevoree.ComponentType;
                getVersion(): string;
                setVersion(p_obj: string): org.kevoree.ComponentType;
                addOutputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
                removeOutputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
                getOutputs(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfOutputs(): number;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addInputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
                removeInputs(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
                getInputs(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfInputs(): number;
                addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType;
                removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType;
                getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfDeployUnits(): number;
                setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.ComponentType;
                getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class DataTypeLiteral extends org.kevoree.modeling.meta.impl.MetaLiteral implements org.kevoree.DataType {
                constructor(p_name: string, p_index: number, p_className: string);
            }
            class DeployUnitImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.DeployUnit {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getHashcode(): string;
                setHashcode(p_obj: string): org.kevoree.DeployUnit;
                getName(): string;
                setName(p_obj: string): org.kevoree.DeployUnit;
                getVersion(): string;
                setVersion(p_obj: string): org.kevoree.DeployUnit;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addRequiredLibs(p_obj: org.kevoree.DeployUnit): org.kevoree.DeployUnit;
                removeRequiredLibs(p_obj: org.kevoree.DeployUnit): org.kevoree.DeployUnit;
                getRequiredLibs(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfRequiredLibs(): number;
            }
            class DictionaryImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Dictionary {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                addValues(p_obj: org.kevoree.Value): org.kevoree.Dictionary;
                removeValues(p_obj: org.kevoree.Value): org.kevoree.Dictionary;
                getValues(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfValues(): number;
            }
            class DictionaryTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.DictionaryType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                addAttributes(p_obj: org.kevoree.AttributeType): org.kevoree.DictionaryType;
                removeAttributes(p_obj: org.kevoree.AttributeType): org.kevoree.DictionaryType;
                getAttributes(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfAttributes(): number;
            }
            class FragmentDictionaryImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.FragmentDictionary {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                setNode(p_obj: org.kevoree.Node): org.kevoree.FragmentDictionary;
                getNode(cb: org.kevoree.modeling.KCallback<any>): void;
                addValues(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary;
                removeValues(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary;
                getValues(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfValues(): number;
            }
            class GroupImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Group {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Group;
                getStarted(): boolean;
                setStarted(p_obj: boolean): org.kevoree.Group;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.Group;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Group;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addNodes(p_obj: org.kevoree.Node): org.kevoree.Group;
                removeNodes(p_obj: org.kevoree.Node): org.kevoree.Group;
                getNodes(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfNodes(): number;
                setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Group;
                getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
                setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Group;
                getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
                addFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Group;
                removeFragmentDictionaries(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Group;
                getFragmentDictionaries(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfFragmentDictionaries(): number;
            }
            class GroupTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.GroupType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.GroupType;
                getAbstract(): boolean;
                setAbstract(p_obj: boolean): org.kevoree.GroupType;
                getVersion(): string;
                setVersion(p_obj: string): org.kevoree.GroupType;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.GroupType;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.GroupType;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.GroupType;
                removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.GroupType;
                getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfDeployUnits(): number;
                setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.GroupType;
                getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class InstanceImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Instance {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Instance;
                getStarted(): boolean;
                setStarted(p_obj: boolean): org.kevoree.Instance;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Instance;
                getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
                setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Instance;
                getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class ModelImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Model {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                addNodes(p_obj: org.kevoree.Node): org.kevoree.Model;
                removeNodes(p_obj: org.kevoree.Node): org.kevoree.Model;
                getNodes(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfNodes(): number;
                addChannels(p_obj: org.kevoree.Channel): org.kevoree.Model;
                removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Model;
                getChannels(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfChannels(): number;
                addGroups(p_obj: org.kevoree.Group): org.kevoree.Model;
                removeGroups(p_obj: org.kevoree.Group): org.kevoree.Model;
                getGroups(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfGroups(): number;
                addNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model;
                removeNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model;
                getNamespaces(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfNamespaces(): number;
            }
            class NamedElementImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.NamedElement {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.NamedElement;
            }
            class NamespaceImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Namespace {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Namespace;
                addTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace;
                removeTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace;
                getTypeDefinitions(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfTypeDefinitions(): number;
            }
            class NetworkInfoImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.NetworkInfo {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.NetworkInfo;
                addValues(p_obj: org.kevoree.Value): org.kevoree.NetworkInfo;
                removeValues(p_obj: org.kevoree.Value): org.kevoree.NetworkInfo;
                getValues(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfValues(): number;
            }
            class NodeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Node {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Node;
                getStarted(): boolean;
                setStarted(p_obj: boolean): org.kevoree.Node;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.Node;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Node;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addComponents(p_obj: org.kevoree.Component): org.kevoree.Node;
                removeComponents(p_obj: org.kevoree.Component): org.kevoree.Node;
                getComponents(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfComponents(): number;
                setDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Node;
                getDictionary(cb: org.kevoree.modeling.KCallback<any>): void;
                addChildren(p_obj: org.kevoree.Node): org.kevoree.Node;
                removeChildren(p_obj: org.kevoree.Node): org.kevoree.Node;
                getChildren(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfChildren(): number;
                setTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Node;
                getTypeDefinition(cb: org.kevoree.modeling.KCallback<any>): void;
                addHost(p_obj: org.kevoree.Node): org.kevoree.Node;
                removeHost(p_obj: org.kevoree.Node): org.kevoree.Node;
                getHost(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfHost(): number;
                addGroups(p_obj: org.kevoree.Group): org.kevoree.Node;
                removeGroups(p_obj: org.kevoree.Group): org.kevoree.Node;
                getGroups(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfGroups(): number;
                addNetworks(p_obj: org.kevoree.NetworkInfo): org.kevoree.Node;
                removeNetworks(p_obj: org.kevoree.NetworkInfo): org.kevoree.Node;
                getNetworks(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfNetworks(): number;
            }
            class NodeTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.NodeType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.NodeType;
                getAbstract(): boolean;
                setAbstract(p_obj: boolean): org.kevoree.NodeType;
                getVersion(): string;
                setVersion(p_obj: string): org.kevoree.NodeType;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType;
                removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType;
                getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfDeployUnits(): number;
                setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.NodeType;
                getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class PortImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Port {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Port;
                addChannels(p_obj: org.kevoree.Channel): org.kevoree.Port;
                removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Port;
                getChannels(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfChannels(): number;
            }
            class PortTypeImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.PortType {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.PortType;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
            }
            class TypeDefinitionImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.TypeDefinition {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.TypeDefinition;
                getAbstract(): boolean;
                setAbstract(p_obj: boolean): org.kevoree.TypeDefinition;
                getVersion(): string;
                setVersion(p_obj: string): org.kevoree.TypeDefinition;
                addMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition;
                removeMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition;
                getMetaData(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfMetaData(): number;
                addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition;
                removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition;
                getDeployUnits(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfDeployUnits(): number;
                setDictionaryType(p_obj: org.kevoree.DictionaryType): org.kevoree.TypeDefinition;
                getDictionaryType(cb: org.kevoree.modeling.KCallback<any>): void;
            }
            class TypedElementImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.TypedElement {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.TypedElement;
                addGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.TypedElement;
                removeGenericTypes(p_obj: org.kevoree.TypedElement): org.kevoree.TypedElement;
                getGenericTypes(cb: org.kevoree.modeling.KCallback<any>): void;
                sizeOfGenericTypes(): number;
            }
            class ValueImpl extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Value {
                constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.KMetaClass, p_manager: org.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
                getName(): string;
                setName(p_obj: string): org.kevoree.Value;
                getValue(): string;
                setValue(p_obj: string): org.kevoree.Value;
            }
        }
        module meta {
            class MetaAttributeType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_DATATYPE: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_DEFAULTVALUE: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_FRAGMENTDEPENDANT: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_OPTIONAL: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_OP_DICTIONARYTYPE_ATTRIBUTES: org.kevoree.modeling.meta.KMetaReference;
                static REF_GENERICTYPES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_ATTRIBUTETYPE_GENERICTYPES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_TYPEDELEMENT_GENERICTYPES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaAttributeType;
                constructor();
            }
            class MetaChannel extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_STARTED: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_MODEL_CHANNELS: org.kevoree.modeling.meta.KMetaReference;
                static REF_PORTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_FRAGMENTDICTIONARIES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaChannel;
                constructor();
            }
            class MetaChannelType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_ABSTRACT: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VERSION: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NAMESPACE_TYPEDEFINITIONS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaChannelType;
                constructor();
            }
            class MetaComponent extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_STARTED: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_OUTPUTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_INPUTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_COMPONENTS: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaComponent;
                constructor();
            }
            class MetaComponentType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_ABSTRACT: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VERSION: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_OUTPUTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_INPUTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NAMESPACE_TYPEDEFINITIONS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaComponentType;
                constructor();
            }
            class MetaDataType extends org.kevoree.modeling.meta.impl.MetaEnum implements org.kevoree.modeling.KType {
                static BOOLEAN: org.kevoree.DataType;
                static CHAR: org.kevoree.DataType;
                static DECIMAL: org.kevoree.DataType;
                static INTEGER: org.kevoree.DataType;
                static LIST: org.kevoree.DataType;
                static STRING: org.kevoree.DataType;
                private static INSTANCE;
                static getInstance(): org.kevoree.meta.MetaDataType;
                constructor();
            }
            class MetaDeployUnit extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_HASHCODE: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VERSION: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_TYPEDEFINITION_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_REQUIREDLIBS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_GROUPTYPE_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_DEPLOYUNIT_REQUIREDLIBS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODETYPE_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaDeployUnit;
                constructor();
            }
            class MetaDictionary extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static REF_OP_COMPONENT_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_VALUES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaDictionary;
                constructor();
            }
            class MetaDictionaryType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static REF_OP_NODETYPE_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_ATTRIBUTES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_TYPEDEFINITION_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_GROUPTYPE_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaDictionaryType;
                constructor();
            }
            class MetaFragmentDictionary extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static REF_NODE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_VALUES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_GROUP_FRAGMENTDICTIONARIES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_FRAGMENTDICTIONARIES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaFragmentDictionary;
                constructor();
            }
            class MetaGroup extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_STARTED: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_NODES: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_MODEL_GROUPS: org.kevoree.modeling.meta.KMetaReference;
                static REF_FRAGMENTDICTIONARIES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaGroup;
                constructor();
            }
            class MetaGroupType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_ABSTRACT: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VERSION: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NAMESPACE_TYPEDEFINITIONS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaGroupType;
                constructor();
            }
            class MetaInstance extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_STARTED: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaInstance;
                constructor();
            }
            class MetaModel extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static REF_NODES: org.kevoree.modeling.meta.KMetaReference;
                static REF_CHANNELS: org.kevoree.modeling.meta.KMetaReference;
                static REF_GROUPS: org.kevoree.modeling.meta.KMetaReference;
                static REF_NAMESPACES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaModel;
                constructor();
            }
            class MetaNamedElement extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static getInstance(): org.kevoree.meta.MetaNamedElement;
                constructor();
            }
            class MetaNamespace extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_TYPEDEFINITIONS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_MODEL_NAMESPACES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaNamespace;
                constructor();
            }
            class MetaNetworkInfo extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_VALUES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_NETWORKS: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaNetworkInfo;
                constructor();
            }
            class MetaNode extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_STARTED: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_MODEL_NODES: org.kevoree.modeling.meta.KMetaReference;
                static REF_COMPONENTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARY: org.kevoree.modeling.meta.KMetaReference;
                static REF_CHILDREN: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_FRAGMENTDICTIONARY_NODE: org.kevoree.modeling.meta.KMetaReference;
                static REF_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_HOST: org.kevoree.modeling.meta.KMetaReference;
                static REF_GROUPS: org.kevoree.modeling.meta.KMetaReference;
                static REF_NETWORKS: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaNode;
                constructor();
            }
            class MetaNodeType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_ABSTRACT: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VERSION: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NAMESPACE_TYPEDEFINITIONS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaNodeType;
                constructor();
            }
            class MetaPort extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_CHANNELS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_OUTPUTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_INPUTS: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaPort;
                constructor();
            }
            class MetaPortType extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENTTYPE_INPUTS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENTTYPE_OUTPUTS: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaPortType;
                constructor();
            }
            class MetaTypeDefinition extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_ABSTRACT: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VERSION: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_DEPLOYUNITS: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NAMESPACE_TYPEDEFINITIONS: org.kevoree.modeling.meta.KMetaReference;
                static REF_DICTIONARYTYPE: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_TYPEDEFINITION: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaTypeDefinition;
                constructor();
            }
            class MetaTypedElement extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_GENERICTYPES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_ATTRIBUTETYPE_GENERICTYPES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_TYPEDELEMENT_GENERICTYPES: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaTypedElement;
                constructor();
            }
            class MetaValue extends org.kevoree.modeling.meta.impl.MetaClass {
                private static INSTANCE;
                static ATT_NAME: org.kevoree.modeling.meta.KMetaAttribute;
                static ATT_VALUE: org.kevoree.modeling.meta.KMetaAttribute;
                static REF_OP_PORTTYPE_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_DEPLOYUNIT_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODETYPE_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_GROUPTYPE_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_TYPEDEFINITION_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_COMPONENT_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_INSTANCE_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_CHANNEL_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_DICTIONARY_VALUES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NETWORKINFO_VALUES: org.kevoree.modeling.meta.KMetaReference;
                static REF_OP_NODE_METADATA: org.kevoree.modeling.meta.KMetaReference;
                static getInstance(): org.kevoree.meta.MetaValue;
                constructor();
            }
        }
    }
}


declare module 'kevoree-model' {
    export { java, org }
}

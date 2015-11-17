import 'reflect-metadata';
import {
    Component, Start, Stop, Update, MetaData, LifecycleMeta, Callback
} from '../main/kevoree-api';
import * as Assert from 'assert';

describe('Lifecycle annotations', () => {

    describe('synchronous methods', () => {
        @Component()
        class MyComp {
            @Start()
            start(): void {}

            @Stop()
            stop(): void {}

            @Update()
            update(): void {}
        }

        it('@Start()', () => {
            var meta: LifecycleMeta = Reflect.getMetadata(MetaData.START, MyComp.prototype);
            Assert.equal(meta.name, 'start');
            Assert.equal(meta.async, false);
        });

        it('@Stop()', () => {
            var meta: LifecycleMeta = Reflect.getMetadata(MetaData.STOP, MyComp.prototype);
            Assert.equal(meta.name, 'stop');
            Assert.equal(meta.async, false);
        });

        it('@Update()', () => {
            var meta: LifecycleMeta = Reflect.getMetadata(MetaData.UPDATE, MyComp.prototype);
            Assert.equal(meta.name, 'update');
            Assert.equal(meta.async, false);
        });
    });

    describe('asynchronous methods', () => {
        @Component()
        class AsyncComp {
            @Start(true)
            start(cb: Callback): void {
                cb();
            }

            @Stop(true)
            stop(cb: Callback): void {
                cb();
            }

            @Update(true)
            update(cb: Callback): void {
                cb();
            }
        }

        it('@Start(true)', () => {
            var meta: LifecycleMeta = Reflect.getMetadata(MetaData.START, AsyncComp.prototype);
            Assert.equal(meta.name, 'start');
            Assert.equal(meta.async, true);
        });

        it('@Stop(true)', () => {
            var meta: LifecycleMeta = Reflect.getMetadata(MetaData.STOP, AsyncComp.prototype);
            Assert.equal(meta.name, 'stop');
            Assert.equal(meta.async, true);
        });

        it('@Update(true)', () => {
            var meta: LifecycleMeta = Reflect.getMetadata(MetaData.UPDATE, AsyncComp.prototype);
            Assert.equal(meta.name, 'update');
            Assert.equal(meta.async, true);
        });
    });

    describe('error on duplicate', () => {
        it('@Start() duplicate must throw error', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @Start()
                    start(): void {}

                    @Start()
                    start2(): void {}
                }
            });
        });

        it('@Stop() duplicate must throw error', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @Stop()
                    stop(): void {}

                    @Stop()
                    stop2(): void {}
                }
            });
        });

        it('@Update() duplicate must throw error', () => {
            Assert.throws(() => {
                @Component()
                class WrongComp {
                    @Update()
                    update(): void {}

                    @Update()
                    update2(): void {}
                }
            });
        });
    });
});

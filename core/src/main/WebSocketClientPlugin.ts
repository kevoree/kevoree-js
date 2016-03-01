import { modeling } from 'kevoree-model';
import * as WebSocket from 'ws';

export class WebSocketClientPlugin implements modeling.cdn.KContentDeliveryDriver {
		private _callbackId = 0;
		private _reconnectionDelay = 3000;
		private _clientConnection: WebSocket;
		private _connectionUri:string;
		private _callbacks: { [key:number]: any };
		private _listeners: modeling.cdn.KContentUpdateListener[];
		private _shouldBeConnected = false;

		constructor(connectionUri: string) {
				this._connectionUri = connectionUri;
				this._listeners = [];
				this._callbacks = {};
		}

		public addUpdateListener(listener: modeling.cdn.KContentUpdateListener): number {
				var i = Math.random();
				this._listeners[i] = listener;
				return i;
		}

		public removeUpdateListener(id: number) {
				delete this._listeners[id];
		}

		public connect(callback: modeling.KCallback<Error>) {
				this._shouldBeConnected = true;
				this._clientConnection = new WebSocket(this._connectionUri);

				this._clientConnection.onmessage = (message) => {
						var msg = modeling.message.impl.Message.load(message.data);
						switch (msg.type()) {
								case modeling.message.impl.Message.GET_RES_TYPE:
								{
										var foundCB = this._callbacks[msg.id()];
										if (foundCB != null && foundCB != undefined) {
												foundCB(msg.values(), null);
										}
										delete this._callbacks[msg.id()];
								}
										break;
								case modeling.message.impl.Message.PUT_RES_TYPE:
								{
										var foundCB = this._callbacks[msg.id()];
										if (foundCB != null && foundCB != undefined) {
												foundCB(null);
										}
										delete this._callbacks[msg.id()];
								}
										break;
								case modeling.message.impl.Message.ATOMIC_GET_INC_RESULT_TYPE:
								{
										var foundCB = this._callbacks[msg.id()];
										if (foundCB != null && foundCB != undefined) {
												foundCB(msg.values()[0], null);
										}
										delete this._callbacks[msg.id()];
								}
										break;
								case modeling.message.impl.Message.OPERATION_CALL_TYPE:
								{
										for (var id in this._listeners) {
												var listener = this._listeners[id];
												listener.onOperationCall(msg);
										}
								}
										break;
								case modeling.message.impl.Message.OPERATION_RESULT_TYPE:
								{
										var foundCB = this._callbacks[msg.id()];
										if (foundCB != null) {
												foundCB.on(msg);
										}
								}
										break;
								case modeling.message.impl.Message.EVENTS_TYPE:
								{
										for (var id in this._listeners) {
												var listener = this._listeners[id];
												listener.onKeysUpdate(msg.keys());
										}
								}
										break;
								default:
								{
										console.log("MessageType not supported:" + msg.type())
								}
						}
				};
				this._clientConnection.onerror = function (error) {
						console.log(error);
				};
				this._clientConnection.onclose = function (error) {
						if (this.shouldBeConnected) {
								console.log("Try reconnection in " + this._reconnectionDelay + " milliseconds.");
								//try to reconnect
								setTimeout(function () {
										this.connect(null)
								}, this._reconnectionDelay);
						}
				};
				this._clientConnection.onopen = function () {
						if (callback != null) {
								callback(null);
						}
				};
		}

		public close(callback: (p:Error) => void): void {
				this._shouldBeConnected = false;
				this._clientConnection.close();
				if (callback != null) {
						callback(null);
				}
		}

		private nextKey(): number {
				if (this._callbackId == 1000000) {
						this._callbackId = 0;
				} else {
						this._callbackId = this._callbackId + 1;
				}
				return this._callbackId;
		}

		public put(keys: Float64Array, values: string[], error: modeling.KCallback<Error>, excludeListener: number):void {
				var putRequest = new modeling.message.impl.Message();
				putRequest.setType(modeling.message.impl.Message.PUT_REQ_TYPE);
				putRequest.setID(this.nextKey());
				putRequest.setKeys(keys);
				putRequest.setValues(values);
				this._callbacks[putRequest.id()] = error;
				this._clientConnection.send(putRequest.save());
		}

		public get(keys:Float64Array, callback:(p:string[], p1:Error) => void) {
				var getRequest = new modeling.message.impl.Message();
				getRequest.setType(modeling.message.impl.Message.GET_REQ_TYPE);
				getRequest.setID(this.nextKey());
				getRequest.setKeys(keys);
				this._callbacks[getRequest.id()] = callback;
				this._clientConnection.send(getRequest.save());
		}

		public atomicGetIncrement(keys:Float64Array, callback:(p:number, p1:Error) => void) {
				var atomicGetRequest = new modeling.message.impl.Message();
				atomicGetRequest.setType(modeling.message.impl.Message.ATOMIC_GET_INC_REQUEST_TYPE);
				atomicGetRequest.setID(this.nextKey());
				atomicGetRequest.setKeys(keys);
				this._callbacks[atomicGetRequest.id()] = callback;
				this._clientConnection.send(atomicGetRequest.save());
		}

		public remove(keys:Float64Array, error: (p:Error) => void) {
				console.error("Not implemented yet");
		}

		public peers():string[] {
				return ["Server"];
		}

		public sendToPeer(peer:string, msg:modeling.message.KMessage, callback:modeling.KCallback<modeling.message.KMessage>) {
				if (callback != null) {
						msg.setID(this.nextKey());
						this._callbacks[msg.id()] = callback;
				}
				this._clientConnection.send(msg.save());
		}

}

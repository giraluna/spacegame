/// <reference path="../lib/pixi.d.ts" />

let eventEmitter = new PIXI.utils.EventEmitter();
// TODO refactor | rename EventManager
const eventManager =
{
  dispatchEvent: eventEmitter.emit.bind(eventEmitter),
  removeEventListener: eventEmitter.removeListener.bind(eventEmitter),
  removeAllListeners: eventEmitter.removeAllListeners.bind(eventEmitter),
  addEventListener: <T extends Function>(eventType: string, listener: T) =>
  {
    eventEmitter.on(eventType, listener);

    return listener;
  },
};

export default eventManager;

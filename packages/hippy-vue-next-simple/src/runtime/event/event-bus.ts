/**
 * Hippy event bus, methods such as on off emit in Vue3 have been removed, and the event bus is implemented here
 */

// all global event listeners
let globalEventListeners = Object.create(null);

/**
 * EventBus for global event handle
 */
export const EventBus = {
  /**
   * add event listener
   *
   * @param event
   * @param callback
   * @param ctx
   */
  $on(event: string | Array<string>, callback: Function, ctx?: any) {
    if (Array.isArray(event)) {
      event.forEach((eventName) => {
        EventBus.$on(eventName, callback, ctx);
      });
    } else {
      // init event listeners
      if (!globalEventListeners[event]) {
        globalEventListeners[event] = [];
      }

      // add listener
      globalEventListeners[event].push({
        fn: callback,
        ctx,
      });
    }

    return EventBus;
  },

  /**
   * add event listener, only execute once
   *
   * @param event
   * @param callback
   * @param ctx
   */
  $once(event: string, callback: Function, ctx?: any) {
    function listener(...args) {
      EventBus.$off(event, listener);
      callback.apply(ctx, args);
    }

    listener._ = callback;
    EventBus.$on(event, listener);

    return EventBus;
  },

  /**
   * emit event
   *
   * @param event
   * @param args
   */
  $emit(event: string, ...args: any) {
    const callbackList = (globalEventListeners[event] || []).slice();
    const len = callbackList.length;

    for (let i = 0; i < len; i += 1) {
      callbackList[i].fn.apply(callbackList[i].ctx, args);
    }

    return EventBus;
  },

  /**
   * remove global event listener. remove all if no params
   *
   * @param event
   * @param callback
   */
  $off(event?: string | Array<string>, callback?: Function) {
    if (!event && !callback) {
      // remove all event listener
      globalEventListeners = Object.create(null);

      return EventBus;
    }

    // handle array of events
    if (Array.isArray(event)) {
      event.forEach((eventName) => {
        EventBus.$off(eventName, callback);
      });

      return EventBus;
    }

    // specific event
    const callbackList = globalEventListeners[event!];
    if (!callbackList) {
      return EventBus;
    }
    if (!callback) {
      globalEventListeners[event!] = null;
      return EventBus;
    }

    // specific handler
    let existCallback;
    const len = callbackList.length;
    for (let i = 0; i < len; i++) {
      existCallback = callbackList[i];
      if (existCallback.fn === callback || existCallback.fn._ === callback) {
        // remove specific listener
        callbackList.splice(i, 1);
        break;
      }
    }

    return EventBus;
  },
};

/**
 * 事件对象基类
 */
import { HippyEvent } from './hippy-event';

export abstract class HippyEventTarget {
  public listeners: {
    [key: string]: Array<Function>;
  } = {};

  public addEventListener(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  public removeEventListener(event: string, callback?: Function) {
    if (callback) {
      const listener = this.listeners[event];
      if (listener) {
        const len = listener.length;
        for (let i = 0; i < len; i++) {
          if (listener[i] === callback) {
            listener.splice(i, 1);
            break;
          }
        }
      }
    } else {
      delete this.listeners[event];
    }
  }

  public abstract dispatchEvent(event: HippyEvent);
}

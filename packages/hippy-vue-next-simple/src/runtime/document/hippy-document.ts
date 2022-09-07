import { HippyElement } from '../element/hippy-element';

export class HippyDocument {
  static createElement(tag: string) {
    return new HippyElement(tag);
  }
}

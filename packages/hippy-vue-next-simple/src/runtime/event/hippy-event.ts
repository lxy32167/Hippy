import { HippyNode } from '../node/hippy-node';

export class HippyEvent {
  public timestamp: number;
  public type: string;
  public bubbles = true;
  public target: HippyNode | null = null;
  public currentTarget: HippyNode | null = null;


  constructor(type: string) {
    this.type = type;
    this.timestamp = Date.now();
  }

  public stopPropagation() {
    this.bubbles = false;
  }
}

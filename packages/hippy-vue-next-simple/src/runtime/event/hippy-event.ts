export class HippyEvent {
  public timestamp: number;
  public type: string;
  public bubbles = true;
  public target = null;
  public currentTarget = null;


  constructor(type: string) {
    this.type = type;
    this.timestamp = Date.now();
  }

  public stopPropagation() {
    this.bubbles = false;
  }
}

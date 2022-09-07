import { type NativeNode, type NativeNodeProps } from '../../index';
import { HippyNode, NodeType } from '../node/hippy-node';

export class HippyElement extends HippyNode {
  // 元素id
  public id = '';
  // 标签名
  public tagName: string;
  // 元素属性
  public attributes: {
    [key: string]: any;
  } = {};

  constructor(tagName: string) {
    super(NodeType.ElementNode);

    this.tagName = tagName;
  }

  public getAttribute(key) {
    return this.attributes[key];
  }

  public removeAttribute(key) {
    delete this.attributes[key];
  }

  public setAttribute(key, value) {
    if (this.attributes[key] !== value) {
      this.attributes[key] = value;

      this.updateNativeNode(false);
    }
  }

  public hasAttribute(key) {
    return !!this.attributes[key];
  }

  public getNativeProps(): NativeNodeProps {
    const props: NativeNodeProps = {};

    const keys = Object.keys(this.attributes);
    keys.forEach((key) => {
      props[key] = this.attributes[key];
    });

    return props;
  }

  public getNativeEvents() {
    const nativeEvents = {};
    const listeners = this.getEventListeners();

    Object.keys(listeners).forEach((eventName) => {
      if (listeners[eventName]) {
        // 告知终端监听该事件
        nativeEvents[eventName] = true;
      }
    });

    return nativeEvents;
  }

  public convertToNativeNodes(isIncludeChild: boolean): Array<NativeNode> {
    if (!this.isNeedInsertToNative) {
      return [];
    }

    // 如果包含子节点，则由父类处理
    if (isIncludeChild) {
      return super.convertToNativeNodes(true);
    }

    // 计算元素节点的属性并转换为native节点
    const elementAttributes: Partial<NativeNode> = {
      name: 'Text',
      props: {
        ...this.getNativeProps(),
        ...this.getNativeEvents(),
      },
    };

    return super.convertToNativeNodes(false, elementAttributes);
  }
}

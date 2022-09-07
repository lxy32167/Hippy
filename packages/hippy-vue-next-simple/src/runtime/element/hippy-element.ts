import { toRaw } from '@vue/runtime-core';
import { type NativeNode, type NativeNodeProps } from '../../index';
import { HippyNode, NodeType } from '../node/hippy-node';
import { getCssMap } from '../style/css-map';

export class HippyElement extends HippyNode {
  // 元素id
  public id = '';
  // 标签名
  public tagName: string;
  // 元素属性
  public attributes: {
    [key: string]: any;
  } = {};
  // class属性，例如 class="wrapper red" => ['wrapper', 'red']
  public classList: Set<string>;
  // 样式属性
  public style: {
    [key: string]: any;
  };

  constructor(tagName: string) {
    super(NodeType.ElementNode);

    this.tagName = tagName;
    this.classList = new Set();
    this.style = {};
  }

  public getAttribute(key) {
    return this.attributes[key];
  }

  public removeAttribute(key) {
    delete this.attributes[key];
  }

  public setAttribute(key, value) {
    if (this.attributes[key] !== value) {
      switch (key) {
        case 'id':
          this.id = value;
          break;
        case 'class':
          this.classList = new Set(value.split(' ').filter((x: string) => x.trim()) as string);
          break;
        default:
          this.attributes[key] = value;
          break;
      }

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
      // vue 属性如果用了响应式，拿到的是Proxy对象，协议转换不识别，需要 toRaw 转为原始 js 类型
      props[key] = toRaw(this.attributes[key]);
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

  public getNativeStyles() {
    const nativeStyle = {};

    const cssMap = getCssMap();
    const matchedSelectors = cssMap.query(this);
    matchedSelectors.selectors.forEach((matchedSelector) => {
      // 如果匹配到的规则里有样式，则加入元素样式属性
      if (matchedSelector.ruleSet?.declarations?.length) {
        matchedSelector.ruleSet.declarations.forEach((cssStyle) => {
          if (cssStyle) {
            nativeStyle[cssStyle.property] = cssStyle.value;
          }
        });
      }
    });

    // 内联样式处理，类似props，不写了
    const inlineStyle = {};
    // 合并样式表样式和内联样式，内联样式优先
    return { ...nativeStyle, ...inlineStyle };
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
        // hippy的js处理会将style属性展开并赋值给props
        style: this.getNativeStyles(),
      },
    };

    return super.convertToNativeNodes(false, elementAttributes);
  }
}

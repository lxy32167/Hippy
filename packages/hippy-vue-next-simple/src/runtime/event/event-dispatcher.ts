import { trace, getHippyCachedInstance } from '../../util';
import type { HippyNode } from '../node/hippy-node';
import { EventBus } from './event-bus';
import { HippyEvent } from './hippy-event';

/**
 * native事件名类似 onClick => click
 *
 * @param eventName
 */
function getVueEventName(eventName: string) {
  const str = eventName.slice(2);
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
}

function findTargetNode(targetNodeId: number): HippyNode | null {
  const instance = getHippyCachedInstance();

  if (instance?.$el) {
    return instance.$el.findChild(node => node.nodeId === targetNodeId);
  }

  return null;
}

const componentName = ['%c[event]%c', 'color: green', 'color: auto'];

const EventDispatcher = {
  /**
   * native 全局事件，如页面隐藏，恢复可见等
   *
   * @param nativeEvent
   */
  receiveNativeEvent(nativeEvent) {
    trace(...componentName, 'receiveNativeEvent', nativeEvent);

    const [eventName, eventParams]  = nativeEvent;
    EventBus.$emit(eventName, eventParams);
  },

  /**
   * 元素绑定的手势交互事件，如点击，滚动等
   *
   * @param nativeEvent
   */
  receiveNativeGesture(nativeEvent) {
    trace(...componentName, 'receiveNativeGesture', nativeEvent);

    const { id: targetNodeId, name: eventName } = nativeEvent;
    // 找到目标节点，处理事件名，下发事件
    const targetNode = findTargetNode(targetNodeId);
    if (!targetNode) {
      return;
    }
    const targetEventName = getVueEventName(eventName);
    const event = new HippyEvent(targetEventName);

    // 下发事件
    targetNode.dispatchEvent(event);
  },

  /**
   * UI组件事件，如input组件的focus等
   *
   * @param nativeEvent
   */
  receiveUIComponentEvent(nativeEvent) {
    trace(...componentName, 'receiveUIComponentEvent', nativeEvent);
  },
};

if (global.__GLOBAL__) {
  // hippy native 下发事件管理器
  global.__GLOBAL__.jsModuleList.EventDispatcher = EventDispatcher;
}

import { createRenderer, type App, type Component } from '@vue/runtime-core';
import { Native } from './runtime/native';
import { setRootViewId, setHippyCachedInstance } from './util';
import { renderToNative } from './runtime/render';
import './runtime/websocket';
import { HippyDocument } from './runtime/document/hippy-document';
import { HippyElement } from './runtime/element/hippy-element';
import { HippyNode, NodeType } from './runtime/node/hippy-node';
import { nodeOps } from './node-ops';
import { patchProp } from './patch-prop';

// 终端节点 props 类型
export interface NativeNodeProps {
  [key: string]: any;
}

// 终端节点类型
export interface NativeNode {
  // 节点唯一id
  id: number;
  // 父节点id
  pId: number;
  // 节点在兄弟节点中的位置
  index: number;
  // Native 的view名称
  name?: string;
  // 节点的props，属性，样式，事件，等等
  props?: NativeNodeProps;
}

// 终端节点操作分类
export enum NodeOperateType {
  CREATE,
  UPDATE,
  DELETE,
}

/**
 * 创建Hippy App的参数类型
 *
 * @public
 */
export interface HippyAppOptions {
  // Hippy终端注册的app名称
  appName: string;
}

// hippy app 类型
export type HippyApp = App & {
  $start: (afterCallback?: Function) => Promise<{ rootViewId: number; superProps: any }>
};

/**
 * 创建 hippy app
 */
export const createApp = (vueRootComponent: Component, options: HippyAppOptions): HippyApp => {
  const app: App = createRenderer({
    patchProp,
    ...nodeOps,
  }).createApp(vueRootComponent);
  const hippyApp: HippyApp = app as HippyApp;

  // 对 mount 进行处理
  const { mount } = hippyApp;
  hippyApp.mount = (rootContainer, isHydrate = false, isSVG = false) => {
    const root = HippyDocument.createElement(rootContainer);
    root.setAttribute('marginTop', 100);

    const instance = mount(root, isHydrate, isSVG);
    setHippyCachedInstance(instance);

    return instance;
  };

  // hippy 实例启动方法
  hippyApp.$start = () => new Promise((resolve) => {
    Native.hippyRegister.regist(options.appName, (superProps: any) => {
      const { __instanceId__: rootViewId } = superProps;
      // 缓存 native root view id
      setRootViewId(rootViewId);

      resolve({
        rootViewId,
        superProps,
      });
    });
  });

  return hippyApp;
};

// 导出 native 渲染接口
export {
  renderToNative,
  HippyNode,
  NodeType,
  HippyElement,
  HippyDocument,
};

import { Native } from './runtime/native';
import { setRootViewId } from './util';
import { renderToNative } from './runtime/render';
import './runtime/websocket';

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

/**
 * 创建 hippy app
 */
export const createApp = (options: HippyAppOptions): Promise<{
  rootViewId: number;
  superProps: any;
}> => new Promise((resolve) => {
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

// 导出 native 渲染接口
export {
  renderToNative,
};

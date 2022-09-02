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

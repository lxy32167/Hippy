/**
 * 实现 Native Node 上屏渲染
 */

import { type NativeNode, NodeOperateType } from '../../index';
import { Native } from '../native';
import { getRootViewId, trace } from '../../util';

const componentName = ['%c[native]%c', 'color: red', 'color: auto'];

/**
 * 终端节点上屏
 *
 * @param nodes
 * @param operateType
 */
export function renderToNative(nodes: Array<NativeNode>, operateType: NodeOperateType) {
  const rootViewId = getRootViewId();

  switch (operateType) {
    case NodeOperateType.CREATE:
      trace(...componentName, 'createNode', Date.now(), nodes);
      Native.hippyDocument.createNode(rootViewId, nodes);
      break;
    case NodeOperateType.DELETE:
      trace(...componentName, 'deleteNode', Date.now(), nodes);
      if (Native.isAndroid()) {
        Native.hippyDocument.deleteNode(rootViewId, nodes);
      } else {
        nodes.forEach((node) => {
          Native.hippyDocument.deleteNode(rootViewId, [node]);
        });
      }
      break;
    case NodeOperateType.UPDATE:
      trace(...componentName, 'updateNode', Date.now(), nodes);
      if (Native.isAndroid()) {
        Native.hippyDocument.updateNode(rootViewId, nodes);
      } else {
        nodes.forEach((node) => {
          Native.hippyDocument.updateNode(rootViewId, [node]);
        });
      }
      break;
  }
}

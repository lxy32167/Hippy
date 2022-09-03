import { createApp, type NativeNode, NodeOperateType, renderToNative } from '@hippy/vue-next-simple';

// 创建APP
createApp({
  appName: 'Demo',
}).then(({ rootViewId }) => {
  // 初始化完成，插入节点
  const insertNodes: Array<NativeNode> = [
    {
      id: 1,
      pId: rootViewId,
      index: 0,
      name: 'Text',
      props: {
        value: 'Hello1',
      },
    },
    {
      id: 2,
      pId: rootViewId,
      index: 1,
      name: 'Text',
      props: {
        value: 'Hello2',
      },
    },
    {
      id: 3,
      pId: rootViewId,
      index: 2,
      name: 'Text',
      props: {
        value: 'Hello3',
      },
    },
  ];
  // 插入节点
  renderToNative(insertNodes, NodeOperateType.CREATE);
});

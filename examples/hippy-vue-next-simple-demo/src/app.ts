import { createApp, type NativeNode, NodeOperateType, renderToNative } from '@hippy/vue-next-simple';

// 创建APP
createApp({
  appName: 'Demo',
}).then(({ rootViewId, superProps }) => {
  console.log('received: ', rootViewId, superProps);
  const nativeNodeOne = {
    id: 1,
    pId: rootViewId,
    index: 0,
    name: 'Text',
    props: {
      text: 'Hello1',
      marginTop: 100,
    },
  };
  const nativeNodeTwo = {
    id: 2,
    pId: rootViewId,
    index: 1,
    name: 'Text',
    props: {
      text: 'Hello2',
    },
  };
  const nativeNodeThree = {
    id: 3,
    pId: rootViewId,
    index: 2,
    name: 'Text',
    props: {
      text: 'Hello3',
    },
  };
  // 初始化完成，插入节点
  const insertNodes: Array<NativeNode> = [
    nativeNodeOne,
    nativeNodeTwo,
    nativeNodeThree,
  ];
  // 插入节点
  renderToNative(insertNodes, NodeOperateType.CREATE);
});

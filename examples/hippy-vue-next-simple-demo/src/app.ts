import { createApp, type NativeNode, NodeOperateType, renderToNative } from '@hippy/vue-next-simple';

// 创建APP
createApp({
  appName: 'Demo',
}).then(({ rootViewId }) => {
  const nativeNodeOne = {
    id: 1,
    pId: rootViewId,
    index: 0,
    name: 'Text',
    props: {
      text: 'Hello1',
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

  setTimeout(() => {
    // 更新节点
    nativeNodeThree.props.text = 'HelloWorld3';
    renderToNative([nativeNodeThree], NodeOperateType.UPDATE);

    setTimeout(() => {
      // 删除节点
      renderToNative([nativeNodeThree], NodeOperateType.DELETE);
    }, 5000);
  }, 5000);
});

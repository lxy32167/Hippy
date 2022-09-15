import { createApp, HippyDocument } from '@hippy/vue-next-simple';

// 创建APP
createApp({
  appName: 'Demo',
}).then(({ rootViewId, superProps }) => {
  console.log('received: ', rootViewId, superProps);
  // const nativeNodeOne = {
  //   id: 1,
  //   pId: rootViewId,
  //   index: 0,
  //   name: 'Text',
  //   props: {
  //     text: 'Hello1',
  //   },
  // };
  // const nativeNodeTwo = {
  //   id: 2,
  //   pId: rootViewId,
  //   index: 1,
  //   name: 'Text',
  //   props: {
  //     text: 'Hello2',
  //   },
  // };
  // const nativeNodeThree = {
  //   id: 3,
  //   pId: rootViewId,
  //   index: 2,
  //   name: 'Text',
  //   props: {
  //     text: 'Hello3',
  //   },
  // };
  // // 初始化完成，插入节点
  // const insertNodes: Array<NativeNode> = [
  //   nativeNodeOne,
  //   nativeNodeTwo,
  //   nativeNodeThree,
  // ];
  // 插入节点
  // renderToNative(insertNodes, NodeOperateType.CREATE);

  // setTimeout(() => {
  //   // 更新节点
  //   nativeNodeThree.props.text = 'HelloWorld3';
  //   renderToNative([nativeNodeThree], NodeOperateType.UPDATE);
  //
  //   setTimeout(() => {
  //     // 删除节点
  //     renderToNative([nativeNodeThree], NodeOperateType.DELETE);
  //   }, 5000);
  // }, 5000);

  const root = HippyDocument.createElement('span');
  root.setAttribute('text', 'Hello1');
  root.setAttribute('marginTop', 100);

  const childNodeOne = HippyDocument.createElement('span');
  childNodeOne.setAttribute('text', 'Hello2');

  const childNodeTwo = HippyDocument.createElement('span');
  childNodeTwo.setAttribute('text', 'Hello3');

  root.appendChild(childNodeOne);
  root.appendChild(childNodeTwo);

  setTimeout(() => {
    childNodeTwo.setAttribute('text', 'World!');

    setTimeout(() => {
      root.removeChild(childNodeOne);
    }, 5000);
  }, 5000);
});

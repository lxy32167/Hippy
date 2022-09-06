import {
  createApp,
  // type NativeNode,
  // NodeOperateType,
  // renderToNative,
  // HippyDocument,
  // HippyElement,
  type HippyApp,
} from '@hippy/vue-next-simple';
import App from './app.vue';

// 创建APP
const app: HippyApp = createApp(App, {
  appName: 'Demo',
});

app.$start().then(() => {
  app.mount('root');
});

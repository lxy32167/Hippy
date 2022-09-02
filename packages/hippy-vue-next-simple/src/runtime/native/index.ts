/**
 * 提供全局 API
 */
const {
  // device info
  device: {
    platform: {
      OS: platform,
    },
  },
  // hippy document
  document: hippyDocument,
  // hippy 注册
  register: hippyRegister,
} = global.Hippy;

export const Native = {
  hippyDocument,
  hippyRegister,
  platform,
  isIOS: () => platform === 'ios',
  isAndroid: () => platform === 'android',
};

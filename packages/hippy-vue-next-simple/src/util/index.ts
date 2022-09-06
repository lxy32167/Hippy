import { capitalize } from '@vue/shared';

let rootViewId = -1;

export function setRootViewId(viewId: number) {
  rootViewId = viewId;
}

export function getRootViewId(): number {
  return rootViewId;
}

export function trace(...args) {
  console.log(...args);
}

export function warn(...args) {
  console.warn(...args);
}

/**
 * Get the standard event name, starting with on
 *
 * @param name - original event name
 */
export function getNormalizeEventName(name: string): string {
  return `on${capitalize(name)}`;
}

// 根节点id
export const DEFAULT_ROOT_ID = 1;
let uniqueId = 0;
export function generateUniqueId(): number {
  uniqueId += 1;
  // 模10为0的id是native自己使用的
  if (uniqueId % 10 === 0) {
    uniqueId += 1;
  }

  return uniqueId;
}

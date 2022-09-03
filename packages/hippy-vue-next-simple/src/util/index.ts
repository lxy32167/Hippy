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

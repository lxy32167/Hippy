import { isOn } from '@vue/shared';
// import { type VNode, ComponentInternalInstance } from '@vue/runtime-core';
// import { HippyElement } from './runtime/element/hippy-element';
// import { HippyNode } from './runtime/node/hippy-node';

function parseName(name) {
  const str = name.slice(2);
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
}

export function patchProp(
  el: any,
  key: string,
  prevValue: any,
  nextValue: any,
  // isSVG: boolean,
  // prevChildren: VNode<HippyNode, HippyElement>[] | undefined,
  // parentComponent: ComponentInternalInstance | null,
): void {
  if (isOn(key)) {
    const eventName = parseName(key);

    if (nextValue) {
      el.addEventListener(eventName, nextValue);
    } else {
      el.removeEventListener(eventName, nextValue);
    }
  } else {
    if (prevValue !== nextValue) {
      el.setAttribute(key, nextValue);
    }
  }
}

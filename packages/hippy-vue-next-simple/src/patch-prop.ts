import { isOn } from '@vue/shared';
// import { type VNode, ComponentInternalInstance } from '@vue/runtime-core';
// import { HippyElement } from './runtime/element/hippy-element';
// import { HippyNode } from './runtime/node/hippy-node';


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
    if (nextValue) {
      el.addEventListener(key, nextValue);
    } else {
      el.removeEventListener(key, nextValue);
    }
  } else {
    if (prevValue !== nextValue) {
      el.setAttribute(key, nextValue);
    }
  }
}

import { HippyDocument } from './runtime/document/hippy-document';
import { HippyNode } from './runtime/node/hippy-node';

function insert(el: HippyNode, parent: HippyNode, anchor: HippyNode | null): void {
  parent.insertBefore(el, anchor);
}

function remove(el: HippyNode): void {
  const { parentNode } = el;
  if (parentNode) {
    parentNode?.removeChild(el);
  }
}

function createElement(type: string) {
  return HippyDocument.createElement(type);
}

function createText(text: string) {
  return HippyDocument.createElement(text);
}

function createComment(text: string) {
  return HippyDocument.createElement(text);
}

function setText(el, text) {
  el.setAttribute('text', text);
}

function setElementText(el, text) {
  el.setAttribute('text', text);
}

function parentNode(node: HippyNode): HippyNode | null {
  return node.parentNode;
}

function nextSibling(node: HippyNode): HippyNode | null {
  return node.nextSibling;
}


export const nodeOps = {
  insert,
  remove,
  createText,
  createElement,
  createComment,
  setText,
  setElementText,
  parentNode,
  nextSibling,
};

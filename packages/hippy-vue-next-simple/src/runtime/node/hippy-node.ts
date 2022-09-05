import { type NativeNode, NodeOperateType } from '../../index';
import { DEFAULT_ROOT_ID, generateUniqueId, getRootViewId } from '../../util';
import { renderToNative } from '../render';

export enum NodeType {
  ElementNode = 1,
  TextNode,
  CommentNode,
  DocumentNode,
}

export class HippyNode {
  /**
   * 获取节点唯一 id
   *
   * @private
   */
  private static getUniqueNodeId(): number {
    return generateUniqueId();
  }

  public nodeId: number;
  public childNodes: Array<HippyNode> = [];
  public prevSibling: HippyNode | null = null;
  public nextSibling: HippyNode | null = null;
  public parentNode: HippyNode | null = null;
  public nodeType: NodeType;

  // 节点是否已经插入 native
  public isMounted = false;

  // 节点是否需要插入 native，比如评论节点无需插入
  public isNeedInsertToNative: boolean;

  constructor(nodeType: NodeType) {
    this.nodeType = nodeType;

    this.nodeId = HippyNode.getUniqueNodeId();

    this.isNeedInsertToNative = nodeType === NodeType.ElementNode;
  }

  public get firstChild(): HippyNode | null {
    return this.childNodes.length ? this.childNodes[0] : null;
  }

  public get lastChild(): HippyNode | null {
    const len = this.childNodes.length;

    return len ? this.childNodes[len - 1] : null;
  }

  public get index(): number {
    let index = 0;

    if (this.parentNode) {
      const needInsertNodes = this.parentNode.childNodes.filter(node => node.isNeedInsertToNative);

      index = needInsertNodes.indexOf(this);
    }

    return index;
  }

  public appendChild(child: HippyNode) {
    if (child.parentNode !== null && child.parentNode !== this) {
      // 如果节点已有父节点，则先从原父节点中移除子节点
      child.parentNode.removeChild(child);
    }

    if (child.isMounted) {
      // 如果节点已经插入了终端节点，则先进行移除
      this.removeChild(child);
    }

    if (this.lastChild) {
      child.prevSibling = this.lastChild;
      this.lastChild.nextSibling = child;
    }

    child.parentNode = this;
    this.childNodes.push(child);

    this.insertNativeNode(child);
  }

  public removeChild(child) {
    if (!child.parentNode) {
      throw new Error('remove child should have parent');
    }

    if (child.parentNode !== this) {
      return child.parentNode.removeChild(child);
    }

    if (child.prevSibling) {
      child.prevSibling.nextSibling = child.nextSibling;
    }

    if (child.nextSibling) {
      child.nextSibling.prevSibling = child.prevSibling;
    }

    child.nextSibling = null;
    child.prevSibling = null;

    const index = this.childNodes.indexOf(child);

    if (index >= 0) {
      // 移除子节点
      this.childNodes.splice(index, 1);
    }

    // 更新 native 节点
    this.removeNativeNode(child);
  }

  public insertBefore(child: HippyNode, anchor: HippyNode | null): void {
    if (anchor === null) {
      this.appendChild(child);
      return;
    }

    if (child.parentNode !== null && child.parentNode !== this) {
      throw new Error('can not insert child, because child node has a diffrent parent');
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let parentNode: HippyNode = this;
    if (anchor.parentNode !== parentNode) {
      // 决定要插入的父节点
      parentNode = anchor.parentNode as HippyNode;
    }

    const index = parentNode.childNodes.indexOf(anchor);
    child.parentNode = parentNode;
    child.nextSibling = anchor;

    if (anchor.prevSibling) {
      anchor.prevSibling.nextSibling = child;
    }
    anchor.prevSibling = child;

    // 插入子节点
    this.childNodes.splice(index, 0, child);
    this.insertNativeNode(child);
  }

  public eachNode(callback: Function) {
    if (callback) {
      callback(this);

      this.childNodes.forEach((childNode) => {
        callback(childNode);
      });
    }
  }

  public convertToNativeNodes(isIncludeChild: boolean, extraAttributes?: Partial<NativeNode>): Array<NativeNode> {
    if (!this.isNeedInsertToNative) {
      return [];
    }

    if (isIncludeChild) {
      const nativeNodes: Array<NativeNode> = [];
      let nativeChildNodes: Array<NativeNode> = [];
      this.eachNode((targetNode) => {
        nativeChildNodes = targetNode.convertToNativeNodes(false);

        // 子节点native nodes 插入
        if (nativeChildNodes.length) {
          nativeNodes.push(...nativeChildNodes);
        }
      });

      return nativeNodes;
    }

    const rootViewId = getRootViewId();
    const attributes = extraAttributes ?? {};

    return [{
      id: this.nodeId,
      pId: this.parentNode?.nodeId ?? rootViewId,
      index: this.index,
      ...attributes,
    }];
  }

  /**
   * 判断当前节点是否是根节点
   */
  public isRootNode(): boolean {
    return this.nodeId === DEFAULT_ROOT_ID;
  }

  /**
   * 插入 native 节点
   *
   * @param child
   */
  public insertNativeNode(child: HippyNode): void {
    if (!child.isNeedInsertToNative) {
      return;
    }

    // 如果根节点还没有上屏，则先从根节点开始上屏
    const renderRootNodeCondition = this.isRootNode() && !this.isMounted;
    // 否则子节点上屏
    const renderOtherNodeCondition = this.isMounted && !child.isMounted;

    if (renderRootNodeCondition || renderOtherNodeCondition) {
      const parentNode = renderRootNodeCondition ? this : child;

      renderToNative(parentNode.convertToNativeNodes(true), NodeOperateType.CREATE);

      // 上屏后将节点标记为已上屏
      parentNode.eachNode((node) => {
        if (!node.isMounted && node.isNeedInsertToNative) {
          node.isMounted = true;
        }
      });
    }
  }

  /**
   * 更新 native 节点
   *
   * @param isIncludeChild
   */
  public updateNativeNode(isIncludeChild): void {
    if (!this.isMounted) {
      return;
    }

    const nativeNodes = this.convertToNativeNodes(isIncludeChild);
    renderToNative(nativeNodes, NodeOperateType.UPDATE);
  }

  /**
   * 删除 native 节点
   *
   * @param child
   */
  public removeNativeNode(child: HippyNode): void {
    if (child.isMounted) {
      child.isMounted = false;
      renderToNative(child.convertToNativeNodes(false), NodeOperateType.DELETE);
    }
  }
}

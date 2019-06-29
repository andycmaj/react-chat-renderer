import propsEqual from './utils/propsEqual';
import { createInstance } from './components';

const emptyObject = {};

// https://github.com/mhink/react-ionize/blob/master/src/IonizeHostConfig.js is a well
// documented hostConfig and a good reference impl

export default {
  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    return createInstance({ type, props }, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance) {
    return text;
  },

  finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(element, type, oldProps, newProps) {
    return !propsEqual(oldProps, newProps);
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(element) {
    // Noop
  },

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  /*
  If the function returns true, the text would be created inside the host element and no new text element would be created separately.
  If this returned true, the next call would be to createInstance for the current element and traversal would stop at this node (children of this element wont be traversed).
  If it returns false, getChildHostContext and shouldSetTextContent will be called on the child elements and it will continue till shouldSetTextContent returns true or if the recursion reaches the last tree endpoint which usually is a text node. When it reaches the last leaf text node it will call createTextInstance
  */
  shouldSetTextContent(type, props) {
    const textNodeTypes = [
      'TEXT',
      'PLAIN_TEXT',
      // 'MARKDOWN_TEXT',
      'BUTTON_ELEMENT',
    ];
    return textNodeTypes.includes(type);
  },

  now: Date.now,

  useSyncScheduling: true,

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  appendChildToContainer(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.appendChildBefore(child, beforeChild);
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.update(newText);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.update(newProps);
  },
};

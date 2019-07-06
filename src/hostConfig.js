import propsEqual from './utils/propsEqual';
import { createInstance } from './components';
import { Map } from 'immutable';

const emptyObject = {};

// https://github.com/mhink/react-ionize/blob/master/src/IonizeHostConfig.js is a well
// documented hostConfig and a good reference impl

export default {
  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else if (Map.isMap(parentInstance)) {
      // if (Array.isArray(children)) {
      //   children.forEach(child => {
      //     instance = instance.mergeDeep(child.render());
      //   });
      // } else if (children) {
      parentInstance = parentInstance.mergeDeep(child.render());
      // }
    }
  },

  /*
  This is where react-reconciler wants to create an instance of UI element
  in terms of the target. Since our target here is the DOM, we will create
  document.createElement and type is the argument that contains the type
  string like div or img or h1 etc. [Update 1: The initial values of
    domElement attributes can be set in this function from the newProps
    argument ]
  */
  createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    return createInstance({ type, newProps }, rootContainerInstance);
  },

  /*
  This function is used to create separate text nodes if the target allows
  only creating text in separate text nodes.
  */
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

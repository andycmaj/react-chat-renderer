import { Map } from 'immutable';

export default class Root {
  constructor() {
    this.instance = new Map();
  }

  get name() {
    return 'Root';
  }

  appendChild(child) {
    console.log('root.appendChild', child);

    this.instance = this.instance.mergeDeep(child.render());
  }

  insertBefore(child) {
    console.log('root.insertBefore', child);
  }

  removeChild(child) {
    console.log('root.removeChild', child);
  }

  updateTree() {
    console.log('root.updateTree');
  }

  render() {
    return this.instance.toJS();
  }
}

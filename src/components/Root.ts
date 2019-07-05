import { Map } from 'immutable';

export default class Root {
  constructor() {
    this.instance = new Map();
  }

  get name() {
    return 'Root';
  }

  appendChild(child) {
    this.instance = this.instance.mergeDeep(child.render());
  }

  insertBefore(child) {}

  removeChild(child) {}

  render() {
    return this.instance.toJS();
  }
}

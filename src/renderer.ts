import Reconciler from 'react-reconciler';
import hostConfig from './hostConfig';
import { createInstance } from './components';

const reconciler = Reconciler(hostConfig);

const SlackRenderer = {
  render(element /*, container, callback */) {
    // element: This is the react element for Message component
    // renderDom: This is the host root element to which the rendered app will be attached.
    //            in our case, this is empty since we'll be rendering directly to JSON.
    // callback: if specified will be called after render is done.

    const root = createInstance({ type: 'ROOT' });
    const container = reconciler.createContainer(root);

    reconciler.updateContainer(element, container, null);

    return root.render();
  },
};

export default SlackRenderer;

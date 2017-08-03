import component from '../../src/index';
import MyChildComponentLogic from './MyChildComponent';
import MyChildComponentTemplate from './MyChildComponent.jsx';

export default component({
  logic: MyChildComponentLogic,
  template: MyChildComponentTemplate,
});

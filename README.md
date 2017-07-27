# recomponent
[![build status](https://img.shields.io/travis/jeescu/recomponent/master.svg?style=flat-square)](https://travis-ci.org/reactjs/recomponent)
[![bitHound](https://img.shields.io/bithound/code/github/jeescu/recomponent.svg?style=flat-square)](https://www.bithound.io/github/jeescu/recomponent)
[![npm downloads](https://img.shields.io/npm/dm/recomponent.svg?style=flat-square)](https://www.npmjs.com/package/recomponent)
[![npm version](https://img.shields.io/npm/v/recomponent.svg?style=flat-square)](https://www.npmjs.com/package/recomponent)

> Writing react components redefined.

**recomponent** separates component view and logic while preserving its context. It creates a new way of structuring the components and allows us to keep our component clean and layered.

### Installation

```bash
npm install --save recomponent
```

## Usage

Create an `index.js` file under your component folder. Let's try to separate the concerns. Import your logic, view and css into this file and wrap them using `component.`

### Example

```js
import component from 'recomponent';
import MyComponentLogic from './MyComponentLogic';
import MyComponentTemplate from './MyComponentTemplate';
import './MyComponentStyles.css';

export default component({
  logic: MyComponentLogic,
  template: MyComponentTemplate,
  styles: {}
});
```

## Component
Wraps your logic, view, store and styles in a single whole component.

#### `component({ ... })`
```
/**
 * @params {object} - { logic, template, store, styles }
 *
 * @paramsKeys logic {component} optional - class-based component (wc extends `component`)  
 * @paramsKeys template {function} required - react view that can be rendered.
 * @paramsKeys store {object} optional - initial store
 * @paramsKeys styles {object} optional - styles to use on view
 */
 component({ logic, template, store, styles })
```

### Store
**recomponent** provides optional store from your component. This store is just like a state of your component. The reason why it's separated aside from using component's state itself, because we might likely to have our own stored data that has its own purpose. 

Use this as custom store for your specific component. Pass the store reference via `prop` to use on child components.

You can use it by adding `store` in component declaration:
```js
export default component({
  ...
  store: { title: 'My Store' }
})
```

#### `this.store`
Store values from the `component` it was defined.

#### `this.setStore({ key: value })`
Update store and forces the component to update.

## Structure
By using the library, we will end up restructuring our component in different way. If our component is *class-based*, the logic and view (`render`) is separated. Thus, it's even more clean than before.
```
├── MyComponent          # Your component.
│   ├── index.js         # Main entry point. You can do `recomponent` init here.
│   ├── MyComponent.js   # Your logic. You can also do `recomponent` here.
│   ├── MyComponent.jsx  # Your template. File ext. is optional (change the filename if using `.js`)
│   └── MyComponent.css  # Your css
```

### Rules
1. If your component is *class-based*, you can remove your `render` method in your logic. Also, there is no point on using **recomponent** on dumb components. But if you really like to, you can still declare it without the `logic`. 
2. Heard about `arrow functions` are already bound to its scope? but we want our react templates to still access it's own context (`this`) like we normally do. Yes, I want you to use `normal function`
  ```js
  export default function (props) { // please do
    // this - you'll get everything from the logic
    // props - ah normal props, but you can get it also from the context.
    return (<div></div>)
  };
  ```

### Maintainer
[John Edward Escuyos](https://github.com/jeescu)

### License

MIT


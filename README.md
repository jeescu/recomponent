# Re-Component

Re-Component separates component view and logic while preserving its context. It creates a new way of structuring our components and allows us to keep our component clean and layered.

### Installation

```
npm install --save re-component
```

### Usage

Let's try to separate the concerns. Mainly we have this logic and view.

#### `MyComponent/index.js`

```
import component from 're-component';
import MyComponentLogic from './MyComponentLogic';
import MyComponentTemplate from './MyComponentTemplate';
import './MyComponentStyles.css';

export default component({
  logic: MyComponentLogic,
  template: MyComponentTemplate,
  styles: MyComponentCustomStyles
});
```

#### `MyComponent/MyComponentLogic.js`

    import { Component } from 'react';

    class MyComponentLogic extends Component {
      constructor(props) {
        super(props);
      }

      // `render()` method is not necessary, we can put render view to a separate file.
    }

#### `MyComponent/MyComponentTemplate.js`

```
import React from 'react';

// add your view helpers here.

export default function (props) { // Your component view
  return (<div></div>)
};
```

### Rules on creating each files

Not really. But it's simple.  
1. You can remove your `render` method in your logic.  
2. Heard about `arrow functions` are already bound to its scope? but we want our react templates to still access it's own context \(`this`\) like we normally do. Yes, I want you to use `normal function`

```
    export default function (props) { // please do
      // this - you'll get everything from the logic
      // props - ah normal props, but you can get it also from the context.
      return (<div></div>)
    };
```

This idea has issues. Let me know what you think.


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
  styles: {}
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




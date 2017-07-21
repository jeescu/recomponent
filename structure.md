### Component Restructure

Create a folder of the component and . and \`index.js\` as entry point of your whole component.

```
├── MyClassComponent            # Your awesome component.
│   ├── index.js                # Entry point  for your component as a whole
│   ├── MyComponentLogic.js     # Your logic here.
│   ├── MyComponentTemplate.js  # Your template here.
│   └── MyComponentStyles.css   # Your css
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




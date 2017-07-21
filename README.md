# Re-Component

Re-Component separates component view and logic while preserving its context. It creates a new way of structuring our components and allows us to keep our component clean and layered.

### Installation

```bash
npm install --save re-component
```

### Usage

Create an `index.js` file under your component folder. Let's try to separate the concerns. Import your logic, view and css into this file and wrap them using `recomponent.`

#### Example

```js
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

#### Documentation

* \[Structure\]\(https://jeescu.gitbooks.io/re-component/content/structure.html\)
* \[Component\]\(https://jeescu.gitbooks.io/re-component/content/component.html\)

#### License

MIT


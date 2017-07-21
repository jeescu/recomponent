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




import React from 'react';
import MyChildComponent from '../MyChildComponent';

export default function (props = {}) {
  const hasContext = this;
  if (hasContext) this.renderCount += 1;
  if (props.styles) this.propStyles = props.styles;

  return (<div>
    <h3>Hello Template</h3>
    <p id="pc-sub-heading">{hasContext && this.state.title}</p>
    <span>{props.elementProp}</span>
    <button id="pc-set-store" onClick={() => this.setStore({ user: { name: 'Jeff' } })} />

    <MyChildComponent />
  </div>);
}

import React from 'react';

export default function (props = {}) {
  const hasContext = this;
  if (hasContext) this.renderCount += 1;
  if (props.styles) this.propStyles = props.styles;

  return (<div>
    <h4>Hello Child Template</h4>
    <p id="cc-sub-heading">{hasContext && this.store && this.store.name}</p>
    <button id="cc-set-store" onClick={() => this.setStore({ name: 'Child Update' })} />
    <button id="cc-set-store-patch" onClick={() => this.setStore({ unknown: 'Child Unknown' })} />
  </div>);
};
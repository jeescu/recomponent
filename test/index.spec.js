import React, { Component } from 'react';
import { mount } from 'enzyme';
import component from '../src';

class MyComponentLogic extends Component {
  constructor(props) {
    super(props);
    this.status = 'INIT';
    this.state = {
      title: 'recomponent',
    };

    this.renderCount = 0;
  }

  componentWillMount() {
    this.status = 'WILL_MOUNT';
  }

  componentDidMount() {
    this.status = 'MOUNTED';
  }
}

/* eslint-disable react/prop-types */
const MyComponentTemplate = function (props = {}) {
  const hasContext = this;
  if (hasContext) this.renderCount += 1;
  if (props.styles) this.propStyles = props.styles;

  return (<div>
    <h3>Hello Template</h3>
    <p>{hasContext && this.state.title}</p>
    <span>{props.elementProp}</span>
    <button id="set-store" onClick={() => this.setStore({ user: { name: 'Jeff' } })} />
  </div>);
};

const MyStyles = {
  height: '15px',
};

const MyStore = {
  user: { name: 'John' },
};

describe('re-component', () => {
  it('should combined logic and template', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual('Hello Template');
    expect(wrapper.getNode().status).toEqual('MOUNTED');
  });

  it('should still re-component when logic is undefined', () => {
    const ReComponent = component({
      template: MyComponentTemplate,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual('Hello Template');
  });

  it('should have logic context preserved', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual('recomponent');
  });

  it('should throw error for undefined template', () => {
    expect(() => component({ logic: MyComponentLogic }))
      .toThrow(/template is not defined/);
  });

  it('should have access to declared store from the context', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      store: MyStore,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.getNode().store).toEqual({ user: { name: 'John' } });
  });

  it('should update store using `this.setStore()`', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      store: MyStore,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.getNode().store).toEqual({ user: { name: 'John' } });
    expect(wrapper.getNode().setStore).toBeDefined();
    // set store
    wrapper.find('#set-store').simulate('click');
    expect(wrapper.getNode().store).toEqual({ user: { name: 'Jeff' } });
  });

  it('should access styles as optional prop from render', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      styles: MyStyles,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.getNode().propStyles).toBeDefined();
    expect(wrapper.getNode().propStyles).toEqual({ height: '15px' });
  });

  it('should re-render when store is updated', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      styles: MyStyles,
    });

    const wrapper = mount(<ReComponent />);
    expect(wrapper.getNode().renderCount).toEqual(1);

    wrapper.find('#set-store').simulate('click');
    expect(wrapper.getNode().renderCount).toEqual(2);
  });

  it('should pass props from element', () => {
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
    });

    const wrapper = mount(<ReComponent elementProp="Hello Component!" />);
    expect(wrapper.find('span').text()).toEqual('Hello Component!');
  });
});

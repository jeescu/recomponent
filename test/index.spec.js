import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import component from '../src';

import MyComponentLogic from './MyComponent/MyComponent';
import MyComponentTemplate from './MyComponent/MyComponent.jsx';

import MyChildComponent from './MyChildComponent/';

const MyStyles = {
  height: '15px',
};

const MyStore = {
  user: { name: 'John' },
};

const childContextTypes = {
  store: PropTypes.object,
  setStore: PropTypes.func,
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
    expect(wrapper.find('#pc-sub-heading').text()).toEqual('recomponent');
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
    wrapper.find('#pc-set-store').simulate('click');
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

    wrapper.find('#pc-set-store').simulate('click');
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

  it('should be able to access store from child component', () => {
    const store = { name: 'With Child' };
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      store,
    });

    const wrapper = mount(<ReComponent />, { options: { childContextTypes } });
    const childWrapper = wrapper.find(MyChildComponent);

    expect(wrapper.find('#cc-sub-heading').text()).toEqual('With Child');
    expect(childWrapper.getNode().store).toEqual(store);
    expect(typeof childWrapper.getNode().setStore).toBeDefined();
  });

  it('should update store when child component triggered store', () => {
    const store = { name: 'With Child' };
    const expectedStore = { name: 'Child Update' };
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      store,
    });

    const wrapper = mount(<ReComponent />, { options: { childContextTypes } });
    const childWrapper = wrapper.find(MyChildComponent);

    wrapper.find('#cc-set-store').simulate('click');
    expect(childWrapper.getNode().renderCount).toEqual(2);

    expect(wrapper.getNode().store).toEqual(expectedStore);
    expect(childWrapper.getNode().store).toEqual(expectedStore);
    expect(wrapper.find('#cc-sub-heading').text()).toEqual('Child Update');
  });

  it('should not patch new state in store when using setStore if key is not defined', () => {
    const store = { name: 'With Child' };
    const ReComponent = component({
      logic: MyComponentLogic,
      template: MyComponentTemplate,
      store,
    });

    const wrapper = mount(<ReComponent />, { options: { childContextTypes } });
    const childWrapper = wrapper.find(MyChildComponent);

    wrapper.find('#cc-set-store-patch').simulate('click');

    expect(wrapper.getNode().store).toEqual(store);
    expect(wrapper.getNode().store.unknown).toBeFalsy();
    expect(childWrapper.getNode().store).toEqual(store);
  });
});

/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';

const storeContextTypes = {
  store: PropTypes.object,
  setStore: PropTypes.func,
};

function component({ logic, template, styles, store }) {
  if (!template) throw new Error('template is not defined');

  if (logic) {
    if (store) {
      // inject store
      logic.prototype.store = store;
      logic.prototype.setStore = (function (obj = {}) {
        Object.keys(obj).forEach((key) => {
          this.store[key] = obj[key];
          this.forceUpdate();
        });
      });
      // set store context for children
      logic.childContextTypes = storeContextTypes;
      logic.prototype.getChildContext = (function () {
        return {
          store: this.store,
          setStore: this.setStore.bind(this),
        };
      });
    } else {
      // class-based child expects store from context
      logic.contextTypes = storeContextTypes;
      // using react hook to inject store from context
      const selfWillMount = logic.prototype.componentWillMount;
      logic.prototype.componentWillMount = (function () {
        if (this.context.store) {
          this.store = this.context.store;
          this.setStore = this.context.setStore;
          if (selfWillMount) selfWillMount();
        }
      });
    }

    logic.prototype.render = (function () {
      return template.call(this,
        {
          ...this.props,
          ...{ styles },
        });
    });
  } else {
    // function-based child expects store from context
    template.contextTypes = storeContextTypes;
    return template;
  }

  return logic;
}

export default component;

/* eslint-disable no-param-reassign */
function component({ logic, template, styles, store = {} }) {
  if (!template) throw new Error('template is not defined');

  if (logic) {
    // 
    if (store) {
      logic.prototype.store = store;
      logic.prototype.setStore = (function (obj = {}) {
        Object.keys(obj).forEach((key) => {
          this.store[key] = obj[key];
          this.forceUpdate();
        });
      });
    }

    logic.prototype.render = (function () {
      return template.bind(this)({ ...this.props, ...styles });
    });
  } else {
    template.prototype.store = store;
    return template;
  }

  return logic;
}

export default component;

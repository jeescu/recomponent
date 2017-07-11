/* eslint-disable no-param-reassign */
function component({ logic = class { }, template = null, styles = {} }) {
  const Logic = logic;
  const Template = template;

  Logic.prototype.render = (function () {
    return Template.bind(this)({ ...this.props, ...styles });
  });
  return Logic;
}

export default component;

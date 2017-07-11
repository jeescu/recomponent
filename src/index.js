/* eslint-disable no-param-reassign */
function component({ logic, template, styles }) {
  if (!logic) throw new Error('logic is not defined');
  if (!template) throw new Error('template is not defined');

  logic.prototype.render = (function () {
    return template.bind(this)({ ...this.props, ...styles });
  });
  return logic;
}

export default component;

import { Component } from 'react';

export default class MyChildComponentLogic extends Component {
  constructor(props) {
    super(props);
    this.status = 'INIT';
    this.state = {
      title: 'child recomponent',
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

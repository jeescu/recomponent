import { Component } from 'react';

export default class MyComponentLogic extends Component {
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

import React, { Component } from 'react';
import { connect } from 'dva';
import App from '../../containers/App.js';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // 渲染(展示数据)
  render() {
    // js域

    return (
      // xml域
      <App>
        <p>hello index</p>
      </App>
    );
  }
}

export default Index;
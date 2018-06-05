import React, { Component } from 'react';
import { connect } from 'dva';
import Step2_upunit from './Step2_upunit';

class Step2 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 渲染(展示数据)
  render() {

    return (
      <div className="Step2">

        <Step2_upunit album="view" title="外观"/>
        <Step2_upunit album="inner" title="内饰"/>
        <Step2_upunit album="engine" title="结构及发动机"/>
        <Step2_upunit album="more" title="更多细节"/>

      </div>
    );
  }
}

export default connect()(Step2);

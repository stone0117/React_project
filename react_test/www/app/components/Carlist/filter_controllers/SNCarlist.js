import React, { Component } from 'react';
import { connect } from "dva";

import { DatePicker,Row,Col } from 'antd';

class SNCarlist extends Component {

  constructor() {
    super();
    this.state = {};
  }

  // 组件将要安装(洗数据)
  componentWillMount() {}

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // component.forceUpdate(callback)
  // 通常你应该尽量避免使用 forceUpdate() ，并且 render() 中的 this.props 和 this.state 应该是只读的。
  // 是否应该更新组件
  shouldComponentUpdate(currentProps, currentState) {
    let previousProps = this.props;
    let previousState = this.state;

    for ( let key in currentProps ) {
      if ( Object.prototype.toString.call(currentProps[ key ]) === '[object Function]' ) {
        if ( previousProps[ key ].toString() !== currentProps[ key ].toString() ) { return true; }
      } else {
        if ( previousProps[ key ] !== currentProps[ key ] ) { return true; }
      }
    }

    for ( let key in currentState ) {
      if ( Object.prototype.toString.call(currentState[ key ]) === '[object Function]' ) {
        if ( previousState[ key ].toString() !== currentState[ key ].toString() ) { return true; }
      } else {
        if ( previousState[ key ] !== currentState[ key ] ) { return true; }
      }
    }

    return false;
  }

  // 组件将要更新
  componentWillUpdate(currentProps, currentState) {
    let previousProps = this.props;
    let previousState = this.state;
  }

  //渲染(展示数据)

  render() {
    // js域

    return (
      // xml域
      <div>
        <Row>
          <Col span={12} style={{
            'height'         : '150px',
            'backgroundColor': '#FFE4B5',
            'boxShadow'      : '0 0 0 1px #000 inset',
            'textAlign'      : 'center',
            'lineHeight'     : '150px',
            'fontSize'       : '44px',
          }}>A</Col>
          <Col span={12} style={{
            'height'         : '150px',
            'backgroundColor': '#5990ff',
            'boxShadow'      : '0 0 0 1px #000 inset',
            'textAlign'      : 'center',
            'lineHeight'     : '150px',
            'fontSize'       : '44px',
          }}>B</Col>
        </Row>
        <hr/>
        <hr/>
        <hr/>
        <hr/>
        <hr/>
        <hr/>
        <DatePicker/>
        <hr/>
        <hr/>
        <hr/>
        <p>hello sNCarlist</p>
      </div>
    );
  }

  // 组件完成更新
  componentDidUpdate(previousProps, previousState) {
    let currentProps = this.props;
    let currentState = this.state;
  }

  // 组件安装完成(可以使用html中引入的jQuery)
  componentDidMount() {}

  // 组件将要卸载
  componentWillUnmount() {}
}

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as TodoListAction from '../action/TodoListAction';
export default connect(
  ({ sncarlist }) => {
    console.log(sncarlist);
    return {};
  },
)(SNCarlist);
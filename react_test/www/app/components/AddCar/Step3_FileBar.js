import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';

class Step3_FileBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filename   : props.filename.split('#')[ 0 ],
      isRenameing: false,
    };
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // 渲染(展示数据)
  render() {
    // js域

    let { dispatch, filename, realpath, type } = this.props;

    return (
      // xml域
      <div className="Step3_FileBar">
        <Row gutter={16}>
          <Col span={24}>
            <img className="ssicon" src={type === 'jpg' ? `/uploads/${realpath}` : `/images/${type}.jpg`} alt=""/>
            {
              // filename.split('#')[ 0 ]
              this.state.isRenameing
                ? <input type="text" value={this.state.filename} onChange={ event => this.setState({ filename: event.target.value }) }/>
                : <span>{filename.split('#')[ 0 ]}</span>
            }
            {/*重命名*/}
            <a href="javascript:void(0)" onClick={(event) => {

              if ( this.state.isRenameing ) {
                dispatch({ 'type': 'addcar/changeStep3Rename', filename: this.state.filename, realpath });
              }

              this.setState({ isRenameing: !this.state.isRenameing });

            }}>{this.state.isRenameing ? '保存' : '重命名'}</a>

            {/*删除*/}
            <a href="javascript:void(0)" onClick={(event) => {
              dispatch({ 'type': 'addcar/changeStep3Delete', filename: this.state.filename, realpath });
            }}>删除</a>
          </Col>

          {/*<Col span={21}>*/}
          {/*<div style={{*/}
          {/*width             : '100px',*/}
          {/*height            : '100px',*/}
          {/*backgroundImage   : type === 'jpg' ? `url(/uploads/${realpath})` : `url(/images/${type}.jpg)`,*/}
          {/*backgroundPosition: 'center top',*/}
          {/*backgroundSize    : 'cover',*/}
          {/*}}/>*/}
          {/*</Col>*/}
        </Row>

      </div>
    );
  }
}

export default connect()(Step3_FileBar);
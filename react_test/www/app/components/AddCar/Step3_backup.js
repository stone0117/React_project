import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Col, Row } from 'antd';

class Step3_backup extends Component {

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
      <div className="Step3" style={{ background: '#ECECEC', padding: '30px' }}>

        <h3>汽车必备资料文件</h3>

        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false} style={{ height: '160px', marginBottom: '10px' }}>卖家身份证照片国徽面</Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ height: '160px', marginBottom: '10px' }}>卖家身份证照片人像面</Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ height: '160px', marginBottom: '10px' }}>行驶本</Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false} style={{ height: '160px', marginBottom: '10px' }}>机动车登记证书内页</Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ height: '160px', marginBottom: '10px' }}>机动车登记证书</Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ height: '160px', marginBottom: '10px' }}>保险单</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Step3_backup);


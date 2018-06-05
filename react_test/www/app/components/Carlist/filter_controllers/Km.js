import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, Row, Col, Button } from 'antd';
class Km extends Component {

  constructor(props) {
    super(props);
    this.state = {
      km: props.filters.km.map(item => item / 10000),
    };
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
    this.setState({ km: currentProps.filters.km.map(item => item / 10000) });
  }

  // 渲染(展示数据)
  render() {
    // js域
    let { dispatch, filters } = this.props;
    let { km }                = this.state;
    return (
      // xml域
      <div className="km">
        <Row gutter={10}>
          <Col span="12">
            <Slider range min={0} max={100}
                    value={km.length === 0 ? [ 0, 100 ] : km}
                    onChange={value => this.setState({ "km": value })}
                    onAfterChange={value => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'km', 'value': value.map(item => item * 10000) })}/>
          </Col>

          <Col span="6">
            <Button onClick={event => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'km', 'value': [ 0, 100000 ] });
              this.setState({ "km": [ 0, 10 ] });
            }}>0到10万公里</Button>
          </Col>
          <Col span="6">
            <Button onClick={event => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'km', 'value': [ 100000, 200000 ] });
              this.setState({ "km": [ 10, 20 ] });
            }}>10到20万公里</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(Km);


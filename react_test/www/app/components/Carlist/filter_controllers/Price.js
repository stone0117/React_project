import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, Row, Col, Button } from 'antd';
class Price extends Component {

  constructor(props) {
    super(props);
    this.state = {
      price: props.filters.price,
    };
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;

    this.setState({ price: currentProps.filters.price });
  }

  // 渲染(展示数据)
  render() {
    // js域
    let { dispatch, filters } = this.props;
    let { price }             = this.state;
    return (
      // xml域
      <div className="price">
        <Row gutter={10}>
          <Col span="12">
            <Slider range min={0} max={100}
                    value={price.length === 0 ? [ 0, 100 ] : price}
                    onChange={value => this.setState({ "price": value })}
                    onAfterChange={value => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'price', value })}/>
          </Col>

          <Col span="3">
            <Button onClick={event => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'price', 'value': [ 0, 10 ] });
              this.setState({ "price": [ 0, 10 ] });
            }}>0到10万元</Button>
          </Col>
          <Col span="3">
            <Button onClick={event => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'price', 'value': [ 10, 20 ] });
              this.setState({ "price": [ 10, 20 ] });
            }}>10到20万元</Button>
          </Col>
          <Col span="3">
            <Button onClick={event => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'price', 'value': [ 20, 50 ] });
              this.setState({ "price": [ 20, 50 ] });
            }}>20到50万元</Button>
          </Col>
          <Col span="3">
            <Button onClick={event => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'price', 'value': [ 50, 100 ] });
              this.setState({ "price": [ 50, 100 ] });
            }}>50到100万元</Button>
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
)(Price);


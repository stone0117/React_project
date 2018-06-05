import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Buydate extends Component {

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
    let { dispatch, filters } = this.props;
    let { buydate }           = filters;

    const getValue = (year) => {

      let date     = new Date();
      let fullYear = date.getFullYear();
      let month    = date.getMonth();
      let day      = date.getDate();
      let value0   = Date.parse(new Date(fullYear - year, month, day).toString());
      let value1   = Date.parse(date.toString());
      return [ value0, value1 ];
    };

    return (
      // xml域
      <div className="buydate">
        <Row gutter={10}>
          <Col span="12">
            <RangePicker allowClear={false} value={buydate.length === 0 ? [] : [ moment(buydate[ 0 ]), moment(buydate[ 1 ]) ]} onChange={(date, dateString) => {
              dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'buydate', 'value': [ date[ 0 ].unix() * 1000, date[ 1 ].unix() * 1000 ] });
            }}/>
          </Col>
          <Col span="2"><Button onClick={event => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'buydate', 'value': getValue(1) })}>近1年的车</Button></Col>
          <Col span="2"><Button onClick={event => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'buydate', 'value': getValue(2) })}>近2年的车</Button></Col>
          <Col span="2"><Button onClick={event => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'buydate', 'value': getValue(3) })}>近3年的车</Button></Col>
          <Col span="3"><Button onClick={event => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'buydate', 'value': getValue(5) })}>近5年的车</Button></Col>
          <Col span="3"><Button onClick={event => dispatch({ 'type': 'carlist/changeFilter', 'propsname': 'buydate', 'value': getValue(10) })}>近10年的车</Button></Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(Buydate);
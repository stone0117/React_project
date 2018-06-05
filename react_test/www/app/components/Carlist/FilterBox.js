import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col } from "antd";
import Tags from "./filter_controllers/Tags.js";
import Fuxuankuang from "./filter_controllers/Fuxuankuang.js";
import Price from "./filter_controllers/Price.js";
import Km from "./filter_controllers/Km.js";
import Brand from "./filter_controllers/Brand.js";
import Series from './filter_controllers/Series';
import Buydate from './filter_controllers/Buydate';
import Xiala from './filter_controllers/Xiala';

class FilterBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nowseries: [],
    };
  }

  setNowseries(nowseries) {
    this.setState({ nowseries });
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
      <div className="carlist">
        <Row className='row1'>
          <Col span="3"> 品牌： </Col>
          <Col span="21"> <Brand setNowseries={this.setNowseries.bind(this)}/> </Col>
        </Row>
        <Row>
          <Col span="3"> 车系： </Col>
          <Col span="21"><Series nowseries={this.state.nowseries} setNowseries={this.setNowseries.bind(this)}/></Col>
        </Row>
        <Row>
          <Col span="3"> 类型： </Col>
          <Col span="21"> <Fuxuankuang options={[
            '经济轿车', '中档轿车', '高档轿车', '中型SUV', '跑车', '大型SUV', '面包车',
          ]} propsname="type"/> </Col>
        </Row>
        <Row>
          <Col span="3"> 颜色： </Col>
          <Col span="21"> <Fuxuankuang options={[ '白', '黑', '蓝', '灰', '红', '银灰', '橙', '银', '绿', '紫', '香槟', '黄', '咖啡' ]} propsname="color"/> </Col>
        </Row>

        <Row>
          <Col span="3"> 排放标准： </Col>
          <Col span="21"> <Fuxuankuang options={[ "国一", "国二", "国三", "国四", "国五" ]} propsname="environmental"/> </Col>
        </Row>

        <Row>
          <Col span="3"> 变速箱： </Col>
          <Col span="21"> <Fuxuankuang options={[  '手动挡', '手自一体', '自动挡' ]} propsname="gearbox"/> </Col>
        </Row>

        <Row>
          <Col span="3"> 排量： </Col>
          <Col span="21"> <Fuxuankuang options={[ "1.0L", "1.2L", "1.6L", "1.6T", "2.0L", "2.0T", "5.0L" ]} propsname="displacement"/> </Col>
        </Row>

        <Row>
          <Col span="3"> 燃料： </Col>
          <Col span="21"> <Fuxuankuang options={[ "纯电动", "油电混合", "汽油车", "柴油车" ]} propsname="fuel"/> </Col>
        </Row>

        <Row>
          <Col span="3"> 售价（万元）： </Col>
          <Col span="21"> <Price/></Col>
        </Row>

        <Row>
          <Col span="3"> 公里数（万公里）： </Col>
          <Col span="21"> <Km/></Col>
        </Row>

        <Row>
          <Col span="3"> 购买日期： </Col>
          <Col span="21"> <Buydate/> </Col>
        </Row>

        <Row className='row2'>
          <Col span="3"> 杂项： </Col>
          <Col span="21">
            <Row>
              <Col span="5"><Xiala chinese="是否上牌" options={[ '是', '否' ]} propsname="licence"/></Col>
              <Col span="5"><Xiala chinese="是否本地车" options={[ '是', '否' ]} propsname="locality"/></Col>
            </Row>
          </Col>
        </Row>

        <Row className="lastRow">
          <Col span="3"> 当前： </Col>
          <Col span="21"> <Tags/> </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(FilterBox);
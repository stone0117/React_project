import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider, Button } from 'antd';
import { Row, Col } from 'antd';
import { Modal } from 'antd';
import { Checkbox } from 'antd';
import moment from 'moment';
import MyModal from './MyModal';
import { push } from "react-router-redux";

const ButtonGroup = Button.Group;

class TableBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      cols   : [
        // "id",
        // "images",
        // "brand",
        // "series",
        "id",
        "images",
        "brand",
        "series",
        "color",
        "buydate",
        "displacement",
        "fuel",
      ],
    };
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  showModal() {
    this.setState({ visible: true });
  };

  hideModal() {
    this.setState({ visible: false });
  };

  setCols(temp) {
    this.state.cols = temp;
  };

  // 渲染(展示数据)
  render() {
    // js域

    let { dispatch, filters, cars, count, pageinfo, sortinfo } = this.props;
    let { visible, cols }                                      = this.state;

    const columns = [
      { title: '订单编号', dataIndex: 'id', key: 'id', sorter: true },
      {
        title    : '缩略图',
        dataIndex: 'images',
        key      : 'images',
        render(text, record, index){
          return <div>
            <img className="previewsmallpic" src={`/carimages_small/${record.id}/view/${record.images.view[ 0 ]}`} alt="" onClick={(event) => {
              dispatch(push(`/picshow/${record.id}`));
            }}/>
          </div>;
        },
      },
      { title: '品牌', dataIndex: 'brand', key: 'brand' },
      { title: '车系', dataIndex: 'series', key: 'series' },
      { title: '颜色', dataIndex: 'color', key: 'color' },
      {
        title    : '购买日期',
        dataIndex: 'buydate',
        key      : 'buydate',
        sorter   : true,
        render   : (text, record, index) => {
          return <span>{moment(text).format('YYYY年MM月DD日')}</span>;
        },
      },
      { title: '排放', dataIndex: 'displacement', key: 'displacement' },
      { title: '燃料', dataIndex: 'fuel', key: 'fuel' },
      { title: '价格(万元)', dataIndex: 'price', key: 'price', sorter: true },
      { title: '公里数', dataIndex: 'km', key: 'km', sorter: true },
      {
        title    : '是否上牌',
        dataIndex: 'licence',
        key      : 'licence',
        render(text, record, index){
          return record.licence ? <span>是</span> : <span>否</span>;
        },
      },
    ];

    let columns_dict = {};
    let dictionary   = {};
    columns.forEach((item, index) => {
      columns_dict[ item.key ] = item;
      dictionary[ item.key ]   = item.title;
    });

    return (
      // xml域
      <div className="tablebox">
        <Row>
          <Col span="6">
            共{count}辆车符合条件 当前{pageinfo.page} / {Math.ceil(count / pageinfo.pagesize)} 页
          </Col>

          <Col className="ButtonGroup" span="18">

            <Button className='ModalButton' type="primary" shape="circle" icon="setting" onClick={this.showModal.bind(this)}/>

            <Modal title="Modal" visible={visible} onOk={this.hideModal.bind(this)} onCancel={this.hideModal.bind(this)} okText="确认" cancelText="取消" destroyOnClose={true}>
              <MyModal cols={cols} setCols={this.setCols.bind(this)} dictionary={dictionary}/>
            </Modal>

            <ButtonGroup >
              <Button>列表视图</Button>
              <Button>网格视图</Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Table rowKey="id" columns={ cols.map(key => columns_dict[ key ]) } dataSource={cars} pagination={{
          current        : pageinfo.page,
          pageSize       : pageinfo.pagesize,
          total          : count,
          showSizeChanger: true,
          pageSizeOptions: [ '3', '5', '10', '20' ],
        }} onChange={(pagination, filters, sorter) => {

          console.log("触发回调函数", pagination, filters, sorter);

          dispatch({
            "type"         : "carlist/changePageOrSort",
            "page"         : pagination.current,
            "pagesize"     : pagination.pageSize,
            "sortby"       : sorter.columnKey,
            "sortdirection": sorter.order === "ascend" ? 1 : -1,
          });
        }}/>
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters : carlist.filters,
    cars    : carlist.cars,
    count   : carlist.count,
    pageinfo: carlist.pageinfo,
    sortinfo: carlist.sortinfo,
  }),
)(TableBox);
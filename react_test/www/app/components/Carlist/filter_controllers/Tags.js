import React, { Component } from 'react';
import { Tag } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class Tags extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dictionary = {
      brand        : "品牌",
      series       : "车系",
      type         : "车型",
      color        : "颜色",
      environmental: "排放标准",
      gearbox      : "变速箱",
      displacement : "排量",
      fuel         : "燃料",
      price        : "售价",
      km           : "公里数",
      buydate      : "购买日期",
      licence      : "是否上牌",
      locality     : "是否是本地车",
    };

    let { dispatch, propsname, filters, options } = this.props;

    return (
      <div>
        {
          Object.keys(filters).map(key => {

            if ( filters[ key ].length === 0 ) { return null; }

            switch ( key ) {
              case 'type':
              case 'color':
              case 'environmental':
              case 'gearbox':
              case 'displacement':
              case 'fuel':
                return (
                  <Tag key={key} closable onClose={event => {
                    event.preventDefault();
                    dispatch({ "type": "carlist/changeFilter", "propsname": key, "value": [] });
                  }}>
                    {dictionary[ key ]} ： {filters[ key ].join(" or ")}
                  </Tag>
                );
              case 'price':
                if ( filters.price[ 0 ] === 0 && filters.price[ 1 ] === 100 ) { return null; }

                return (
                  <Tag closable onClose={event => {
                    event.preventDefault();
                    dispatch({ "type": "carlist/changeFilter", "propsname": key, "value": [ 0, 100 ] });
                  }} key={key}>
                    {dictionary[ key ]} ： { filters[ key ].map(price => price + "万元").join(" 至 ") }
                  </Tag>
                );
              case 'km':
                if ( filters.km[ 0 ] === 0 && filters.km[ 1 ] === 1000000 ) { return null; }

                return (
                  <Tag closable onClose={event => {
                    event.preventDefault();
                    dispatch({ "type": "carlist/changeFilter", "propsname": key, "value": [ 0, 1000000 ] });
                  }} key={key}>
                    {dictionary[ key ]} ： { filters[ key ].map(km => km / 10000 + "万公里").join(" 至 ") }
                  </Tag>
                );
              case 'brand':
              case 'licence':
              case 'locality':
                return (
                  <Tag closable onClose={event => {
                    event.preventDefault();
                    dispatch({ "type": "carlist/changeFilter", "propsname": key, "value": '' });
                    // dispatch({ "type": "carlist/changeFilter", "propsname": 'series', "value": '' });
                  }} key={key}>
                    {dictionary[ key ]} ： { filters[ key ] }
                  </Tag>
                );
              case 'series':
                return (
                  <Tag closable onClose={event => {
                    event.preventDefault();
                    dispatch({ "type": "carlist/changeFilter", "propsname": key, "value": '' });
                  }} key={key}>
                    {dictionary[ key ]} ： { filters[ key ] }
                  </Tag>
                );
              case 'buydate':
                return (
                  <Tag closable onClose={event => {
                    event.preventDefault();
                    dispatch({ "type": "carlist/changeFilter", "propsname": key, "value": [] });
                  }} key={key}>
                    {dictionary[ key ]} ： { filters[ key ].map(date => moment(date).format('YYYY-MM-DD')).join(" 到 ")} </Tag>
                );
              default:
                return null;
            }
          })
        }
      </div>
    );
  }
}

export default connect(({ carlist }) => ({
  filters: carlist.filters,
}))(Tags);
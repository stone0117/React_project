import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import classnames from 'classnames';
const TabPane = Tabs.TabPane;
import { baseUrl, requestWithGET } from '../../../httpmanager/SNHTTPManager.js';

class Brand extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {},
    };

    let { dispatch, setNowseries } = props;
    requestWithGET(baseUrl + '/brandandseries').then(data => {
      // let newVar = Object.values(data)[ 0 ][ 0 ];
      // let value  = Object.values(newVar)[ 0 ];
      // setNowseries(value);
      this.setState({ options: data });
    });
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // 渲染(展示数据)
  render() {
    // js域

    let { dispatch, setNowseries, filters } = this.props;
    let { options }                         = this.state;

    function callback(key) {
      console.log(key);
      // let option = options[ key ][ 0 ];
      // let values = Object.values(option)[ 0 ];
      // setNowseries(values);
    }

    return (
      // xml域
      <div>
        <Tabs animated={false} onChange={callback} renderTabBar="" renderTabContent="">
          {
            Object.keys(options).map(key => {
              return (
                <TabPane tab={key} key={key}>
                  {
                    options[ key ].map((obj, index) => {
                      let brand  = Object.keys(obj)[ 0 ];
                      let series = Object.values(obj)[ 0 ];
                      return (
                        <em key={index} onClick={(event) => {
                          setNowseries(series);
                          dispatch({ 'type': 'carlist/changeFilter', propsname: 'brand', value: brand });
                        }} className={classnames({ 'cur': filters.brand === brand })}>{brand}</em>
                      );
                    })
                  }
                </TabPane>
              );
            })
          }
        </Tabs>
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(Brand);
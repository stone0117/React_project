import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Button, Icon, message,Row,Col } from 'antd';

class Xiala extends Component {

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

    let { dispatch, chinese, options, filters, propsname } = this.props;

    function handleMenuClick(e) {
      message.info('Click on menu item.');
      console.log('click', e);
    }

    const menu = (
      <Menu onClick={(event) => {
        console.log(event.key);
        dispatch({ 'type': 'carlist/changeFilter', propsname, 'value': event.key });
      }}>
        {
          options.map((item, index) => {
            return <Menu.Item key={item}>{item}</Menu.Item>;
          })
        }
      </Menu>
    );

    return (
      // xml域
      <div>
        {chinese}：
        <Dropdown overlay={menu}>
        <Button size='small' style={{ marginLeft: 8 }}>
        {filters[ propsname ] || '无所谓'}<Icon type="down"/>
        </Button>
        </Dropdown>

        {/*<Row>*/}
          {/*<Col span="10">{chinese}：</Col>*/}
          {/*<Col span="14"><Dropdown overlay={menu}>*/}
            {/*<Button size='small' style={{ marginLeft: 8 }}>*/}
              {/*{filters[ propsname ] || '无所谓'}<Icon type="down"/>*/}
            {/*</Button>*/}
          {/*</Dropdown></Col>*/}
        {/*</Row>*/}
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(Xiala);
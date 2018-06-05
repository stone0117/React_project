import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import App from './App.js';
import { push } from "react-router-redux";
const { SubMenu }                = Menu;
const { Header, Content, Sider } = Layout;

class BuyColumn extends Component {

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
      <App>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[ this.props.pathname ]}
              defaultOpenKeys={[ 'sub1' ]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={(e) => {
                //不能跳转到同一个页面
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log(e.item.props.href);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");

                if ( e.key == this.props.pathname ) { return; }
                this.props.dispatch(push(e.key));
              }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user"/>导航 1</span>}>
                <Menu.Item key="/buy/carlist">大表选车</Menu.Item>
                <Menu.Item key="/buy/zhuanjia">专家荐车</Menu.Item>
                <Menu.Item key="3">智能荐车</Menu.Item>
                <Menu.Item key="4">运气买车</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop"/>导航  2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification"/>导航  3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </App>

    );
  }
}

export default connect(
  ({ routing }) => ({
    pathname: routing.location.pathname,
  }),
)(BuyColumn);
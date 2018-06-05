import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu }                = Menu;
const { Header, Content, Sider } = Layout;
import { connect } from "dva";

import { push } from "react-router-redux";

import "./App.less";

let pick = false;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // render() {
  //   return (
  //     <div>
  //       <Picshow/>
  //       {/*<Carlist/>*/}
  //       {/*<SNCarlist/>*/}
  //     </div>
  //   );
  // }

  render() {

    var lanmu = "/";
    if ( /^\/(.+)\//g.test(this.props.pathname) ) {
      lanmu = this.props.pathname.match(/^\/(.+)\//g)[ 0 ];
    }
    if ( lanmu === '/' ) {
      lanmu = '/index/';
    }

    console.log(lanmu);

    let { dispatch, pathname, location } = this.props;
    console.log(pathname, location);
    return (
      <Layout>
        <Header className="header">
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ lanmu ]} style={{ lineHeight: '64px' }} onClick={(e) => {
            // console.table(e);
            //不能跳转到同一个页面
            // console.log(e.item.props.href);
            // console.log(pathname);
            // console.log(lanmu);
            if ( e.item.props.href === pathname ) { return; }
            dispatch(push(e.item.props.href));
          }}>
            <Menu.Item key="/index/" href="/index/home">首页</Menu.Item>
            <Menu.Item key="/buy/" href="/buy/carlist">买车栏目</Menu.Item>
            <Menu.Item key="/sale/" href="/sale/addcar">卖车栏目</Menu.Item>
          </Menu>
        </Header>
        {this.props.children}
      </Layout>
    );
  }
}

// export default App;

export default connect(
  ({ routing }) => {
    console.info(routing);
    return ({
      pathname: routing.location.pathname,
      location: routing.location,
    });
  },
)(App);

// export default connect(
//   ({ routing }) => ({
//     pathname: routing.location.pathname,
//     location: routing.location,
//   }),
// )(App);
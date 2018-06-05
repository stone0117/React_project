import React from "react";
import { Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerReducer, ConnectedRouter } from 'react-router-redux';

import App from "./containers/App.js";
import Carlist from "./components/Carlist/Carlist.js";
import AddCar from "./components/AddCar/AddCar.js";
import Picshow from "./components/Picshow/Picshow.js";
import Index from "./components/Index/Index.js";
import Zhuanjia from "./components/Zhuanjia/Zhuanjia.js";

export default ({ history }) => {
  return <ConnectedRouter history={history}>
    <div>
      {/*exact 精确匹配*/}
      <Route path="/" exact component={Index}/>
      <Route path="/index/home" exact component={Index}/>
      <Route path="/buy/carlist" exact component={Carlist}/>
      <Route path="/sale/addcar" exact component={AddCar}/>
      <Route path="/picshow/:id" exact component={Picshow}/>
      <Route path="/buy/zhuanjia" exact component={Zhuanjia}/>
    </div>
  </ConnectedRouter>;
}
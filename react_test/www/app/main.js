import React from "react";
import dva from "dva";
import logger from "redux-logger";

import addcar from "./models/addcar.js";
import carlist from "./models/carlist.js";
import picshow from "./models/picshow.js";
import  routers  from './routers.js';

//创建app
const app = dva({
  // onAction: logger,
});

//路由
app.router(routers);
//model
app.model(addcar);
app.model(carlist);
app.model(picshow);

//挂载
app.start("#app");
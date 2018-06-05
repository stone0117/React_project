import React from 'react';
import { connect } from 'dva';

import './Picshow.less';

import Carinfo from './Carinfo.js';
import Albums from './Albums.js';
import Carlikes from './Carlikes.js';
import Smallpics from './Smallpics.js';
import BigImgBox from './BigImgBox.js';

class Picshow extends React.Component {
  constructor(props) {
    super(props);
    //构造函数中发出请求，请求服务器的默认数据
    // props.dispatch({ "type": "picshow/init", "nowid": 1000102});
    console.log(props);
    props.dispatch({ "type": "picshow/init", "nowid": props.match.params.id });
  }

  render() {
    return (
      <div className="picshow">
        <BigImgBox/>

        <div className="rightpart">
          <Carinfo/>
          <Albums/>
          <Carlikes/>
          <Smallpics/>
        </div>
      </div>
    );
  }
}

export default connect()(Picshow);

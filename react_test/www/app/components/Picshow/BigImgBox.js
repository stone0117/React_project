import React, { Component } from 'react';
import { connect } from "dva";

let bigimagebox_nowidx   = 0;
let bigimagebox_nowalbum = '';

class BigImgBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {

    let { nowid, nowalbum, images, nowidx } = nextProps;
    let { bigimg }                          = this.refs;

    bigimagebox_nowidx   = nowidx;
    bigimagebox_nowalbum = nowalbum;

    if ( !images ) { return; }

    //先用小图充当
    $(bigimg).attr("src", `carimages_small/${nowid}/${nowalbum}/${images[ nowalbum ][ nowidx ]}`);
    //************菊花loading图显示************
    // 发出对image的请求，只有这么写才能得到image的load事件回调
    let image    = new Image();
    image.src    = `carimages/${nowid}/${nowalbum}/${images[ nowalbum ][ nowidx ]}`;
    let self     = this;
    image.onload = function () {

      if ( nowidx === bigimagebox_nowidx && nowalbum === bigimagebox_nowalbum ) {
        //隐藏loading图片
        $(bigimg).attr("src", image.src);
        self.setState({ loaded: true });
      }
    };

    //***************实现预先加载***************
    //此时要把图片队列链接起来
    const bigArray   = images.view.concat(images.inner, images.engine, images.more);
    //从合并的数组中找到哪一张是我自己？此时这个序号就是我在总图集的总序号
    let currentImage = images[ nowalbum ][ nowidx ];

    const indexAtBigArray    = bigArray.indexOf(currentImage);
    //循环终点(包含头不包含尾巴 [h e))
    const endIndexAtBigArray = indexAtBigArray + 5 < bigArray.length ? indexAtBigArray + 5 : bigArray.length;
    //文件夹数组
    const dirarr             = [].concat(
      new Array(images.view.length).fill("view"),
      new Array(images.inner.length).fill("inner"),
      new Array(images.engine.length).fill("engine"),
      new Array(images.more.length).fill("more"),
    );

    //预先加载后面5张
    for ( let i = indexAtBigArray; i < endIndexAtBigArray; i++ ) {
      let _image = new Image();
      _image.src = `carimages/${nowid}/${dirarr[ i ]}/${bigArray[ i ]}`;

      let _image1 = new Image();
      _image1.src = `carimages_small/${nowid}/${dirarr[ i ]}/${bigArray[ i ]}`;
    }
    //***************实现预先加载***************

    //向外暴露两个数值
    this.zongxuhao = indexAtBigArray + 1;
    this.zongshu   = bigArray.length;
  }

  render() {

    let { zongxuhao, zongshu, state: { loaded } } = this;
    let { dispatch }                              = this.props;

    return (
      <div className="bigImgBox">
        <div className="inner">
          <img ref="bigimg" className="bigimg"/>

          <div className="leftbtn" onClick={() => {
            dispatch({ "type": "picshow/goPrev" });
            this.setState({ loaded: false });
          }}/>

          <div className="rightbtn" onClick={() => {
            dispatch({ "type": "picshow/goNext" });
            this.setState({ loaded: false });
          }}/>

          { loaded ? null : <div className="loadtip"/> }

          <div className="nobox"> {zongxuhao}/{zongshu} </div>
        </div>
      </div>
    );
  }
}

export default connect(({ picshow }) => {
    return {
      nowid   : picshow.nowid,
      nowidx  : picshow.nowidx,
      nowalbum: picshow.nowalbum,
      images  : picshow.carinfo.images,
    };
  },
)(BigImgBox);

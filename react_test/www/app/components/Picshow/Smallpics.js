import React from 'react';
import { connect } from "dva";
import classnames from "classnames";

class Smallpics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowpage: 0,
    };
  }

  render() {

    let { dispatch, images, nowalbum, nowidx, nowid } = this.props;

    //判断
    if ( !images ) { return null; }

    //当前所在的页数
    const nowpage = parseInt(nowidx / 4);

    //总页数
    const pageamount = Math.ceil(images[ nowalbum ].length / 4);

    //显示ul和li
    const showUlLIs = () => {
      let ARR = [];
      //图集图片的数组
      let arr = images[ nowalbum ];
      //遍历每一页
      for ( let i = 0; i < arr.length / 4; ++i ) {
        ARR.push(
          <ul key={i}>
            {
              arr.slice(i * 4, i * 4 + 4).map((item, index) => {
                return (
                  <li key={index} onClick={event => {
                    dispatch({
                      "type"  : "picshow/changeNowidx",
                      "nowidx": i * 4 + index,
                    });
                  }} className={classnames({ "cur": nowidx === i * 4 + index })}>

                    <img src={`carimages_small/${nowid}/${nowalbum}/${item}`} alt=""/>

                  </li>
                );
              })
            }
          </ul>,
        );
      }
      return ARR;
    };

    //显示span
    const showSpans = () => {
      let ARR = [];	//DOM数组
      for ( let i = 0; i < pageamount; i++ ) {
        ARR.push(
          <span key={i} onMouseEnter={event => { //直接用DOM方法拉动unit即可
            let { unit } = this.refs;
            $(unit).css("left", -290 * i + "px");
            //直接用DOM方法改变span谁加cur
            $(event.target).addClass('cur').siblings().removeClass('cur');
          }} style={{ "width": 100 / pageamount + "%" }} className={classnames({ "cur": i === nowpage })}/>,
        );
      }
      return ARR;
    };

    return (

      <div className="smallpics" onMouseLeave={event => {

        let { unit, pagenav } = this.refs;

        //直接用DOM方法拉动unit即可
        $(unit).css("left", -290 * nowpage + "px");

        //直接用DOM方法改变cur即可
        $(pagenav).find("span").eq(nowpage).addClass('cur').siblings().removeClass('cur');

      }}>
        {JSON.stringify()}
        <div className="unit" ref="unit" style={{ "left": -290 * nowpage + "px" }}> { showUlLIs() } </div>
        <div className="pagenav" ref="pagenav"> { showSpans() } </div>
      </div>
    );
  }
}

export default connect(
  ({ picshow }) => ({
    images  : picshow.carinfo.images,
    nowalbum: picshow.nowalbum,
    nowidx  : picshow.nowidx,
    nowid   : picshow.nowid,
  }),
)(Smallpics);
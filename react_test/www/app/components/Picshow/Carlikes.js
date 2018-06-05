import React from 'react';
import { connect } from "dva";
import classnames from "classnames";

class Carlikes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { dispatch, carlike, nowid } = this.props;

    return (
      <div className="carlikes">
        <h3>更多东风雪铁龙</h3>
        <div className="contentbox" ref="contentbox">
          <ul ref="ul">
            {
              carlike.map(item => {
                return (
                  <li key={item.id} className={classnames({ "cur": nowid === item.id, })} onClick={event => dispatch({ "type": "picshow/init", "nowid": item.id })}>
                    {item.color}色
                    {item.price}万
                    {new Date(item.buydate).getFullYear()}年
                    {Math.round(item.km / 10000)}万公里
                    {item.displacement}
                  </li>
                );
              })
            }
          </ul>
          <div className="bar"><b ref="b"/></div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    //更新完毕，此时ul就会有高度
    //之所以要this. 是因为生命周期函数要通信。
    let { ul, contentbox, b } = this.refs;
    this.ulheight             = $(ul).height();
    this.rate                 = $(ul).height() / $(contentbox).height();
    //设置b的高度，按比例设置
    $(b).height($(contentbox).height() / this.rate);
  }

  componentDidMount() {
    let btop                  = 0;	//这是b滑块的top值
    let self                  = this;
    let { b, contentbox, ul } = this.refs;

    //拖拽的事件，让b可以被拖拽
    $(b).draggable({

      containment: "parent",			//限制拖拽的盒子

      drag(event, ui){
        btop = ui.position.top; 	//设置btop值
        //让ul上移，按比例移动
        $(ul).css("top", -btop * self.rate);
      },
    });

    //鼠标滚轮
    $(contentbox).mousewheel(function (event, delta) {

      event.preventDefault();		//阻止默认事件

      btop -= delta * 8;
      //验收
      if ( btop < 0 ) { btop = 0; }

      let maxtop = $(contentbox).height() - $(b).height();

      if ( btop > maxtop ) { btop = maxtop; }

      $(ul).css("top", -btop * self.rate);

      $(b).css("top", btop);
    });
  }
}

export default connect(
  ({ picshow }) => ({
    carlike: picshow.carlike,
    nowid  : picshow.nowid,
  }),
)(Carlikes);
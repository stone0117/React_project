import React from 'react';
import { connect } from "dva";
import classnames from "classnames";

class Albums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { dispatch, carinfo, nowalbum } = this.props;

    //这里要看看carinfo.carimages是不是undefined，如果是不再继续渲染了
    let getLength = (album) => {
      if ( !carinfo.images ) {
        return 0;
      }
      return carinfo.images[ album ].length;
    };

    return (
      <div className="albums">
        <ul>
          <li onClick={event => dispatch({ "type": "picshow/changealbum", "nowalbum": "view" })}
              className={classnames({ "cur": nowalbum === "view" })}>外观（{getLength('view')}）
          </li>

          <li onClick={event => dispatch({ "type": "picshow/changealbum", "nowalbum": "inner" })}
              className={classnames({ "cur": nowalbum === "inner" })}>内饰（{getLength('inner')}）
          </li>

          <li onClick={event => dispatch({ "type": "picshow/changealbum", "nowalbum": "engine" })}
              className={classnames({ "cur": nowalbum === "engine" })}>结构和发动机（{getLength('engine')}）
          </li>

          <li onClick={event => dispatch({ "type": "picshow/changealbum", "nowalbum": "more" })}
              className={classnames({ "cur": nowalbum === "more" })}>更多细节（{getLength('more')}）
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  ({ picshow }) => {
    return {
      carinfo : picshow.carinfo,
      nowalbum: picshow.nowalbum,
    };
  },
)(Albums);
import React from 'react';
import { connect } from 'dva';

class Carinfo extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    let { carinfo, nowid } = this.props;
    return (
      <div className="carinfo">
        <h1>
          {carinfo.brand}
          {carinfo.series}
          <small>[{nowid}]</small>
        </h1>
        <h3>
          {carinfo.color}色
          {carinfo.price}万
          {new Date( carinfo.buydate ).getFullYear()}年
          {Math.round( carinfo.km / 10000 )}万公里
          {carinfo.displacement}
        </h3>
      </div>
    );
  }
}

export default connect(
  ( { picshow } ) => ({
    carinfo: picshow.carinfo,
    nowid  : picshow.nowid,
  }),
)( Carinfo );
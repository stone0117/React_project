import React, { Component } from 'react';
import "./Carlist.less";
import { connect } from "dva";
import FilterBox from './FilterBox';
import TableBox from './TableBox';
import BuyColumn from '../../containers/BuyColumn';

class Carlist extends Component {
  constructor(props) {
    super(props);
    //调用默认数据
    props.dispatch({ "type": "carlist/init" });
  }

  render() {
    return (
      <BuyColumn>
        <div>
          <FilterBox/>
          <TableBox/>
        </div>
      </BuyColumn>
    );
  }
}

export default connect()(Carlist);

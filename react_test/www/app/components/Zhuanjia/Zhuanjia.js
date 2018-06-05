import React from 'react';
import { connect } from "dva";

import BuyColumn from "../../containers/BuyColumn.js";

class Zhuanjia extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <BuyColumn>
        <div>
          <h1>专家荐车栏目正在建设中...</h1>
        </div>
      </BuyColumn>
    );
  }
}

export default connect()(Zhuanjia);
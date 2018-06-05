import React, { Component } from 'react';
import { connect } from "dva";
import { Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;

class Fuxuankuang extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { dispatch, propsname, filters, options } = this.props;

    return (
      <div>
        <CheckboxGroup
          options={options.map(item => ({ label: item, value: item }))}
          onChange={value => dispatch({ "type": "carlist/changeFilter", "propsname": propsname, value })}
          value={filters[ propsname ]}
        />
      </div>
    );
  }
}

export default connect(({ carlist }) => ({
  filters: carlist.filters,
}))(Fuxuankuang);
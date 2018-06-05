import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';

class Series extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;

    let { dispatch, filters: { brand, series }, setNowseries } = currentProps;

    // console.log(brand);
    // console.log(series);

    if ( brand === '' && series !== '' ) {
      setNowseries([]);
      dispatch({ "type": "carlist/changeFilter", "propsname": "series", "value": "" });
    }
  }

  // 渲染(展示数据)
  render() {
    // js域
    let { dispatch, setNowseries, nowseries, filters } = this.props;
    return (
      // xml域
      <div>
        {nowseries.map((item, index) => {
          return <em key={index} className={classnames({ 'cur': filters.series === item })} onClick={(event) => {
            dispatch({ 'type': 'carlist/changeFilter', propsname: 'series', value: item });
          }}>{item}</em>;
        })}
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(Series);
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { baseUrl, requestWithGET, getArray } from '../../httpmanager/SNHTTPManager';
import moment from 'moment';

import Step1_form from './Step1_form.js';

class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brandandseriesOptions: [],
    };

    requestWithGET(baseUrl + '/brandandseries').then(data => {
      let brandandseriesOptions = getArray(data);
      this.setState((prevState, props) => {
        return { brandandseriesOptions };
      });
    });
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // 渲染(展示数据)
  render() {
    // js域

    let { dispatch } = this.props;

    const WrappedStep1_form = Form.create({
      onFieldsChange: (props, changedFields) => {
        dispatch({ "type": "addcar/changeStep1", "propname": Object.keys(changedFields)[ 0 ], "value": Object.values(changedFields)[ 0 ] });
      },
      mapPropsToFields(props) {
        // dispatch({ 'type': 'addcar/changeErrorsStep1' });
        return {
          brandandseries: Form.createFormField({
            ...props.brandandseries,
            value: [ 'A', '奥迪', 'A6L' ],
          }),
          gearbox       : Form.createFormField({
            ...props.gearbox,
            value: '自动挡',
          }),
          displacement  : Form.createFormField({
            ...props.displacement,
            value: '1.0L',
          }),
          fuel          : Form.createFormField({
            ...props.fuel,
            value: '纯电动',
          }),
          environmental : Form.createFormField({
            ...props.environmental,
            value: '国一',
          }),
          buydate       : Form.createFormField({
            ...props.buydate,
            value: moment('2015/01/01', 'YYYY/MM/DD'),
          }),
          licence       : Form.createFormField({
            ...props.licence,
            value: 1,
          }),
          locality      : Form.createFormField({
            ...props.locality,
            value: 1,
          }),
          color         : Form.createFormField({
            ...props.color,
            value: '红',
          }),
          type          : Form.createFormField({
            ...props.type,
            value: '高档轿车',
          }),
          price         : Form.createFormField({
            ...props.price,
            value: '11',
          }),
          km            : Form.createFormField({
            ...props.km,
            value: '111',
          }),
        };
      },
      onValuesChange(props, changedValues, allValues) {
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        console.log("call onValuesChange's onValuesChange", 'Begin');
        console.log(props);
        console.log(changedValues);
        console.log(allValues);
        console.log("call onValuesChange's onValuesChange", 'END');
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
      },
    })(Step1_form);

    let { brandandseriesOptions } = this.state;

    return (
      // xml域
      <div className="Step1">
        <WrappedStep1_form brandandseriesOptions={brandandseriesOptions}/>
      </div>
    );
  }
}

export default connect()(Step1);
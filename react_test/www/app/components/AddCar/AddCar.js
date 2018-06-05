import React, { Component } from 'react';
import { connect } from 'dva';
import { Steps, Button, message } from 'antd';

const Step = Steps.Step;

import "./AddCar.less";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step2_backup from './Step2_backup';
import SaleColumn from '../../containers/SaleColumn.js';

class AddCar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  getImages(album) {
    let array = [];
    $(".imgbox[data-album='" + album + "']").find('.preDiv').each(function (index, element) {
      array.push($(this).data('pathname'));
    });
    return array;
  }

  // 渲染(展示数据)
  render() {
    // js域
    const { current }    = this.state;
    const { formValues } = this.state;

    let { dispatch } = this.props;

    const steps = [
      {
        title  : '车辆基本信息',
        content: <Step1 />,
      }, {
        title  : '车辆图片',
        content: <Step2/>,
      }, {
        title  : '车辆附属文件',
        content: <Step3/>,
      },
    ];

    //验证第一步的按钮是否可用
    const checkStep1Disabled = () => {
      if ( current === 0 ) {
        let { step1 } = this.props;

        let noerror = true;

        for ( let key in step1 ) {

          if ( step1[ key ].errors !== undefined ) {
            noerror = false;
            break;
          }
        }

        return !noerror;
      }

      return false;
    };

    return (
      // xml域
      <SaleColumn>
        <div className="AddCar">

          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title}/>)}
          </Steps>

          <div className="content_box">{steps[ current ].content}</div>

          <div className="btn_box">

            { current < steps.length - 1 && <Button type="primary" disabled={checkStep1Disabled()} onClick={() => {

              if ( current === 1 ) {

                let view   = this.getImages('view');
                let inner  = this.getImages('inner');
                let engine = this.getImages('engine');
                let more   = this.getImages('more');

                if ( view.length * inner.length * engine.length * more.length !== 0 ) {

                  let obj = { view, inner, engine, more };

                  console.log(obj);

                  dispatch({ 'type': 'addcar/changeStep2', obj });

                  this.setState({ current: current + 1 });

                } else {
                  // alert('请上传所有图集');
                  message.warning('请上传所有图集');
                }
              }

              if ( current === 0 ) {
                this.setState({ current: current + 1 });
              }

            }}>下一步</Button> }

            { current === steps.length - 1 && <Button type="primary" onClick={() => {

              message.success('Processing complete!');

              dispatch({ 'type': 'addcar/addcar' });

            }}>完成</Button> }

            { current > 0 && <Button style={{ marginLeft: 8 }} onClick={() => {

              this.setState({ current: current - 1 });

            }}> 上一步 </Button> }

          </div>
        </div>
      </SaleColumn>
    );
  }
}

export default connect(
  ({ addcar }) => {
    return {
      step1: addcar.step1,
      step2: addcar.step2,
    };
  },
)(AddCar);
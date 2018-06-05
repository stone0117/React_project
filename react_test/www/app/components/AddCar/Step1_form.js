import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { Radio, DatePicker } from 'antd';
const RadioGroup = Radio.Group;

const FormItem           = Form.Item;
const Option             = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value   : 'zhejiang',
    label   : 'Zhejiang',
    children: [
      {
        value   : 'hangzhou',
        label   : 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  }, {
    value   : 'jiangsu',
    label   : 'Jiangsu',
    children: [
      {
        value   : 'nanjing',
        label   : 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class Step1_form extends Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  componentDidMount() {
    const { dispatch }                       = this.props;
    const { getFieldsValue, getFieldsError } = this.props.form;
    dispatch({ 'type': 'addcar/changeErrorsStep1', values: getFieldsValue(), errors: getFieldsError() });

  }

  // 渲染(展示数据)
  render() {
    console.log('没出发更新吗???');

    const { getFieldDecorator }       = this.props.form;
    const { validateFieldsAndScroll } = this.props.form;
    const { getFieldsError }          = this.props.form;
    const { getFieldsValue }          = this.props.form;
    const { brandandseriesOptions }   = this.props;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    const handleSubmit = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        if ( !err ) {
          console.log('Received values of form: ', values);
        }
      });
    };
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    //定义表格的布局，xs表示极小，sm表示小屏
    const kuan = {
      labelCol  : {
        xs: { span: 24 },
        sm: { span: 3 },        //题目占了8列
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },       //填写部分占了16列
      },
    };

    const zhai = {
      labelCol  : {
        xs: { span: 24 },
        sm: { span: 3 },        //题目占了8列
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },       //填写部分占了16列
      },
    };

    const jizhai = {
      labelCol  : {
        xs: { span: 24 },
        sm: { span: 3 },        //题目占了8列
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 },       //填写部分占了16列
      },
    };

    return (
      <div>
        <Form onSubmit={handleSubmit}>

          <FormItem {...zhai} label="品牌和车系">
            {
              getFieldDecorator('brandandseries', {
                rules: [
                  {
                    type    : 'array',
                    required: true,
                    message : 'Please select your habitual residence!',
                  },
                ],
              })(<Cascader options={brandandseriesOptions}/>)
            }
          </FormItem>

          <FormItem {...zhai} label="变速箱">
            {
              getFieldDecorator('gearbox', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select>
                  {
                    [ "自动挡", "手动挡", "手自一体" ].map((item, index) => {
                      return <Option value={item} key={index}>{item}</Option>;
                    })
                  }
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="排量">
            {
              getFieldDecorator('displacement', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select>
                  {
                    [ "1.0L", "1.2L", "1.6L", "1.6T", "2.0L", "2.0T", "5.0L" ].map(item => {
                      return <Option value={item} key={item}>{item}</Option>;
                    })
                  }
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="燃料">
            {
              getFieldDecorator('fuel', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select>
                  {
                    [ "纯电动", "油电混合", "汽油车", "柴油车" ].map(item => {
                      return <Option value={item} key={item}>{item}</Option>;
                    })
                  }
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="环保等级">
            {
              getFieldDecorator('environmental', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select>
                  {
                    [ "国一", "国二", "国三", "国四", "国五" ].map(item => {
                      return <Option value={item} key={item}>{item}</Option>;
                    })
                  }
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="购买日期">
            {
              getFieldDecorator('buydate', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(<DatePicker />,)
            }
          </FormItem>

          <FormItem {...zhai} label="是否上牌">
            {
              getFieldDecorator('licence', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select>
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="是否本地车">
            {
              getFieldDecorator('locality', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select>
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="颜色">
            {
              getFieldDecorator('color', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select  >
                  {
                    [ "红", "黄", "橙", "绿", "白", "黑", "蓝", "银灰", "香槟", "银", "紫", "咖啡" ].map(item => {
                      return <Option value={item} key={item}>{item}</Option>;
                    })
                  }
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="车型">
            {
              getFieldDecorator('type', {
                  rules: [
                    { "required": true, "message": "必填" },
                  ],
                },
              )(
                <Select  >
                  {
                    [ "高档轿车", "中档轿车", "经济轿车", "大型SUV", "中型SUV", "小型SUV", "面包车", "跑车" ].map(item => {
                      return <Option value={item} key={item}>{item}</Option>;
                    })
                  }
                </Select >,
              )
            }
          </FormItem>

          <FormItem {...zhai} label="售价(万元)">
            {
              getFieldDecorator('price', {
                  rules: [
                    {
                      validator: function (rule, value, callback) {
                        //如果不是数组，势必就是NaN，NaN不能参与比较
                        value = Number(value);
                        if ( !(parseFloat(value) > 0 && parseFloat(value) <= 100) ) {
                          callback("请填写0~100之内的数字");
                        } else {
                          callback();
                        }
                      },
                    },
                    { "required": true, "message": "价格必填" },
                  ],
                },
              )(<Input />)
            }
          </FormItem>

          <FormItem {...zhai} label="公里数">
            {
              getFieldDecorator('km', {
                  rules: [
                    {
                      validator: function (rule, value, callback) {
                        //如果不是数组，势必就是NaN，NaN不能参与比较
                        value = Number(value);
                        if ( !(parseFloat(value) > 0 && parseFloat(value) <= 1000000) ) {
                          callback("请填写0~1000000之内的数字");
                        } else {
                          callback();
                        }
                      },
                    },
                    { "required": true, "message": "必填" },
                  ],
                },
              )(<Input />)
            }
          </FormItem>

        </Form>
      </div>
    );
  }
}

export default connect()(Step1_form);
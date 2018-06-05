import React, { Component } from 'react';
import { connect } from 'dva';
import { Cascader } from 'antd';

class BrandAndSeries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };

    function getArray(result) {

      if ( Object.prototype.toString.call(result) === '[object Object]' ) {
        let item = result;
        return Object.keys(item).map(key => {
          return { value: key, label: key, children: getArray(item[ key ]) };
        });
      }
      if ( result instanceof Array ) {
        if ( Object.prototype.toString.call(result[ 0 ]) === '[object Object]' ) {
          return result.map((item) => {
            return { value: Object.keys(item)[ 0 ], label: Object.keys(item)[ 0 ], children: getArray(item[ Object.keys(item)[ 0 ] ]) };
          });
        } else {
          return result.map(item => {
            return { value: item, label: item };
          });
        }
      }
    }

    this.loadData((result) => {
      let options = getArray(result);
      this.setState({ options: options });
    });
  }

  async loadData(callback) {
    let result = await fetch('/brandandseries').then(data => data.json());
    callback(result);
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // 渲染(展示数据)
  render() {
    // js域
    function onChange(value) {
      console.log(value);
    }

    const options = [
      {
        value   : 'A',
        label   : 'A',
        children: [
          {
            value   : '奥迪',
            label   : '奥迪',
            children: [
              {
                value: 'A4',
                label: 'A4',
              },
              {
                value: 'A5',
                label: 'A5',
              },
              {
                value: 'Q5',
                label: 'Q5',
              },
              {
                value: 'Q7',
                label: 'Q7',
              },
              {
                value: 'Q9',
                label: 'Q9',
              },
              {
                value: 'TT',
                label: 'TT',
              },
            ],
          },
          {
            value   : '阿斯顿马丁',
            label   : '阿斯顿马丁',
            children: [
              {
                value: 'DB9',
                label: 'DB9',
              },
              {
                value: 'V8',
                label: 'V8',
              },
              {
                value: 'Rapide',
                label: 'Rapide',
              },
              {
                value: 'Virage',
                label: 'Virage',
              },
              {
                value: 'DBS',
                label: 'DBS',
              },
            ],
          },
        ],
      },
      {
        value   : 'B',
        label   : 'B',
        children: [
          {
            value   : '本田',
            label   : '本田',
            children: [
              {
                value: '雅阁',
                label: '雅阁',
              },
              {
                value: '思域',
                label: '思域',
              },
              {
                value: 'CR-V',
                label: 'CR-V',
              },
              {
                value: '奥德赛',
                label: '奥德赛',
              },
              {
                value: '飞度',
                label: '飞度',
              },
              {
                value: '锋范',
                label: '锋范',
              },
              {
                value: '凌派',
                label: '凌派',
              },
            ],
          },
        ],
      },
      {
        value   : 'D',
        label   : 'D',
        children: [
          {
            value   : '东风',
            label   : '东风',
            children: [
              {
                value: '雪铁龙',
                label: '雪铁龙',
              },
              {
                value: '东风1号',
                label: '东风1号',
              },
            ],
          },
        ],
      },
    ];

    return (
      // xml域
      <div>
        <Cascader options={this.state.options} onChange={onChange} placeholder="Please select"/>
      </div>
    );
  }
}

export default connect(
  ({ carlist }) => ({
    filters: carlist.filters,
  }),
)(BrandAndSeries);

// console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
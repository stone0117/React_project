import React, { Component } from 'react';
import { connect } from 'dva';

// const dictionary = {
//   "id"          : "id",
//   "images"      : "缩略图",
//   "brand"       : "品牌",
//   "series"      : "车系",
//   "color"       : "颜色",
//   "buydate"     : "购买日期",
//   "displacement": "排量",
//   "fuel"        : "燃料",
//   "price"       : "售价",
//   "km"          : "公里数",
//   "licence"     : "是否上牌",
//   // "environmental": "排放标准",
//   // "gearbox"      : "变速箱",
//   // "type"         : "车型",
//   // "locality"     : "是否是本地车",
// };

class MyModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  componentDidMount() {
    let self        = this;
    let { setCols } = this.props;

    const extracted = () => {
      let arr = [];
      $('#ul1').find("li").each(function () {
        arr.push($(this).data('key'));
      });
      setCols(arr);
    };

    //实现拖拽排序
    $("#ul1 , #ul2").sortable({
      connectWith: ".connectedSortable",
      //当sort发生的时候做的事情
      stop       : function () { extracted(); },

    }).disableSelection();

    // console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
    // 双击上去
    $("#ul2").find("li").on('dblclick', function (event) {
      $(this).appendTo('#ul1');
      extracted();
    });

    $("#ul1").find("li").on('dblclick', function (event) {
      $(this).appendTo('#ul2');
      extracted();
    });

  }

  // 渲染(展示数据)
  render() {
    // js域

    let { cols, dictionary } = this.props;

    console.log(cols);

    return (
      // xml域
      <div className="mymodal">
        <h3>当前列</h3>
        <ul ref="ul1" id="ul1" className="connectedSortable">
          { cols.map((key, index) => <li key={index} data-key={key}>{dictionary[ key ]}</li>) }
        </ul>
        <h3>没有添加的列</h3>
        <ul ref="ul2" id="ul2" className="connectedSortable">
          { this.showUnAddColumns(cols, dictionary) }
        </ul>
      </div>
    );
  }

  showUnAddColumns(cols, dictionary) {

    let keys = Object.keys(dictionary).filter(key => !cols.includes(key));

    console.log('keys = ', keys);

    let map = keys.map((key, index) => <li key={index} data-key={key}>{dictionary[ key ]}</li>);

    console.log('map = ', map);

    return map;
  }
}

export default connect()(MyModal);
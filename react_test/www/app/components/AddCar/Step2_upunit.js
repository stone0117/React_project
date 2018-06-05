import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd';
import { baseUrl } from '../../httpmanager/SNHTTPManager';

class Step2_upunit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  // 渲染(展示数据)
  render() {
    // js域
    let { title, album } = this.props;
    return (
      // xml域
      <div className="Step2_upunit">
        <Row>
          <Col span={5}><h3>请添加{title}的图片</h3></Col>
          <Col span={4}>
            <input type="file" ref="myfilectrl" hidden multiple/>
            <div className="shangchuanniu" ref="shangchuanniu"/>
          </Col>
        </Row>
        <div ref="imgbox" className="imgbox" data-album={album}/>
      </div>
    );
  }

  componentDidMount() {
    let self = this;

    const upload = function (filelistarr) {
      //上传

      for ( let i = 0; i < filelistarr.length; ++i ) {

        let $div = $(`<div class="preDiv"><i class="progress-bar"></i><i class="progress-text"></i><b>x</b></div>`);

        //这个图片的标记戳
        // let stamp = parseInt(Math.random() * 99999999999);

        let formData = new FormData();

        let file = filelistarr[ i ];

        formData.append('files', file);

        let xhr = new XMLHttpRequest();

        // 进度条
        xhr.upload.onprogress = function (v) {
          $div.find('.progress-bar').css({ width: parseInt(v.loaded / v.total * 100) + "%" });
          $div.find('.progress-text').html(parseInt(v.loaded / v.total * 100) + "%");

        };

        /**
         * 上传完毕回调
         */
        xhr.onload = function () {
          console.log(xhr.responseText);
          $div.find('i').remove();

          $div.attr("data-pathname" , xhr.responseText);
        };

        xhr.open('POST', baseUrl + '/uploadcarimages', true);

        xhr.send(formData);

        console.log("上传 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        /**
         * 即时显示
         */
        let fr = new FileReader();

        fr.readAsDataURL(file);

        fr.onload = function (e) {
          $div.css("background-image", `url(${e.currentTarget.result})`);
          $(self.refs.imgbox).append($div);
        };
      }
    };

    $(this.refs.shangchuanniu).click(function (event) { $(self.refs.myfilectrl).trigger('click'); });

    /**
     * 点击上传
     */
    $(this.refs.myfilectrl).on('change', function (event) {
      let filelistarr = event.target.files;
      upload(filelistarr);
    });

    /**
     * 拖拽上传
     */
    //拖拽文件悬浮
    $(this.refs.imgbox).bind("dragover", function (e) {
      e.preventDefault();
      $(self.refs.imgbox).addClass("cur");
    });
    //拖拽文件离开
    $(this.refs.imgbox).bind("dragleave", function (e) {
      e.preventDefault();
      $(self.refs.imgbox).removeClass("cur");
    });
    //松手了
    $(this.refs.imgbox).bind("drop", function (e) {
      e.preventDefault();
      $(self.refs.imgbox).removeClass("cur");

      let filelistarr = e.originalEvent.dataTransfer.files;
      upload(filelistarr);
    });

    //允许拖拽更改位置
    $(this.refs.imgbox).sortable();

    //关闭按钮b的事件监听
    $(this.refs.imgbox).delegate("b", "click", function () {
      //删除自己的父元素
      $(this).parents(".preDiv").remove();
    });
  }
}

export default connect(
  ({ addcar }) => {
    return { step2: addcar.step2 };
  },
)(Step2_upunit);
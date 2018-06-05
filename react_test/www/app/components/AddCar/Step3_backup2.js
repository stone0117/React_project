import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, message, Modal, Progress } from 'antd';
import { baseUrl } from '../../httpmanager/SNHTTPManager';
import Step3_bar from './Step3_bar';

function uuid() {
  let s         = [];
  let hexDigits = "0123456789abcdef";
  for ( let i = 0; i < 36; i++ ) {
    s[ i ] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[ 14 ] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[ 19 ] = hexDigits.substr((s[ 19 ] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[ 8 ]  = s[ 13 ] = s[ 18 ] = s[ 23 ] = "-";

  let uuid = s.join("");
  return uuid;
}

class Step3_backup2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible   : false,
      nowUpfiles: [
        { filename: 'a.zip', progress: 90, changedfilename: '', realpath: '' },
        // { filename: 'b.png', progress: 60, changedfilename: '' },
        // { filename: 'c.doc', progress: 30, changedfilename: '' },
      ],
    };
  }

  setChangedfilename(filename, changedfilename) {
    let map = this.state.nowUpfiles.map((item, index) => {
      return item.filename === filename ? { ...item, changedfilename } : item;
    });
    this.setState({ nowUpfiles: map });
    // this.state.nowUpfiles = map;
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModalByOnOk() {

    let { dispatch }   = this.props;
    let { nowUpfiles } = this.state;

    dispatch({ 'type': 'addcar/changeStep3', arr: nowUpfiles });

    this.setState({ visible: false });
  }

  hideModalByCancel() {
    this.setState({ visible: false });
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  setBackgroundImage($div, self, ext) {
    $div.css("background-image", `url(/images/${ext}.jpg)`);
    $(self.refs.filebox).append($div);
  }

  // 渲染(展示数据)
  render() {
    // js域
    console.log('会刷新几次???');
    return (
      // xml域

      <div className="Step3">
        <div className="hd">
          <h3>汽车必备资料文件</h3>
          <input type="file" ref="myfilectrl" hidden multiple/>
          <Button type='primary' onClick={(event) => {

            $(this.refs.myfilectrl).trigger('click');

          }}>上传</Button>
        </div>

        <div className="filebox" ref="filebox">

        </div>

        <Modal title="上传" width={600} destroyOnClose={true} visible={this.state.visible} onOk={this.hideModalByOnOk.bind(this)} onCancel={this.hideModalByCancel.bind(this)} okText="确认" cancelText="取消">
          {
            this.state.nowUpfiles.map((item, index) => {
              return <Step3_bar key={index} {...item} setChangedfilename={this.setChangedfilename.bind(this)}/>;
            })
          }
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    let self = this;

    const upload = function (filelistarr) {
      //上传

      for ( let i = 0; i < filelistarr.length; ++i ) {

        let $div = $(`<div class="preDiv"><i class="progress-bar"></i><i class="progress-text"></i><b>x</b></div>`);

        let formData = new FormData();

        let file = filelistarr[ i ];

        formData.append('files', file);

        let xhr = new XMLHttpRequest();

        // 进度条
        xhr.upload.onprogress = function (v) {
          $div.find('.progress-bar').css({ width: parseInt(v.loaded / v.total * 100) + "%" });
          $div.find('.progress-text').html(parseInt(v.loaded / v.total * 100) + "%");

          let map = self.state.nowUpfiles.map((item, index) => {

            if ( item.filename === file.name ) {
              return {
                ...item,
                progress: parseInt(v.loaded / v.total * 100),
              };
            }
            return item;
          });

          self.setState({ nowUpfiles: map });

        };

        /**
         * 上传完毕回调
         */
        xhr.onload = function () {
          console.log(xhr.responseText);
          $div.find('i').remove();
          $div.attr("data-pathname", xhr.responseText);

          let map = self.state.nowUpfiles.map((item, index) => {

            if ( item.filename === file.name ) {
              return {
                ...item,
                realpath: xhr.responseText,
              };
            }
            return item;
          });
          self.setState({ nowUpfiles: map });
        };

        xhr.open('POST', baseUrl + '/uploadziliao', true);

        xhr.send(formData);

        console.log("上传 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");

        let extname = file.name.match(/\.(.+)$/g)[ 0 ];

        switch ( extname ) {
          case '.doc':
          case '.docx':
            self.setBackgroundImage($div, self, 'doc');
            break;
          case '.zip':
          case '.rar':
            self.setBackgroundImage($div, self, 'zip');
            break;
          case '.png':
          case '.jpg': {
            /**
             * 即时显示
             */
            let fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = function (e) {
              let urlString = e.currentTarget.result;
              $div.css("background-image", `url(${urlString})`);
              $(self.refs.filebox).append($div);
            };
          }
            break;
          case '.txt':
            self.setBackgroundImage($div, self, 'txt');
            break;
          default:
            console.log('not match');
            self.setBackgroundImage($div, self, 'xcel');
        }

      }
    };

    /**
     * 点击上传
     */
    $(this.refs.myfilectrl).on('change', function (event) {

      let filelistarr = event.target.files;

      let files = [ ...filelistarr ];

      let arr = files.map((item, index) => {
        return {
          filename       : item.name,
          progress       : 0,
          changedfilename: item.name,
        };
      });

      console.log(arr);
      // self.setState({ nowUpfiles: arr });

      self.state.nowUpfiles = arr;

      upload(filelistarr);

      if ( filelistarr.length !== 0 ) {

        self.showModal();
      }
    });

    /**
     * 拖拽上传
     */
    //拖拽文件悬浮
    $(this.refs.filebox).bind("dragover", function (e) {
      e.preventDefault();
      $(self.refs.filebox).addClass("cur");
    });
    //拖拽文件离开
    $(this.refs.filebox).bind("dragleave", function (e) {
      e.preventDefault();
      $(self.refs.filebox).removeClass("cur");
    });
    //松手了
    $(this.refs.filebox).bind("drop", function (e) {
      e.preventDefault();
      $(self.refs.filebox).removeClass("cur");

      let filelistarr = e.originalEvent.dataTransfer.files;
      upload(filelistarr);
    });

    //允许拖拽更改位置
    $(this.refs.filebox).sortable();

    //关闭按钮b的事件监听
    $(this.refs.filebox).delegate("b", "click", function () {
      //删除自己的父元素
      $(this).parents(".preDiv").remove();
    });
  }
}

export default connect(
  ({ addcar }) => {
    return {
      step3: addcar.step3,
    };
  },
)(Step3_backup2);
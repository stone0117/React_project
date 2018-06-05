import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, message, Modal, Progress } from 'antd';
import { baseUrl } from '../../httpmanager/SNHTTPManager';
import Step3_bar from './Step3_bar';
import Step3_FileBar from './Step3_FileBar';

class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible   : false,
      nowUpfiles: [
        { filename: 'a.zip', progress: 90, changedfilename: '', realpath: '', type: '' },
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

  // 渲染(展示数据)
  render() {
    // js域
    let { dispatch, step3 } = this.props;
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
          {
            step3.files.map((item, index) => {

              return <Step3_FileBar key={index} {...item}/>;
            })
          }

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

        let formData = new FormData();

        let file = filelistarr[ i ];

        formData.append('files', file);

        let xhr = new XMLHttpRequest();

        // 进度条
        xhr.upload.onprogress = function (v) {

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

      }
    };

    /**
     * 点击上传
     */
    $(this.refs.myfilectrl).on('change', function (event) {

      let filelistarr = event.target.files;

      let files = [ ...filelistarr ];

      let arr = files.map((item, index) => {

        console.log(item);

        let type    = '';
        let extname = item.name.match(/\.(.+)$/g)[ 0 ];

        let src = '';
        switch ( extname ) {
          case '.doc':
          case '.docx':
            type = 'doc';
            break;
          case '.zip':
          case '.rar':
            type = 'zip';
            break;
          case '.png':
          case '.jpg':
            type = 'jpg';
            break;
          case '.txt':
            type = 'txt';
            break;
          default:
            console.log('not match');
            type = 'xcel';
        }

        return {
          filename       : item.name,
          progress       : 0,
          changedfilename: item.name,
          type           : type,
        };
      });

      // self.setState({ nowUpfiles: arr });
      self.state.nowUpfiles = arr;

      upload(filelistarr);

      if ( filelistarr.length !== 0 ) {

        self.showModal();
      }
    });
  }
}

export default connect(
  ({ addcar }) => {
    return {
      step3: addcar.step3,
    };
  },
)(Step3);
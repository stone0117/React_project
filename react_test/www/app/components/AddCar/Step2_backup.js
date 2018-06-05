import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Input,
} from 'antd';
import { baseUrl } from '../../httpmanager/SNHTTPManager';

const FormItem    = Form.Item;
const Option      = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup  = Radio.Group;

class Step2_backup extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 组件将要接收Props
  componentWillReceiveProps(currentProps) {
    let previousProps = this.props;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if ( !err ) { console.log('Received values of form: ', values); }
      console.log(values);
    });
  }

  normFile(e) {
    console.log('Upload event:', e);
    if ( Array.isArray(e) ) {
      return e;
    }
    return e && e.fileList;
  }

  // 渲染(展示数据)
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout        = {
      labelCol  : { span: 6 },
      wrapperCol: { span: 14 },
    };

    // var address  = window.location.href;
    // var thisDLoc = document.location;
    // var hostport = document.location.host;

    // console.log(hostport);

    return (
      <div className="Step2">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem {...formItemLayout} label="Upload" extra="">
            {getFieldDecorator('upload', {
              valuePropName    : 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="files" action={`${baseUrl}/shangchuan`} listType="picture">
                <Button> <Icon type="upload"/> Click to upload </Button>
              </Upload>,
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Dragger">
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName    : 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action={`${baseUrl}/shangchuan`}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>,
              )}
            </div>
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>

        <hr/>
        <hr/>
        <hr/>
        <img src="" ref='myimg' alt="" style={{ width: '150px' }}/>
        <br/>
        <input type="file" ref='myfilectrl' onChange={(event) => {

          let file = event.target.files[ 0 ];

          let myimg = this.refs.myimg;

          let fr = new FileReader();

          fr.readAsDataURL(file);

          fr.onload = function (e) {
            myimg.src = e.currentTarget.result;
          };

          //上传
          let formData = new FormData();
          formData.append('files', file);

          let xhr = new XMLHttpRequest();

          xhr.upload.onprogress = function (v) {
            console.log(v.loaded / v.total);
          };

          xhr.open('POST', baseUrl + '/shangchuan', true);

          xhr.send(formData);

        }}/>
        <button onClick={(event) => {
          let file     = this.refs.myfilectrl.files[ 0 ];
          let formData = new FormData();
          formData.append('files', file);

          let xhr = new XMLHttpRequest();

          xhr.upload.onprogress = function (v) {
            console.log(v.loaded / v.total);
          };

          /**
           * 老方法
           */
          // var self   = this;
          // xhr.onload = function () {
          //   self.refs.myimg.src = xhr.responseText;
          // };

          xhr.open('POST', baseUrl + '/shangchuan', true);

          xhr.send(formData);

          /**
           * 快速显示.
           */
          // let self = this;
          //
          // let fr = new FileReader();
          // fr.readAsDataURL(file);
          //
          // fr.onload = function (e) {
          //   self.refs.myimg.src = e.currentTarget.result;
          // };

        }}>上传
        </button>
        <hr style={{ marginTop: '10px' }}/>
        <hr/>
        <hr/>
        <input type="file" ref="myfilectrl_copy" hidden multiple/>
        <div className="shangchuanniu" ref="shangchuanniu" style={{
          marginTop   : '10px',
          marginBottom: '10px',
        }}/>
        <div ref="imgbox" className="imgbox" style={{
          boxShadow: '0 0 0 1px #000 inset',
          padding  : '20px',
          minHeight: '100px',
        }}/>
        <hr style={{ marginTop: '10px' }}/>
        <hr/>
        <hr/>
        <input type="file" ref="myfilectrl_copy_copy" hidden multiple/>
        <div className="shangchuanniu_copy" ref="shangchuanniu_copy"/>
        <div ref="imgbox_copy" className="imgbox_copy"/>
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
        xhr.upload.onprogress = function (v) { console.log(v.loaded / v.total); };

        xhr.open('POST', baseUrl + '/shangchuan', true);

        xhr.send(formData);

        console.log("上传 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");

        let fr = new FileReader();

        fr.readAsDataURL(file);

        fr.onload = function (e) {
          // let image = new Image(100, 100);
          let $img = $("<img width='150' align='top'/>");
          $($img).prop('src', e.currentTarget.result);
          $(self.refs.imgbox).append($img);
        };
      }
    };

    $(this.refs.shangchuanniu).click(function (event) { $(self.refs.myfilectrl_copy).trigger('click'); });

    $(this.refs.myfilectrl_copy).on('change', function (event) {
      let filelistarr = event.target.files;
      upload(filelistarr);
    });

    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");

    const upload_copy = function (filelistarr) {
      //上传

      for ( let i = 0; i < filelistarr.length; ++i ) {

        let $div = $(`<div class="preDiv"></div>`);
        //这个图片的标记戳
        // let stamp = parseInt(Math.random() * 99999999999);

        let formData = new FormData();

        let file = filelistarr[ i ];

        formData.append('files', file);

        let xhr = new XMLHttpRequest();

        // 进度条
        xhr.upload.onprogress = function (v) {
          $div.html(parseInt(v.loaded / v.total * 100) + "%");
        };

        xhr.open('POST', baseUrl + '/shangchuan', true);

        xhr.send(formData);

        console.log("上传 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");

        let fr = new FileReader();

        fr.readAsDataURL(file);

        fr.onload = function (e) {
          $div.css("background-image", `url(${e.currentTarget.result})`);
          $(self.refs.imgbox_copy).append($div);
        };
      }
    };

    $(this.refs.shangchuanniu_copy).click(function (event) { $(self.refs.myfilectrl_copy_copy).trigger('click'); });

    $(this.refs.myfilectrl_copy_copy).on('change', function (event) {
      let filelistarr = event.target.files;
      upload_copy(filelistarr);
    });

    //拖拽文件悬浮
    $(this.refs.imgbox_copy).bind("dragover", function (e) {
      e.preventDefault();
      $(self.refs.imgbox_copy).addClass("cur");
    });
    //拖拽文件离开
    $(this.refs.imgbox_copy).bind("dragleave", function (e) {
      e.preventDefault();
      $(self.refs.imgbox_copy).removeClass("cur");
    });
    //松手了
    $(this.refs.imgbox_copy).bind("drop", function (e) {
      e.preventDefault();
      $(self.refs.imgbox_copy).removeClass("cur");
      let filelistarr = e.originalEvent.dataTransfer.files;
      upload_copy(filelistarr);
    });

    //允许拖拽更改位置
    $(this.refs.imgbox_copy).sortable();

  }
}

const WrappedStep2 = Form.create()(Step2_backup);

export default connect()(WrappedStep2);

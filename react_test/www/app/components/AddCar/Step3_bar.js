import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Row, Col, Button, message, Modal, Progress } from 'antd';

class Step3_bar extends Component {

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
    console.log(this.props);
    let { dispatch, filename, progress, changedfilename, setChangedfilename } = this.props;

    let extname = filename.match(/\.(.+)$/g)[ 0 ];

    let src = '';
    switch ( extname ) {
      case '.doc':
      case '.docx':
        src = 'doc.jpg';
        break;
      case '.zip':
      case '.rar':
        src = 'zip.jpg';
        break;
      case '.png':
      case '.jpg':
        src = 'jpg.jpg';
        break;
      case '.txt':
        src = 'txt.jpg';
        break;
      default:
        console.log('not match');
        src = 'xcel.jpg';
    }

    src = `/images/${src}`;

    return (
      // xml域

      <div className="Step3_bar">
        <Row>
          <Col span="4">
            <img className="sicon" src={src} alt=""/>
          </Col>
          <Col span="20" style={{ paddingTop: '21px', paddingBottom: '21px' }}>
            {
              progress === 100 ? <Input value={changedfilename} onChange={ event => {
                setChangedfilename(filename, event.target.value);
              }
              }/> : <div>{filename} < Progress percent={progress}/></div>
            }
            {/*<Progress percent={progress} status="active"/>*/}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Step3_bar);
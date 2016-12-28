import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
var Message = React.createClass({


  render() {

    return (
      <div className="index-content">
        <Row>
          <p className="P1">实验批次发布</p>
        </Row>
        <Row>
        <p>1. 可根据教学计划发布实验批次。</p>
        <p>2. 可在一周前对申请实验室的学生进行审核</p>
        <p>3. 对实验室基本信息的维护</p>
        <p>4. 查看个人基本信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p>5. 修改个人登陆密码</p>
        </Row>
      </div>
    );

  }

});

module.exports = Message;

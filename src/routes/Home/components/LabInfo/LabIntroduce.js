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
        <ul className="ul_list">
            <li>可根据教学计划发布实验批次。</li>
            <li>可在一周前对申请实验室的学生进行审核。</li>
            <li>对实验室基本信息的维护。</li>
            <li>查看个人基本信息。</li>
            <li>修改个人登陆密码。</li>
        </ul>
        </Row>
      </div>
    );

  }

});

module.exports = Message;

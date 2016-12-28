import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
var Message = React.createClass({


  render() {

    return (
      <div className="index-content">
        <Row>
          <p className="P1">学生预约功能介绍</p>
        </Row>
        <Row>
        <p>1. 可查看个人基本信息。</p>
        <p>2. 可申请预约实验室</p>
        <p>3. 查看个人预约记录</p>
        <p>4. 查看已取消的记录</p>
        <p>5. 修改个人登陆密码</p>
        </Row>
      </div>
    );

  }

});

module.exports = Message;

import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import '../css/ProcessBar.css';
var Message = React.createClass({


  render() {
    var content =
    <div className="index_content">
      <Row>
        <p className="P1">新手指南</p>
      </Row>
      <Row>
        <ul className="ul_list">
            <li>非本校学生不可以预约实验室</li>
            <li>登陆</li>
            <li>预约</li>
            <li>查询</li>
            <li>修改个人登陆密码</li>
        </ul>
      </Row>
    </div>
    return (
      <div className="center_news_right">
        <div className="box">
          <p className="bar"><a href="#">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="#">预约流程</a></p>
          <div className="line"></div>
          <div>{content}</div>
        </div>
      </div>
    );

  }

});

module.exports = Message;

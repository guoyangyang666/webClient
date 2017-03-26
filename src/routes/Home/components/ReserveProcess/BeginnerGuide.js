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
            <li>如您需预约请先登陆</li>
            <li>您可在首页“实验室信息”中可以对实验进行预约。</li>
            <li>也可在登陆后在导航栏中点击“学生预约服务”进行预约。</li>
            <li>在“学生预约服务”中可查看个人的预约记录及取消记录等功能。</li>
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

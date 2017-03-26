import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';

import '../css/ProcessBar.css';
var BookingGuide = React.createClass({


  render() {
    var content =
              <div className="index_content">
                <Row>
                  <p className="P1">预约指南</p>
                </Row>
                <Row>
                <ul className="ul_list">
                    <li>在预约之前请先先登陆。</li>
                    <li>可根据周数及实验室预约。</li>
                    <li>可在个人服务中查看个人信息、预约详情、取消详情等。</li>
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

module.exports = BookingGuide;

import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';

import '../css/ProcessBar.css';
var AppointNotice = React.createClass({


  render() {
    var content =
              <div className="index_content">
                <Row>
                  <p className="P1">预约须知</p>
                </Row>
                <Row>
                <ul className="ul_list">
                    <li>先登陆</li>
                    <li>预约</li>
                    <li>有什么问题联系管理员</li>
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

module.exports = AppointNotice;

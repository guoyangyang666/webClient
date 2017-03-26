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
                    <li>本校生根据学号及密码登陆系统方可预约实验室</li>
                    <li>初始密码默认为6个0，请您及时修改密码。</li>
                    <li>如您在预约过程中出现问题，请在“联系我们”中查找对应的人员进行询问。</li>
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

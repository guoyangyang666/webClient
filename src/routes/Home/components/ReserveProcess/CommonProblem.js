import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import '../css/ProcessBar.css';
var Message = React.createClass({


  render() {
    var content =
    <div className="index_content">
      <Row>
        <p className="P1">常见问题</p>
      </Row>
      <Row>
        <ul className="ul_list">
            <li>是否能一定预约上？答：不一定。实验室的容量有限，当您预约后，实验室管理员会在上课前一周内审核。</li>
            <li>密码忘记怎么办？答：您可在登陆界面点击“忘记密码？”中找回。</li>
            <li>预约不上怎么办？答：每个实验分为多个批次，您可在方便的时间预约下个批次。</li>
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

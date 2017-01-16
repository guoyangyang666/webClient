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
        <ul className="ul_list">
           <li>可查看个人基本信息 ;</li>
           <li>可申请预约实验室 ;</li>
           <li>查看个人预约记录 ;</li>
           <li>查看已取消的记录 ;</li>
        	 <li>修改个人登陆密码 .</li>
        </ul>    
        </Row>
      </div>
    );

  }

});

module.exports = Message;

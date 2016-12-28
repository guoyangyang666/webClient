import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import NavigationBar from './NavigationBar';
import LoginDesc from './LoginDesc';
var Message = React.createClass({
  render() {
    return (
      <div>
        <div className="top">
        <div style={{float:'right', marginRight:'2%'}}><LoginDesc/></div>
          <div className="topT">开放实验室网上预约平台</div>
          <div className="topB">
            <NavigationBar/>
          </div>
          <div className="logo">
            <img src={$IMAGE_ROOT_PATH+"/logo.png"}/>
          </div>
        </div>
      </div>
    );

  }

});

module.exports = Message;

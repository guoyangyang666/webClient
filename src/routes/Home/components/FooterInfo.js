import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
var Message = React.createClass({
  render() {
    return (
      <div>
        <div className="bottom">
          <div className="bottom_p">
            <span>版权所有©河北经贸大学</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>地址：河北省石家庄市学府路47号</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>邮编：050061</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>冀ICP备05002801号</span>
          </div>
        </div>
      </div>
    );

  }

});

module.exports = Message;

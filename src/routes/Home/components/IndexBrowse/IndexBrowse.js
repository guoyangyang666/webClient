import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import LabNotice from './LabNotice';
import Equip from './Equip';
var Message = React.createClass({
  getInitialState() {
    return {
       current: 'mail',
       displayStatus:'true',
       displayStatus1:'false',
    };
  },
  render() {
    var cauous = <div>
                  <div className="cauous-content">
                    <Carousel autoplay dots='false' className="cauous">
                      <div><div className="cauous-1"></div></div>
                      <div><div className="cauous-2"></div></div>
                      <div><div className="cauous-3"></div></div>
                      <div><div className="cauous-4"></div></div>
                    </Carousel>
                  </div>
                </div>;
    var cardprocess =
            <div>
              <div className="centerT">
                <ul>
                  <li>
                    <div>1</div>
                    <div>
                      <p className="text1">登录</p>
                      <p className="text2">该系统只能本校学生、教师进行预约实验室，需要登陆并验证登录进入系统。</p>
                    </div>
                  </li>
                  <li>
      							<div>2</div>
      							<div>
    	  							<p className="text1">实验室预约申请</p>
    	  							<p className="text2">进入实验室预约申请界面，查看当前可预约的时间，并选择需要预约的时间段，提交申请。</p>
      							</div>
      						</li>
                  <li>
      							<div>3</div>
      							<div>
    	  							<p className="text1">预约状态查询</p>
    	  							<p className="text2">提交申请后，管理员会审核你提交的预约申请，如果申请符合要求并且在人数容纳范围内，您的申请将被允许通过。</p>
      							</div>
      						</li>
                </ul>
              </div>
            </div>;
      var centerMLeft = <div>
                <div className="centerM_left">
                  <div>实验室预订信息</div>
                  <p><span>张晓婷</span><span>成功预约</span><span>比表面积孔径分析仪</span><span>2016-12-29</span><span>08:00--16:00</span></p>
                  <p><span>郭洋洋</span><span>成功预约</span><span>比表面积孔径分析仪</span><span>2016-12-29</span><span>08:00--16:00</span></p>
                  <p><span>丁宇</span><span>成功预约</span><span>比表面积孔径分析仪</span><span>2016-12-29</span><span>08:00--16:00</span></p>
                  <p><span>张明月</span><span>成功预约</span><span>比表面积孔径分析仪</span><span>2016-12-29</span><span>08:00--16:00</span></p>
                  <p><span>王小红</span><span>成功预约</span><span>比表面积孔径分析仪</span><span>2016-12-29</span><span>08:00--16:00</span></p>
                  <p><span>王小兰</span><span>成功预约</span><span>比表面积孔径分析仪</span><span>2016-12-29</span><span>08:00--16:00</span></p>
                </div>
              </div>;
    return (
      <div>
        <Row>
          {cauous}
        </Row>
        <div className="center-index">
          <div>{cardprocess}</div>
          <div className="center-index-process"></div>
          <div className="centerM">
            <div>{centerMLeft}</div>
            <div className="center-left-line"></div>
            <div><LabNotice/></div>
          </div>
          <div><Equip/></div>
        </div>

      </div>

    );

  }

});

module.exports = Message;

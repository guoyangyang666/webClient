import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import LabNotice from './LabNotice';
import Equip from './Equip';
import TeacherAppoint from './TeacherAppoint';
//预约信息单个列表
const SingleAppoint = React.createClass({
  getInitialState(){
    return{
      show:false,
    };
  },
  render(){
    const {id} = this.props;//唯一标识id
    const {staff_name} = this.props;//教师名
    const {experim_name} = this.props;//实验名
    const {appoint_week} = this.props;//预约的周数
    const {week} = this.props;//周几
    const {start_times} = this.props;//开始的课时
    const {stop_times} = this.props;//结束的课时
    return(
        <p><span>{staff_name}</span><span>成功预约</span><span>{experim_name}</span><span>{appoint_week}</span><span>{week}{start_times}-{stop_times}</span></p>
    )
  }
});
var Message = React.createClass({
  getInitialState() {
    return {
       current: 'mail',
       displayStatus:'true',
       displayStatus1:'false',
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/teacher/quryTeacherAppoint.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
      },
      async:true
    },function(response){
       var res = response;
       console.log("res",res)
       self.setState({
         res:res,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  teachterList(){
    $history.push("/TeacherAppoint");
  },
  render() {
    const recordList =[];
    var res = this.state.res;
    console.log("res111",res);
    if(res==''||res==undefined){
      var centerMLeft=<div>zanwu</div>
    }else{
      for(var i=0; i<res.length; i++){
        var id = res[i].id;
        var experim_name = res[i].experim_name;
        var appoint_week = "第"+res[i].appoint_week+"周";
        var week = "星期"+res[i].week;
        var stop_times = res[i].stop_times+"节";
        var start_times = "第"+res[i].start_times+"节";
        var staff_name = res[i].staff_name;
        recordList.push({key : i, content : <SingleAppoint id={id} staff_name={staff_name}
          experim_name={experim_name} appoint_week={appoint_week} week={week}
          start_times={start_times} stop_times={stop_times}/>});
      }
    }

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
                          <div className="centerM_left_title">实验室预订信息</div>
                          <Button onClick={this.teachterList} type="primary" style={{marginTop:'-10%',marginRight:'20%'}}  className="centerM_right_more">更多</Button>

                          {recordList.map(map => (
                          <div key={map.key}>
                            {map.content}
                          </div>
                        ))}
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

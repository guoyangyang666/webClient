import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,Tabs} from 'antd';
import TeacherIntroduce from './TeacherIntroduce';
import UpdatePassword from '../Students/UpdatePassword';
import ReserveRecord from '../Students/ReserveRecord';
import MissRecords from '../Students/MissRecords';
import AppointRecord from '../teacher/AppointRecord';
import CancelRecords from '../Students/CancelRecords';
import StuInfo from '../Students/StuInfo';
import TeacherRecord from './TeacherRecord';
import CancelRecord from './CancelRecord';
import StuRecords from './StuRecords';
import TeacherInfo from './TeacherInfo';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//全局变量
const StuReserve = React.createClass({
  getInitialState() {
    return {
      current:'',
      content:<TeacherIntroduce/>,
    };
  },
  componentWillMount() {
  //this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;

    // var url = $CONTEXT_ADDR + '/students/login.do';
    // $ajax.get({
    //   type: "POST",
    //   url: url,
    //   dataType: "json",
    //   data : {
    //     id :"studentNo",//学生学号
    //     loginPw :"loginPw",//学生登陆密码
    //   },
    //   async:true
    // },function(response){
    //   alert(response)
    //     global.$userInfo={
    //       name:name,
    //     };
    //     self.setState({
    //
    //     });
    // },function(e){
    //   //console.log("e..." , e);
    // });
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key == "TeacherIntroduce"){
      this.state.content = <TeacherIntroduce/>;
    }else if(e.key == "UpdatePassword1"){
      this.state.content = <UpdatePassword/>;
    }else if(e.key == "ReserveRecord1"){
      this.state.content = <ReserveRecord/>;
    }else if(e.key == "MissRecords1"){
      this.state.content = <MissRecords/>;
    }else if(e.key == "AppointRecord"){
      this.state.content = <AppointRecord/>;
    }else if(e.key == "CancelRecords1"){
      this.state.content = <CancelRecords/>;
    }else if(e.key == "StuInfo1"){
      this.state.content = <StuInfo/>;
    }else if(e.key == "TeacherRecord"){
      this.state.content = <TeacherRecord/>;
    }else if(e.key == "CancelRecord"){
      this.state.content = <CancelRecord/>;
    }else if(e.key == "StuRecords"){
      this.state.content = <StuRecords/>;
    }
    else if(e.key == "TeacherInfo"){
      this.state.content = <TeacherInfo/>;
    }


  },

  render() {
    return (
      <div>
        <div className="center_news">
          <div className="center_news_left">
            <div>教师预约服务</div>
            <Menu onClick={this.handleClick}
            defaultSelectedKeys={['StuReserveIntroduce']}
              mode="inline"
              className="Menu-all"
            >
            <Menu.Item key="TeacherIntroduce" className="menu">
              <span className="nav-text">教师预约简介</span>
            </Menu.Item>
            <Menu.Item key="AppointRecord" className="menu">
              <span className="nav-text">实验项目批次的确认</span>
            </Menu.Item>
            <Menu.Item key="TeacherRecord" className="menu">
              <span className="nav-text">预约记录</span>
            </Menu.Item>
            <Menu.Item key="CancelRecord" className="menu">
              <span className="nav-text">已取消记录</span>
            </Menu.Item>
            <Menu.Item key="StuRecords" className="menu">
              <span className="nav-text">查看学生预约</span>
            </Menu.Item>
            <Menu.Item key="TeacherInfo" className="menu">
              <span className="nav-text">个人基本信息</span>
            </Menu.Item>
            <Menu.Item key="UpdatePassword1" className="menu">
              <span className="nav-text">修改个人登陆密码</span>
            </Menu.Item>
            </Menu>
          </div>
          <div className="center_news_right">
            <div className="box">
              <p className="bar"><a href="#">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="#">教师服务</a></p>
              <div className="line"></div>
              <div>{this.state.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});


module.exports = StuReserve

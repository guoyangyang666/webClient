import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,Tabs} from 'antd';
import StuReserveIntroduce from './StuReserveIntroduce';
import UpdatePassword from './UpdatePassword';
import ReserveRecord from './ReserveRecord';
import MissRecords from './MissRecords';
import AppointRecord from './AppointRecord';
import CancelRecords from './CancelRecords';
import StuInfo from './StuInfo';
import StuRecord from './StuRecord';
import StuCancel from './StuCancel';
import StuAppoint from './StuAppoint';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//全局变量
const StuReserve = React.createClass({
  getInitialState() {
    return {
      current:'',
      content:<StuReserveIntroduce/>,
    };
  },
  componentWillMount() {
  //this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key == "StuReserveIntroduce"){
      this.state.content = <StuReserveIntroduce/>;
    }else if(e.key == "UpdatePassword"){
      this.state.content = <UpdatePassword/>;
    }else if(e.key == "ReserveRecord"){
      this.state.content = <ReserveRecord/>;
    }else if(e.key == "MissRecords"){
      this.state.content = <MissRecords/>;
    }else if(e.key == "AppointRecord"){
      this.state.content = <AppointRecord/>;
    }else if(e.key == "CancelRecords"){
      this.state.content = <CancelRecords/>;
    }else if(e.key == "StuInfo"){
      this.state.content = <StuInfo/>;
    }else if(e.key == "StuRecord"){
      this.state.content = <StuRecord/>;
    }else if(e.key == "StuCancel"){
      this.state.content = <StuCancel/>;
    }else if(e.key == "StuAppoint"){
      this.state.content = <StuAppoint/>;
    }

  },

  render() {
    return (
      <div>
        <div className="center_news">
          <div className="center_news_left">
            <div>学生预约服务</div>
            <Menu onClick={this.handleClick}
            defaultSelectedKeys={['StuReserveIntroduce']}
              mode="inline"
              className="Menu-all"
            >
            <Menu.Item key="StuReserveIntroduce" className="menu">
              <span className="nav-text">学生预约简介</span>
            </Menu.Item>
            <Menu.Item key="StuAppoint" className="menu">
              <span className="nav-text">申请预约</span>
            </Menu.Item>
            <Menu.Item key="StuRecord" className="menu">
              <span className="nav-text">预约记录</span>
            </Menu.Item>
            <Menu.Item key="StuCancel" className="menu">
              <span className="nav-text">已取消记录</span>
            </Menu.Item>
            <Menu.Item key="StuInfo" className="menu">
              <span className="nav-text">个人基本信息</span>
            </Menu.Item>
            <Menu.Item key="UpdatePassword" className="menu">
              <span className="nav-text">修改个人登陆密码</span>
            </Menu.Item>
            </Menu>
          </div>
          <div className="center_news_right">
            <div className="box">
              <p className="bar"><a href="#">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="#">学生预约</a></p>
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

import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,Tabs} from 'antd';
import LabIntroduce from './LabIntroduce';
import UpdatePassword from '../UpdatePassword';
import LabInfo from './LabInfo';
import LabNoClassTime from './LabNoClassTime';
import LabEquip from './LabEquip';
import LabEquipAdd from './LabEquipAdd';
import LabAdminInfo from './LabAdminInfo';
import LabAdminExamine from './LabAdminExamine';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//全局变量
const LabAdmin = React.createClass({
  getInitialState() {
    return {
      current:'',
      content:<LabIntroduce/>,
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
    if(e.key == "LabIntroduce"){
      this.state.content = <LabIntroduce/>;
    }else if(e.key == "UpdatePassword"){
      this.state.content = <UpdatePassword/>;
    }else if(e.key == "LabInfo"){
      this.state.content = <LabInfo/>;
    }else if(e.key == "LabNoClassTime"){
      this.state.content = <LabNoClassTime/>;
    }else if(e.key == "LabEquip"){
      this.state.content = <LabEquip/>;
    }else if(e.key == "LabAdminInfo"){
      this.state.content = <LabAdminInfo/>;
    }else if(e.key == "LabAdminExamine"){
      this.state.content = <LabAdminExamine/>;
    }

  },

  render() {
    return (
      <div>
        <div className="center_news">
          <div className="center_news_left">
            <div>实验室管理员服务</div>
            <Menu onClick={this.handleClick}
            defaultSelectedKeys={['LabIntroduce']}
              mode="inline"
              className="Menu-all"
            >
            <Menu.Item key="LabIntroduce" className="menu">
              <span className="nav-text">实验室管理简介</span>
            </Menu.Item>
            <Menu.Item key="LabNoClassTime" className="menu">
              <span className="nav-text">实验无课时间发布</span>
            </Menu.Item>
            <Menu.Item key="Register7" className="menu">
              <span className="nav-text">实验批次发布</span>
            </Menu.Item>
            <Menu.Item key="LabAdminExamine" className="menu">
              <span className="nav-text">审核学生申请</span>
            </Menu.Item>
            <Menu.Item key="LabInfo" className="menu">
              <span className="nav-text">实验室基本信息维护</span>
            </Menu.Item>
            <Menu.Item key="LabEquip" className="menu">
              <span className="nav-text">实验室设备信息维护</span>
            </Menu.Item>
            <Menu.Item key="LabAdminInfo" className="menu">
              <span className="nav-text">查看个人基本信息</span>
            </Menu.Item>
            <Menu.Item key="UpdatePassword" className="menu">
              <span className="nav-text">修改个人登陆密码</span>
            </Menu.Item>
            <Menu.Item key="uploadLabData" className="menu">
              <span className="nav-text">上传实验资料</span>
            </Menu.Item>
            </Menu>
          </div>
          <div className="center_news_right">
            <div className="box">
              <p className="bar"><a href="#">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="#">实验室管理页面</a></p>
              <div className="line"></div>
              <div>{this.state.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});


module.exports = LabAdmin

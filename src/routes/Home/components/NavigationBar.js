import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const NavigationBar = React.createClass({
  getInitialState() {
    return {
       current: 'mail',
       displayStatusStu:false,//学生预约导航栏状态
       displayStatus:true,
       displayStatusTea:false,//教师预约导航栏状态
       displayStatusAdm:false,//实验室管理员导航栏状态
    };
  },
  componentWillMount() {
   this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var gtype = localStorage.getItem('logintype');
    if(gtype == "3"){
      this.setState({ displayStatusStu: !this.state.displayStatusStu });
      this.setState({ displayStatus: !this.state.displayStatus });
    }else if(gtype == "2"){
      this.setState({ displayStatusTea: !this.state.displayStatusTea });
      this.setState({ displayStatus: !this.state.displayStatus });
    }else if(gtype == "1"){
      this.setState({ displayStatusAdm: !this.state.displayStatusAdm });
      this.setState({ displayStatus: !this.state.displayStatus });
    }
    // var url = $CONTEXT_ADDR + '/personalBasicInfo/basicInfo.ws';
    // $ajax.get({
    //   type: "POST",
    //   url: url,
    //   dataType: "String",
    //   data : {
    //     bmName :"cardType"
    //   },
    //   async:true
    // },function(response){
    //
    //
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
      $history.push("/home/"+e.key);
  },

  render() {
    const displayStatusStu = this.state.displayStatusStu;
    const displayStatus = this.state.displayStatus;
    const displayStatusTea = this.state.displayStatusTea;
    const displayStatusAdm = this.state.displayStatusAdm;
    return (
      <div>
      <Menu onClick={this.handleClick}
      selectedKeys={[this.state.current]}
      mode="horizontal"
    >
      <Menu.Item key="IndexHome">
        <Icon type="mail" />首页
      </Menu.Item>
      <Menu.Item key="ReserveProcess">
        <Icon type="mail" />预约流程
      </Menu.Item>
      <Menu.Item key="NewsList">
        <Icon type="mail" />新闻动态
      </Menu.Item>
      <Menu.Item key="LabEquip1">
        <Icon type="mail" />设备展示
      </Menu.Item>
      <Menu.Item key="mail6">
        <Icon type="mail" />资料下载
      </Menu.Item>
      <Menu.Item key="mail4">
        <Icon type="mail" />联系我们
      </Menu.Item>
      <Menu.Item key="LoginDesc" className={displayStatus ? "displayStatus" : "displayStatus1"}>
        <Icon type="mail" />预约服务
      </Menu.Item>
      <Menu.Item key="StuReserve" className={displayStatusStu ? "displayStatusStu1" : "displayStatusStu"}>
        <Icon type="mail" />学生预约服务
      </Menu.Item>
      <Menu.Item key="TeacherReserve" className={displayStatusTea ? "displayStatusTea" : "displayStatusTea1"}>
        <Icon type="mail" />教师预约服务
      </Menu.Item>
      <Menu.Item key="LabAdmin" className={displayStatusAdm ? "displayStatusAdm" : "displayStatusAdm1"}>
        <Icon type="mail" />实验室管理服务
      </Menu.Item>
    </Menu>
      </div>
    );
  },
});

module.exports = NavigationBar

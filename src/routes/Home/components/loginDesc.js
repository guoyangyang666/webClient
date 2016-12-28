import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//全局变量
const LoginDesc = React.createClass({
  getInitialState() {
    return {
       current: 'mail',
       displayStatus:'true',
       displayStatus1:'false',
    };
  },
  componentWillMount() {
  this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var gname = localStorage.getItem('loginName');
    if(gname != null){
        this.setState({ displayStatus: !this.state.displayStatus });
        this.setState({ displayStatus1: !this.state.displayStatus1 });
    }
  },
  login(){
    $history.push("LoginInfo");
  },
  logOut(){
    if(localStorage.getItem('number') == null){
      console.log("为输入");
      Modal.error({
        title: '您未登陆',
        content: '注销之前请先登陆',
      });
    }else {
      localStorage.clear('number');
      localStorage.clear('loginPw');
      localStorage.clear('loginName');
      localStorage.clear('logintype');
      localStorage.clear('laboratoryId');
      this.setState({ displayStatus: !this.state.displayStatus });
      this.setState({ displayStatus1: !this.state.displayStatus1 });
      window.location.reload(1);
      $history.push("/");
    }

  },
  render() {
    const displayStatus = this.state.displayStatus;
    const displayStatus1 = this.state.displayStatus1;
    return (
      <div className="loginDesc">
        <div className={displayStatus ? "login-login" : "login-login1"} onClick={this.login}>登陆</div>
        <div className={displayStatus1 ? "login-login2" : "login-login"}>欢迎{localStorage.getItem('loginName')}</div>
        <div className="login-login" onClick={this.logOut}>注销</div>
      </div>
    );
  },
});

module.exports = LoginDesc

import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,Tabs} from 'antd';
import '../css/ProcessBar.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//全局变量
const ProcessBar = React.createClass({
  getInitialState() {
    return {
      current:'',
      content:'',
      collapse: true,
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
    $history.push("/ReserveProcess/"+e.key);
  },
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },

  render() {
    const collapse = this.state.collapse;
    return (
      <div>
       <div className="ant-layout-aside">
         <aside className="ant-layout-sider">

           <Menu mode="inline" theme="dark" defaultSelectedKeys={['BeginnerGuide']} onClick={this.handleClick}>
             <Menu.Item key="BeginnerGuide" className="menu">
               <span className="nav-text">新手指南</span>
             </Menu.Item>
             <Menu.Item key="AppointNotice" className="menu">
               <span className="nav-text">预约须知</span>
             </Menu.Item>
             <Menu.Item key="BeginnerGuide1" className="menu">
               <span className="nav-text">预约指南</span>
             </Menu.Item>
             <Menu.Item key="BeginnerGuide2" className="menu">
               <span className="nav-text">常见问题</span>
             </Menu.Item>
           </Menu>
        </aside>
       </div>
     </div>
    );
  },
});


module.exports = ProcessBar

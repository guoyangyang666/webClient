import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop, } from 'antd';
import LoginInfo from './LoginInfo';
import LabAdmin from './LabInfo/LabAdmin';
import IndexBrowse from './IndexBrowse/IndexBrowse';//首页正文部分
import TemporaryCardLoss from './TemporaryCardLoss';
import StuReserve from './StuReserve';
import TeacherReserve from './teacher/TeacherReserve';
import ReserveProcess from './ReserveProcess/ReserveProcess';//预约流程
import NewsList from './News/NewsList';//新闻列表
import HeaderInfo from './HeaderInfo';//网页头部
import FooterInfo from './FooterInfo';//网页尾部
import EquipBar from './IndexBrowse/EquipBar';//设备展示页
//首页
const Home = React.createClass({
  getInitialState() {
    return {
      jumpIndex:'',
      name:'',
    };
  },
  componentWillMount() {
  //  this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/personalBasicInfo/basicInfo.ws';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        bmName :"cardType"
      },
      async:true
    },function(response){
        var res = Immutable.fromJS(response);
        var patient = res.get(res.size-2).get('patientRole').get('patient');
        var name = patient.get('name');//姓名
        global.$userInfo={
          name:name,
        };
        self.setState({
          name:name,
        });
    },function(e){
      //console.log("e..." , e);
    });
  },

  render() {
        var style = {
         top :{background:'#428fb9',
               fontSize:24
               },
        };
        if(this.props.id == undefined){
         this.state.jumpIndex = <IndexBrowse/>;
        }
        if(this.props.id=='IndexHome'){  //首页
         this.state.jumpIndex = <IndexBrowse/>;
        }
        if(this.props.id=='NewsList'){  //新闻
         this.state.jumpIndex = <NewsList/>;
        }
        if(this.props.id=='EquipBar'){  //新闻
         this.state.jumpIndex = <EquipBar/>;
        }
        if(this.props.id=='LoginDesc'){
          $history.push("LoginInfo");//登陆
        }
        if(this.props.id=='LabAdmin'){  //实验室管理员
         this.state.jumpIndex = <LabAdmin/>;
        }
        if(this.props.id=='StuReserve'){  //学生预约服务
         this.state.jumpIndex = <StuReserve/>;
        }
        if(this.props.id=='TeacherReserve'){  //学生预约服务
         this.state.jumpIndex = <TeacherReserve/>;
        }
        if(this.props.id=='ReserveProcess'){  //预约流程
         this.state.jumpIndex = <ReserveProcess/>;
        }
    return (
        <div>
          <Row>
            <HeaderInfo/>
          </Row>
          <Row>
            <div >
              {this.state.jumpIndex}
            </div>
          </Row>
          <Row>
            <FooterInfo/>
          </Row>
        </div>
    );
  },
});

class Index extends React.Component {
  render() {
    const {id} = this.props.params;
    return <Home id={id}/>
  }
}

module.exports = Index

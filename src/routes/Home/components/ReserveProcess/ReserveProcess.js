import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Tabs } from 'antd';
import '../css/ProcessBar.css';
import HeaderInfo from '.././HeaderInfo';//流程左侧导航栏
import FooterInfo from '.././FooterInfo';//流程左侧导航栏
import ProcessBar from './ProcessBar';//流程左侧导航栏
import BeginnerGuide from './BeginnerGuide';//新手指南
import AppointNotice from './AppointNotice';//预约须知
import BookingGuide from './BookingGuide';//预约指南
import CommonProblem from './CommonProblem';//常见问题
const TabPane = Tabs.TabPane;
const ReserveProcess = React.createClass({
  getInitialState() {
    return {
       tabPosition: 'left',
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
        if(this.props.barId == undefined){
          console.log("111111");
         this.state.jumpIndex = <BeginnerGuide/>;
        }

        if(this.props.barId=='BeginnerGuide'){  //新手指南
          console.log("2222");
         this.state.jumpIndex = <BeginnerGuide/>;
        }
        if(this.props.barId=='AppointNotice'){
          this.state.jumpIndex = <AppointNotice/>;//预约须知
        }
    return (
      <div>
        <div className="center_news">
          <div>
          <div className="about_tab">预约须知</div>
            <Tabs defaultActiveKey="2" tabPosition={this.state.tabPosition}>
             <TabPane tab="test" key="1"><BeginnerGuide/></TabPane>
             <TabPane tab="新手指南" key="2"><BeginnerGuide/></TabPane>
             <TabPane tab="预约须知" key="3"><AppointNotice/></TabPane>
             <TabPane tab="预约指南" key="4"><BookingGuide/></TabPane>
             <TabPane tab="常见问题" key="5"><CommonProblem/></TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  },
});

class Index extends React.Component {
  render() {
    const {barId} = this.props;
    return <ReserveProcess barId={barId}/>
  }
}

module.exports = Index


/*



*/

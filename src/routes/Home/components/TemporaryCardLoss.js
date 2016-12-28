import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,BackTop,Steps,message } from 'antd';
const Step = Steps.Step;
var First1 = <div className="loss_brush"><p className="loss_brush_card" >点击开始进行挂失服务</p></div>;
var Second = <div className="loss_brush"><p className="loss_brush_card">请刷身份证</p></div>;
var Message = React.createClass({
  //初始化
    getInitialState(){
      return{
        current:'0',
        displayStatus:'true',
      };
    },
    componentWillMount() {
      //this.queryBasicInfo();
    },

    queryBasicInfo(){
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

        self.setState({

        });
      });
    },
  next:function() {
     const current = this.state.current + 1;
     this.setState({ current });
     this.setState({displayStatus:!this.state.displayStatus});
   },
  render: function(){
    const { current } = this.state;
    const displayStatus = this.state.displayStatus;
    return(
      <div className="loss-content">
        <div className="dtitle">挂失服务</div>
        <Steps current={current}>
         <Step title="NO.1" description="开始" />
         <Step title="NO.2" description="刷身份证" />
         <Step title="NO.3" description="完成" />
        </Steps>
        <div className="steps-content">
          <div className={displayStatus ? "loss_brush" : "loss_brush2"}>
            <p className="loss_brush_card" onClick={this.next}>开始挂失服务</p>
          </div>
          <div className={displayStatus ? "loss_brush2" : "loss_brush1"}>
            <p className="loss_brush_card" onClick={this.next}>请刷卡</p>
            <Input placeholder="Basic usage" />
          </div>
        </div>

      </div>
    );
  }
});

 module.exports = Message

import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
const Message = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      loginPw:'',
    };
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/addLabInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": this.state.id,//登陆密码
        "laboratory_name": this.state.laboratory_name,//登陆密码
        "laboratory_adress": this.state.laboratory_adress,//登陆密码
        "laboratory_adressnum": this.state.laboratory_adressnum,//登陆密码
        "category_id": this.state.category_id,//登陆密码
        "laboratory_desc": this.state.laboratory_desc,//登陆密码
        "laboratory_renshu": this.state.laboratory_renshu,//登陆密码
        "staff_id": localStorage.getItem('number'),//号
      },
      async:true
    },function(response){
      var res = response;
      if(res.length == "0"){
        Modal.success({
          title: '密码修改失败',
          content: '返回',
        });
      }else {
        Modal.success({
          title: '密码修改成功',
          content: '确认',
        });
      }
      self.setState({
        loginPw:loginPw,
        loginName:loginName,//用户名
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    console.log(e.key);
  },

  render() {
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
        <Row>
          <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>实验室无课时间发布</p>
        </Row>
        <div>
           <iframe src="hc-mops/LabNoClassTime/index.html" width="100%" height="400" frameborder="0"  border="0" marginwidth="0" marginheight="0" scrolling="no"> </iframe>
       </div>
      </div>

    );

  }

}));

module.exports = Message;

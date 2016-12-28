import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select } from 'antd';
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
  handleSubmit(e) {
     e.preventDefault();
     if(this.state.id == null){
       Modal.warning({
         title: '实验室编号为空',
         content: '请输入实验室编号',
       });
     }else if(this.state.laboratory_name == null) {
       Modal.warning({
         title: '实验室名称为空',
         content: '请输入实验室名称',
       });
     }else{
          this.queryBasicInfo();
     }
   },
   handleChange: function(name, event){
     var newState = {};
     newState[name] = event.target.value;
     this.setState(newState);
     console.log(event.target.value);
   },

  render() {
    const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
    const tailFormItemLayout = {
          wrapperCol: {
          span: 14,
          offset: 6,
      },
    };
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>教师基本信息维护</p>
      </Row>
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
        {...formItemLayout}
        label="教师工号："
        hasFeedback
      >
        <Input type="text" value='12'
         onChange={this.handleChange.bind(this,'id')}/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教师姓名："
        hasFeedback
      >
          <Input type="text" value='曹淑服'
           onChange={this.handleChange.bind(this,'laboratory_name')}/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="职称："
        hasFeedback
      >
          <Input type="text" value='讲师'
           onChange={this.handleChange.bind(this,'category_id')}/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="身份证号："
        hasFeedback
      >
          <Input type="text" value='34345656556555656'
           onChange={this.handleChange.bind(this,'laboratory_adress')}/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="电话："
        hasFeedback
      >
          <Input type="text" value='123456778'
           onChange={this.handleChange.bind(this,'laboratory_adressnum')}/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教师性别："
        hasFeedback
      >
          <Input type="text" value='女'
           onChange={this.handleChange.bind(this,'laboratory_renshu')}/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教师简介："
        hasFeedback
      >
          <Input type="text" value='暂无'
           onChange={this.handleChange.bind(this,'laboratory_desc')}/>
      </FormItem>
      </Form>
      </div>
    );

  }

}));

module.exports = Message;

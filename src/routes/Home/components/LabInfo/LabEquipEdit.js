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
    var content1 =
    <div style={{clear:'none',paddingTop:'5%'}}>
    <Row>
      <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>实验室基本信息维护</p>
    </Row>
      <Form horizontal onSubmit={this.handleSubmit}>
    <Row>
      <Col span={6}>
        <FormItem
        {...formItemLayout}
        label="实验室编号："
        hasFeedback
        >
        <Input type="password" value={this.state.id}
         onChange={this.handleChange.bind(this,'id')}/>
        </FormItem>
      </Col>
      <Col span={6}>
      <FormItem
        {...formItemLayout}
        label="实验室名称："
        hasFeedback
      >
          <Input type="password" value={this.state.laboratory_name}
           onChange={this.handleChange.bind(this,'laboratory_name')}/>
      </FormItem>
      </Col>
    </Row>
    <FormItem
      {...formItemLayout}
      label="实验室类别："
      hasFeedback
    >
        <Input type="password" value={this.state.category_id}
         onChange={this.handleChange.bind(this,'category_id')}/>
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="地点："
      hasFeedback
    >
        <Input type="password" value={this.state.laboratory_adress}
         onChange={this.handleChange.bind(this,'laboratory_adress')}/>
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="教室号："
      hasFeedback
    >
        <Input type="password" value={this.state.laboratory_adressnum}
         onChange={this.handleChange.bind(this,'laboratory_adressnum')}/>
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="容量："
      hasFeedback
    >
        <Input type="password" value={this.state.laboratory_renshu}
         onChange={this.handleChange.bind(this,'laboratory_renshu')}/>
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="简介："
      hasFeedback
    >
        <Input type="password" value={this.state.laboratory_desc}
         onChange={this.handleChange.bind(this,'laboratory_desc')}/>
    </FormItem>
      <FormItem {...tailFormItemLayout}>
       <Button type="primary" htmlType="submit" size="large">确认提交</Button>
     </FormItem>
    </Form>
    </div>

    return (
      <div>79879</div>
    );

  }

}));

module.exports = Message;

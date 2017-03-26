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
      //实验室管理员
      staff_id:'',//教职工编号
      staff_name:'',//教职工姓名
      staff_sex:'',//教职工性别（1为男，2为女）
      staff_phone:'',//教职工电话
      staff_adress:'',//教职工居住地址
      staff_cardnumber:'',//身份证号
      staff_ranks:'',//职称
      staff_desc:'',//职工简介
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/queryLabAdminInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "staff_id": localStorage.getItem('number'),//职工编号
      },
      async:true
    },function(response){
      var res = response[0];
      var staff_id = res.id;//教职工编号
      var staff_name = res.staff_name;//教职工姓名
      var staff_sex = res.staff_sex;//教职工性别（1为男，2为女）
      var staff_phone = res.staff_phone;//教职工电话
      var staff_adress = res.staff_adress;//教职工居住地址
      var staff_cardnumber = res.staff_cardnumber;//身份证号
      var staff_ranks = res.staff_ranks;//职称
      var staff_desc = res.staff_desc;//职工简介
      self.setState({
        staff_id:staff_id,//教职工编号
        staff_name:staff_name,//教职工姓名
        staff_sex:staff_sex,//教职工性别（1为男，2为女）
        staff_phone:staff_phone,//教职工电话
        staff_adress:staff_adress,//教职工居住地址
        staff_cardnumber:staff_cardnumber,//身份证号
        staff_ranks:staff_ranks,//职称
        staff_desc:staff_desc,//职工简介
      });
    },function(e){
      //console.log("e..." , e);
    });
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
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>管理员个人基本信息</p>
      </Row>
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
        {...formItemLayout}
        label="管理员工号："
        hasFeedback
      >
        <Input type="text" value={this.state.staff_id}
         />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="管理员姓名："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="性别"
        hasFeedback
      >
          <Input type="text" value={this.state.staff_sex}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="电话："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_phone}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="地址："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_adress}
          />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="身份证号："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_cardnumber}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="管理员职称："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_ranks}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="管理员简介："
        hasFeedback
      >
          <Input id="staff_desc" type="text" value={this.state.staff_desc}
           />
      </FormItem>
      </Form>
      </div>
    );

  }

}));

module.exports = Message;

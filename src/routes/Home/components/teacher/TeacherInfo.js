import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Message = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      id:'',//教师工号
      staff_name:'',//教师姓名
      staff_sex:'',//教师性别
      staff_phone:'',//教师电话
      staff_adress:'',//教师家庭住址
      staff_cardnumber:'',//教师身份证号
      staff_desc:'',//教师简介
      ranks_name:'',//教师职称
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/teacher/queryTeacherInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "staff_id": localStorage.getItem('number'),//号
      },
      async:true
    },function(response){
      var res = response[0];
      var id = res.id;//教师工号
      var staff_name = res.staff_name;//教师姓名
      var staff_sex = res.staff_sex;//教师性别
      var staff_phone = res.staff_phone;//教师电话
      var staff_adress = res.staff_adress;//教师家庭住址
      var staff_cardnumber = res.staff_cardnumber;//教师身份证号
      var staff_desc = res.staff_desc;//教师简介
      var ranks_name = res.ranks_name;//教师职称
      self.setState({
        id:id,//教师工号
        staff_name:staff_name,//教师姓名
        staff_sex:staff_sex,//教师性别
        staff_phone:staff_phone,//教师电话
        staff_adress:staff_adress,//教师家庭住址
        staff_cardnumber:staff_cardnumber,//教师身份证号
        staff_desc:staff_desc,//教师简介
        ranks_name:ranks_name,//教师职称
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
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>教师基本信息维护</p>
      </Row>
      <Form horizontal>
        <FormItem
        {...formItemLayout}
        label="教师工号："
        hasFeedback
      >
        <Input type="text" value={this.state.id}
         />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教师姓名："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教师性别："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_sex == 1 ? '男' : '女'}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="身份证号："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_phone}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="联系方式："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_adress}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="家庭住址："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_cardnumber}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="职称："
        hasFeedback
      >
          <Input type="text" value={this.state.ranks_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教师简介："
        hasFeedback
      >
          <Input type="text" value={this.state.staff_desc}
           />
      </FormItem>
      </Form>
      </div>
    );

  }

}));

module.exports = Message;

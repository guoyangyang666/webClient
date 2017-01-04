import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Message = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      id:'',//学号
      stu_name:'',//姓名
      stu_sex:'',//性别
      stu_birth:'',//出生年月
      stu_cardnum:'',//身份证号
      college_name:'',//学院
      dept_name:'',//专业
      class_name:'',//班级
      grade_name:'',//年级
      stu_desc:'',//学生简介
    };
  },
  componentWillMount() {
    this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/students/queryStudentInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "stu_id": localStorage.getItem('number'),//学生学号
      },
      async:true
    },function(response){
      var res = response[0];
      var id = res.id;//学号
      var stu_name = res.stu_name;//姓名
      var stu_sex = res.stu_sex;//性别
      var stu_birth = res.stu_birth;//出生年月
      var stu_cardnum = res.stu_cardnum;//身份证号
      var college_name = res.college_name;//学院
      var dept_name = res.dept_name;//专业
      var class_name = res.class_name;//班级
      var grade_name = res.grade_name;//年级
      var stu_desc = res.stu_desc;//学生简介
      self.setState({
        id:id,//学号
        stu_name:stu_name,//姓名
        stu_sex:stu_sex,//性别
        stu_birth:stu_birth,//出生年月
        stu_cardnum:stu_cardnum,//身份证号
        college_name:college_name,//学院
        dept_name:dept_name,//专业
        class_name:class_name,//班级
        grade_name:grade_name,//年级
        stu_desc:stu_desc,//学生简介
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
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>学生基本信息维护</p>
      </Row>
      <Form horizontal>
        <FormItem
        {...formItemLayout}
        label="学生学号："
        hasFeedback
      >
        <Input type="text" value={this.state.id}
         />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="学生姓名："
        hasFeedback
      >
          <Input type="text" value={this.state.stu_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="学生性别："
        hasFeedback
      >
          <Input type="text" value={this.state.stu_sex == 1 ? '男' : '女'}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="出生年月："
        hasFeedback
      >
          <Input type="text" value={this.state.stu_birth}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="身份证号："
        hasFeedback
      >
          <Input type="text" value={this.state.stu_cardnum}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="所在学院："
        hasFeedback
      >
          <Input type="text" value={this.state.college_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="所在专业："
        hasFeedback
      >
          <Input type="text" value={this.state.dept_name}
          />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="所在班级："
        hasFeedback
      >
          <Input type="text" value={this.state.class_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="所在年级："
        hasFeedback
      >
          <Input type="text" value={this.state.grade_name}
           />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="学生简介："
        hasFeedback
      >
          <Input type="text" value={this.state.stu_desc}
           />
      </FormItem>
      </Form>
      </div>
    );

  }

}));

module.exports = Message;

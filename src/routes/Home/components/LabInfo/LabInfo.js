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
      id:'',//实验室编号
      laboratory_name:'',//实验室名称
      category_name:'',//实验室类别
      laboratory_adress:'',//实验室地点
      laboratory_adressnum:'',//实验室教室号
      laboratory_renshu:'',//实验室容量
      laboratory_desc:'',//实验室简介
    };
  },
  componentWillMount() {
    this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/quryLabInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号
      },
      async:true
    },function(response){
      var res = response[0];
      var id = res.id;//实验室编号
      var laboratory_name = res.laboratory_name;//实验室名称
      var category_name = res.category_name;//实验室类别
      var laboratory_adress = res.laboratory_adress;//实验室地点
      var laboratory_adressnum = res.laboratory_adressnum;//实验室教室号
      var laboratory_renshu = res.laboratory_renshu;//实验室容量
      var laboratory_desc = res.laboratory_desc;//实验室简介
      self.setState({
        id:id,//实验室编号
        laboratory_name:laboratory_name,//实验室名称
        category_name:category_name,//实验室类别
        laboratory_adress:laboratory_adress,//实验室地点
        laboratory_adressnum:laboratory_adressnum,//实验室教室号
        laboratory_renshu:laboratory_renshu,//实验室容量
        laboratory_desc:laboratory_desc,//实验室简介
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  changeLabInfo(values){
    const self = this;
    console.log('values',values.laboratory_adress);
    var url = $CONTEXT_ADDR + '/labAdmin/changeLabInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        laboratory_adress:values.laboratory_adress,
        laboratory_adressnum:values.laboratory_adressnum,
        laboratory_renshu:values.laboratory_renshu,
        laboratory_desc:values.laboratory_desc,
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号
      },
      async:true
    },function(response){
      console.log(response);
      var res = response;
     if(res[0].code == '1'){
       Modal.success({
         title: '修改成功',
       });
     }else {
       Modal.error({
         title: '修改失败',
       });
     }
      self.setState({
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  handleSubmit(e) {
    const self = this;
    var values;
    e.preventDefault();
    this.props.form.validateFields((errors, filedsValue) => {
      if (!!errors) {
        Modal.error({
          title:"",
          content:"请填写表单必填项",
          okText:"确定"
        })
        return;
      }
      values={
        ...filedsValue,
      }
       self.changeLabInfo(values);
    });
  },

  render() {
    const self = this;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const laboratory_adress = getFieldProps('laboratory_adress', {
      rules: [
        { required: true, min: 1, message: '实验室地点不能为空' },
      ],
      initialValue:self.state.laboratory_adress
    });
    const laboratory_adressnum = getFieldProps('laboratory_adressnum', {
      rules: [
        { required: true, min: 1, message: '实验室教室号不能为空' },
      ],
      initialValue:self.state.laboratory_adressnum
    });
    const laboratory_renshu = getFieldProps('laboratory_renshu', {
      // rules: [
      //   { required: true, min: 1, message: '实验室容量不能为空' },
      // ],
      initialValue:self.state.laboratory_renshu
    });
    const laboratory_desc = getFieldProps('laboratory_desc', {
      initialValue:self.state.laboratory_desc
    });
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
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>实验室基本信息维护</p>
      </Row>
      <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
        <FormItem
        {...formItemLayout}
        label="实验室编号："
        hasFeedback
      >
      <Input value={this.state.id}  disabled='true'/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="实验室名称："
        hasFeedback
      >
      <Input value={this.state.laboratory_name}  disabled='true'/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="实验室类别："
        hasFeedback
      >
      <Input value={this.state.category_name}  disabled='true'/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="地点："
        hasFeedback
      >
          <Input {...laboratory_adress} placeholder="请输入地点"/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="教室号："
        hasFeedback
      >
          <Input {...laboratory_adressnum} placeholder="请输入教室号"/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="容量："
        hasFeedback
      >
          <Input {...laboratory_renshu} placeholder="请输入容量"/>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="简介："
        hasFeedback
      >
          <Input {...laboratory_desc} placeholder="请输入简介"/>
      </FormItem>
        <FormItem {...tailFormItemLayout}>
         <Button type="primary" htmlType="submit"  size="large" >确认修改</Button>
       </FormItem>
      </Form>
      </div>
    );

  }

}));

module.exports = Message;

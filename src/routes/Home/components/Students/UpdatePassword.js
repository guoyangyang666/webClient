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
    var url = $CONTEXT_ADDR + '/students/updatePassword.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "loginPw": this.state.loginPw,//获取要修改的密码
        "number": localStorage.getItem('number'),//用户名
        "logintype": localStorage.getItem('logintype'),//用户类型，3为学生，2为教师
      },
      async:true
    },function(response){
      var res = response;
      console.log("res",res);
      if(res[0].code == 1){
        Modal.success({
            title: '密码修改成功',
            okText: '确认',
          });
      }else {
        Modal.error({
            title: '密码修改失败',
            okText: '确认',
          });
      }
      self.setState({      
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  handleSubmit(e) {
     e.preventDefault();
     if(this.state.loginPw == this.state.comloginPw){
       this.queryBasicInfo();
     }else {
       Modal.error({
        title: '两个输入密码不正确',
        content: '请重新输入',
      });
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
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>修改登陆密码</p>
      </Row>

        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem
          {...formItemLayout}
          label="修改密码："
          hasFeedback
        >
          <Input type="password" value={this.state.loginPw}
           onChange={this.handleChange.bind(this,'loginPw')}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="再次确认："
          hasFeedback
        >
            <Input type="password" value={this.state.comloginPw}
             onChange={this.handleChange.bind(this,'comloginPw')}/>
        </FormItem>
          <FormItem {...tailFormItemLayout}>
           <Button type="primary" htmlType="submit" size="large">修改密码</Button>
         </FormItem>
        </Form>
      </div>
    );

  }

}));

module.exports = Message;

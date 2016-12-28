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
    var url = $CONTEXT_ADDR + '/labAdmin/updatePassword.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "loginPw": this.state.loginPw,//登陆密码
        "loginName": localStorage.getItem('loginName'),//类型
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

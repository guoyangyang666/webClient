import React from 'react'
import { Link ,browserHistory,hashHistory} from 'react-router'
import { Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal, Button,Input,Form,Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//全局变量
const LoginDesc = Form.create()(React.createClass({
  getInitialState() {
    return {
       current: 'mail',
       type: 3,//单选框
       id:'',//用户名
       loginPw:'',//登陆密码
       loginName:'',//用户名
       logintype:'',//用户类型
    };
  },
  //componentWillMount() {
  //this.handleSubmit();
  //},
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/students/login.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": self.state.id,//用户名
        "loginPw": self.state.loginPw,//登陆密码
        "type": self.state.type,//类型
      },
      async:true
    },function(response){
      console.log(response);
      console.log("fangfa");
      var res = response;
      for(var i=0; i<res.length; i++ ){
        //学号、工号、id号
        var logintype = res[0].type;//类型
        if(logintype == "2"){
          var id = res[0].id;
          var loginName = res[0].staff_name;//教职工姓名
          var loginPw = res[0].login_pw;
        }else if(logintype == "3"){
          var id = res[0].id;
          var loginName = res[0].stu_name;//学生姓名
          var loginPw = res[0].login_pw;
        }else if(logintype == "1"){
          var id = res[0].staff_id;
          var loginPw = res[0].user_pwd;//实验室管理员登陆密码
          var loginName = res[0].user_name;//实验室管理员登陆名
          var laboratoryId = res[0].laboratory_id;//实验室管理员登陆名
        }
        localStorage.setItem('number',id);
        localStorage.setItem('loginPw',loginPw);
        localStorage.setItem('loginName',loginName);
        localStorage.setItem('logintype',logintype);
        localStorage.setItem('laboratoryId',laboratoryId);
      }
      if(res.length == "1"){
          $history.push("/");
      }else if(res.length == "0"){
        self.error();
      }
      self.setState({
        id:id,
        loginPw:loginPw,
        loginName:loginName,//用户名
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  error() {
    Modal.error({
      title: '用户名或者密码错误',
      content: '请重新输入......',
    });
  },
  handleSubmit(e) {
     e.preventDefault();
      this.queryBasicInfo();

   },
   onChange(e) {
    this.setState({
      type: e.target.value,
    });

  },
  handleChange: function(name, event){
    var newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  },

  render() {
    return (
      <div className="login-all">
      <Form onSubmit={this.handleSubmit} className="login-form">
      <FormItem>
          <Input addonBefore={<Icon type="user" />} value={this.state.id}
           onChange={this.handleChange.bind(this,'id')} type="text" placeholder="账号" />
      </FormItem>
      <FormItem>
          <Input addonBefore={<Icon type="lock" />} value={this.state.loginPw}
           onChange={this.handleChange.bind(this,'loginPw')} type="password" placeholder="密码" />
      </FormItem>
      <FormItem>
      <div className="radio-type">
        <RadioGroup  onChange={this.onChange} value={this.state.type}>
          <Radio value={1}>部门</Radio>
          <Radio value={2}>教师</Radio>
          <Radio value={3}>学生</Radio>
        </RadioGroup>
      </div>
        <a className="login-form-forgot">忘记密码？</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
      </FormItem>
    </Form>
      </div>
    );
  },
}));

module.exports = LoginDesc

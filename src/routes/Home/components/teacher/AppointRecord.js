import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select, } from 'antd';
import $ from 'jquery';
import '../css/LabNoClassTime.css';
const FormItem = Form.Item;
const Option = Select.Option;
const Message = Form.create()(React.createClass({
  getInitialState() {
    return {
      loginPw:'',
      res:[],
      Week:[],
      value:'123',
      id:'',//用户名
      week:'',//登陆密码
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
    this.queryBas();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/equip/quryAllLab.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
      },
      async:true
    },function(response){
      var res = response;
      console.log("res",res);
      self.setState({
          res:res,
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  queryBas() {
    const self = this;
    var url = $CONTEXT_ADDR + '/teacher/quryWeek.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
      },
      async:true
    },function(response){
      var Week = response;
      console.log("Week",Week);
      self.setState({
          Week:Week,
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
 handleSubmit(e){
   e.preventDefault();
    this.props.form.validateFields((err, values) => {
     if (!err) {
       console.log('接受到的值: ', values);
     }
     var values1=values.id;
     var values2=values.week;
     var src='hc-mops/LabCourseTime/experimBatch.html?'+values1+'&'+values2+'';
     console.log(
       "src",src
     );
     $('.iframeClass').attr("src",src);
   });
 },
  render() {
     const { getFieldDecorator } = this.props.form;
    var res=this.state.res;
    var Week=this.state.Week;
    console.log("res111",res);
    if(res.length=='0'){
      var option=<Option value="请选择">请选择</Option>
    }else {
      var option=
      res.map((item) => {
        return <Option value={item.id} >{item.laboratory_name}</Option>
        })
    }
    if(Week.length=='0'){
      var Week=<Option value="请选择">请选择</Option>
    }else {
      var Week=
        Week.map((item) => {
          return <Option value={item.id} >{item.week_number}</Option>
          })
    }

    return (
      <div  style={{clear:'none',paddingTop:'5%'}}>
        <Row>
          <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>确认实验批次</p>
        </Row>
        <Form  onSubmit={this.handleSubmit}  style={{textAlign:'center'}}>
          <Row>
          <Col span={8}>
           <FormItem
           >
             {getFieldDecorator('id', {
               rules: [{ required: true, message: '请选择实验室' }],
             })(
               <Select placeholder="请选择实验室">
                 {option}
               </Select>
             )}
           </FormItem>
           </Col>
           <Col span={8}>
           <FormItem
           >
             {getFieldDecorator('week', {
               rules: [{ required: true, message: '请选择周' }],
             })(
               <Select placeholder="请选择周">
                {Week}
               </Select>
             )}
           </FormItem>
           </Col>
           <Col span={8}>
           <FormItem>
             <Button
               type="primary"
               htmlType="submit"
             >
               开始查询
             </Button>
           </FormItem>
           </Col>
           </Row>
         </Form>

        <div >
           <iframe className='iframeClass' width="100%" height="400" frameBorder="0"  border="0" scrolling> </iframe>
        </div>


      </div>

    );

  }

}));

module.exports = Message;
// <div>
//    <iframe src="hc-mops/LabCourseTime/experimBatch.html" width="100%" height="400" frameborder="0"  border="0" marginwidth="0" marginheight="0" scrolling> </iframe>
// </div>

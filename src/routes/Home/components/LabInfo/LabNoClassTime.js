import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select } from 'antd';
import $ from 'jquery';
import '../css/LabNoClassTime.css';
const FormItem = Form.Item;
const Option = Select.Option;
const Message = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      loginPw:'',
      res:[],
      Week:'',
      change:true,
    };
  },
  componentWillMount(){
    this.queryBas();
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
      var values1='1';
      var values2=values.week;
      var src='hc-mops/LabCourseTime/labExperimBatch.html?'+values1+'&'+values2+'';
      console.log(
        "src",src
      );
      this.setState({change:!this.state.change});
      $('.iframeClass').attr("src",src);
    });
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    var Week=this.state.Week;
    var res=this.state.res;
    var change= this.state.change;
    if(Week.length=='0'){
      var Week=<Option value="请选择">请选择</Option>
    }else {
      var Week=
        Week.map((item) => {
          return <Option value={item.id} >{item.week_number}</Option>
          })
    }
    console.log("week",Week);
    if(this.state.change==true){
      console.log("1111111111");
      var src="hc-mops/LabCourseTime/index.html"
      $('.iframeClass').attr("src",src);

    }else{
      console.log("222222222");
    }
    var course1=
    <Form  onSubmit={this.handleSubmit}  style={{textAlign:'center'}}>
      <Row>
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
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
        <Row>
          <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>实验室课表</p>
        </Row>
        {course1}
        <div>
        <iframe className='iframeClass'  width="100%" height="400" frameBorder="0"  border="0" marginwidth="0" marginheight="0" scrolling> </iframe>

        </div>

      </div>

    );

  }

}));

module.exports = Message;

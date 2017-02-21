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
    };
  },
  componentWillMount(){
    //this.queryBasicInfo();
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/quryAllCourse.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "laboratory_id": localStorage.getItem('laboratoryId'),//實驗室id
      },
      async:true
    },function(response){
      var res = response;
      self.setState({
          res:res,
      });
    },function(e){
      //console.log("e..." , e);
    });
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    console.log(e.key);
  },

  render() {

    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
        <Row>
          <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>实验室课表</p>
        </Row>
        <div>
        <iframe src="hc-mops/LabCourseTime/index.html" width="100%" height="400" frameBorder="0"  border="0" marginwidth="0" marginheight="0" scrolling> </iframe>

        </div>

      </div>

    );

  }

}));

module.exports = Message;

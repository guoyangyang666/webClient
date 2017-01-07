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
    // var arr = this.state.res;
    // console.log(arr.length);
    // var arr1=[["时间/星期","星期一","星期二","星期三","星期四","星期五"]];
    // for(var i = 1 ; i < 14 ; i++){
    //     arr1.push(["第"+i+"节"]);
    //     for(var j = 0 ; j < 5 ; j++){
    //         arr1[arr1.length-1].push(" ");
    //     }
    // }//构建了一个课程表数组
    // for(var i = 0 ; i < arr.length ; i++){
    //     var name = arr[i][0];
    //     var week = arr[i][1];
    //     var start = arr[i][2];
    //     var startNum = arr[i][3];
    //     var startWeek = arr[i][4];
    //     var lastWeek = arr[i][5];
    //     console.log("lastWeek",lastWeek);
    //     for(var j = 0 ; j < startNum ; j++){
    //         if( j == 0){
    //             arr1[start+j][week]={content:name+("{第"+startWeek+"-"+lastWeek+"周}"),rowspan:startNum}
    //             console.log(arr1[start+j][week]);
    //         }else{
    //             arr1[start+j][week]=null;
    //         }
    //     }
    // }//渲染虚拟table
    // var Odiv = document.createElement('table');
    // Odiv.className="c";
    //          //创建一个span
    // for(var i = 0 ; i < arr1.length ; i++){
    //     var Ospan=document.createElement("tr");
    //     Odiv.appendChild(Ospan);            //在div内创建一个span
    //     for(var j = 0 ; j < arr1[i].length ; j++){
    //         if(arr1[i][j] == null){
    //
    //         }else if((typeof arr1[i][j]) == "string"){
    //             var Ospan1=document.createElement("td");
    //             Ospan.appendChild(Ospan1);
    //             Ospan1.innerHTML = arr1[i][j];
    //         }else{
    //             var Ospan1=document.createElement("td");
    //             Ospan.appendChild(Ospan1);
    //             Ospan.rowspan = arr1[i][j].rowspan;
    //             Ospan1.innerHTML = arr1[i][j].content;
    //
    //         }
    //     }
    //
    // }
    //     document.body.appendChild(Odiv);


    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
        <Row>
          <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>添加实验批次</p>
        </Row>
        <div>
           <iframe src="hc-mops/LabCourseTime/experimBatch.html" width="100%" height="400" frameborder="0"  border="0" marginwidth="0" marginheight="0" scrolling> </iframe>
        </div>

      </div>

    );

  }

}));

module.exports = Message;
// <div>
//    <iframe src="hc-mops/LabNoClassTime/index.html" width="100%" height="400" frameborder="0"  border="0" marginwidth="0" marginheight="0" scrolling="no"> </iframe>
// </div>

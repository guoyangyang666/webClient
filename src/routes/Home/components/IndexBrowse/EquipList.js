import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
//实验室公告
const equipList = React.createClass({
  getInitialState(){
    return{
      notice:[],//首页两条公告
      current: 1,//当前页是1
      pageSize:4,
      totalRecord:'',
    };
  },
  componentWillMount(){
    //this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/notice/quryAllNotice.do';
    var values;
    if(self.props.laboratory_id == null){
      values = {
        current:self.state.current,//当前点的第几页
        pageSize:self.state.pageSize,//显示多少页
      }
    }else{
      current:self.state.current,//当前点的第几页
      pageSize:self.state.pageSize,//显示多少页
      laboratory_id : self.props.laboratory_id
    }
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : values,
      async:true
    },function(response){
       var notice = response;
       var total = notice[notice.length-1];
       var totalRecord = total.totalRecord;
       self.setState({
         notice:notice,
         totalRecord:totalRecord,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  onChange(page) {
    const self=this;
    this.setState({
      current: page,
    },function () {
      self.queryBasicInfo();
    }  );
  },
  render(){
    return(
      <div>

      </div>

    )
  }
});

class equipList extends React.Component{
  render(){
    const {laboratory_id} = this.props.params;
    return(
      <equipList laboratory_id={laboratory_id}/>
    )
  }
}
module.exports = equipList;

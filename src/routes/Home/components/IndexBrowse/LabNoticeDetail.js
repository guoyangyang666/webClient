import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//实验室公告
const LabNoticeDetail = React.createClass({
  getInitialState(){
    return{
      notice_date:'',//日期
      notice_desc:'',//简介
      notice_detail:'',//详情
      notice_title:'',//标题
      notice_source:'',//来源
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/notice/quryNotice.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        id : self.props.notice_id
      },
      async:true
    },function(response){
       var res = response;
       for(var i=0; i<res.length; i++){
         console.log("1111");
         var notice_id = res[i].id;//id
         console.log(notice_id);
         var notice_date = res[i].notice_date;//日期
         var notice_desc = res[i].notice_desc;//简介
         var notice_detail = res[i].notice_detail;//详情
         var notice_title = res[i].notice_title;//标题
         var notice_source = res[i].notice_source;//来源
       }

       self.setState({
         notice_id:notice_id,
         notice_date:notice_date,
         notice_desc:notice_desc,
         notice_detail:notice_detail,
         notice_title:notice_title,
         notice_source:notice_source,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },

  render(){

    var content =
    <div>
      <div class="box">
        <p class="bar"><a href="首页.html">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="news.html">新闻动态</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="详情.html">详情</a></p>
        <div class="line"></div>
						<p class="p1">{this.state.notice_title}</p>
            <p class="p2">
                {this.state.notice_detail}
            </p>
      </div>
    </div>

    return(
      <div>
        <Row>
          <HeaderInfo/>
        </Row>
        <Row >
          <div className="center-index">
            <div style={{width:'80%',margin:'auto',padding:'10'}}>
              {content}
            </div>
          </div>
        </Row>
        <Row >
          <FooterInfo/>
        </Row>
      </div>

    )
  }
});

class Message extends React.Component{
  render(){
    const {notice_id} = this.props.params;
    return(
      <LabNoticeDetail notice_id={notice_id}/>
    )
  }
}
module.exports = Message;

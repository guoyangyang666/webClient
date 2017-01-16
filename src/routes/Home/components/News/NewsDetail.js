import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//实验室公告
const NewsDetail = React.createClass({
  getInitialState(){
    return{
      news_id:'',//日期
      news_title:'',//简介
      news_detail:'',//详情
      news_date:'',//标题
      news_source:'',//来源
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/news/quryNews.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        id : self.props.news_id
      },
      async:true
    },function(response){
       var res = response;
       for(var i=0; i<res.length; i++){
         var news_id = res[i].id;//id
         var news_date = res[i].news_date;//日期
         var news_detail = res[i].news_detail;//详情
         var news_title = res[i].news_title;//标题
         var news_source = res[i].news_source;//来源
       }

       self.setState({
         news_id:news_id,
         news_date:news_date,
         news_detail:news_detail,
         news_title:news_title,
         news_source:news_source,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },

  render(){

    var content =
    <div>
      <div className="box">
        <p className="bar"><a href="首页.html">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="news.html">新闻动态</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="详情.html">详情</a></p>
        <div className="line"></div>
        	<div className='newDetail'>
						<h3>{this.state.news_title}</h3>
            <span className="span1">{this.state.news_date}</span>
            <span>{this.state.news_source}</span>
            <p className="p2">
                {this.state.news_detail}
            </p>
          </div>
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
    const {news_id} = this.props.params;
    return(
      <NewsDetail news_id={news_id}/>
    )
  }
}
module.exports = Message;

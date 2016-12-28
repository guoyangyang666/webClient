import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//公告单个列表
const SingleNews = React.createClass({
  getInitialState(){
    return{
      show:false,

    };
  },
  onHandleClick(){
    $history.push("/NewsDetail/"+this.props.news_id)
  },
  render(){
    const {news_id} = this.props;//新闻唯一标识id
    const {news_title} = this.props;//标题
    const {news_date} = this.props;//日期
    return(
      <div onClick={this.onHandleClick} className="info" style={{marginTop:'10',padding:'10'}}>
        <div>
          <p style={{float:'left'}}>{news_title}</p><span style={{float:'right'}}>{news_date}</span>
        </div>
      </div>
    )
  }
});
//实验室公告
const NewsList = React.createClass({
  getInitialState(){
    return{
      news:[],//首页两条公告
      current: 1,//当前页是1
      pageSize:10,//当前显示10条
      totalRecord:'',
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/news/quryAllNews.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        current:self.state.current,//当前点的第几页
        pageSize:self.state.pageSize,//显示多少页
      },
      async:true
    },function(response){
       var news = response;
       var total = news[news.length-1];
       var totalRecord = total.totalRecord;
       self.setState({
         news:news,
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
    const recordList =[];
    var news = this.state.news;
    for(var i=0; i<news.length-1; i++){
      var news_id = news[i].id;
      var news_title = news[i].news_title;
      var news_date = news[i].news_date;
      recordList.push({key : i, content : <SingleNews news_id={news_id} news_title={news_title}
        news_date={news_date}/>});
    }
    var content =
    <div>
      <div>
        {recordList.map(map => (
          <div key={map.key}>
            {map.content}
          </div>
        ))}
      </div>
    </div>

    return(
      <div>
        <Row >
          <div className="center-index">
            <div style={{width:'80%',margin:'auto',padding:'10'}}>
              {content}
            </div>
            <div style={{margin:'auto',width:'30%',paddingBottom:'30',paddingTop:'20'}}>
                <Pagination current={this.state.current} onChange={this.onChange} total={this.state.totalRecord} pageSize={this.state.pageSize} showTotal={total => `总共 ${total} 条`}>
                </Pagination>
            </div>
          </div>
        </Row>
      </div>

    )
  }
});
module.exports = NewsList;

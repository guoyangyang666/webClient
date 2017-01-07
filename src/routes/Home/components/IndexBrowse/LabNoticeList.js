import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//公告单个列表
const SingleNotice = React.createClass({
  getInitialState(){
    return{
      show:false,

    };
  },
  onHandleClick(){
    $history.push("/LabNoticeDetail/"+this.props.notice_id)
  },
  render(){
    const {notice_id} = this.props;//新闻唯一标识id
    const {notice_title} = this.props;//标题
    const {notice_desc} = this.props;//简介
    const {notice_date} = this.props;//日期
    const {image_url} = this.props;//图片地址
    return(
      <div onClick={this.onHandleClick} className="info" style={{marginTop:'20',border:'1px solid #ccccb3',padding:'10'}}>
        <img  src={$CONTEXT_ADDR+image_url}/>
        <div>
          <p style={{float:'left'}}>{notice_title}</p><span style={{float:'right'}}>{notice_date}</span>
          <p style={{clear:'both'}}>{notice_desc}</p>
        </div>
      </div>
    )
  }
});
//实验室公告
const LabNotice = React.createClass({
  getInitialState(){
    return{
      notice:[],//首页两条公告
      current: 1,//当前页是1
      pageSize:4,
      totalRecord:'',
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/notice/quryAllNotice.do';
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
    const recordList =[];
    var notice = this.state.notice;
    for(var i=0; i<notice.length-1; i++){
      var notice_id = notice[i].id;
      var notice_title = notice[i].notice_title;
      var notice_desc = notice[i].notice_desc;
      var notice_date = notice[i].notice_date;
      var image_url = notice[i].image_url;
      recordList.push({key : i, content : <SingleNotice notice_id={notice_id} notice_title={notice_title}
        notice_desc={notice_desc} notice_date={notice_date} image_url={image_url}/>});
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
        <Row>
          <HeaderInfo/>
        </Row>
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
        <Row >
          <FooterInfo/>
        </Row>
      </div>

    )
  }
});
module.exports = LabNotice;

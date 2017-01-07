import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop, } from 'antd';
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
    const {notice_id} = this.props;//标题
    const {notice_title} = this.props;//标题
    const {notice_desc} = this.props;//简介
    const {notice_date} = this.props;//日期
    const {image_url} = this.props;//图片地址
    return(
      <div onClick={this.onHandleClick} className="info" style={{marginTop:'20'}}>
        <img src={$CONTEXT_ADDR+image_url}/>
        <div className='PGroup'>
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
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/notice/quryTwoNotice.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {

      },
      async:true
    },function(response){
       var notice = response;
       self.setState({
         notice:notice,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  noticeList(){
    $history.push("/LabNoticeList");
  },

  render(){
    const recordList =[];
    var notice = this.state.notice;
    for(var i=0; i<notice.length; i++){
      var notice_id = notice[i].id;
      var notice_title = notice[i].notice_title;
      var notice_desc = notice[i].notice_desc;
      var notice_date = notice[i].notice_date;
      var image_url = notice[i].image_url;
      recordList.push({key : i, content : <SingleNotice  notice_id={notice_id} notice_title={notice_title}
        notice_desc={notice_desc} notice_date={notice_date} image_url={image_url}/>});
    }
    return(
      <div>
        <div className="centerM_right">
          <Row>
            <div className="centerM_right_title">实验室最新公告</div>
            <Button onClick={this.noticeList} type="primary" className="centerM_right_more">更多</Button>
          </Row>

          {recordList.map(map => (
            <div key={map.key}>
              {map.content}
            </div>
          ))}
        </div>
      </div>
    )
  }
});
module.exports = LabNotice;

import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
import EquipList from './EquipList';
//设备左侧，所属实验室
const LabEquip = React.createClass({
  getInitialState(){
    return{
      show:false,

    };
  },
  onHandleClick(){
    $history.push("/equipList/"+this.props.laboratory_id)
  },
  render(){
    const {laboratory_id} = this.props;//实验室id
    const {laboratory_name} = this.props;//实验室名称
    return(
      <div onClick={this.onHandleClick} >
        <div style={{color:'black'}}>软件实验室</div>
        <div style={{color:'black'}}>软件实验室</div>
        <div style={{color:'black'}}>软件实验室</div>
      </div>
    )
  }

});
//实验室公告
const EquipBar = React.createClass({
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
    return(
      <div>
        <Row>
          <HeaderInfo/>
        </Row>
        <div>
          <div className="center_news">
            <div className="center_news_left">
              <div>实验室设备</div>
              <LabEquip/>
            </div>
            <div className="center_news_right">
              <div className="box">
                <p className="bar"><a href="#">首页</a>&nbsp;&nbsp;<span>></span>&nbsp;&nbsp;<a href="#">实验室设备</a></p>
                <div className="line"></div>
                <div>
                  <div >
                    <div style={{width:'80%',margin:'auto',padding:'10'}}>
                      <equipList/>
                    </div>
                    <div style={{margin:'auto',width:'30%',paddingBottom:'30',paddingTop:'20'}}>
                        <Pagination current={this.state.current} onChange={this.onChange} total={this.state.totalRecord} pageSize={this.state.pageSize} showTotal={total => `总共 ${total} 条`}>
                        </Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row >
          <FooterInfo/>
        </Row>
      </div>

    )
  }
});
module.exports = EquipBar;

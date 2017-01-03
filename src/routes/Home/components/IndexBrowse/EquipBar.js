import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
import EquipList from './EquipList';
import EquipLeftBar from './EquipLeftBar';
import EquipAll from './EquipAll';
 //设备左侧，所属实验室//设备单个列表
const SingleEquip = React.createClass({
  getInitialState(){
    return{
      show:false,
    };
  },
  // onHandleClick(){
  //   $history.push("/LabNoticeDetail/"+this.props.notice_id)
  // },
  render(){
    const {equip_id} = this.props;//设备编号
    const {equip_name} = this.props;//设备名称
    const {equip_image_one} = this.props;//设备图片
    const {laboratory_id} = this.props;//实验室id
    const {laboratory_adress} = this.props;//实验室地址，如北实验楼
    const {laboratory_adressnum} = this.props;//房间号，如201
    return(
        <div className="equip_list" style={{marginBottom:'3%'}}>
          <img src={$CONTEXT_ADDR+equip_image_one}/>
          <p>{equip_name}</p>
          <p>放置地点:&nbsp;{laboratory_adress}&nbsp;&nbsp;{laboratory_adressnum}</p>
        </div>
    )
  }
});
//实验室设备
const EquipBar = React.createClass({
  getInitialState(){
    return{
      notice:[],//首页两条公告
      current: 1,//当前页是1
      pageSize:4,
      totalRecord:'',
      laboratory_id:'',
    };
  },
  componentWillMount(){
    //this.queryBasicInfo1();
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
  queryBasicInfo1(){
    const self = this;
    var url = $CONTEXT_ADDR + '/EquipMgr/quryAllEquip.do';
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
       var equip = response;
      console.log("设备信息",res);
       self.setState({
         equip:equip,
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

module.exports = EquipBar;

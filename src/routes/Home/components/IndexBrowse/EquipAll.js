import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//设备单个列表
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
        <div className="equip_list" style={{margin:'1%'}}>
          <img src={$CONTEXT_ADDR+equip_image_one}/>
          <p>{equip_name}</p>
          <p>放置地点:&nbsp;{laboratory_adress}&nbsp;&nbsp;{laboratory_adressnum}</p>
        </div>
    )
  }
});
//实验室公告
const EquipLists = React.createClass({
  getInitialState(){
    return{
    equip:[],//设备信息
    current: 1,//当前页是1
    pageSize:8,
    totalRecord:'',
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/equip/quryAllEquip.do';
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
      console.log("设备信息",equip);
      var total = equip[equip.length-1];
      var totalRecord = total.totalRecord;
       self.setState({
         equip:equip,
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
    var equip = this.state.equip;
    for(var i=0; i<equip.length-1; i++){
      var equip_id = equip[i].id;
      var equip_name = equip[i].equip_name;
      var equip_image_one = equip[i].equip_image_one;
      var laboratory_id = equip[i].laboratory_id;
      var laboratory_adress = equip[i].laboratory_adress;
      var laboratory_adressnum = equip[i].laboratory_adressnum;
      console.log("aaaaaa",equip_image_one);
      console.log($CONTEXT_ADDR+equip_image_one);
      recordList.push({key : i, content : <SingleEquip  equip_id={equip_id} equip_name={equip_name}
        equip_image_one={equip_image_one} laboratory_id={laboratory_id} laboratory_adress={laboratory_adress} laboratory_adressnum={laboratory_adressnum}/>});
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
        <div style={{paddingBottom:'30'}}>
          {content}
          <Pagination current={this.state.current} onChange={this.onChange} total={this.state.totalRecord} pageSize={this.state.pageSize} showTotal={total => `总共 ${total} 条`}/>          
        </div>
        <div style={{margin:'auto',width:'30%',clear:'both'}}>

        </div>
      </div>

    )
  }
});

module.exports = EquipLists;

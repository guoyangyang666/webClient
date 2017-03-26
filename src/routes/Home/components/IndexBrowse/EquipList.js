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
  onHandleClick(){
    $history.push("/EquipDetail/"+this.props.equip_id)
  },
  render(){
    const {equip_id} = this.props;//设备编号
    const {equip_name} = this.props;//设备名称
    const {equip_image_one} = this.props;//设备图片
    const {laboratory_id} = this.props;//实验室id
    const {laboratory_adress} = this.props;//实验室地址，如北实验楼
    const {laboratory_adressnum} = this.props;//房间号，如201
    return(
        <div onClick={this.onHandleClick}  className="equip_list" style={{marginTop:'7%'}}>
          <div className='equip_list_img'>
        	<img src={$CONTEXT_ADDR+equip_image_one}/>
        	<div className='equip_mask'></div>
        	</div>
          <p className='equip_list_p1'>{equip_name}</p>
          <p className='equip_list_p2'>放置地点:&nbsp;{laboratory_adress}&nbsp;&nbsp;{laboratory_adressnum}</p>
        </div>
    )
  }
});
//实验室公告
const EquipList = React.createClass({
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
    var url = $CONTEXT_ADDR + '/equip/quryAllLabEquip.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        laboratory_id:self.props.laboratory_id,
        current:self.state.current,//当前点的第几页
        pageSize:self.state.pageSize,//显示多少页
      },
      async:true
    },function(response){
       var equip = response;
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
      recordList.push({key : i, content : <SingleEquip  equip_id={equip_id} equip_name={equip_name}
        equip_image_one={equip_image_one} laboratory_id={laboratory_id} laboratory_adress={laboratory_adress} laboratory_adressnum={laboratory_adressnum}/>});
    }
    var content1 =
        <div>
          {recordList.map(map => (
            <div key={map.key}>
              {map.content}
            </div>
          ))}
        </div>
    return(
      <div>
        <Row>
          <HeaderInfo/>
        </Row>
        <Row >
          <div className="center-index">
            <div style={{width:'80%',height:'450',margin:'auto',padding:'10',overflow:'hidden'}}>
              {content1}
            </div>
            <div style={{margin:'auto',padding:'15',width:'40%',clear:'both',marginBottom:'30'}}>
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

class Message extends React.Component{
  render(){
    const {laboratory_id} = this.props.params;
    return(
      <EquipList laboratory_id={laboratory_id}/>
    )
  }
}
module.exports = Message;

import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop, } from 'antd';
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
        <div onClick={this.onHandleClick} className="equip_list">
        	<div className='equip_list_img'>
        	<img src={$CONTEXT_ADDR+equip_image_one}/>
        	<div className='mask'></div>
        	</div> 
          <p className='equip_list_p1'>{equip_name}</p>
          <p className='equip_list_p2'>放置地点:&nbsp;{laboratory_adress}&nbsp;&nbsp;{laboratory_adressnum}</p>
         
        </div>
    )
  }
});
//实验室设备
const Equip = React.createClass({
  getInitialState(){
    return{
      equip:[],//首页5个设备信息
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/equip/quryFiveEquip.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {

      },
      async:true
    },function(response){
       var equip = response;
       console.log("equip11111",equip);
       self.setState({
         equip:equip,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  equipList(){
    $history.push("/EquipBar");
  },

  render(){
    const recordList =[];
    var equip = this.state.equip;
    for(var i=0; i<equip.length; i++){
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
    return(
        <div>
          <div className="centerB">
            <div className="centerB_title">
              <span className="centerB_more">实验设备</span>
              <Button onClick={this.equipList} type="primary" style={{float:'right',marginRight:'5%',}}>更多</Button>
            </div>
            <div>
              {recordList.map(map => (
                <div key={map.key}>
                  {map.content}
                </div>
              ))}
            </div>
          </div>
        </div>
    )
  }
});
module.exports = Equip;

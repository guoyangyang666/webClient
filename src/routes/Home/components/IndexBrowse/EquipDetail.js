import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//实验室设备
const EquipDetail = React.createClass({
  getInitialState(){
    return{
      equip_id:'',//设备id
      equip_name:'',//设备名称
      equip_image_one:'',//设备图片路径
      application:'',//用途简介
      equip_desc:'',//注意事项
      laboratory_id:'',//所属实验室id
      laboratory_name:'',//实验室名字
      laboratory_adress:'',//实验室地址
      laboratory_adressnum:'',//实验室教室号
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/equip/quryEquip.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        id:self.props.equip_id,
      },
      async:true
    },function(response){
       var equip = response[0];
       var equip_id = equip.id;//设备id
       var equip_name = equip.equip_name;//设备名称
       var equip_image_one = equip.equip_image_one;//设备图片路径
       var application = equip.application;//用途简介
       var equip_desc = equip.equip_desc;//注意事项
       var laboratory_id = equip.laboratory_id;//所属实验室id
       var laboratory_name = equip.laboratory_name;//实验室名字
       var laboratory_adress = equip.laboratory_adress;//实验室地址
       var laboratory_adressnum = equip.laboratory_adressnum;//实验室教室号
       self.setState({
         equip_id:equip_id,//设备id
         equip_name:equip_name,//设备名称
         equip_image_one:equip_image_one,//设备图片路径
         application:application,//用途简介
         equip_desc:equip_desc,//注意事项
         laboratory_id:laboratory_id,//所属实验室id
         laboratory_name:laboratory_name,//实验室名字
         laboratory_adress:laboratory_adress,//实验室地址
         laboratory_adressnum:laboratory_adressnum,//实验室教室号
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  render(){
    const equip_image_one = this.state.equip_image_one;
    var content1 =
        <div className='equipD'>
          <div><span className='equipD_img equipD_Tit'>设备图片：</span><img style={{width:'20%'}} src={$CONTEXT_ADDR+equip_image_one}/></div>
          <div><span className='equipD_Tit'>设备名称：</span>{this.state.equip_name}</div>
          <div><span className='equipD_Tit'>用途简介：</span>{this.state.application}</div>
          <div><span className='equipD_Tit'>所属实验室：</span>{this.state.laboratory_name}</div>
          <div><span className='equipD_Tit'>实验室地址：</span>{this.state.laboratory_adress}</div>
          <div><span className='equipD_Tit'>教室号：</span>{this.state.laboratory_adressnum}</div>
          <div><span className='equipD_Tit'>开放人群：</span>如信息技术学院，13-网络工程、13-软件、13-计科</div>
          <div><span className='equipD_Tit'>注意事项：</span>{this.state.equip_desc}</div>
        </div>
    return(
      <div>
        <Row>
          <HeaderInfo/>
        </Row>
        <Row >
          <div className="center-index">
            <div style={{width:'80%',margin:'auto',padding:'10'}}>
              {content1}
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
    const {equip_id} = this.props.params;
    return(
      <EquipDetail equip_id={equip_id}/>
    )
  }
}
module.exports = Message;

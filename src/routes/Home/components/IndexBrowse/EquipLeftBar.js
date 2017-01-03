import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
import EquipList from './EquipList';
//设备左侧，所属实验室
const LabEquipCard = React.createClass({
  getInitialState(){
    return{
      show:false,

    };
  },
  onHandleClick(){
    $history.push("EquipList/"+this.props.laboratory_id)
  },
  render(){
    const {laboratory_id} = this.props;//实验室id
    const {laboratory_name} = this.props;//实验室名称
    return(
      <div onClick={this.onHandleClick} >
        <div style={{color:'black'}}>{laboratory_name}</div>
      </div>
    )
  }

});
//实验室公告
const EquipLeftBar = React.createClass({
  getInitialState(){
    return{
      equipLeft:[],//首页两条公告
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/equip/quryAllLab.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {

      },
      async:true
    },function(response){
       var equipLeft = response;
       console.log(equipLeft);
       self.setState({
         equipLeft:equipLeft,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  render(){
    const recordList =[];
    var equipLeft = this.state.equipLeft;
    for(var i=0; i<equipLeft.length; i++){
      var laboratory_id = equipLeft[i].id;
      var laboratory_name = equipLeft[i].laboratory_name;
      recordList.push({key : i, content : <LabEquipCard  laboratory_id={laboratory_id} laboratory_name={laboratory_name}/>});
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
          <div className="center-index" style={{marginTop:'1%'}}>
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
module.exports = EquipLeftBar;

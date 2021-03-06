import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
var ReserveRecord = React.createClass({
  getInitialState(){
      return{
        id:'',
        equip_name:'',
        storage_time:'',
        labEquipRecord:[],//列表
      };
    },

  componentWillMount() {
    // this.qryVaccinationHistion();
    },
    qryVaccinationHistion() {
     const self = this;
     var url = $CONTEXT_ADDR + '/labAdmin/getAllEquip.do';
     $ajax.get({
       type: "POST",
       url: url,
       dataType: "json",
       data : {
         "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号
         "type": localStorage.getItem('logintype'),//管理员类型
         "staff_id": localStorage.getItem('number'),//管理员工号
       },
       async:true
     },function(response){
        var labEquipRecord = response;

        // for(var i=0; i<res.length; i++){
        //   var labEquipRecord = res[i];
        // }
        self.setState({
          labEquipRecord:labEquipRecord,//列表
        });

     },function(e){
       //console.log("e..." , e);
     });
    },
  handleAdd(){
    $history.push("/LabEquipAdd");
  },
  editEquip(record){
    $history.push("/LabEquipEdit/" + record.id);
  },
  deleteEquip(record){
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/deleteLabInfo.do';
    console.log(record.id);
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": record.id,//实验室编号
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号id
      },
      async:true
    },function(response){



       // for(var i=0; i<res.length; i++){
       //   var labEquipRecord = res[i];
       // }
       self.setState({

       });

    },function(e){
      //console.log("e..." , e);
    });
    this.qryVaccinationHistion();

  },
  render() {
    const columns = [
      {
       title: '预约时间',
       dataIndex: 'id',
       key: 'id',
       },{
      title: '实验室名称',
      dataIndex: 'equip_name',
      key: 'equip_name',
      },{
       title: '实验室地点',
       dataIndex: 'storage_time',
       key: 'storage_time',
       },
       { title: '操作', key: 'x',
       render: (text, record, index) => (
         <span>
          <a onClick={() => this.deleteEquip(record)}>刪除</a>
        </span>
         ),
       }
            ];
    var labEquipRecord = this.state.labEquipRecord;
    console.log("1111yangyagn"+labEquipRecord.length);
    console.log(labEquipRecord);
    const dataList=[];
    if(labEquipRecord == undefined){
      var id = labEquipRecord.id;//随访服务id
      var equip_name = labEquipRecord.equip_name;//产后随访机构
      var storage_time = labEquipRecord.storage_time;//随访方式
      dataList.push({
        key: i,
        id:labEquipRecord.id,
        equip_name:labEquipRecord.equip_name,
        storage_time:labEquipRecord.storage_time,
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//随访服务id
        var equip_name = labEquipRecord[i].equip_name;//产后随访机构
        var storage_time = labEquipRecord[i].storage_time;//随访方式
        dataList.push({
          key: i,
          id:labEquipRecord[i].id,
          equip_name:labEquipRecord[i].equip_name,
          storage_time:labEquipRecord[i].storage_time,
        });
      }
    }
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>已取消记录</p>
      </Row>
        <div>
          <Table columns={columns}  dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true}/>
        </div>
      </div>




    );

  }

});

module.exports = ReserveRecord;

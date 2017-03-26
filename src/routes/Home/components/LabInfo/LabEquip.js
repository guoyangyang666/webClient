import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import '../css/LabAdmin.css';
import LabEquipAdd from './LabEquipAdd';
import LabEquipEdit from './LabEquipEdit';
var Message = React.createClass({
  getInitialState(){
      return{
        listStatus:true,//初始list列表状态
        addStatus:true,//添加设备状态
        updateStatus:true,//修改设备状态
        id:'',
        equip_name:'',
        storage_time:'',
        labEquipRecord:[],//列表
        add:true,//添加还是编辑
      };
    },

  componentWillMount() {
     this.qryVaccinationHistion();
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
    this.setState({
      listStatus: !this.state.listStatus,
      addStatus: !this.state.addStatus,
    })
    // $history.push("/LabEquipAdd");
  },
  handleBack(){
    if(this.state.add==false){
      this.setState({
        add:!this.state.listStatus,
        listStatus: !this.state.listStatus,
        addStatus: !this.state.addStatus,
      })
    }else{
      this.setState({
        listStatus: !this.state.listStatus,
        addStatus: !this.state.addStatus,
      })
    }
    this.qryVaccinationHistion();
  },
  editEquip(record){
    // console.log(record.id);
    var recordId= record.id;
    // this.setState({
    //   listStatus: !this.state.listStatus,
    //   updateStatus: !this.state.updateStatus,
    // })
    this.setState({
        recordId:recordId,
        add: !this.state.listStatus,
        listStatus: !this.state.listStatus,
        addStatus: !this.state.addStatus,
     })

    // $history.push("/LabEquipEdit/" + record.id);
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
            { title: '设备编号', width: 100, dataIndex: 'id', key: 'id' },
            { title: '设备名称', width: 100, dataIndex: 'equip_name', key: 'equip_name' },
            { title: '入库时间', width: 100, dataIndex: 'storage_time', key: 'storage_time' },
            { title: '操作', key: 'operation',width:'100',
            render: (text, record, index) => (
              <span>
               <a onClick={() => this.deleteEquip(record)}>删除</a>
               <span className="ant-divider" />
               <a onClick={() => this.editEquip(record)}>修改</a>
             </span>
              ),
          }];
    var labEquipRecord = this.state.labEquipRecord;
    const dataList=[];
    if(labEquipRecord == undefined){
      var id = labEquipRecord.id;//设备编号id
      var equip_name = labEquipRecord.equip_name;//设备名称
      var storage_time = labEquipRecord.storage_time;//入库时间
      dataList.push({
        key: i,
        id:labEquipRecord.id,
        equip_name:labEquipRecord.equip_name,
        storage_time:labEquipRecord.storage_time,
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//设备编号id
        var equip_name = labEquipRecord[i].equip_name;//设备名称
        var storage_time = labEquipRecord[i].storage_time;//入库时间
        dataList.push({
          key: i,
          id:labEquipRecord[i].id,
          equip_name:labEquipRecord[i].equip_name,
          storage_time:labEquipRecord[i].storage_time,
        });
      }
    }
    const listStatus = this.state.listStatus;
    const addStatus = this.state.addStatus;
    const updateStatus = this.state.updateStatus;
    var add = this.state.add;
    var recordId = this.state.recordId;
    console.log("jfdkfjkdfjdkf",recordId);
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>实验室设备管理</p>
      </Row>
        <div className={listStatus ? "list_equip" : "list_equip1"}>
          <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd}>添加</Button>
          <Table columns={columns}  dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true} />
        </div>
        <div className={addStatus ? "add_equip" : "add_equip1"}>
          <Button className="editable-add-btn" type="ghost" onClick={this.handleBack}>返回</Button>
          {add?<LabEquipAdd/>:<LabEquipEdit recordId={recordId}/>}
        </div>
      </div>
    );
  }

});

module.exports = Message;
// <div className={updateStatus ? "update_equip" : "update_equip1"}>
//   <Button className="editable-add-btn" type="ghost" onClick={this.handleUpdateBack}>返回</Button>
//   <LabEquipEdit />
// </div>

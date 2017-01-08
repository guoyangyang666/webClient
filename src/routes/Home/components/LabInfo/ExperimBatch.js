import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
import '../css/LabAdmin.css';
import BatchAdd from './BatchAdd';
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
      };
    },

  componentWillMount() {
     this.qryVaccinationHistion();
    },
    qryVaccinationHistion() {
     const self = this;
     var url = $CONTEXT_ADDR + '/labAdmin/quryExperimbatchs.do';
     $ajax.get({
       type: "POST",
       url: url,
       dataType: "json",
       data : {
         "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号
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
    this.setState({
      listStatus: !this.state.listStatus,
      addStatus: !this.state.addStatus,
    })
    this.qryVaccinationHistion();
  },
  deleteEquip(record){
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/deleteExperimbatchs.do';
    console.log(record.id);
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": record.id,//实验室编号
      },
      async:true
    },function(response){
      var res = response;
      if(res[0].code == 1){
        Modal.success({
          title:"删除成功",
          okText:"确定"
        })
      }else{
        Modal.error({
          title:"删除失败",
          okText:"确定"
        })
      }


       self.setState({

       });

    },function(e){
      //console.log("e..." , e);
    });
    this.qryVaccinationHistion();

  },
  render() {
    const columns = [
            { title: '实验室', width: 100, dataIndex: 'laboratory_name', key: 'laboratory_name', fixed: 'left' },
            { title: '实验名', width: 100, dataIndex: 'experim_name', key: 'equip_name', fixed: 'left' },
            { title: '实验批次', width: 100, dataIndex: 'batch', key: 'batch', fixed: 'left' },
            { title: '开始周', width: 100, dataIndex: 'start_week', key: 'start_week', fixed: 'left' },
            { title: '结束周', width: 100, dataIndex: 'last_week', key: 'last_week', fixed: 'left' },
            { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'left',width: 150,
            render: (text, record, index) => (
              <span>
               <a onClick={() => this.deleteEquip(record)}>删除</a>
             </span>
              ),
          },
          ];
    var labEquipRecord = this.state.labEquipRecord;
    const dataList=[];
    if(labEquipRecord == undefined){
      var id = labEquipRecord.id;//id
      var laboratory_name = labEquipRecord.laboratory_name;//实验室
      var experim_name = labEquipRecord.experim_name;//实验批次名（什么实验）
      var batch = labEquipRecord.batch;//实验批次
      var start_week = labEquipRecord.start_week;//开始周数
      var last_week = labEquipRecord.last_week;//持续周数
      dataList.push({
        key: i,
        id:labEquipRecord.id,
        laboratory_name:labEquipRecord.laboratory_name,
        experim_name:labEquipRecord.experim_name,
        batch:labEquipRecord.batch,
        start_week:labEquipRecord.start_week,
        last_week:labEquipRecord.last_week,
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//设备编号id
        var laboratory_name = labEquipRecord[i].laboratory_name;//设备名称
        var experim_name = labEquipRecord[i].experim_name;//入库时间
        var batch = labEquipRecord[i].batch;//设备编号id
        var start_week = labEquipRecord[i].start_week;//设备名称
        var last_week = labEquipRecord[i].last_week;//入库时间
        dataList.push({
          key: i,
          id:labEquipRecord[i].id,
          laboratory_name:labEquipRecord[i].laboratory_name,
          experim_name:labEquipRecord[i].experim_name,
          batch:labEquipRecord[i].batch,//设备编号id
          start_week:labEquipRecord[i].start_week,//设备名称
          last_week:labEquipRecord[i].last_week,//入库时间
        });
      }
    }
    const listStatus = this.state.listStatus;
    const addStatus = this.state.addStatus;
    const updateStatus = this.state.updateStatus;
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>实验批次管理</p>
      </Row>
        <div className={listStatus ? "list_equip" : "list_equip1"}>
          <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd}>添加</Button>
          <Table columns={columns}  dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true} scroll={{ x: true, y: 300 }} />
        </div>
        <div className={addStatus ? "add_equip" : "add_equip1"}>
          <Button className="editable-add-btn" type="ghost" onClick={this.handleBack}>返回</Button>
          <BatchAdd/>
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

// <div>
//    <iframe src="hc-mops/LabCourseTime/experimBatch.html" width="100%" height="400" frameborder="0"  border="0" marginwidth="0" marginheight="0" scrolling> </iframe>
// </div>

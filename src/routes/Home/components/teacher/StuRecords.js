import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox } from 'antd';
var Message = React.createClass({
  getInitialState(){
      return{
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
     var url = $CONTEXT_ADDR + '/teacher/quryStuAppoint.do';
     $ajax.get({
       type: "POST",
       url: url,
       dataType: "json",
       data : {
         "staff_id": localStorage.getItem('number'),//工号
       },
       async:true
     },function(response){
        var labEquipRecord = response;

        self.setState({
          labEquipRecord:labEquipRecord,//列表
        });

     },function(e){
       //console.log("e..." , e);
     });
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
       title: '学生学号',
       dataIndex: 'stu_id',
       key: 'stu_id',
       },  {
       title: '学生姓名',
       dataIndex: 'stu_name',
       key: 'stu_name',
       },{
       title: '实验名称',
       dataIndex: 'experim_name',
       key: 'experim_name',
       },{
      title: '实验批次',
      dataIndex: 'batch',
      key: 'batch',
      },{
      title: '容量',
      dataIndex: 'laboratory_renshu',
      key: 'laboratory_renshu',
      },{
      title: '已预约',
      dataIndex: 'experim_num',
      key: 'experim_num',
      },
      {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    ];
    var labEquipRecord = this.state.labEquipRecord;
    const dataList=[];
    if(labEquipRecord == undefined){
      var id = labEquipRecord.id;//id
      var experim_name = labEquipRecord.experim_name;//实验名称
      var batch = labEquipRecord.batch;//实验批次
      var laboratory_id = labEquipRecord.laboratory_id;//实验室编号
      var laboratory_name = labEquipRecord.laboratory_name;//验室名
      var laboratory_renshu = labEquipRecord.laboratory_renshu;//实验室容纳人数
      var staff_id = labEquipRecord.staff_id;//教师编号
      var experim_num = labEquipRecord.experim_num;//已预约人数
      var stu_id = labEquipRecord.stu_id;//学生学号
      var stu_name = labEquipRecord.stu_name;//学生姓名
      if(labEquipRecord.status == '1'){
        var status = '审核成功';//状态，1为预约成功，2为审核中，3为取消
      }else if(labEquipRecord.status == '2'){
        var status = '审核中';//状态，1为预约成功，2为审核中，3为取消
      }
      dataList.push({
        key: i,
        id:id,
        experim_name:experim_name,
        batch:batch,
        laboratory_id:laboratory_id,//实验室编号
        laboratory_name:laboratory_name,//验室名
        laboratory_renshu:laboratory_renshu,//实验室容纳人数
        staff_id:staff_id,//教师编号
        experim_num:experim_num,//已预约人数
        stu_id:stu_id,//学生学号
        stu_name:stu_name,//学生姓名
        status:status,
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//id
        var experim_name = labEquipRecord[i].experim_name;//实验名称
        var batch = labEquipRecord[i].batch;//实验批次
        var laboratory_id = labEquipRecord[i].laboratory_id;//实验室编号
        var laboratory_name = labEquipRecord[i].laboratory_name;//验室名
        var laboratory_renshu = labEquipRecord[i].laboratory_renshu;//实验室容纳人数
        var staff_id = labEquipRecord[i].staff_id;//教师编号
        var experim_num = labEquipRecord[i].experim_num;//已预约人数
        var stu_id = labEquipRecord[i].stu_id;//学生学号
        var stu_name = labEquipRecord[i].stu_name;//学生姓名
        if(labEquipRecord[i].status == '1'){
          var status = '审核成功';//状态，1为预约成功，2为审核中，3为取消
        }else if(labEquipRecord[i].status == '2'){
          var status = '审核中';//状态，1为预约成功，2为审核中，3为取消
        }
        dataList.push({
          key: i,
          id:id,
          experim_name:experim_name,
          batch:batch,
          laboratory_id:laboratory_id,//实验室编号
          laboratory_name:laboratory_name,//验室名
          laboratory_renshu:laboratory_renshu,//实验室容纳人数
          staff_id:staff_id,//教师编号
          experim_num:experim_num,//已预约人数
          stu_id:stu_id,//学生学号
          stu_name:stu_name,//学生姓名
          status:status,
        });
      }
    }
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>查看学生预约</p>
      </Row>
        <div>

          <Table columns={columns}  dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true} scroll={{ x: true, y: 300 }} />
        </div>
      </div>




    );

  }

});

module.exports = Message;

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
     var url = $CONTEXT_ADDR + '/teacher/cancelAppointList.do';
     $ajax.get({
       type: "POST",
       url: url,
       dataType: "json",
       data : {
         "staff_id": localStorage.getItem('number'),//管理员工号
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
       title: '实验名称',
       dataIndex: 'experim_name',
       key: 'experim_name',
       },{
      title: '实验批次',
      dataIndex: 'batch',
      key: 'batch',
      },{
       title: '第几周',
       dataIndex: 'appoint_week',
       key: 'appoint_week',
       }, {
       title: '上课地点',
       dataIndex: 'laboratory_adress',
       key: 'laboratory_adress',
       },{
       title: '周几',
       dataIndex: 'week',
       key: 'week',
       },{
       title: '上课时间',
       dataIndex: 'times',
       key: 'times',
       }, {
       title: '验室名',
       dataIndex: 'laboratory_name',
       key: 'laboratory_name',
       },
       { title: '操作', key: 'x',
       render: (text, record, index) => (
         <span>
          <a onClick={() => this.cancelEquip(record)}>刪除</a>
        </span>
         ),
       }];
          var labEquipRecord = this.state.labEquipRecord;
          const dataList=[];
          if(labEquipRecord == undefined){
            var id = labEquipRecord.id;//id
            var experim_name = labEquipRecord.experim_name;//实验名称
            var batch = labEquipRecord.batch;//实验批次
            var appoint_week = '第'+parseInt(labEquipRecord.appoint_week)+'周';//第几周
            var week = '周'+parseInt(labEquipRecord.week);//周几
            var start_times = parseInt(labEquipRecord.start_times);
            var stop_times = parseInt(labEquipRecord.stop_times)+start_times;
            var times = '第'+start_times +'—'+ stop_times+'节';//上课时间
            var laboratory_adressnum = labEquipRecord.laboratory_adressnum;//教室号，如201
            var laboratory_adress = labEquipRecord.laboratory_adress +'('+ laboratory_adressnum+')';//上课地点
            var laboratory_name = labEquipRecord.laboratory_name;//验室名
            var description = labEquipRecord.cancel_reason;//取消原因
            dataList.push({
              key: i,
              id:id,
              experim_name:experim_name,
              batch:batch,
              appoint_week:appoint_week,//第几周
              week:week,//周次
              times:times,
              laboratory_adress:laboratory_adress,//上课地点
              laboratory_name:laboratory_name,//验室名
              description:description,//取消原因
            });
          }else {
            for (var i = 0; i < labEquipRecord.length; i++) {
              var id = labEquipRecord[i].id;//id
              var experim_name = labEquipRecord[i].experim_name;//实验名称
              var batch = labEquipRecord[i].batch;//实验批次
              var appoint_week = '第'+parseInt(labEquipRecord[i].appoint_week)+'周';//第几周
              var week = '周'+parseInt(labEquipRecord[i].week);//周几
              var start_times = parseInt(labEquipRecord[i].start_times);
              var stop_times = parseInt(labEquipRecord[i].stop_times)+start_times;
              var times = '第'+start_times +'—'+ stop_times+'节';//上课时间
              var laboratory_adressnum = labEquipRecord[i].laboratory_adressnum;//教室号，如201
              var laboratory_adress = labEquipRecord[i].laboratory_adress +'('+ laboratory_adressnum+')';//上课地点
              var laboratory_name = labEquipRecord[i].laboratory_name;//验室名
              var description = labEquipRecord[i].cancel_reason;//取消原因
              dataList.push({
                key: i,
                id:id,
                experim_name:experim_name,
                batch:batch,
                appoint_week:appoint_week,//第几周
                week:week,//周次
                times:times,
                laboratory_adress:laboratory_adress,//上课地点
                laboratory_name:laboratory_name,//验室名
                description:description,//取消原因
              });
            }
          }
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>已取消</p>
      </Row>
        <div>

          <Table columns={columns} dataSource={dataList} expandedRowRender={record => <p>取消原因：{record.description}</p>} bordered={true}  pagination={{ pageSize:4 }} />
        </div>
      </div>




    );

  }

});

module.exports = Message;

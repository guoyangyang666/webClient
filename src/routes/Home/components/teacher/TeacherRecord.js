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
        visible: false,
        id:'',
      };
    },

  componentWillMount() {
     this.qryVaccinationHistion();
    },
    qryVaccinationHistion() {
     const self = this;
     var url = $CONTEXT_ADDR + '/teacher/quryAppointList.do';
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
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  },
  handleOk() {
  const self = this;
  this.setState({
    visible: false,
  });
  if(self.state.value == ''|| self.state.value==null){
    Modal.error({
      title:'請輸入取消原因',
    })
  }else{
    var url = $CONTEXT_ADDR + '/teacher/cancelAppoint.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": self.state.id,//编号
        "staff_id": localStorage.getItem('number'),//管理员工号
        "cancel_reason":self.state.value,//取消的原因
      },
      async:true
    },function(response){
      if(response[0].code == 1){
        Modal.success({
          title:'取消成功',
        })
        self.qryVaccinationHistion();
      }else {
        Modal.error({
          title:'操作失敗，請稍後充實',
        })
      }
       self.setState({

       });

    },function(e){
      //console.log("e..." , e);
    });
  }

},
change:function(e){
     this.setState({value: e.target.value});
 },
  cancelEquip(record){
    console.log("1122211",record.id);
    var id = record.id;
    this.setState({
      visible: true,
      id:id,
      value:'',
    })
    console.log("1111",id);
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
        { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'left',width: 150,
        render: (text, record, index) => (
          <span>
           <a onClick={() => this.cancelEquip(record)}>取消</a>
         </span>
          ),
        },
          ];
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
        });
      }
    }
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>预约记录</p>
      </Row>
        <div>
        <Modal title="请輸入取消的原因" okText="登录" cancelText="返回" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}>
          <div><Input size="large"  onChange={this.change} value={this.state.value} placeholder="请輸入取消的原因"/></div>
        </Modal>
          <Table columns={columns}  dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true} scroll={{ x: true, y: 300 }} />
        </div>
      </div>




    );

  }

});

module.exports = Message;

import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop,Popconfirm, Steps, message, Form, Checkbox,Select } from 'antd';
const Option = Select.Option;
var Message = React.createClass({
  getInitialState(){
      return{
        fail_reason:'',
        labEquipRecord:[],//列表
        selectedRowKeys: [],  // Check here to configure the default column
      };
    },

  componentWillMount() {
     this.qryVaccinationHistion();
    },
    qryVaccinationHistion() {
     const self = this;
     var url = $CONTEXT_ADDR + '/labAdmin/quryStuAppoint.do';
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
  //审批
  shenPi(record){
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/changeStuAppoint.do';
    console.log(record.id);
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": record.id,//实验室编号
        "stu_id":record.stu_id,//学生学号
        "status":'1',//状态
        "fail_reason": '',//未通过原因
      },
      async:true
    },function(response){
      if(response[0].code == 1){
        Modal.success({
          title:'审批成功',
        })
        self.qryVaccinationHistion();
      }else {
        Modal.error({
          title:'操作失败，请稍后重试',
        })
      }
       self.setState({
         fail_reason:'',
       });

    },function(e){
      //console.log("e..." , e);
    });
    this.setState({

    })
      this.qryVaccinationHistion();

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
  handleChange(event){
    console.log('event',event.target.value);
    var fail_reason=this.state.fail_reason;
    this.setState({
      fail_reason:event.target.value,
    })
  },
  onOk(record){
    console.log("index",record.id);
    var fail_reason=this.state.fail_reason;
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/changeStuAppoint.do';
    console.log(record.id);
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": record.id,//实验室编号
        "stu_id":record.stu_id,//学生学号
        "status":'4',//状态(不通过为4)
        "fail_reason": this.state.fail_reason,//未通过原因
      },
      async:true
    },function(response){
      if(response[0].code == 1){
        Modal.success({
          title:'审批成功',
        })
        self.qryVaccinationHistion();
      }else {
        Modal.error({
          title:'操作失败，请稍后重试',
        })
      }

       self.setState({

       });

    },function(e){
      //console.log("e..." , e);
    });

  },
  render() {
    var fail_reason=this.state.fail_reason;
    var shnep=<Input defaultValue={this.state.fail_reason}  onChange={this.handleChange} ></Input>
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
        },{
        title: '周几',
        dataIndex: 'week',
        key: 'week',
        },{
       title: '上课时间',
       dataIndex: 'times',
       key: 'times',
       },{
       title: '教师工号',
       dataIndex: 'staff_id',
       key: 'staff_id',
       },  {
       title: '教师姓名',
       dataIndex: 'staff_name',
       key: 'staff_name',
       },
        {
        title: '学生学号',
        dataIndex: 'stu_id',
        key: 'stu_id',
        },  {
        title: '学生姓名',
        dataIndex: 'stu_name',
        key: 'stu_name',
        },
        {
        title: '超出人数',
        dataIndex: 'renshu',
        key: 'renshu',
      },{
        title: '预约状态',
        dataIndex: 'status',
        key: 'status',
        },
        { title: '操作', key: 'operation',
          render: (text, record, index) => {
            return (
                <span>
                 <a onClick={() => this.shenPi(record)}>通过</a>
                 <span className="ant-divider" />
                 <Popconfirm title={shnep} onConfirm={() => this.onOk(record)}>
                   <a href="#">不通过</a>
                 </Popconfirm>
               </span>

            );
          },
        }];

    var labEquipRecord = this.state.labEquipRecord;
    const dataList=[];
    if(labEquipRecord == undefined){
      var id = labEquipRecord.id;//id
      var status = labEquipRecord.status;//预约状态
      var stu_id = labEquipRecord.stu_id;//学生学号
      var stu_name = labEquipRecord.stu_name;//学生姓名
      var staff_id = labEquipRecord.staff_id;//教师工号
      var staff_name = labEquipRecord.staff_name;//教师姓名
      var batch = labEquipRecord.batch;//实验批次
      var week = labEquipRecord.week;//周几
      var start_times = parseInt(labEquipRecord.start_times);
      var stop_times = parseInt(labEquipRecord.stop_times)+start_times;
      var times = '第'+start_times +'—'+ stop_times+'节';//上课时间
      var appoint_week = labEquipRecord.appoint_week;//第几周
      var experim_name = labEquipRecord.experim_name;//实验名称
      var experim_num = parseInt(labEquipRecord.experim_num);//已预约人数
      var laboratory_renshu = parseInt(labEquipRecord.laboratory_renshu);//实验室容纳人数
      var renshu=experim_num-laboratory_renshu;//超出人数
      dataList.push({
        key: i,
        id :id,//id
        status : status,//预约状态
        stu_id : stu_id,//学生学号
        stu_name : stu_name,//学生姓名
        staff_id : staff_id,//教师工号
        staff_name : staff_name,//教师姓名
        batch : batch,//实验批次
        week : week,//周几
        times :times,//上课时间
        appoint_week : appoint_week,//第几周
        experim_name : experim_name,//实验名称
        renshu:renshu,//超出人数
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//id
        var status = labEquipRecord[i].status;//预约状态
        var stu_id = labEquipRecord[i].stu_id;//学生学号
        var stu_name = labEquipRecord[i].stu_name;//学生姓名
        var staff_id = labEquipRecord[i].staff_id;//教师工号
        var staff_name = labEquipRecord[i].staff_name;//教师姓名
        var batch = labEquipRecord[i].batch;//实验批次
        var week = labEquipRecord[i].week;//周几
        var start_times = parseInt(labEquipRecord[i].start_times);
        var stop_times = parseInt(labEquipRecord[i].stop_times)+start_times;
        var times = '第'+start_times +'—'+ stop_times+'节';//上课时间
        var appoint_week = labEquipRecord[i].appoint_week;//第几周
        var experim_name = labEquipRecord[i].experim_name;//实验名称
        var experim_num = parseInt(labEquipRecord[i].experim_num);//已预约人数
        var laboratory_renshu = parseInt(labEquipRecord[i].laboratory_renshu);//实验室容纳人数
        var renshu=experim_num-laboratory_renshu;//超出人数
        dataList.push({
          key: i,
          id :id,//id
          status : status,//预约状态
          stu_id : stu_id,//学生学号
          stu_name : stu_name,//学生姓名
          staff_id : staff_id,//教师工号
          staff_name : staff_name,//教师姓名
          batch : batch,//实验批次
          week : week,//周几
          times :times,//上课时间
          appoint_week : appoint_week,//第几周
          experim_name : experim_name,//实验名称
          renshu:renshu,//超出人数
        });
      }
    }
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>预约记录</p>
      </Row>
        <div>

          <Table columns={columns}   dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true} />
        </div>
      </div>
    );

  }

});

module.exports = Message;
// <div style={{ marginBottom: 16 }}>
//
//   <span style={{float:'right'}}>
//     <Select defaultValue="请选择实验名" style={{ width: 120 }} onChange={this.handleChange}>
//       <Option value="jack">Jack</Option>
//       <Option value="lucy">Lucy</Option>
//       <Option value="disabled" disabled>Disabled</Option>
//       <Option value="Yiminghe">yiminghe</Option>
//     </Select>
//     <Select defaultValue="请选择批次" style={{ width: 120 }} onChange={this.handleChange}>
//       <Option value="jack">Jack</Option>
//       <Option value="lucy">Lucy</Option>
//       <Option value="disabled" disabled>Disabled</Option>
//       <Option value="Yiminghe">yiminghe</Option>
//     </Select>
//   </span>
// </div>

// <Button type="primary"
//   disabled={!hasSelected}
//   onClick={this.shenpi}
// >审批</Button>
// <span style={{ marginLeft: 8 }}>{hasSelected ? `已选 ${selectedRowKeys.length} 条` : ''}</span>

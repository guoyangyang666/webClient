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
     var url = $CONTEXT_ADDR + '/students/quryAllExperim.do';
     $ajax.get({
       type: "POST",
       url: url,
       dataType: "json",
       data : {
         "current_week": 1,//当前周
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
  //选课之前先检查该学生有没有预约该课程
  editEquip(record){
    const self = this;
    var url = $CONTEXT_ADDR + '/students/quryStu.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "stu_id": localStorage.getItem('number'),//学生编号
        "course_time_id": record.id,//编号id
      },
      async:true
    },function(response){
       var res = response;
       console.log("res111",res.length);
       if(res.length==0){
         self.ceshi(record);
       }else{
         console.log("11111");
         console.log("res.status",res.status);
         for(var i=0; i<res.length; i++){
           if(res[i].status==1){
             Modal.error({
               title:'已审核成功，请勿再选',
             })
           }else if(res[i].status==2){
             Modal.error({
               title:'正在审核中，请勿再选',
             })
           }else if(res[i].status==4){
             Modal.error({
               title:'审核未通过，请勿再选',
             })
           }else{
             console.log("zhxingl");
             self.ceshi(record);
           }
         }

       }

       self.setState({

       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  ceshi(record){
    var self=this;
    var url = $CONTEXT_ADDR + '/students/addStuExperim.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "stu_id": localStorage.getItem('number'),//学生编号
        "course_time_id": record.id,//编号id
        "laboratory_id": record.laboratory_id,//编号id
        "staff_id":record.staff_id,//教师工号
        "experim_num":record.experim_num+1,
      },
      async:true
    },function(response){
      if(response[0].code == 1){
        Modal.success({
          title:'预约成功',
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
       title: '验室室名',
       dataIndex: 'laboratory_name',
       key: 'laboratory_name',
       },{
       title: '申请教师',
       dataIndex: 'staff_name',
       key: 'staff_name',
       },{
       title: '容纳人数',
       dataIndex: 'laboratory_renshu',
       key: 'laboratory_renshu',
       }, {
        title: '已选人数',
        dataIndex: 'experim_num',
        key: 'experim_num',
        },
        { title: '操作', key: 'operation', fixed: true, dataIndex: 'operation',
          render: (text, record, index) => (
            <span>
             <a onClick={() => this.editEquip(record)}>预约</a>
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
      var week = '周'+parseInt(labEquipRecord.week);//周几
      var start_times = parseInt(labEquipRecord.start_times);
      var stop_times = parseInt(labEquipRecord.stop_times)+start_times;
      var times = '第'+start_times +'—'+ stop_times+'节';//上课时间
      var laboratory_id = labEquipRecord.laboratory_id;//实验室编号
      var laboratory_adressnum = labEquipRecord.laboratory_adressnum;//教室号，如201
      var laboratory_adress = labEquipRecord.laboratory_adress +'('+ laboratory_adressnum+')';//上课地点
      var laboratory_name = labEquipRecord.laboratory_name;//验室名
      var laboratory_renshu = labEquipRecord.laboratory_renshu;//实验室容纳人数
      var staff_id = labEquipRecord.staff_id;//教师编号
      var staff_name = labEquipRecord.staff_name;//教师名
      var experim_num = labEquipRecord.experim_num;//已预约人数
      var appoint_week = labEquipRecord.appoint_week;//第几周
      dataList.push({
        key: i,
        id:id,
        experim_name:experim_name,
        batch:batch,
        week:week,//周次
        times:times,
        laboratory_id:laboratory_id,//实验室编号
        laboratory_adress:laboratory_adress,//上课地点
        laboratory_name:laboratory_name,//验室名
        laboratory_renshu:laboratory_renshu,//实验室容纳人数
        staff_id:staff_id,//教师编号
        staff_name:staff_name,//教师名
        experim_num:experim_num,//已预约人数
        appoint_week:appoint_week,//第几周
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//id
        var experim_name = labEquipRecord[i].experim_name;//实验名称
        var batch = labEquipRecord[i].batch;//实验批次
        var week = '周'+parseInt(labEquipRecord[i].week);//周几
        var start_times = parseInt(labEquipRecord[i].start_times);
        var stop_times = parseInt(labEquipRecord[i].stop_times)+start_times;
        var times = '第'+start_times +'—'+ stop_times+'节';//上课时间
        var laboratory_id = labEquipRecord[i].laboratory_id;//实验室编号
        var laboratory_adressnum = labEquipRecord[i].laboratory_adressnum;//教室号，如201
        var laboratory_adress = labEquipRecord[i].laboratory_adress +'('+ laboratory_adressnum+')';//上课地点
        var laboratory_name = labEquipRecord[i].laboratory_name;//验室名
        var laboratory_renshu = labEquipRecord[i].laboratory_renshu;//实验室容纳人数
        var staff_id = labEquipRecord[i].staff_id;//教师编号
        var staff_name = labEquipRecord[i].staff_name;//教师名
        var experim_num = labEquipRecord[i].experim_num;//已预约人数
        var appoint_week = labEquipRecord[i].appoint_week;//第几周
        dataList.push({
          key: i,
          id:id,
          experim_name:experim_name,
          batch:batch,
          week:week,//周次
          times:times,
          laboratory_id:laboratory_id,//实验室编号
          laboratory_adress:laboratory_adress,//上课地点
          laboratory_name:laboratory_name,//验室名
          laboratory_renshu:laboratory_renshu,//实验室容纳人数
          staff_id:staff_id,//教师编号
          staff_name:staff_name,//教师名
          experim_num:experim_num,//已预约人数
          appoint_week:appoint_week,//第几周
        });
      }
    }
    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'3%'}}>预约实验室</p>
      </Row>
        <div>

          <Table columns={columns}  dataSource={dataList}  pagination={{ pageSize:4 }} bordered={true} />
        </div>
      </div>




    );

  }

});

module.exports = Message;

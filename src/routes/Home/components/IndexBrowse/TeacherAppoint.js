import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Pagination,Card } from 'antd';
import HeaderInfo from '../HeaderInfo';
import FooterInfo from '../FooterInfo';
//公告单个列表
const SingleAppoint = React.createClass({
  getInitialState(){
    return{
      show:false,

    };
  },
  //选课之前先检查该学生有没有预约该课程
  onHandleClick(a){
    const self = this;
    console.log("idwei",a);
    var url = $CONTEXT_ADDR + '/students/quryStu.do';
    // // $ajax.get({
    // //   type: "POST",
    // //   url: url,
    // //   dataType: "json",
    // //   data : {
    // //     "stu_id": localStorage.getItem('number'),//学生编号
    // //     "course_time_id": record.id,//编号id
    // //   },
    // //   async:true
    // // },function(response){
    // //    var res = response;
    // //    if(res.length==0){
    // //      self.ceshi(record);
    // //    }else{
    // //      console.log("11111");
    // //      console.log("res.status",res.status);
    // //      for(var i=0; i<res.length; i++){
    // //        if(res[i].status==1){
    // //          Modal.error({
    // //            title:'已审核成功，请勿再选',
    // //          })
    // //        }else if(res[i].status==2){
    // //          Modal.error({
    // //            title:'正在审核中，请勿再选',
    // //          })
    // //        }else if(res[i].status==4){
    // //          Modal.error({
    // //            title:'审核未通过，请勿再选',
    // //          })
    // //        }else{
    // //          console.log("zhxingl");
    // //         // self.ceshi(record);
    // //        }
    // //      }
    // //
    // //    }
    //
    //    self.setState({
    //
    //    });
    //
    // },function(e){
    //   //console.log("e..." , e);
    // });
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
  render(){
    const {id} = this.props;//唯一标识id
    const {staff_name} = this.props;//教师名
    const {experim_name} = this.props;//实验名
    const {appoint_week} = this.props;//预约的周数
    const {week} = this.props;//周几
    const {start_times} = this.props;//开始的课时
    const {stop_times} = this.props;//结束的课时
    const {laboratory_name} = this.props;//结束的课时
    const {laboratory_adress} = this.props;//结束的课时
    const {laboratory_adressnum} = this.props;//结束的课时
    return(
        <div >
      <Card title={experim_name} extra={<a onClick={this.onHandleClick({id})}>预约</a>}  style={{width:'280',marginTop:'3%',float:'left',marginLeft:'1%',marginBottom:'3%'}}>
        <p style={{marginTop:'1%',fontSize:'17',fontFamily:'楷体'}}>{staff_name}教师</p>
        <p style={{marginTop:'1%',fontSize:'17',fontFamily:'楷体'}}>实验室：{laboratory_name}</p>
        <p style={{marginTop:'1%',fontSize:'17',fontFamily:'楷体'}}>上课时间：{appoint_week}，{week}，{start_times}--{stop_times}</p>
        <p style={{marginTop:'1%',fontSize:'17',fontFamily:'楷体'}}>上课地点：{laboratory_adress}({laboratory_adressnum})</p>
      </Card>
      </div>
    )
  }
});
//实验室公告
const LabNotice = React.createClass({
  getInitialState(){
    return{
      notice:[],//首页两条公告
      current: 1,//当前页是1
      pageSize:3,
      totalRecord:'',
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/teacher/quryAllTeacherAppoint.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        current:self.state.current,//当前点的第几页
        pageSize:self.state.pageSize,//显示多少页
      },
      async:true
    },function(response){
       var notice = response;
       var total = notice[notice.length-1];
       var totalRecord = total.totalRecord;
       self.setState({
         notice:notice,
         totalRecord:totalRecord,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },
  onChange(page) {
    const self=this;
    this.setState({
      current: page,
    },function () {
      self.queryBasicInfo();
    }  );
  },

  render(){
    const recordList =[];
    var res = this.state.notice;
    if(res==''||res==undefined){
      var centerMLeft=<div>zanwu</div>
    }else{
      for(var i=0; i<res.length-1; i++){
        var id = res[i].id;
        var experim_name = res[i].experim_name;
        var appoint_week = "第"+res[i].appoint_week+"周";
        var week = "星期"+res[i].week;
        var stop_times = res[i].stop_times+"节";
        var start_times = "第"+res[i].start_times+"节";
        var staff_name = res[i].staff_name;
        var laboratory_name = res[i].laboratory_name;
        var laboratory_adress = res[i].laboratory_adress;
        var laboratory_adressnum = res[i].laboratory_adressnum;
        recordList.push({key : i, content : <SingleAppoint id={id} staff_name={staff_name}
          experim_name={experim_name} appoint_week={appoint_week} week={week}
          start_times={start_times} stop_times={stop_times} laboratory_name={laboratory_name}
          laboratory_adress={laboratory_adress} laboratory_adressnum={laboratory_adressnum} />});
      }
    }
    var content =
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
          <div className="center-index">
            <div style={{width:'80%',margin:'auto',padding:'10'}}>
              <div>
                {content}
              </div>
            </div>
            <div style={{margin:'auto',width:'30%',paddingBottom:'30',paddingTop:'20',clear:'both'}}>
                <Pagination current={this.state.current} onChange={this.onChange} total={this.state.totalRecord} pageSize={this.state.pageSize} showTotal={total => `总共 ${total} 条`}>
                </Pagination>
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
module.exports = LabNotice;

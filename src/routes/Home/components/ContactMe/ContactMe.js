import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop,Card,Pagination } from 'antd';
//设备单个列表
const SingleContact = React.createClass({
  getInitialState(){
    return{
      show:false,
    };
  },

  render(){
    const {laboratory_name} = this.props;//实验室名
    const {laboratory_adress} = this.props;//实验室地址
    const {laboratory_adressnum} = this.props;//实验室门牌号
    const {staff_name} = this.props;//实验室管理员
    const {staff_phone} = this.props;//实验室管理员联系方式
    return(
      <div style={{ width: '31%',float:'left',marginLeft:'2%',marginTop:'2%',padding:'10' }}>
      <Card title={laboratory_name} >
      <p>实验室管理员：{staff_name}</p>
      <p>管理员联系方式：{staff_phone}</p>
      <p>实验室地址：{laboratory_adress}</p>
      <p>实验室门牌号：{laboratory_adressnum}</p>  
    </Card>
    </div>
    )
  }
});
//联系我们
const ContactMe = React.createClass({
  getInitialState(){
    return{
      contact:[],
      current: 1,//当前页是1
      pageSize:9,
      totalRecord:'',
    };
  },
  componentWillMount(){
    this.queryBasicInfo();
  },
  queryBasicInfo(){
    const self = this;
    var url = $CONTEXT_ADDR + '/contact/quryAllContact.do';
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
       var contact = response;
       console.log("contact",contact);
       var total = contact[contact.length-1];
       var totalRecord = total.totalRecord;
       self.setState({
         contact:contact,
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
    var contact = this.state.contact;
    for(var i = 0; i<contact.length-1 ;i++){
      var laboratory_name = contact[i].laboratory_name;//实验室名
      var laboratory_adress = contact[i].laboratory_adress;//实验室地址
      var laboratory_adressnum = contact[i].laboratory_adressnum;//实验室门牌号
      var staff_name = contact[i].staff_name;//实验室管理员
      var staff_phone = contact[i].staff_phone;//实验室管理员联系方式
      recordList.push({ key : i , content : <SingleContact laboratory_name ={laboratory_name} laboratory_adress ={laboratory_adress}
      laboratory_adressnum ={laboratory_adressnum} staff_name ={staff_name} staff_phone ={staff_phone}/>});
    };
    var content =
    <div>
      <div>
      {recordList.map(map => (
           <div key={map.key}>
             {map.content}
           </div>
         ))}
      </div>
    </div>
    return(
        <div>
          <Row>
          <div className="center-index">
            <div style={{width:'80%',margin:'auto',padding:'10'}}>
              {content}
            </div>
            <div style={{margin:'auto',width:'30%',paddingBottom:'30',paddingTop:'20'}}>
                <Pagination current={this.state.current} onChange={this.onChange} total={this.state.totalRecord} pageSize={this.state.pageSize} showTotal={total => `总共 ${total} 条`}>
                </Pagination>
            </div>
          </div>
          </Row>
        </div>
    )
  }
});
module.exports = ContactMe;

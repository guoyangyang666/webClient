import React from 'react'
import {Row, Col,Tooltip,Carousel,Menu, Icon,Table,Modal,Affix, Button,Input,BackTop, } from 'antd';
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
      <div className='card'>
        <div className='cardMargin'>
          <p><span className='attr'>实验室名</span><span> {laboratory_name}</span></p>
          <p><span className='attr'>地址</span><span> {laboratory_adress}</span></p>
          <p><span className='attr'>实验室门牌号</span><span> {laboratory_adressnum}</span></p>
          <p><span className='attr'>实验室管理员</span><span> {staff_name}</span></p>
          <p><span className='attr'>联系方式</span><span> {staff_phone}</span></p>
        </div>
      </div>
    )
  }
});
//联系我们
const ContactMe = React.createClass({
  getInitialState(){
    return{
      contact:[],
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

      },
      async:true
    },function(response){
       var contact = response;
       console.log("1111",contact.length);
       self.setState({
         contact:contact,
       });

    },function(e){
      //console.log("e..." , e);
    });
  },


  render(){
    const recordList =[];
    var contact = this.state.contact;
    for(var i = 0; i<contact.length ;i++){
      var laboratory_name = contact[i].laboratory_name;//实验室名
      var laboratory_adress = contact[i].laboratory_adress;//实验室地址
      var laboratory_adressnum = contact[i].laboratory_adressnum;//实验室门牌号
      var staff_name = contact[i].staff_name;//实验室管理员
      var staff_phone = contact[i].staff_phone;//实验室管理员联系方式
      recordList.push({ key : i , content : <SingleContact laboratory_name ={laboratory_name} laboratory_name ={laboratory_name}
      laboratory_adressnum ={laboratory_adressnum} staff_name ={staff_name} staff_phone ={staff_phone}/>});
    };
    return(
        <div>
          <div className="center-index">
            <div style={{width:'80%',margin:'auto',padding:'10'}}>
            {recordList.map(map => (
                 <div key={map.key}>
                   {map.content}
                 </div>
               ))}
            </div>

          </div>
        </div>
    )
  }
});
module.exports = ContactMe;

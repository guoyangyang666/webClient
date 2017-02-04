import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select } from 'antd';
const Option = Select.Option;
var Message = React.createClass({
  getInitialState(){
      return{
        id:'',
        equip_name:'',
        storage_time:'',
        labEquipRecord:[],//列表
        selectedRowKeys: [],  // Check here to configure the default column
      };
    },

  componentWillMount() {
     //this.qryVaccinationHistion();
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
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  handleChange(value) {
    console.log(`selected ${value}`);
  },

  render() {
    const columns = [
      {
        title: '实验室编号',
        dataIndex: 'name',
        key: 'name',
        render(text) {
        return <a href="#">{text}</a>;
        }
        }, {
        title: '实验室名称',
        dataIndex: 'age',
        key: 'age',
        }, {
        title: '试验项目批次',
        dataIndex: 'address',
        key: 'address',
        },{
        title: '预约时间',
        dataIndex: 'time',
        key: 'address',
        }, {
        title: '学生学号',
        dataIndex: 'num',
        key: 'num',
        },  {
        title: '学生姓名',
        dataIndex: 'numname',
        key: 'numname',
        }, {
        title: '预约状态',
        dataIndex: 'status',
        key: 'status',
        },
          ];

          const data = [{
            key: '11',
            name: '1010',
            age: '网络实验室',
            time:'周二 1-2',
            address: '实验1',
            num:'201322450718',
            numname:'郭洋洋',
            status:'未审核'
          }, {
            key: '2',
            name: '1010',
            age: '网络实验室',
            time:'周二 1-2',
            address: '实验2',
            num:'2014224500505',
            numname:'丁宇',
            status:'审核通过'
          }];
    var labEquipRecord = this.state.labEquipRecord;
    console.log("1111yangyagn"+labEquipRecord.length);
    console.log(labEquipRecord);
    const dataList=[];
    if(labEquipRecord == undefined){
      var id = labEquipRecord.id;//随访服务id
      var equip_name = labEquipRecord.equip_name;//产后随访机构
      var storage_time = labEquipRecord.storage_time;//随访方式
      dataList.push({
        key: i,
        id:labEquipRecord.id,
        equip_name:labEquipRecord.equip_name,
        storage_time:labEquipRecord.storage_time,
      });
    }else {
      for (var i = 0; i < labEquipRecord.length; i++) {
        var id = labEquipRecord[i].id;//随访服务id
        var equip_name = labEquipRecord[i].equip_name;//产后随访机构
        var storage_time = labEquipRecord[i].storage_time;//随访方式
        dataList.push({
          key: i,
          id:labEquipRecord[i].id,
          equip_name:labEquipRecord[i].equip_name,
          storage_time:labEquipRecord[i].storage_time,
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
          <div style={{ marginBottom: 16 }}>
            <Button type="primary"
              disabled={!hasSelected}
            >审批</Button>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `已选 ${selectedRowKeys.length} 条` : ''}</span>
            <span style={{float:'right'}}>
              <Select defaultValue="请选择实验名" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select defaultValue="请选择批次" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </span>
          </div>
          <Table columns={columns} rowSelection={rowSelection}  dataSource={data}  pagination={{ pageSize:4 }} bordered={true} scroll={{ x: true, y: 300 }} />
        </div>
      </div>
    );

  }

});

module.exports = Message;

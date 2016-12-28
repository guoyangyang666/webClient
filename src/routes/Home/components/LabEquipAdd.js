import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select,DatePicker,Upload, } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Message = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      loginPw:'',
      size: 'default',
      id:'',//设备编号，id
      equip_name:'',//设备名称
      equip_model:'',//设备型号
      unit_price:'',//设备单价
      equip_number:'',//设备数量
      storage_time:'',//入库时间
      producer:'',//生产产商
      application:'',//用途简介
      equip_image_one:'',//设备图片1
      equip_image_two:'',//设备图片2
      laboratory_id:'',//实验室编号id
      operation_time:'',//操作时间
      staff_id:'',//管理员工号
      type:'',//类型
      equip_desc:'',//备注（可填可不填）
    };
  },
  queryBasicInfo() {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/addEquip.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": this.state.id,//设备编号，id
        "equip_name": this.state.equip_name,//设备名称
        "equip_model": this.state.equip_model,//设备型号
        "unit_price": this.state.unit_price,//设备单价
        "equip_number": this.state.equip_number,//设备数量
        "storage_time": this.state.storage_time,//入库时间
        "producer": this.state.producer,//生产产商
        "application": this.state.application,//用途简介
        "equip_image_one": this.state.equip_image_one,//设备图片1
        "equip_image_two": this.state.equip_image_two,//设备图片2
        "equip_desc": this.state.equip_desc,//备注（可填可不填）
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号id
        "type": localStorage.getItem('logintype'),//类型
        "staff_id": localStorage.getItem('number'),//管理员工号
      },
      async:true
    },function(response){
      console.log("12234");
      var res = response;
      console.log(res);
      // if(res.length == "0"){
      //   Modal.success({
      //     title: '密码修改失败',
      //     content: '返回',
      //   });
      // }else {
      //   Modal.success({
      //     title: '密码修改成功',
      //     content: '确认',
      //   });
      // }
      self.setState({
        loginPw:loginPw,
        loginName:loginName,//用户名
      });
    },function(e){
      //console.log("e..." , e);
    });
    
  },
  handleSubmit(e) {
     e.preventDefault();
     if(this.state.id == null){
       Modal.warning({
         title: '设备编号为空',
         content: '请输入设备编号',
       });
     }else if(this.state.equip_name == null) {
       Modal.warning({
         title: '设备名称为空',
         content: '请输入设备名称',
       });
     }else{
          this.queryBasicInfo();
     }
   },
   handleChange: function(name, event){
     var newState = {};
     newState[name] = event.target.value;
     this.setState(newState);
     console.log(event.target.value);
   },
   handleSelect(value) {
      console.log(value);

    },

  render() {
    const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
    const tailFormItemLayout = {
          wrapperCol: {
          span: 14,
          offset: 6,
      },
    };
    const { size } = this.state;
    const props = {
      action: '/upload.do',
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }]
    };

    return (
      <div style={{clear:'none',paddingTop:'5%'}}>
      <Row>
        <p style={{fontSize:'20',fontFamily:'楷体',textAlign:'center',marginBottom:'5%'}}>实验室设备信息添加</p>
      </Row>
      <Form horizontal onSubmit={this.handleSubmit}>
    <Row>
      <Col span={12}>
        <FormItem
        {...formItemLayout}
        label="设备编号："
        hasFeedback
        >
        <Input value={this.state.id}
         onChange={this.handleChange.bind(this,'id')}/>
        </FormItem>
      </Col>
      <Col span={12}>
      <FormItem
        {...formItemLayout}
        label="设备名称："
        hasFeedback
      >
          <Input  value={this.state.equip_name}
           onChange={this.handleChange.bind(this,'equip_name')}/>
      </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="设备型号："
          hasFeedback
        >
            <Input  value={this.state.equip_model}
             onChange={this.handleChange.bind(this,'equip_model')}/>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="设备单价："
          hasFeedback
        >
            <Input  value={this.state.unit_price} placeholder="元"
             onChange={this.handleChange.bind(this,'unit_price')}/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="设备数量："
          hasFeedback
        >
            <Input  value={this.state.equip_number}
             onChange={this.handleChange.bind(this,'equip_number')}/>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="入库时间："
          hasFeedback
        >
          <DatePicker size={size} onChange={this.handleSelect}
          />
          </FormItem>
      </Col>
    </Row>
    <Row >
    <Col span={12}>
      <FormItem
        {...formItemLayout}
        label="生产产商："
        hasFeedback
      >
          <Input  value={this.state.producer}
           onChange={this.handleChange.bind(this,'producer')}/>
      </FormItem>
    </Col>
    </Row>
    <Row>
      <Col span={24}>
      <div className="clearfix" style={{marginLeft:'5%', marginBottom:'3%'}}>
      <span style={{marginRight:'5%'}}>设备照片:</span>
        <Upload {...props}>
          <Icon type="plus" />
          <div className="ant-upload-text">上传设备照片</div>
        </Upload>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="用途简介："
          hasFeedback
        >
            <Input type="textarea" placeholder="可输入多行文字" autosize />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label="备注："
          hasFeedback
        >
            <Input type="textarea" placeholder="可输入多行文字" autosize  />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <FormItem {...tailFormItemLayout}>
         <Button type="primary" htmlType="submit" size="large">确认添加</Button>
        </FormItem>
      </Col>
    </Row>

      </Form>
      </div>
    );

  }

}));

module.exports = Message;

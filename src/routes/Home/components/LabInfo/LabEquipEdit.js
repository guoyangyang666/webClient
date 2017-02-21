import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import { Row, Col, Tooltip, Carousel, Menu, Icon, Table, Modal, Button, Input, BackTop, Steps, message, Form, Checkbox,Select,DatePicker,Upload, } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;
function noop() {
  return false;
}
class LabEquipEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      props:props,
      dateStatus:true,//设置时间框的状态
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
    }],
    };
  }

  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }
  componentWillMount(){
    this.queryBasicInfo();
  }
  queryBasicInfo() {
    const self = this;
    var LabEquipid = self.props.recordId;
    var url = $CONTEXT_ADDR + '/labAdmin/queryLabInfo.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : {
        "id": LabEquipid,//设备编号，id
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号
      },
      async:true
    },function(response){
      var res = response[0];
      var id = res.id;//设备编号，id
      var equip_name = res.equip_name;//设备名称
      var equip_model = res.equip_model;//设备型号
      var unit_price = res.unit_price;//设备单价
      var equip_number = res.equip_number;//设备数量
      var storage_time = res.storage_time;//入库时间
      var producer = res.producer;//生产产商
      var application = res.application;//用途简介
      var equip_image_one = res.equip_image_one;//设备图片1
      var equip_image_two = res.equip_image_two;//设备图片2
      var equip_desc = res.equip_desc;//备注（可填可不填）
      self.setState({
        id: id,//设备编号，id
        equip_name: equip_name,//设备名称
        equip_model: equip_model,//设备型号
        unit_price: unit_price,//设备单价
        equip_number: equip_number,//设备数量
        storage_time: storage_time,//入库时间
        producer: producer,//生产产商
        application: application,//用途简介
        equip_image_one: equip_image_one,//设备图片1
        equip_image_two: equip_image_two,//设备图片2
        equip_desc: equip_desc,//备注（可填可不填）
      });
    },function(e){
      //console.log("e..." , e);
    });
  }
  changeLabInfo(values) {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/changeLabEquip.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data :values
      ,
      async:true
    },function(response){
      if(response[0].code =='1'){
        Modal.success({
          title:'修改成功',
        })
        self.queryBasicInfo();
      }else {
        Modal.error({
          title:'修改失败',
        })
      }
      self.setState({

      });
    },function(e){
      //console.log("e..." , e);
    });
  }
  handleSubmit(e) {
    const self = this;
    var values;
    e.preventDefault();
    this.props.form.validateFields((errors, filedsValue) => {
      if (!!errors) {
        Modal.error({
          title:"",
          content:"请填写表单必填项",
          okText:"确定"
        })
        return;
      }

        values={
          ...filedsValue,
          "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号id
          "type": localStorage.getItem('logintype'),//类型
          "staff_id": localStorage.getItem('number'),//管理员工号
        }

      this.setState({
        dateStatus:!this.state.dateStatus,
      })
      console.log(values);
       self.changeLabInfo(values);
    });
  }
   checkStorageTime(rule, value, callback) {
       if (value == '') {
         callback(new Error('请选择入库时间'));
       } else {
         callback();
       }
     }
  handleChange(info){
     let fileList = info.fileList;
     console.log("fileList",fileList);
     fileList = fileList.map((file) => {
     if (file.response) {
       // Component will show file.url as link
       file.url = file.response.url;
     }
     console.log("file2",file);
     return file;

   });
   console.log("222",fileList);
    this.setState({ fileList });
    console.log("333",fileList);
  }
  render() {
    const self = this;
    console.log("unit_price",this.state.unit_price);
    const dateStatus = self.state.dateStatus;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const id = getFieldProps('id', {
      rules: [
        { required: true, min: 1, message: '设备编号不能为空' },
      ],
      initialValue:self.state.id
    });
    const equip_name = getFieldProps('equip_name', {
      rules: [
        { required: true, min: 1, message: '设备名称不能为空' },
      ],
      initialValue:self.state.equip_name
    });
      var storage_time = getFieldProps('storage_time', {
        rules: [
          { required: true,   min: 1,
            message: '入库时间', },
          {
            validator: this.checkStorageTime,
          }
        ],
        initialValue:self.state.storage_time
      });
      const unit_price = getFieldProps('unit_price', {initialValue:self.state.unit_price});
      const equip_model = getFieldProps('equip_model', {initialValue:self.state.equip_model});
      const equip_number = getFieldProps('equip_number', {initialValue:self.state.equip_number});
      const producer = getFieldProps('producer', {initialValue:self.state.producer});
      const application = getFieldProps('application', {initialValue:self.state.application});
      const equip_desc = getFieldProps('equip_desc', {initialValue:self.state.equip_desc});
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const equip_image_one = {
      action:  $CONTEXT_ADDR + '/equip/imageUp.do',
      listType: 'picture-card',
      onChange: this.handleChange.bind(this),


    };

    return (
      <Form horizontal form={this.props.form} >
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备编号："
              hasFeedback>
              <Input {...id} placeholder="请输入设备编号" disabled='true' />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备名称："
              hasFeedback>
              <Input {...equip_name} type="text" placeholder="请输入设备名称" disabled='true'/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备型号："
              hasFeedback>
              <Input {...equip_model}  placeholder="请输入设备型号" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备单价："
              hasFeedback>
              <Input {...unit_price} type="text" placeholder="请输入设备单价" style={{ width: 100 }} />
              <span className="ant-form-text">元</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备数量："
              hasFeedback>
              <Input {...equip_number} placeholder="请输入设备数量" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="入库时间："
              hasFeedback>
              <DatePicker {...storage_time} disabled='true'/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="生产产商："
              hasFeedback>
              <Input {...producer} placeholder="请输入生产产商：" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
          <div className="clearfix" style={{marginLeft:'5%', marginBottom:'3%'}}>
          <span style={{marginRight:'5%'}}>上传设备照片:</span>
            <Upload  {...getFieldProps('equip_image_one')}  {...equip_image_one} fileList={this.state.fileList}
            >
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
              label="用途简介：">
              <Input {...application} type="textarea" placeholder="用途简介：" id="textarea" name="textarea" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="备注：">
              <Input {...equip_desc} type="textarea" placeholder="用途简介：" id="textarea" name="textarea" />
            </FormItem>
          </Col>
        </Row>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认修改</Button>
        </FormItem>
      </Form>
    );

  }

}
LabEquipEdit = createForm()(LabEquipEdit);
module.exports = LabEquipEdit;
// class LabEquipEdit extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       props:props,
//     };
//   }
//   render(){
//     // const {recordId} = this.props.params;
//     // console.log("woshi ",{recordId});
//       return(
//         <LabEquipEditInfo recordId={this.state.props}/>
//       )
//   }
// }

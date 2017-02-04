import { Row, Col,Button, Form, Input,Modal,DatePicker,Upload,Icon,Select } from 'antd';
import { Link, browserHistory, hashHistory } from 'react-router';
import React from 'react';
import moment from 'moment';
const createForm = Form.create;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
function noop() {
  return false;
}
class LabEquipAdd extends React.Component {
  constructor(props){
    super(props);
    this.state={
      passwordDirty: false,
      loginPw:'',
      size: 'default',
    };
  }

  componentWillMount() {
     this.qryVaccinationHistion();
    }
    qryVaccinationHistion() {
     const self = this;
     var url = $CONTEXT_ADDR + '/labAdmin/quryExperimbatchsName.do';
     $ajax.get({
       type: "POST",
       url: url,
       dataType: "json",
       data : {
         "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号
       },
       async:true
     },function(response){
        var Record = response;
        console.log("接收的到值111",Record);
        self.setState({
          Record:Record,//列表
        });

     },function(e){
       //console.log("e..." , e);
     });
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

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }
  queryBasicInfo(values) {
    const self = this;
    var url = $CONTEXT_ADDR + '/labAdmin/addExperimbatchs.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : values,
      async:true
    },function(response){
      var res = response;
      if(res[0].code == 1){
        Modal.success({
          title:"添加成功",
          okText:"确定"
        })
        handleReset(e);
      }else{
        Modal.error({
          title:"添加失败",
          okText:"确定"
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
    console.log("1111");
    this.props.form.validateFields((errors, filedsValue) => {
      if (!!errors) {
        Modal.error({
          title:"实验批次",
          content:"请填写表单必填项",
          okText:"确定"
        })
        return;
      }
      values={
        ...filedsValue,
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号id
      }
      self.queryBasicInfo(values);
    });
  }

  render() {
    const self = this;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const experim_id = getFieldProps('experim_id', {
      rules: [
        { required: true, min: 1, message: '实验批次名' },
      ],
      initialValue:self.props.experim_id
    });
    const batch = getFieldProps('batch', {
      rules: [
        { required: true, min: 1, message: '实验批次' },
      ],
      initialValue:self.props.batch
    });
    const start_week = getFieldProps('start_week', {
      rules: [
        { required: true, min: 1, message: '开始周数不能为空' },
      ],
      initialValue:self.props.start_week
    });
    const last_week = getFieldProps('last_week', {
      rules: [
        { required: true, min: 1, message: '持续周数不能为空' },
      ],
      initialValue:self.props.last_week
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    var Record = self.state.Record;
    var batchName =
          Record.map((item) => {
          return <Option value={item.id} >{item.experim_name}</Option>
          })
    return (
      <Form horizontal form={this.props.form}>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="实验项目名："
              hasFeedback>
              <Select {...experim_id}>
                {batchName}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="批次："
              hasFeedback>
              <Select {...batch}>
                <Option value="批次一">批次一</Option>
                <Option value="批次二">批次二</Option>
                <Option value="批次三">批次三</Option>
                <Option value="批次四">批次四</Option>
                <Option value="批次五">批次五</Option>
                <Option value="批次六">批次六</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="开始周："
              hasFeedback>
              <Select {...start_week}>
                <Option value="1">第1周</Option>
                <Option value="2">第2周</Option>
                <Option value="3">第3周</Option>
                <Option value="4">第4周</Option>
                <Option value="5">第5周</Option>
                <Option value="6">第6周</Option>
                <Option value="7">第7周</Option>
                <Option value="8">第8周</Option>
                <Option value="9">第9周</Option>
                <Option value="10">第10周</Option>
                <Option value="11">第11周</Option>
                <Option value="12">第12周</Option>
                <Option value="13">第13周</Option>
                <Option value="14">第14周</Option>
                <Option value="15">第15周</Option>
                <Option value="16">第16周</Option>
                <Option value="17">第17周</Option>
                <Option value="18">第18周</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="结束周："
              hasFeedback>
              <Select {...last_week}>
                <Option value="1">第1周</Option>
                <Option value="2">第2周</Option>
                <Option value="3">第3周</Option>
                <Option value="4">第4周</Option>
                <Option value="5">第5周</Option>
                <Option value="6">第6周</Option>
                <Option value="7">第7周</Option>
                <Option value="8">第8周</Option>
                <Option value="9">第9周</Option>
                <Option value="10">第10周</Option>
                <Option value="11">第11周</Option>
                <Option value="12">第12周</Option>
                <Option value="13">第13周</Option>
                <Option value="14">第14周</Option>
                <Option value="15">第15周</Option>
                <Option value="16">第16周</Option>
                <Option value="17">第17周</Option>
                <Option value="18">第18周</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

LabEquipAdd = createForm()(LabEquipAdd);
module.exports = LabEquipAdd;

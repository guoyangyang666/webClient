import { Row, Col,Button, Form, Input,Modal,DatePicker,Upload,Icon } from 'antd';
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
    var url = $CONTEXT_ADDR + '/labAdmin/addEquip.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : values,
      async:true
    },function(response){
      console.log("12234");
      var res = response;
      console.log(res);
      self.setState({
        loginPw:loginPw,
        loginName:loginName,//用户名
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
          title:"发卡",
          content:"请填写表单必填项",
          okText:"确定"
        })
        return;
      }
      console.log(filedsValue);
      console.log(filedsValue['storage_time']);

      values={
        ...filedsValue,
        "storage_time":filedsValue['storage_time'].format('YYYY-MM-DD'),
        "laboratory_id": localStorage.getItem('laboratoryId'),//实验室编号id
        "type": localStorage.getItem('logintype'),//类型
        "staff_id": localStorage.getItem('number'),//管理员工号
      }
      self.queryBasicInfo(values);
    });
  }
  handleChange(info) {
      let fileList = info.fileList;

      // 1. 上传列表数量的限制
      //    只显示最近上传的一个，旧的会被新的顶掉
      fileList = fileList.slice(-2);

      // 2. 读取远程路径并显示链接
      fileList = fileList.map((file) => {
        if (file.response) {
          // 组件会将 file.url 作为链接进行展示
          file.url = file.response.url;
        }
        return file;
      });

      // 3. 按照服务器返回信息筛选成功上传的文件
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success';
        }
        return true;
      });

      this.setState({ fileList });
    }
  checkStorageTime(rule, value, callback) {
      if (value == '') {
        callback(new Error('请选择入库时间'));
      } else {
        callback();
      }
    }

  render() {
    const self = this;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const id = getFieldProps('id', {
      rules: [
        { required: true, min: 1, message: '设备编号不能为空' },
      ],
      initialValue:self.props.equip_id
    });
    const equip_name = getFieldProps('equip_name', {
      rules: [
        { required: true, min: 1, message: '设备名称不能为空' },
      ],
      initialValue:self.props.equip_name
    });
    const storage_time = getFieldProps('storage_time', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '入库时间',
        }, {
          validator: this.checkStorageTime,
        }
      ],
      initialValue:self.props.storage_time
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const equip_image_one = {
      action:  $CONTEXT_ADDR + '/image/singleuploadurl1111.do',
      listType: 'picture-card',
      // defaultFileList: [{
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      //   thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      //   multiple: true
      // }]

    };

    return (
      <Form horizontal form={this.props.form}>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备编号："
              hasFeedback>
              <Input {...id} placeholder="请输入设备编号" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备名称："
              hasFeedback>
              <Input {...equip_name} type="text" placeholder="请输入设备名称" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备型号："
              hasFeedback>
              <Input {...getFieldProps('equip_model')} placeholder="请输入设备型号" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="设备单价："
              hasFeedback>
              <Input {...getFieldProps('unit_price')} type="text" placeholder="请输入设备单价" style={{ width: 100 }} />
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
              <Input {...getFieldProps('equip_number')} placeholder="请输入设备数量" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="入库时间："
              hasFeedback>
              <DatePicker {...storage_time}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="生产产商："
              hasFeedback>
              <Input {...getFieldProps('producer')} placeholder="请输入生产产商：" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="clearfix" style={{marginLeft:'5%', marginBottom:'3%'}}>
            <span style={{marginRight:'5%'}}>上传设备照片:</span>
              <Upload {...equip_image_one}  {...getFieldProps('equip_image_one')} >
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
              <Input {...getFieldProps('application')} type="textarea" placeholder="用途简介：" id="textarea" name="textarea" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="备注：">
              <Input {...getFieldProps('equip_desc')} type="textarea" placeholder="用途简介：" id="textarea" name="textarea" />
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
// defaultFileList: [{
//   uid: -1,
//   name: 'xxx.png',
//   status: 'done',
//   url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
//   thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
//   multiple: true
// }]

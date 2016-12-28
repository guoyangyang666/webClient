import { Router,Route, IndexRoute, browserHistory,hashHistory} from 'react-router';
import React from 'react';
import { Row, Col,DatePicker,QueueAnim , Spin} from 'antd';
import PageMenu from './PageMenu';


global.$history = hashHistory;

import {Link} from 'react-router';

global.$userInfo = {name:'' , sex:'', cardNo:'', mobile:'', openid:'', ssn:''};

const MainPage = React.createClass({
  getInitialState() {
    return {
        show: false
    };
  },
  componentWillMount() {
    //this.qryUser();
  },
  qryUser() {
    const self = this;
    var url = $CONTEXT_ADDR + '/UserService/qryUserMessage.do';
    $ajax.get({
      type: "POST",
      url: url,
      dataType: "json",
      data : "",
      async:true
    },function(response){
      var res = Immutable.fromJS(response);

      console.log("res...." + res);

      if(res.get('result') == 'true'){
        var data = res.get('data');
        if(data.get('cardNo') == null){
            $userInfo.openid = data.get('openid');
            //跳转到注册
            $history.push("/userRegister/"+data.get('openid'))

        }else{
          global.$userInfo = {
            name: data.get('name') ,
            sex:data.get('sex'),
            cardNo:data.get('cardNo'),
            mobile:data.get('mobile'),
            openid:data.get('openid'),
            ssn:data.get('ssn')
          };
          self.setState({
            show : true
          });
        }

      }
    },function(e){
      //console.log("e..." , e);
    });
  },
  //<div className="page-menu"><PageMenu /></div>//App最下面的菜单
  render() {
    var pageInfo =<div className="page-container" key="MainPage">{this.props.children}</div>
    return (
      <div>
          {pageInfo}
      </div>);
  }
});

export default MainPage;

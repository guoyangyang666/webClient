import React from 'react';
import { Router,Route, IndexRoute, browserHistory,hashHistory} from 'react-router';
global.$history = hashHistory;
global.$userInfo = {name:'' , sex:'', cardNo:'', mobile:'', openid:'', ssn:''};

//验证是否注册 没注册——跳转到注册界面
function qryUser(){
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
      }

    }
  },function(e){
    //console.log("e..." , e);
  });
}

qryUser();

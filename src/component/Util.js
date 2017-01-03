
global.jQuery = require('jquery');
global.Immutable = require('immutable');

global.$CONTEXT_ADDR = "http://127.0.0.1:9999/hc-mops"; //服务器：http://dev.huihealth.com/hkbao  本地：http://127.0.0.1:9999/hkbao2
global.$IMAGE_ROOT_PATH =  "/hc-mops/image/"; //    /hkbao

global.$ajax = {};
global.$ajax.get = function(params , success , error){
  jQuery.ajax({
    type: params.type,
    url: params.url,
    dataType: params.dataType,
    data : params.data,
    async : params.async,
    success: success,
    error : error
  });
}

Date.prototype.format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

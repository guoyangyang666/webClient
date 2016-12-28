<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html ng-app="myApp">
<head>
<title>https登录页</title>
<!-- Meta -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,.initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<!-- CSS Global Compulsory-->
	<link rel="stylesheet" href="assets/plugins/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<link rel="stylesheet" href="assets/css/headers/header1.css">
	<link rel="stylesheet" href="assets/css/responsive.css">
	
	<link rel="stylesheet" href="assets/css/pages/page_pricing.css">
	<link rel="shortcut icon" href="favicon.ico">
	<!-- CSS Implementing Plugins -->
	<link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="assets/plugins/flexslider/flexslider.css">
	<link rel="stylesheet" href="assets/plugins/parallax-slider/css/parallax-slider.css">
	<!-- CSS Theme -->
	<link rel="stylesheet" href="assets/css/themes/default.css" id="style_color">
	<link rel="stylesheet" href="assets/css/themes/headers/default.css" id="style_color-header-1">
	<!-- CSS Page Style -->
	<link rel="stylesheet" href="assets/plugins/layer_slider/css/layerslider.css" type="text/css">
	<link rel="stylesheet" href="assets/css/pages/portfolio-v2.css">
	<!-- CSS Style Page -->
	<link rel="stylesheet" href="assets/css/pages/page_log_reg_v1.css">
	<link rel="stylesheet" href="assets/plugins/sky-forms/version-2.0.1/css/custom-sky-forms.css">
	<link rel="stylesheet" href="css/ng-grid.css">
	<link rel="stylesheet" href="css/pikaday.css">
	<link rel="stylesheet" href="css/site.css">
	<link type="text/css" rel="stylesheet" href="depend/calendar/calendar.css" >
	
	
	<style type="text/css">
		input.ng-invalid-his-match {
			border: 1px solid red;
		}
		
		.bg-light {
			padding: 0px 0px;
			margin-bottom: 10px;
			background: #fcfcfc;
			border: solid 1px #e5e5e5;
		}
    });
	</style>
	<script type="text/javascript" src="assets/plugins/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="assets/plugins/sky-forms/version-2.0.1/js/jquery.form.min.js"></script>
	<script type="text/javascript" src="assets/plugins/backstretch/jquery.backstretch.min.js"></script>
	<script type="text/javascript" src="depend/angular/angular.min.js"></script>
	<script type="text/javascript" src="depend/angular/angular-route.min.js"></script>
	<script type="text/javascript" src="assets/plugins/jquery-migrate-1.2.1.min.js"></script>
	<script type="text/javascript" src="depend/json/json2.js"></script>
	<script type="text/javascript" src="assets/plugins/bootstrap/js/bootstrap.min.js"></script> 
	<!-- JS Implementing Plugins -->
	<script type="text/javascript" src="assets/plugins/flexslider/jquery.flexslider-min.js"></script>
	<script type="text/javascript" src="assets/plugins/modernizr.custom.js"></script>
	<script type="text/javascript" src="assets/plugins/parallax-slider/js/jquery.cslider.js"></script>
	<script type="text/javascript" src="assets/jssource/affix.js"></script>
	<script type="text/javascript" src="assets/jssource/alert.js"></script>
	<script type="text/javascript" src="assets/jssource/button.js"></script>
	<script type="text/javascript" src="assets/jssource/carousel.js"></script>
	<script type="text/javascript" src="assets/jssource/collapse.js"></script>
	<script type="text/javascript" src="assets/jssource/dropdown.js"></script>
	<script type="text/javascript" src="assets/plugins/back-to-top.js"></script>
<!--<script type="text/javascript" src="assets/plugins/hover-dropdown.min.js"></script>  -->
	<script type="text/javascript" src="assets/jssource/modal.js"></script>
	<script type="text/javascript" src="assets/jssource/tooltip.js"></script>
	<script type="text/javascript" src="assets/jssource/popover.js"></script>
	<script type="text/javascript" src="assets/jssource/scrollspy.js"></script>
	<script type="text/javascript" src="assets/jssource/tab.js"></script>
	<script type="text/javascript" src="assets/js/app.js"></script>
	<script type="text/javascript" src="assets/js/pages/index.js"></script>
	<script type="text/javascript" src="scripts/app/indexModule.js"></script>
	<script type="text/javascript" src="depend/js/valueMatchDirective.js"></script>
	<script type="text/javascript" src="depend/js/ng-grid.js"></script>
	<script type="text/javascript" src="depend/js/pikaday.js"></script>
	
<!-- 	<script src="depend/js/es5-shim/es5-shim.js"></script>
 	<script src="depend/js/json3/lib/json3.min.js"></script> -->
	<!-- 身份证信息 -->
	<script type="text/javascript" src="depend/GetInfoFromIdcard/GetInfoFromIdcard.js"></script>
	<!-- date -->
	<script type="text/javascript" src="depend/calendar/calendar.js" ></script>
	<script type="text/javascript" src="depend/calendar/calendar-zh.js" ></script>
	<script type="text/javascript" src="depend/calendar/calendar-setup.js"></script>
	<!-- date -->
	<script type="text/javascript" src="assets/plugins/parallax-slider/js/modernizr.js"></script>
	<!-- Validation Form -->
	<!-- login -->
	<script type="text/javascript" src="depend/hn/Cookie.js"></script>
	<script type="text/javascript" src="assets/plugins/countdown/jquery.countdown.js"></script>
	
	<!--[if lt IE 9]>
	    <script src="assets/plugins/respond.js"></script>
	<![endif]-->
	
	<script type="text/javascript">
	    jQuery(document).ready(function() {
	      	App.init();
	        App.initSliders();
	        Index.initParallaxSlider();
	    });
	</script>
	<script type="text/javascript">
	 	$(function($) {
			$.backstretch([ "assets/img/bg/1.jpg", "assets/img/bg/2.jpg",
					"assets/img/bg/3.jpg" ], {
				duration : 3000,
				fade : 750
			});
		});
	
	var httpsLogin = angular.module('myApp',['ngRoute']);
	httpsLogin.controller('httpsLoginCtrl',function($scope,$http,$location){
		/**
		 * 登录控制器
		 * 	1.验证登录，验证成功后登录.
		 *  2.登录
		 *  	a.登录成功
		 *  		1).判断用户是否选中记住密码复选框，选中则记住密码，未选中则清除Cookie中原有用户信息.
		 *  		2).添加全局用户信息.
		 *  		3).跳转回到登陆前页面.
		 *  	b.登录失败
		 * **/
		$scope.loginInfo = {};
		$scope.err = {};
		$scope.loginInfo.authCode = "验证码";
		$scope.save = function() {
			var data = $scope.loginInfo;
			debugger;
				$http({
					method: 'post',
					url: '/HealthNet/LoginMgrService/loginUser.do',
					responseType:'json',
					params:{'data':data}
				}).
			    success(function(data, status) {
			    	if(data.desc == "验证码错误"){
			    		$scope.err.code = true;
			    	}else{
				    	if(data.data.reg_data == ""){
				    		$scope.err.display=true;
				    	}else{
				    		//添加全局变量用户信息
				    		$scope.setUserInfo(data.data.reg_data);
				    		//清除Cookie
		    				cleanCookie("cardNo","password");
				    		//设置记住密码
				    		var cardNo = getCookie('cardNo');
			    			var password = getCookie('password');
				    		if($("#setCookie").attr("checked")=="checked"){
				    			 if (cardNo == null || cardNo == "" && password == null || password == "") {
				    			 	setCookie("cardNo",data.data.reg_data.cardNo,"password",data.data.reg_data.password,365);
				    			 }
				    		}else{
				    			 //清除Cookie
			    				 cleanCookie("cardNo","password");
			    			}
				    		//跳转回登录前页面，跳转前如果是注册页，则跳到主页
				    		if($scope.lastPath == "/register" || $scope.lastPath == undefined ){
				    			$location.path("/");
				    		}else{
				    			$location.path($scope.lastPath);
				    		}
				    	}
			    	}
			    }).
			    error(function(data, status) {
			    	$scope.err.display=true;
			    });
			};
		//登录时，判断Cookie是否有用户名密码
		$scope.init = function(){
			$scope.loginInfo = checkCookie();
		};
		//刷新验证码
		$scope.flushAuth = function(test) {
			var dom = document.getElementById("auth");
		    dom.src = dom.src.split('?')[0];
			dom.src = dom.src+"?"+ new Date();
		};
		
	});
	
	
</script>
</head>
<body>
	<div class="margin-bottom-60"></div>
	<div class="container" ng-init="init()" ng-controller="httpsLoginCtrl">
		<div>
			<div class="col-md-4 col-md-offset-4">
				<form class="reg-page" ng-submit="form()" name="Form" novalidate>
					<div class="reg-header">
						<h2>欢迎登录</h2>
					</div>

					<div class="input-group margin-bottom-20">
						<span class="input-group-addon"><i class="icon-user"></i></span> <input
							type="text" name="userName" ng-model="loginInfo.cardNo"
							id="cardNo" placeholder="农合卡号/健康卡号/身份证号" class="form-control"
							required>
					</div>
					<div class="input-group margin-bottom-20">
						<span class="input-group-addon"><i
							style="padding-right: 1px;" class="icon-user"></i></span> <input
							type="password" name="password" ng-model="loginInfo.password"
							id="password" placeholder="密码" class="form-control" required>
					</div>
					<div class="input-group">
						<div id="errorMessage" ng-show="err.display">
							<span><font color="red">用户名或密码不正确!</font></span>
						</div>
						<div ng-show="err.code">
							<span><font color="red">验证码错误，请重新输入</font></span>
						</div>
					</div>
					<div class="row">
						<div class="col-md-8 input-group margin-bottom-20">
							<input name="validateCode" type="text" class="form-control"
								tabindex="3" placeholder="验证码" ng-model="loginInfo.authCode"
								required />
						</div>
						<div class="col-md-4 ">
							<img id="auth" style="margin-left: 7px; margin-top: 5px;"
								align="absmiddle" src="depend/authCode/authCode.jsp"
								title="看不清，点击图片刷新" ng-click="flushAuth()"></img>
						</div>
					</div>
					<div class="row">
						<div class="col-md-8">
							<label class="checkbox"><input type="checkbox"
								id="setCookie" style="padding-top: 2px;">记住密码</label>
						</div>
						<div class="col-md-4">
							&nbsp;&nbsp;&nbsp;
							<button class="btn-u" type="submit" ng-disabled="Form.$invalid">登录</button>
						</div>
					</div>
					<hr>
					<h4>忘记密码?</h4>
					<p>
						别担心, <a class="color-green" href="#/login_key">点击这里</a> 重置你的密码.
					</p>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
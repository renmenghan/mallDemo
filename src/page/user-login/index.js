/*
* @Author: renmenghan
* @Date:   2017-07-21 13:06:57
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-31 12:35:55
*/

'use strict';

require('./index.css');

require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
//表单错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);

	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');

	}
}

// page逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		// 回车提交
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});

	},
	// 提交表单
	submit : function(){
		var formData = {
			username : $.trim($('#user-name').val()),
			password : $.trim($('#password').val()),
		},
		// 验证结果
		validataResult = this.formValidata(formData);
		if (validataResult.status) {
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		}
		else {
			//错误提示
			formError.show(validataResult.msg);
		}
	},
	formValidata : function(formData){
		var result = {
			status  : false,
			msg		: ''
		}
		if (!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 通过验证 
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;

	}
}

$(function(){

	page.init();
});
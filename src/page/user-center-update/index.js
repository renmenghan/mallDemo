/*
* @Author: ren522686239
* @Date:   2017-07-31 18:05:26
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-08-02 21:23:15
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
var templateIndex 	= require('./index.string');
// navSide.init({
// 	name : 'order-list'
// });
// page逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		navSide.init({
			//初始化左侧菜单
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	bindEvent :function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone 		: $.trim($('#phone').val()),
				email 		: $.trim($('#email').val()),
				question 	: $.trim($('#question').val()),
				answer 		: $.trim($('#answer').val())
			},
			validateResult = _this.formValidata(userInfo);
			if (validateResult.status) {
				//更改用户信息
				_user.updateUserInfo(userInfo,function(res,msg){
					_mm.successTips(msg);
					//window.location.href = './user-center';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	formValidata : function(formData){
		var result = {
			status  : false,
			msg		: ''
		}
		if (!_mm.validate(formData.phone,'phone')) {
			result.msg = '手机格式不正确';
			return result;
		}
		if (!_mm.validate(formData.email,'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if (!_mm.validate(formData.question,'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if (!_mm.validate(formData.answer,'require')) {
			result.msg = '密码提示问题答案不能为空';
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
/*
* @Author: ren522686239
* @Date:   2017-08-02 20:33:24
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-08-02 21:22:52
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
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
			name : 'user-pass-update'
		});
	},
	bindEvent :function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password 			: $.trim($('#password').val()),
				passwordNew 		: $.trim($('#passwordNew').val()),
				passwordConfirm 	: $.trim($('#passwordConfirm').val())
			},
			validateResult = _this.formValidata(userInfo);
			if (validateResult.status) {
				//更改密码
				_user.updatePassword({
					paawordOld	:userInfo.password,
					passwordNew	:userInfo.passwordNew
				},function(res,msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},

	formValidata : function(formData){
		var result = {
			status  : false,
			msg		: ''
		};
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '原密码不能为空';
			return result;
		}

		if (!formData.password || formData.passwordNew.length < 6) {
			result.msg = '密码长度小于6位';
			return result;
		}
		if ( formData.passwordNew != formData.passwordConfirm) {
			result.msg = '密码不一致';
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
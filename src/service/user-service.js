/*
* @Author: ren522686239
* @Date:   2017-07-26 21:45:36
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-08-02 21:08:43
*/

'use strict';
var _mm = require('util/mm.js');

var _user = {
	// 登录
	login : function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/login.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 检查登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/get_user_info.do'),
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 登录状态下更改密码
	updatePassword : function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/reset_password.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 登出
	logout : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/logout.do'),
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 检查用户名
	checkUserName : function(username,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/check_valid.do'),
			data	: {
				type	:'username',
				str 	: username
			},
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 注册
	register : function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/register.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 获取用户密码提示问题
	getQuestion : function(username,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/forget_get_question.do'),
			data	: {
				username : username
			},
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 检查密码答案
	checkAnswer : function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/forget_check_answer.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 重置密码
	resetPassword : function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/forget_reset_password.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 获取用户新奇
	getUserInfo : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/get_information.do'),
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	// 更新用户信息
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/update_information.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
}

module.exports = _user;
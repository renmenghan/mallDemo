/*
* @Author: ren522686239
* @Date:   2017-07-31 14:33:51
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-31 15:56:05
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
	data : {
		username : '',
		question : '',
		answer	 : '',
		token	 : '',
	},
	init : function(){
		this.bindEvent();
		this.onLoad();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		// 输入用户名点击下一步
		$('#submit-username').click(function(){
			var username = $.trim($('#user-name').val());
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入用户名');
			}
		});
		// 输入答案点击下一步
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if (answer) {
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer 	:answer
				},function(res){
					_this.data.answer 	= answer;
					_this.data.token 	= res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请密码提示问题的答案');
			}
		});

		// 新密码
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				_user.resetPassword({
					username 	: _this.data.username,
					passwordNew : password,
					forgetToken : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
		// 回车提交
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				// _this.submit();
			}
		});

	},
	// 加载输入用户名的
	loadStepUsername : function(){
		$('.step-username').show();

	},
	// 加载输入问题答案
	loadStepQuestion : function(){
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);

	},
	// 加载输入password
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide().siblings('.step-password').show();

	},
}

$(function(){

	page.init();
});
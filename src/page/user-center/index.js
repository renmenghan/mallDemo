/*
* @Author: ren522686239
* @Date:   2017-07-31 17:45:00
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-31 18:32:19
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
	},
	onLoad : function(){
		navSide.init({
			//初始化左侧菜单
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
}

$(function(){

	page.init();
});
/*
* @Author: ren522686239
* @Date:   2017-07-26 21:06:38
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-27 11:58:06
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent : function(){
		// 登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function(){
			window.location.hre = './register.html';
		});
		// 退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	// 加载用户信息
	loadUserInfo : function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show().find('.user-name').text(res.username)
			},function(errMsg){

			});

	},
	// 加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		},function(errMsg){
			$('.nav .cart-count').text(0);
		});
	}
}

module.exports = nav.init();
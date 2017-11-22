/*
* @Author: ren522686239
* @Date:   2017-11-22 11:20:28
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-22 11:47:53
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm 				= require('util/mm.js');
var _payment 			= require('service/payment-service.js');
var templateIndex 		= require('./index.string');

// page逻辑部分
var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		 this.onLoad();
	},
	onLoad : function(){
		
		// 加载detail数据
		this.loadPaymentInfo();
	},
	// 加载订单列表
	loadPaymentInfo : function(){
		var _this			 	= this,
			paymentHtml 		= '',
			$content			= $('.page-wrap');
		$content.html('<div class="loading"></div>');
		_payment.getPaymentInfo(_this.data.orderNumber,function(res){
			// 渲染html
			paymentHtml = _mm.renderHtml(templateIndex,res);
			$content.html(paymentHtml);
			_this.listenOrderStatus();
			
		},function(errMsg){
			$content.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 监听订单状态
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(res){
				if (res == true) {
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			});
		},5e3);
	}

}

$(function(){
	page.init();
});
/*
* @Author: ren522686239
* @Date:   2017-11-21 23:32:54
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-22 00:19:22
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var templateIndex 	= require('./index.string');

// navSide.init({
// 	name : 'order-list'
// });
// page逻辑部分
var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			if (window.confirm('确实要取消该订单吗？')) {
				_order.cancelOrder(_this.data.orderNumber,function(res){
					_mm.successTips('该订单取消成功');
					_this.loadDetail();
					},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
				
		})
	},
	onLoad : function(){
		
		navSide.init({
			//初始化左侧菜单
			name : 'order-list'
		});
		// 加载detail数据
		this.loadDetail();
	},
	// 加载订单列表
	loadDetail : function(){
		var _this			 	= this,
			orderDetailHtml 	= '',
			$content			= $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(_this.data.orderNumber,function(res){
			_this.dataFilter(res);
			// 渲染html
			orderDetailHtml = _mm.renderHtml(templateIndex,res);
			$content.html(orderDetailHtml);

			
		},function(errMsg){
			$content.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 数据适配
	dataFilter : function(data){
		data.needPay 		= data.status == 10;
		data.isCancelble 	= data.status == 10;
	}

}

$(function(){

	page.init();
});
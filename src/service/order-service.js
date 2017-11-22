/*
* @Author: ren522686239
* @Date:   2017-11-19 22:56:09
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-22 00:17:21
*/
'use strict';
var _mm = require('util/mm.js');

var _order = {
	getProductList : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success	: resolve,
			error	: reject
		});
	},
	// 提交订单
	createOrder : function(orderInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/create.do'),
			data	: orderInfo,
			success	: resolve,
			error	: reject
		});
	},
	// 获取订单列表
	getOrderList : function(listParam,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/list.do'),
			data	: listParam,
			success	: resolve,
			error	: reject
		});
	},
	// 获取订单详情
	getOrderDetail : function(orderNumber,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/detail.do'),
			data	: {
				orderNo :orderNumber
			},
			success	: resolve,
			error	: reject
		});
	},
	// 取消订单
	cancelOrder : function(orderNumber,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/cancel.do'),
			data	: {
				orderNo :orderNumber
			},
			success	: resolve,
			error	: reject
		});
	},
}

module.exports = _order;
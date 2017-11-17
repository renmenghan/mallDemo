/*
* @Author: ren522686239
* @Date:   2017-07-26 22:01:04
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-27 11:58:48
*/

'use strict';
var _mm = require('util/mm.js');

var _cart = {
	// 获取购物车数量
	getCartCount : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success	: resolve,
			error	: reject
		});
	},
	//添加到购物车
	addToCart : function(productInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/cart/add.do'),
			data	:productInfo,
			success	: resolve,
			error	: reject
		});
	}
}

module.exports = _cart;
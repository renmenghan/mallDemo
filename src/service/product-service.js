/*
* @Author: ren522686239
* @Date:   2017-11-05 18:34:48
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-05 21:58:39
*/
'use strict';
var _mm = require('util/mm.js');

var _product = {
	getProductList : function(listParam,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/product/list.do'),
			data	: listParam,
			success	: resolve,
			error	: reject
		});
	},
	getProductDetail : function(productId,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/product/detail.do'),
			data	: {
				productId:productId
			},
			success	: resolve,
			error	: reject
		});
	},
}

module.exports = _product;
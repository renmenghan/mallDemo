/*
* @Author: ren522686239
* @Date:   2017-07-27 11:21:30
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-27 11:55:03
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');

// 通用页面导航
var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad : function(){
		// 回填搜索框
		var keyword = _mm.getUrlParam('keyword');
		if (keyword) {
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		// 点击搜索按钮做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		$('#search-input').keyup(function(e){
			// 13回车键keyCode
			if (e.keyCode===13) {
				var keyword = $.trim($(this).val());
				window.location.href = './list.html?keyword=' + keyword;
			}
		});
	},
	//搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		}else {
			_mm.goHome();
		}
	}

};
header.init();
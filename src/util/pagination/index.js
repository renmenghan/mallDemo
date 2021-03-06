/*
* @Author: ren522686239
* @Date:   2017-11-07 16:40:13
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-07 22:17:26
*/
'use strict';
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function () {
	var _this = this;
	this.defaultOption = {
		container 		: null,
		pageNum 		: 1,
		pageRange 		: 3,
		onSelectPage 	: null
	};
	// 事件处理
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		// 对于active和disabled按钮不做处理
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage ==='function' 
		? _this.option.onSelectPage($this.data('value')) : null;

	});
};
// 渲染分页组件
Pagination.prototype.render = function(userOption) {
	// 合并选项
	this.option = $.extend({},this.defaultOption,userOption);
	// 判断容器是否为合法的jQuery对象
	if (!(this.option.container instanceof jQuery)) {
		return
	}
	// 判断是否只有一页
	if (this.option.pages <= 1) {
		return;
	}
	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html
Pagination.prototype.getPaginationHtml = function(){
	// |上一页| 1 2 3 4 5 6 |下一页| 5/6
	var html 		= '',
		option 		= this.option,
		pageArray 	= [],
		start		= option.pageNum - option.pageRange >0 ? option.pageNum - option.pageRange : 1,
		end 		= option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange :option.pages;
	//上一页按钮的数据
	pageArray.push({
		name 	: '上一页',
		value 	: this.option.prePage,
		disabled : !this.option.hasPreviousPage
	});
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name 	: i,
			value	: i,
			active 	: (i===option.pageNum)
		});
	};
	// 下一页按钮的数据
	pageArray.push({
		name 	: '下一页',
		value 	: this.option.nextPage,
		disabled : !this.option.hasNextPage
	});
	html = _mm.renderHtml(templatePagination,{
		pageArray 	: pageArray,
		pageNum 	:option.pageNum,
		pages		:option.pages
	});
	return html;
};


module.exports = Pagination;
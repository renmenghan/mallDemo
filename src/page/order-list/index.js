/*
* @Author: ren522686239
* @Date:   2017-11-21 21:24:05
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-21 23:28:55
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var templateIndex 	= require('./index.string');
var Pagination    		= require('util/pagination/index.js');

// navSide.init({
// 	name : 'order-list'
// });
// page逻辑部分
var page = {
	data : {
		listParam : {
			pageNum		:1,
			pageSize 	:10
		}
	},
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadOrderList();
		navSide.init({
			//初始化左侧菜单
			name : 'order-list'
		});
		
	},
	// 加载订单列表
	loadOrderList : function(){
		var _this			 	= this,
			orderListHtml 		= '',
			$listCon 			= $('.order-list-con');
		$listCon.html('<div class="loading"></div>');
		_order.getOrderList(_this.data.listParam,function(res){
			// 渲染html
			orderListHtml = _mm.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);

			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});
		},function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败请刷新后重试</p>');
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	
	loadPagination :function(pageInfo){
		var _this = this;
		this.pagnation ? '' : (this.pagnation = new Pagination());
		this.pagnation.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
}

$(function(){

	page.init();
});
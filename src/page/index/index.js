/*
* @Author: renmenghan
* @Date:   2017-07-21 11:40:19
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-05 18:00:01
*/

'use strict';
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css')
require('util/slider/index.js');

var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function() {
	// 渲染banner的html
	var bannerHtml 	= _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    var $slider   	= $('.banner').unslider({
    	dots: true,
    });
    // 前一张后一张时间绑定
    $('.banner-con .banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });
});
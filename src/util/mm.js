/*
* @Author: ren522686239
* @Date:   2017-07-24 11:10:52
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-07-30 22:15:53
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
var _mm = {
	// 网络请求
	request : function(param){
		console.log(param);
		var _this = this;
		$.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 获取服务器地址
    getServerUrl : function(path){
    	return conf.serverHost + path;
    },
    // 获取url的参数
    getUrlParam : function(name){
    	// http://happmmall.com/product/list?keyword=xx&page=1
    	var reg 	= new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    	var result 	= window.location.search.substr(1).match(reg);
    	return result ? decodeURIComponent(result[2]):null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate,data){
    	var template = Hogan.compile(htmlTemplate),
    		result	 = template.render(data);

    	return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },
    // 失败提示
    errorTips : function(msg) {
        alert(msg || '哪里不对了吧~');
    },
    // 字段验证 支持非空 手机 邮箱验证
    validate : function(value,type){
        var value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type) {
             return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
	doLogin :function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
    goHome :function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;
define(['common'],function (common) {
    var exports = {
        login:function (data, callback) {
            return common.commonAjax('myAuthor/login',data,callback);
        },
        logout:function (data, callback) {
            return common.commonAjax('myAuthor/logout',data,callback);
        },
        register:function (data,callback) {
            return common.commonAjax('myAuthor/register',data,callback);
        },
        
        
        
        
        categoryList:function(data,callback){
        	return common.commonAjax('category/get',data,callback);
        },
        categoryAdd:function(data,callback){
            return common.commonAjax('category/first/add',data,callback);
        },
        categorySecondAdd:function(data,callback){
            return common.commonAjax('category/second/add',data,callback);
        },
        categoryFirstUpdate:function(data,callback){
        	return common.commonAjax('category/first/update',data,callback);
        },
        categorySecondUpdate:function(data,callback){
        	return common.commonAjax('category/second/update',data,callback);
        },
        
        incomecategory:function(data,callback){
        	return common.commonAjax('incomecategory/get',data,callback);
        },
        incomeCategoryAdd:function(data,callback){
            return common.commonAjax('incomecategory/first/add',data,callback)
        },
        incomeCategorySecondAdd:function(data,callback){
            return common.commonAjax('incomecategory/second/add',data,callback)
        },
        incomeCategoryFirstUpdate:function(data,callback){
        	return common.commonAjax('incomecategory/first/update',data,callback);
        },
        incomeCategorySecondUpdate:function(data,callback){
        	return common.commonAjax('incomecategory/second/update',data,callback);
        },
        
        
        
        
        billAdd:function(data,callback){
        	return common.commonAjax('bill/add',data,callback);
        },
        reportDaily:function(data,callback){
        	return common.commonAjax('report/daily',data,callback,true);
        },
        reportIndex:function(data,callback){
            return common.commonAjax('report/index',data,callback,true);
        },
        getWalletList:function(data,callback){
            return common.commonAjax('wallet/list',data,callback);
        },
        updateWallet:function(data,callback){
        	return common.commonAjax('wallet/update',data,callback);
        }
    }
    return exports;
})
define(['common'],function (common) {
    var exports = {
        login:function (data, callback, isHideMask) {
            return common.commonAjax('myAuthor/login',data,callback, isHideMask);
        },
        logout:function (data, callback, isHideMask) {
            return common.commonAjax('myAuthor/logout',data,callback, isHideMask);
        },
        register:function (data,callback, isHideMask) {
            return common.commonAjax('myAuthor/register',data,callback, isHideMask);
        },



        categoryAllList:function(data,callback, isHideMask){
            return common.commonAjax('category/getcommon',data,callback, isHideMask);
        },
        categoryList:function(data,callback, isHideMask){
        	return common.commonAjax('category/get',data,callback, isHideMask);
        },
        categoryAdd:function(data,callback, isHideMask){
            return common.commonAjax('category/first/add',data,callback, isHideMask);
        },
        categorySecondAdd:function(data,callback, isHideMask){
            return common.commonAjax('category/second/add',data,callback, isHideMask);
        },
        categoryFirstUpdate:function(data,callback, isHideMask){
        	return common.commonAjax('category/first/update',data,callback, isHideMask);
        },
        categorySecondUpdate:function(data,callback, isHideMask){
        	return common.commonAjax('category/second/update',data,callback, isHideMask);
        },

        incomecategoryAll:function(data,callback, isHideMask){
            return common.commonAjax('incomecategory/getcommon',data,callback, isHideMask);
        },
        incomecategory:function(data,callback, isHideMask){
        	return common.commonAjax('incomecategory/get',data,callback, isHideMask);
        },
        incomeCategoryAdd:function(data,callback, isHideMask){
            return common.commonAjax('incomecategory/first/add',data,callback, isHideMask)
        },
        incomeCategorySecondAdd:function(data,callback, isHideMask){
            return common.commonAjax('incomecategory/second/add',data,callback, isHideMask)
        },
        incomeCategoryFirstUpdate:function(data,callback, isHideMask){
        	return common.commonAjax('incomecategory/first/update',data,callback, isHideMask);
        },
        incomeCategorySecondUpdate:function(data,callback, isHideMask){
        	return common.commonAjax('incomecategory/second/update',data,callback, isHideMask);
        },
        
        
        
        
        billAdd:function(data,callback, isHideMask){
        	return common.commonAjax('bill/add',data,callback, isHideMask);
        },
        reportDaily:function(data,callback, isHideMask){
        	return common.commonAjax('report/daily',data,callback,true);
        },
        reportIndex:function(data,callback, isHideMask){
            return common.commonAjax('report/index',data,callback,true);
        },
        getWalletList:function(data,callback, isHideMask){
            return common.commonAjax('wallet/list',data,callback, isHideMask);
        },
        updateWallet:function(data,callback, isHideMask){
        	return common.commonAjax('wallet/update',data,callback, isHideMask);
        },
        feedBackAdd:function(data,callback,isHideMask){
        	return common.commonAjax('feedback/add',data,callback,isHideMask);
        }
    }
    return exports;
})
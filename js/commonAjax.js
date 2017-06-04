define(['common'],function (common) {
    var exports = {
        login:function (data, callback) {
            return common.commonAjax('myAuthor/login',data,callback);
        },
        categoryList:function(data,callback){
        	return common.commonAjax('category/get',data,callback);
        },
        billAdd:function(data,callback){
        	return common.commonAjax('bill/add',data,callback);
        },
        reportDaily:function(data,callback){
        	return common.commonAjax('report/daily',data,callback,true);
        }
        
    }
    return exports;
})
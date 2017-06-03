define(['common'],function (common) {
    var exports = {
        login:function (data, callback) {
            return common.commonAjax('myAuthor/login',data,callback);
        },
        categoryList:function(data,callback){
        	return common.commonAjax('category/get',data,callback);
        }
    }
    return exports;
})
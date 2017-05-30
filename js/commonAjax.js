define(['common'],function (common) {
    var exports = {
        login:function (data, callback) {
            return common.commonAjax('myAuthor/login',data,callback);
        }
    }
    return exports;
})
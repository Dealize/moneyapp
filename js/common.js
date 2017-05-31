define(['host'],function (host) {
    var exports = {
        ajaxLoading:function (toggle) {
            var $loading = $('.ajaxLoading');
            if(toggle){
                if($loading.length>0){
                    $loading.show();
                }else{
                    $('body').append('<div class="ajaxLoading">' +
                        '</div>');
                }
            }else{
                $loading.hide();
            }
        },
        commonAjax:function(url,data,callback){
            var that = this;
            this.ajaxLoading(true);
            mui.ajax(host.api+url,{
                data:data,
                crossDomain:true,
                dataType:'json',//服务器返回json格式数据
                type:'post',//HTTP请求类型
                success:function(data){
                    //获得服务器响应
                    callback(data);
                    that.ajaxLoading(false);
                }
            });
        },
        /**
         *
         * @param data
         * url
         * id
         * data:要传递的参数
         * styles
         */
        openNewWindow:function(data){
            var style = {
                background:'transparent'
            }
            for(var i in data.styles){
                style[i] = data.styles[i];
            }
            var newWindow = plus.webview.create(data.url,data.id,style,data.extras||null);

            newWindow.show('zoom-fade-out',400);
        },
        /**
         * data.id
         * @param data
         */
        showWindow:function (data) {
            plus.webview.show(data.id,'zoom-fade-out',400);
        }
    }

    return exports;
})
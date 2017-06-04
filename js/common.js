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
        commonAjax:function(url,data,callback,isHideMask){
            var that = this;
            if(isHideMask!=true){
	            this.ajaxLoading(true);        	
            }
            mui.ajax(host.api+url,{
                data:data,
                crossDomain:true,
                dataType:'json',//服务器返回json格式数据
                type:'post',//HTTP请求类型
                success:function(data){
                    that.ajaxLoading(false);
                	if(data.state==0){
                		that.openNewWindow({
                		url:'../login/login.html',
                		id:'login'
                	})
                	}
                    //获得服务器响应
                    callback(data);

                    
                }
            });
        },
        createWebview:function(data){
        	var style = {
                background:'transparent'
            }
            for(var i in data.styles){
                style[i] = data.styles[i];
            }
            var newWindow = plus.webview.create(data.url,data.id,style,data.extras||null);
            return newWindow;
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
            this.createWebview(data);
            newWindow.show('zoom-fade-out',400);
            return newWindow;
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
require(['FFF','host','common','commonAjax'],function (FFF,host,common,commonAjax) {
    mui.init();
    mui.plusReady(function () {
        var $loginBtn = $('.m_btnGroup_login'),
        $emailInput = $('.loginInput input'),
        $password = $('.passwordInput input');

        $loginBtn.on('click',function () {
            commonAjax.login({
                email:$emailInput.val(),
                password:$password.val()
            },function (res) {
            	if(res.state==1){
            		mui.back();
            		var webViews = plus.webview.all();
            		webViews.forEach(function(item){
            		    item.reload();
                    })
            		common.showWindow({
            			id:'index'
            		})
            	}else{
                alert(res.msg);
            	}
            })
        })
    })
})



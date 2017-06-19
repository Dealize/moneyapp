require(['FFF','host','common','commonAjax'],function (FFF,host,common,commonAjax) {
    var $loginBtn = $('.m_btnGroup_login'),
        $emailInput = $('.loginInput input'),
        $password = $('.passwordInput input'),
        $password2Container = $('.passwordInput2'),
        $password2 = $('.passwordInput2 input'),
        $registerBtn = $('.m_btnGroup_register'),
        emailVal,passwordVal
    ;


    function setStateIsLogin(){
        $password2Container.hide();
        $loginBtn.unbind().bind('click',function () {
            var emailVal = $emailInput.val(),
                passwordVal = $password.val();
            if((!emailVal) || (!passwordVal)){
                alert('登录信息填写不完整');
                return false;
            }else{
                submitLogin();
            }
        })
        $registerBtn.unbind().bind('click',function () {
            setStateIsRegister();
        })
    }




    function setStateIsRegister(){
        $password2Container.show();
        $loginBtn.html('注册');
        $registerBtn.html('返回');
        $loginBtn.unbind().bind('click',function () {
            var emailVal = $emailInput.val(),
                passwordVal = $password.val(),
                passwordVal2  = $password2.val();
            if((!emailVal)||(!passwordVal)||(!passwordVal2)){
                alert('注册信息填写不完整');
                return false;
            }else if(passwordVal2 != passwordVal){
                alert('密码输入不一致');
                return false;
            }else{
                commonAjax.register({
                    email:emailVal,
                    name:emailVal,
                    password:passwordVal
                },function (res) {
                    if(res.state==1){
                        submitLogin();
                    }else{
                        alert(res.msg);
                    }
                })

            }
        });
        $registerBtn.unbind().bind('click',function () {
            setStateIsLogin();
        })
    }



    function submitLogin(){
        commonAjax.login({
            email: $emailInput.val(),
            password:$password.val()
        },function (res) {
            if(res.state==1){
                mui.back();
                var webViews = plus.webview.all();
                webViews.forEach(function(item){
                    item.reload();
                })
                common.showWebview({
                    id:'index'
                })
            }else{
                alert(res.msg);
            }
        })
    }


    mui.init();
    mui.plusReady(function () {
        setStateIsLogin();
    })
})



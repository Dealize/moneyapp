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
                alert(res.msg);
                console.log(res);
            })
        })
    })
})



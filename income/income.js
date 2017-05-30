require(['FFF','host','common','commonAjax'],function (FFF,host,common,commonAjax) {
    mui.init({
        // preloadPages:[
        //     {
        //         url:'../login/login.html',
        //         id:'login',
        //         styles:{},//窗口参数
        //         extras:{},//自定义扩展参数
        //         subpages:[{},{}]//预加载页面的子页面
        //     }
        // ],
        // preloadLimit:5//预加载窗口数量限制(一旦超出,先进先出)默认不限制
    });
    mui.plusReady(function () {
        var $dailyCost = $('.dailyCost'),
            $dailyBenefit = $('.dailyBenefit'),
            $timeInfo = $('.timeInfo'),
            $timeInfoTime = $timeInfo.find('.dailyInfo_Num');

        $dailyCost.on('click',function () {
            // plus.webview.show('login');
            common.openNewWindow({
                url:'../login/login.html',
                id:'login'
            })
        })

    })
})


require(['FFF','host','common','commonAjax'],function (FFF,host,common,commonAjax) {
    mui.init({
        preloadPages:[
            {
                url:'../income/income.html',
                id:'income',
                styles:{
                    background:'transparent'
                }
            },
            {
                url:'../outlay/outlay.html',
                id:'outlay',
                styles:{
                    background:'transparent'
                }
            }
        ],
        preloadLimit:5//预加载窗口数量限制(一旦超出,先进先出)默认不限制
    });
    mui.plusReady(function () {
        var $dailyCost = $('.dailyCost'),
            $dailyBenefit = $('.dailyBenefit'),
            $timeInfo = $('.timeInfo'),
            $timeInfoTime = $timeInfo.find('.dailyInfo_Num');

        $dailyCost.on('click',function () {
            common.showWindow({
                id:'income'
            })
            // common.openNewWindow({
            //     url:'../login/login.html',
            //     id:'login'
            // })
        })
        $dailyBenefit.on('click',function () {
            common.showWindow({
                id:'outlay'
            })
        })

    })
})


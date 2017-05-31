require(['FFF','host','common','commonAjax','numKeyboard'],function (FFF,host,common,commonAjax,numKeyboard) {
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

    })

    var $btns = $('.btns'),
        numKeyboard,
        $outlay_money = $('.outlay_money'),
        $outlay_money_num = $('.outlay_money_num'),
        pageHeight =window.innerHeight;

    bindResize();
    initNumKeyBoard();

    function bindResize(){
        $(window).resize(function(e) {
            if(window.innerHeight<pageHeight){
                $btns.hide();
            }else{
                $btns.show();
            }
        });
    }
    function initNumKeyBoard(){
        numKeyboard = new numKeyboard.NumKeyBoard({
            targetDom:$outlay_money_num
        }).render();
        $outlay_money.on('click',function () {
            numKeyboard.show();
        })
        var _$targetDom = numKeyboard.getTargetDom();
        numKeyboard.on('resultNumChange',function (data) {
            var _data = data.value;
            switch(_data.length){
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    _$targetDom.css({
                        'fontSize':'2rem'
                    })
                    break;
                case 5:
                case 6:
                case 7:

                    _$targetDom.css({
                        'fontSize':'1.5rem'
                    })
                    break;
                case 8:
                case 9:
                case 10:
                    _$targetDom.css({
                        'fontSize':'1rem'
                    })
                    break;
                case 11:
                case 12:
                    _$targetDom.css({
                        'fontSize':'0.7rem'
                    })
                    break;
            }
        })
    }
})


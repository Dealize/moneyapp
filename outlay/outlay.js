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
	  commonAjax.categoryList({},function(res){
	    	console.log(res);
	    	set_pickerData(res.data);
	    	
	    })
    })


    var $btns = $('.btns'),
        numKeyboard,
        $body = $('.body'),
        $outlay_money = $('.outlay_money'),
        $outlay_money_num = $('.outlay_money_num'),
        $outlay_type = $('.outlay_type');
        $outlay_type_num = $outlay_type.find('.outlay_type_num');
        $outlay_kind = $('.outlay_kind');
        $outlay_kind_title = $('.outlay_kind_title');
        $outlay_kind_switch = $outlay_kind.find('.mui-switch');
        $outlay_time = $('.outlay_time');
        $outlay_time2 = $('.outlay_time2');
        $outlay_time_title = $outlay_time.find('.outlay_time_title');
        $outlay_time_data = $outlay_time.find('.outlay_time_num');
        $outlay_time2_data = $outlay_time2.find('.outlay_time_num');
		picker = null;
        pageHeight =window.innerHeight;

    bindResize();
    initNumKeyBoard();
    bind_outlay_type();
    bind_outlay_kind();
    bind_outlay_time();
	
	function set_pickerData(data){
		var finalData = [],
			tempData = {};
			tempSubData = {};
		data.forEach(function(item,index){
			tempData = {};
			tempData.value = item.id;
			tempData.text = item.name;
			item.secondCategory.forEach(function(subItem,subIndex){
				tempSubData = {};
				tempSubData.text = subItem.name;
				tempSubData.value = subItem.id;
				tempData.children = tempData.children || [];
				tempData.children.push(tempSubData);
			})
			finalData.push(tempData);
			console.log(finalData);
		})
		picker.setData(finalData);
		
		
	}
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
    function bind_outlay_type(){
        picker = new mui.PopPicker({
            layer:2
        });
        $outlay_type.on('click',function () {
            picker.show(function (selectItems) {
                $outlay_type_num.html(selectItems[0].text+' | '+selectItems[1].text);
                console.log(selectItems[0].text);//智子
                console.log(selectItems[0].value);//zz
            })
        })
        // console.log(picker.getSelectedItems());
    }
    function bind_outlay_kind(){
        $outlay_kind_title.on('click',function () {
            mui('.mui-switch').switch().toggle();
        })
        $outlay_kind_switch[0].addEventListener('toggle',function (event) {
            if(event.detail.isActive){
                $outlay_kind_title.html('持续性消费');
                $outlay_time2.show().css('display','flex');
                $outlay_time_title.html('起始于');
                $body.animate({scrollTop:100},600)
            }else{
                $outlay_kind_title.html('一次性消费');
                $outlay_time_title.html('起始于');
                $body.animate({scrollTop:0},600)
                setTimeout(function(){
                	$outlay_time2.hide();
                },500)
            }
        })
    }
    function bind_outlay_time(){
        $outlay_time2.hide();
        $outlay_time2_data.on('input',function () {
            console.log(6666);
        })
    }
  
////   commonAjax.login({
//              email:$emailInput.val(),
//              password:$password.val()
//          },function (res) {
//              alert(res.msg);
//              console.log(res);
//          }) 	
})


require(['FFF','host','common','commonAjax'],function (FFF,host,common,commonAjax) {
    var $title = $('.feedBack_title input'),
        $contact = $('.feedBack_user input'),
        $type = $('.feedBack_type select'),
        $content = $('.feedBack_content textarea'),
        $submitBtn = $('.feedBack_submit')
        ;

    function submitData(){
    	$submitBtn.on('click',function(){
    			var _title = $title.val(),
    		_content = $content.val();
    		console.log($type.val());
    		
    		
    		if(!(_title || _content)){
    			alert('请输入内容');
    		}else{
				commonAjax.feedBackAdd({
					name:_title,
					content:_content,
					type:$type.val(),
					contact:$contact.val()
				},function(res){
					if(res.state==1){
						alert('反馈成功，感谢！');
						mui.back();
					}
				})
    		}

    	})
	}
    mui.init();
    mui.plusReady(function () {
		submitData();
        var msg = '我亲爱的用户呐：\n\n'+
        '首先感谢你能对这个app进行建议或者bug反馈。\n\n'+
     '由于它完全由我一个人 （～￣▽￣～）独立设计和开发，所以难免有功能和bug对你的使用造成了困扰~\n\n'+
            '对于反馈的bug 我会放进bug池，并且会按照bug的优先级进行修复。所以在版本更新之后你如果看到所反馈的bug依旧存在的话，还请谅解，放心~影响你使用的都是我要解决的~\n\n'+
            '还有对功能的反馈，我也会放进需求池，并且对你的建议进行广大用户的调研，如果获得其他用户的广泛认同我也会按照优先级进行开发。\n\n'+
    '由于这是空闲时间写出来作品，同时我的精力也十分有限，所以版本的迭代更新估计会很慢。但是请放心，每一条建议和反馈我都会认真记录在案。为了能让大家用的更顺手更舒心，我每一天都会对这个app进行开发和修复~\n\n'+
            '最后感谢你能反馈信息，记得带上联系方式~\n\n\n招展君';
        plus.nativeUI.alert(msg,function(){
        	
        },'给用户老爷的一段话','好的，我看完了')
    })
})



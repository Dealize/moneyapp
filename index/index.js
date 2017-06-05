require(['FFF', 'host', 'common', 'commonAjax'], function(FFF, host, common, commonAjax) {
	mui.init({
		id: 'index',
		//		preloadPages: [{
		//				url: '../income/income.html',
		//				id: 'income',
		//			},
		//			{
		//				url: '../outlay/outlay.html',
		//				id: 'outlay',
		//			}
		//		],
		preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
	});
	var $dailyCost = $('.dailyCost'),
		$dailyBenefit = $('.dailyBenefit'),
		$dailyInfo_Num = $dailyBenefit.find('.dailyInfo_Num'),
		$timeInfo = $('.timeInfo'),
		$timeInfoTime = $timeInfo.find('.dailyInfo_Num'),
		currentWebview ;
		
		
		;

	mui.plusReady(function() {
		currentWebview = plus.webview.currentWebview();
		getData();
		bind_incone();
		bind_outlay();

	})
	countdown()
	function bind_incone() {
		$dailyCost.on('click', function() {
			common.showWindow({
				id: 'income'
			})
		})
		var incomeWebView = mui.preload({
			url: '../income/income.html',
			id: 'income'
		});
		//		var incomeWebView = plus.webview.getWebviewById('income');
		console.log(incomeWebView);
		setTimeout(function() {
			incomeWebView.addEventListener('hide', function(e) {
				console.log(e);
				//			location.reload();
			}, false);
		}, 500);

	}

	function bind_outlay() {
		$dailyBenefit.on('click', function() {
			common.showWindow({
				id: 'outlay'
			})
		})
		var outlayWebView = mui.preload({
			url: '../outlay/outlay.html',
			id: 'outlay'
		});
		//		var outlayWebView = plus.webview.getWebviewById('outlay');
		outlayWebView.addEventListener('hide', function(e) {
			console.log(e);
			outlayWebView.reload();
			getData();
			//			location.reload();
		}, false);
	}

	function getData(){
		commonAjax.reportDaily({},function(res){
			var costNum = Math.round(res.data.sum);
			$dailyInfo_Num.html(costNum)
		})
	}


	function countdown(){
		var sevenAclock = new Date(),
			timeFlag = 0,
			timeSplit = '';
		sevenAclock.setHours(18);
		sevenAclock.setMinutes(10);
		sevenAclock.setSeconds(0);
		var timer = setInterval(function(){
			if(timeFlag%2==0){
				timeSplit = ' ';
			}else{
				timeSplit = ':';
			}
			var timeStr = '';

//			if(disHour<=-1 ){
//				clearInterval(timer);
//				showReportBtn();
//			}
			
			var nowTime = new Date();
			var disTime = Math.floor((sevenAclock - nowTime)/1000);
			var disHour = Math.floor(disTime/3600);
			disTime = disTime - disHour*3600;
			var disMin = Math.floor(disTime/60);
			disTime = disTime - disMin*60;
			var disSec = disTime;
			if(disHour<10){
				disHour = '0' +disHour;
			}
			if(disMin<10){
				disMin = '0' +disMin;
			}
			if(disSec<10){
				disSec = '0'+disSec;
			}
			timeStr = disHour + timeSplit + disMin + timeSplit + disSec;
			timeFlag ++ ;
			$timeInfoTime.html(timeStr); 			
//			
		},500)
	}
	function showReportBtn(){
		$timeInfo.find('.dailyInfo_title').hide();
		$timeInfoTime.html('点击查看当日报告');
		$timeInfo.on('click',function(e){
			console.log(666);
		})
	}
})
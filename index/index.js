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
		$dailyCost_Num = $dailyCost.find('.dailyInfo_Num'),
		$dailyBenefit = $('.dailyBenefit'),
		$dailyBenefit_Num = $dailyBenefit.find('.dailyInfo_Num'),
		$timeInfo = $('.timeInfo'),
		$timeInfoTime = $timeInfo.find('.dailyInfo_Num'),
		$timeInfoText = $timeInfo.find('.dailyInfo_title'),
		currentWebview;

	;

	mui.plusReady(function() {
		currentWebview = plus.webview.currentWebview();
        getData();
        bind_incone();
        bind_outlay();
        bind_loginFinish();
        countdown();
	})

	function bind_incone() {
		$dailyBenefit.on('click', function() {
			common.showWebview({
				id: 'income'
			})
		})
		var incomeWebView = mui.preload({
			url: '../income/income.html',
			id: 'income'
		});
		incomeWebView.addEventListener('hide', function(e) {
			incomeWebView.reload();
			getData();
		}, false);
	}

	function bind_outlay() {
		$dailyCost.on('click', function() {
			common.showWebview({
				id: 'outlay'
			})
		})
		var outlayWebView = mui.preload({
			url: '../outlay/outlay.html',
			id: 'outlay'
		});
		outlayWebView.addEventListener('hide', function(e) {
			console.log(e);
			outlayWebView.reload();
			getData();
		}, false);
	}

	function getData() {
		commonAjax.reportIndex({}, function(res) {
			console.log(res);
			var costNum = res.data.indexInfo.outlayData_money;
			var benefitNum = res.data.indexInfo.incomeData_money;
			$dailyCost_Num.html(costNum);
			$dailyBenefit_Num.html(benefitNum);
		})
	}


	function countdown() {
		var sevenAclock = new Date(),
			timeFlag = 1,
			timeSplit = '';
		sevenAclock.setHours(23);
		sevenAclock.setMinutes(23);
		sevenAclock.setSeconds(00);
		var disHour, disMin, disSec, disTime;
		var timer = setInterval(function() {
			if(timeFlag % 2 == 0) {
				timeSplit = ' ';
			} else {
				timeSplit = ':';
				var nowTime = new Date();
				disTime = Math.floor((sevenAclock - nowTime) / 1000);
				disHour = Math.floor(disTime / 3600);
				disTime = disTime - disHour * 3600;
				disMin = Math.floor(disTime / 60);
				disTime = disTime - disMin * 60;
				disSec = disTime;

				if(disHour <= -1) {
					showReportBtn();
					clearInterval(timer);
					return;
				} else {
					if(disHour < 10) {
						disHour = '0' + disHour;
					}
					if(disMin < 10) {
						disMin = '0' + disMin;
					}
					if(disSec < 10) {
						disSec = '0' + disSec;
					}
					var timeStr = '';


				}
				
			}
            timeStr = disHour + timeSplit + disMin + timeSplit + disSec;
            $timeInfoTime.html(timeStr);
			timeFlag++;
		}, 500)
	}

	function showReportBtn() {
		$timeInfoTime.hide();
		$timeInfoText.html('点击查看当日报告').css({'font-size':'0.7rem'});
		 $timeInfoText.on('click', function(e) {
		common.showWebview({
			id:'dailyReport',
			url:'../dailyReport/dailyReport.html'
		})
    })

	}
   
	function bind_loginFinish(){
		var loginWebview = plus.webview.currentWebview();
		loginWebview.addEventListener('show',function(){
			alert('currentWebviewshow1')
		})
	}
})
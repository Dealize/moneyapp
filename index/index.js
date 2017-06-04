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
})
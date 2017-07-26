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
		$moreSettingBtn = $('.moreSetting'),
		$finishBtn = $('.finishBtn'),
		$finishLogin = $('.firstLogin'),
		currentWebview;

	mui.plusReady(function() {
		currentWebview = plus.webview.currentWebview();
		currentWebview.setStyle({
			'render':'always'
		})
		bindDomEvent();
        getData();
        bind_incone();
        bind_outlay();
        bind_loginFinish();
        bind_moreSetting();
        countdown();
	})

	function bind_incone() {
		$dailyBenefit.on('click', function() {
			common.showWebview({
				id: 'income',
				
			})
		})
		var incomeWebView = mui.preload({
			url: '../income/income.html',
			id: 'income',
			styles:{
					'render':'always',
					'background':'transparent'
				}
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
			id: 'outlay',
			styles:{
					'render':'always',
					'background':'transparent'
				}
		});
		outlayWebView.addEventListener('hide', function(e) {
			console.log(e);
			outlayWebView.reload();
			getData();
		}, false);
	}

	function getData() {
		var  _storageData = JSON.parse(plus.storage.getItem('indexData') || '{}'),
			costNum = _storageData.costNum || 0,
			benefitNum = _storageData.benefitNum || 0;
		$dailyCost_Num.html(costNum);
		$dailyBenefit_Num.html(benefitNum);	
		commonAjax.reportIndex({}, function(res) {
			costNum = res.data.indexInfo.outlayData_money;
			benefitNum = res.data.indexInfo.incomeData_money;
			plus.storage.setItem('indexData',JSON.stringify({
                costNum:costNum,
                benefitNum:benefitNum
            }))
			$dailyCost_Num.html(costNum);
			$dailyBenefit_Num.html(benefitNum);
		},true);
	}

	function bind_moreSetting(){
		$moreSettingBtn.on('click',function(){
			common.showWebview({
	            id:'moreSetting',
	            url:'../moreSetting/moreSetting.html'
	        })	
		})

	}
	function bindDomEvent(){
		var isRead = plus.storage.getItem('isReaded');
		if(isRead=='true'){
			 $finishLogin.remove();	
		}else{
			$finishLogin.show()
			$finishBtn.on('click',function () {
			 	 plus.storage.setItem('isReaded','true');
				 $finishLogin.remove();
        	})	
		}
		
	}

	function countdown() {

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
require(['FFF', 'host', 'common', 'commonAjax','moment'], function(FFF, host, common, commonAjax,moment) {
	var $walletNum = $('.report_wallet .dailyReport_num'),
		$walletUpdateBtn = $('.report_wallet .m_card_right'),
		$outlayNum = $('.dailyOutlay .outlay .dailyReport_num'),
		$outlayProgress = $('.dailyOutlay  .outlayProgress'),
		$outlayProgress_1 = $('.outlayProgress_1'),
		$outlayProgress_2 = $('.outlayProgress_2'),
		$incomeNum = $('.dailyOutlay .income .dailyReport_num'),
		$costNum = $('.dailyCost .costNum .dailyReport_num'),
		$costList = $('.dailyCost .m_list'),
		$billList = $('.inout_list .m_list')
	


	;




	mui.init({
		id: 'dailyReport',
		preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
	});

	mui.plusReady(function() {
        getAjaxData();
	})
	var  todayDate = moment().format('YYYY-MM-DD'),
		todayDay = moment().format('e');
	console.log(todayDate,todayDay);

	function getAjaxData () {
		commonAjax.reportDaily({
		},function (res) {
			console.log(res);
			var _walletInfo = res.data.walletInfo,
			_billInfo = res.data.billInfo,
			_costInfo = res.data.coustInfo;
		
			renderBaseData(res);
			renderOutlayProgress(_billInfo);
			renderCostList(_costInfo);
			renderBillList(_billInfo)
        })
    }
	
	
	function renderBaseData(res){
			var _walletInfo = res.data.walletInfo,
				_billInfo = res.data.billInfo,
				_costInfo = res.data.coustInfo;
						
			$outlayNum.html(_billInfo.billData_out);
			$incomeNum.html(_billInfo.billData_in);
			$costNum.html(_costInfo.outlayData_count);
			$walletNum.html(_walletInfo.wallet);
			
	}
	function renderOutlayProgress(data){
		var isWorthNum = 0,notIsWorthNum = 0;
		data.billData_list.forEach(function(item,index){
			if(item.isWorth=="1"){
				isWorthNum++;
			}else{
				notIsWorthNum++;
			}
		});
		$outlayProgress_1.html('值X'+isWorthNum);
		$outlayProgress_2.html('不值X'+notIsWorthNum);
		if(isWorthNum==0){
            $outlayProgress_1.html('');
		}
		if(notIsWorthNum==0){
            $outlayProgress_2.html('');
		}
		if(data.billData_list.length==0){
			$outlayProgress.hide();
		}else{
			var progressWidth = $outlayProgress.width(),
				progressWidth1 = Math.round(progressWidth*isWorthNum/data.billData_list.length);
			$outlayProgress_1.width(progressWidth1)		;
			$outlayProgress_2.width(progressWidth - progressWidth1);
		}


	}
	function renderCostList(data){
		var listData = data.outlayData_list,
			domStr = '';
		listData.forEach(function(item,index){
			domStr += renderCostItem(item);
		})
		$costList.html(domStr);
	}
	function renderCostItem(data){
		var today = moment().hour(0).minute(0).second(0).millisecond(0),
			days = 1,
			beforeDay = 0,//已经过去
			afterDay = 0,//剩下的日子
			endDay = moment(data.endTime),
			beginDay = moment(data.beginTime),
			money = data.money,
			progress = 0;

			days = Math.abs((endDay - beginDay)/(24*3600*1000))+1;
        	afterDay = days - Math.abs((endDay - today)/(24*3600*1000));
			beforeDay = days  - afterDay;
			progress =afterDay/days*$costList.width();

			
		var domStr = '<div class="m_list_item">'+
                    '<div class="m_list_head">'+
                        '<div class="m_list_head_left">'+data.comment+data.daily_cost+'/天</div>'+
                        '<div class="m_list_head_right">'+afterDay+'/'+days+'</div>'+
                    '</div>'+
                    '<div class="m_list_body">'+
                        '<div class="m_progress">'+
                            '<div class="m_progress_bar" style="width:'+progress+'px"></div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        return domStr;
	}
	function renderBillList(data){
		var listData = data.billData_list,
			domStr = '';
		listData.forEach(function (item,index) {
			domStr +='<div class="m_list_item">'+
                '<div class="m_list_body">'+
                '<div class="m_list_body_text">'+item.comment+'</div>'+
                '<div class="m_list_body_tex2">'+(item.billType==1?'-':'+')+item.money+'</div>'+
                '</div>'+
                '</div>';
		})
        $billList.html(domStr);

	}
})
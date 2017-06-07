require(['FFF', 'host', 'common', 'commonAjax','moment'], function(FFF, host, common, commonAjax,moment) {
	mui.init({
		id: 'dailyReport',
		preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
	});

	mui.plusReady(function() {
	})
	var  todayDate = moment().format('YYYY-MM-DD'),
		todayDay = moment().format('e');
	console.log(todayDate,todayDay);

})
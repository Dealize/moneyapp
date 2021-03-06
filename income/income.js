require(['FFF', 'host', 'common', 'commonAjax', 'numKeyboard','moment'], function(FFF, host, common, commonAjax, numKeyboard,moment) {
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
	
	var $btns = $('.btns'),
		numKeyboard,
		resultData = {
			money: 0,
			categoryId: null,
			billType: 2,
			beginTime: '',
			comment: '',
			endTime: null,
			isWorth: null,
			walletId: 1

		},
		billTimeType = 1,
		validToggle = true,
		$body = $('.body'),
		$outlay_money = $('.outlay_money'),
		$outlay_money_num = $('.outlay_money_num'),
		$outlay_type = $('.outlay_type'),
		$outlay_type_num = $outlay_type.find('.outlay_type_num'),
		$outlay_kind = $('.outlay_kind'),
		$outlay_kind_title = $('.outlay_kind_title'),
		$outlay_kind_switch = $outlay_kind.find('.mui-switch'),
		$outlay_time = $('.outlay_time'),
		$outlay_time2 = $('.outlay_time2'),
		$outlay_time_title = $outlay_time.find('.outlay_time_title'),
		$outlay_time_data = $outlay_time.find('.outlay_time_num'),
		$outlay_time2_data = $outlay_time2.find('.outlay_time_num'),
		$outlay_time2_days = $outlay_time2.find('.outlay_time_days'),
        $outlay_comment = $('.outlay_comment input'),
        $outlay_btn1 = $('.outlay_btn1'),
		$outlay_btn2 = $('.outlay_btn2'),
		picker = null,
        categoryText = '',
    	pageHeight = window.innerHeight;

	mui.plusReady(function() {
		bind_windowEvent();
		getIncomeCategory();
		bindResize();
		initNumKeyBoard();
		bind_outlay_type();
		bind_outlay_kind();
		bind_outlay_time();
		bind_outlay_btn();

	})
		

	function getIncomeCategory(){
		commonAjax.incomecategoryAll({}, function(res) {
			$outlay_type_num.html(res.data[0].name+' | '+res.data[0].secondCategory[0].name||'未创建二级分类');
			resultData.categoryId = res.data[0].secondCategory[0].id;
            categoryText = res.data[0].secondCategory[0].name;

            set_pickerData(res.data);

		},true);
	}
	
	function set_pickerData(data) {
		var finalData = [],
			tempData = {};
		tempSubData = {};
		data.forEach(function(item, index) {
			tempData = {};
			tempData.value = item.id;
			tempData.text = item.name;
			item.secondCategory.forEach(function(subItem, subIndex) {
				tempSubData = {};
				tempSubData.text = subItem.name ||'';
				tempSubData.value = subItem.id || '';
				tempData.children = tempData.children || [];
				tempData.children.push(tempSubData);
			})
			finalData.push(tempData);
		})
		console.log(finalData);
		picker.setData(finalData);
	}

	function bindResize() {
		$(window).resize(function(e) {
			if(window.innerHeight < pageHeight) {
				$btns.hide();
			} else {
				$btns.show();
			}
		});
	}

	function initNumKeyBoard() {
		numKeyboard = new numKeyboard.NumKeyBoard({
			targetDom: $outlay_money_num
		}).render();
		$outlay_money.on('click', function() {
			numKeyboard.show();
		})
		var _$targetDom = numKeyboard.getTargetDom();
		numKeyboard.on('resultNumChange', function(data) {
			var _data = data.value;
			resultData.money = data.value;
			switch(_data.length) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					_$targetDom.css({
						'fontSize': '2rem'
					})
					break;
				case 5:
				case 6:
				case 7:

					_$targetDom.css({
						'fontSize': '1.5rem'
					})
					break;
				case 8:
				case 9:
				case 10:
					_$targetDom.css({
						'fontSize': '1rem'
					})
					break;
				case 11:
				case 12:
					_$targetDom.css({
						'fontSize': '0.7rem'
					})
					break;
			}
		})
	}

	function bind_outlay_type() {
		picker = new mui.PopPicker({
			layer: 2
		});
		$outlay_type.on('click', function() {
			picker.show(function(selectItems) {
				$outlay_type_num.html(selectItems[0].text + ' | ' + selectItems[1].text);
				console.log(selectItems[1]);
				resultData.categoryId = selectItems[1].value;
                categoryText = selectItems[1].text;
            })
		})
	}

	function bind_outlay_kind() {
		$outlay_kind_title.on('click', function() {
			mui('.mui-switch').switch().toggle();
		})
		$outlay_kind_switch[0].addEventListener('toggle', function(event) {
			if(event.detail.isActive) {
				billTimeType = 2;
				$outlay_kind_title.html('持续性收益');
				$outlay_time2.show().css('display', 'flex');
				$outlay_time_title.html('起始于');
				$outlay_time2_days.html('');
				$body.animate({
					scrollTop: 100
				}, 600)
				
			} else {
				billTimeType = 1;
				$outlay_kind_title.html('一次性收益');
				$outlay_time_title.html('收益于');
				resultData.endTime = resultData.beginTime;
				$body.animate({
					scrollTop: 0
				}, 600)
				setTimeout(function() {
					$outlay_time2.hide();
				}, 500)
			}
		})
	}

	function bind_outlay_time() {
		$outlay_time2.hide();
        $outlay_time_data[0].valueAsDate = new Date();
        $outlay_time2_data[0].valueAsDate = new Date();
        resultData.beginTime = moment().format('YYYY-MM-DD');
        resultData.endTime = resultData.beginTime;
		$outlay_time_data.on('input',function(e){
			var val = e.target.value;
			alert(val);
			if(val==''){
				resultData.beginTime = null;
			}else{
				resultData.beginTime = val;
			}
			if(billTimeType==1){
				resultData.endTime = resultData.beginTime;
			}
		})
		$outlay_time2_data.on('input',function(e){
			var val = e.target.value;
			if(val==''){
				resultData.endTime = null;
			}else{
				resultData.endTime = val;
				if(resultData.beginTime==''){
					alert('请先选择收益起始时间');
					validToggle = false;
				}else{
					var beginTime = moment(resultData.beginTime);
					var endTime = moment(val);
					var disDay = endTime - beginTime;
					if(disDay<0){
						alert('终止时间不能大于起始时间');
						validToggle = false;
					}else{
						console.log(disDay);
						disDay = Math.abs(disDay/1000/3600/24)+1;
						$outlay_time2_days.html('持续'+disDay+'天');
						validToggle = true;
					}
				}
			}
			console.log(val);
		})
	}
	function bind_outlay_btn(){
		$outlay_btn1.on('click',function(){
			resultData.isWorth = 1;
			submitData();
		})
		$outlay_btn2.on('click',function(){
			resultData.isWorth = 2;
			submitData();
		})
	}
	function submitData(){
        resultData.comment = $outlay_comment.val();
        if(resultData.comment==""){
            resultData.comment = categoryText;
        }
		for(var i in resultData){
			if(resultData[i]==null){
				alert(i+'不能为空');
				return ;
			}
		}
		if(!validToggle){
			alert('有数据未填写正确，请检查');
            return;
        }
        if(resultData.money==0){
            alert('金额为0，请重填');
            return;
		}
		if(confirm('是否要保存？')){
			commonAjax.billAdd(resultData,function(res){
				alert('保存成功。')
				mui.back();
			})	
		}
		
	}

	function bind_windowEvent(){
		window.addEventListener('categoryUpdate',function(){
			getIncomeCategory();
		})
	}
})
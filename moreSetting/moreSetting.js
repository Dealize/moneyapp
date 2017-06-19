require(['FFF', 'host', 'common', 'commonAjax','numKeyboard'], function(FFF, host, common, commonAjax,numKeyboard) {
	var $moneyContainer = $('.setMoney'),
		$moneyInput = $moneyContainer.find('.item_content'),
		$moneyBtn = $('.setMoneyBtn'),
		$categoryBtn = $('.setCategory'),
		$incomeCategoryBtn = $('.setIncomeCategory'),
		
		
		
		$logoutBtn = $('.logoutBtn'),
		walletData,
        numKeyboard
		
		;
	
	
	mui.init({
		
	});
	

	mui.plusReady(function() {
		bind_get_wallet();
		bind_logout();
        initNumKeyBoard();
        bind_categoryBtn();
	})
		
	function bind_get_wallet(){
		commonAjax.getWalletList({},function(res){
			console.log(res);
			walletData = res.data[0];
            $moneyInput.html(walletData.money);
		})
		$moneyBtn.on('click',function(){
			walletData['money'] = $moneyInput.html();
			commonAjax.updateWallet(walletData,function(res){
				console.log(res);
			})
		})
	}
	function bind_logout(){
		$logoutBtn.on('click',function(){
			if(confirm('是否退出登录？')){
				commonAjax.logout({},function(res){
					if(res.state==1){
						alert('已成功退出登录');
						plus.runtime.quit();
					}
				})	
			}
		})
	}
    function initNumKeyBoard() {
        numKeyboard = new numKeyboard.NumKeyBoard({
            targetDom: $moneyInput
        }).render();
        $moneyInput.on('click', function() {
            numKeyboard.show();
        })
        var _$targetDom = numKeyboard.getTargetDom();
        numKeyboard.on('resultNumChange', function(data) {
            var _data = data.value;
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
	function bind_categoryBtn(){
		$categoryBtn.on('click',function(){
			common.showWebview({
				id:'category',
				url:'../firstCategory/firstCategory.html',
				extras:{
					type:'category'
				}
			})
		})
		$incomeCategoryBtn.on('click',function(){
			common.showWebview({
				id:'category',
				url:'../firstCategory/firstCategory.html',
				extras:{
					type:'incomeCategory'
				}
			})
		})
	}
	

})
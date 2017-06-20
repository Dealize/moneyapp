require(['FFF', 'host', 'common', 'commonAjax'], function(FFF, host, common, commonAjax) {
	
	
	var $title = $('.title_center'),
		$ul = $('.firstCategoryUl'),
		$addBtn = $('.addIncomeCategory'),
		categoryList = [],
    	billWebview,
        currentType = null
		;
	
	mui.init({
		
	});
	
	
	mui.plusReady(function() {
		var _currentWebview = plus.webview.currentWebview();
        currentType = _currentWebview.type;
		initByType();
		getData();
		bind_addCategory();
		bind_goSecondCategory();
	})
		
	function initByType(){
		if(currentType=='category'){
			$title.html('设置支出类别');
            billWebview = plus.webview.getWebviewById('outlay');
        }else if(currentType=='incomeCategory'){
			$title.html('设置收入类别');
            billWebview = plus.webview.getWebviewById('income');
        }
	
	}
	function getData(){
		if(currentType=='category'){
			commonAjax.categoryList({},function(res){
				renderDomByData(res.data);
			})
		}else if(currentType=='incomeCategory'){
			commonAjax.incomecategory({},function(res){
				renderDomByData(res.data);
			})
		}
	}
	
	function renderDomByData(data){
		categoryList = data;
		var domStr = '';
		$ul.empty();
		data.forEach(function(item,index){
			domStr += '<li class="firstCategory_item setMoney" data-index="'+index+'">'+
            			'<span class="item_title">'+item.name+'</span>'+
            			'<span> > </span>'+
        				'</li>'
		})
		$ul.append(domStr);
	}
	function bind_addCategory(){
		var _ajaxFn = null;
		if(currentType=='category'){
			_ajaxFn = commonAjax.categoryAdd;
		}else if(currentType=='incomeCategory'){
			_ajaxFn = commonAjax.incomeCategoryAdd;
		}
		
		$addBtn.on('click',function(){
			var name = prompt('请输入类别名称');
			if(name==''){
				alert('名称不能为空');
			}else if(name==null){
				
			}else{
				_ajaxFn({
					name:name
				},function(res){
					console.log(res);
					if(res.state==1){
						getData();
                        mui.fire(billWebview,'categoryUpdate')
                    }
				})
			}
		})
	}
	function bind_goSecondCategory(){
		$ul.on('click','li',function(e){
			console.log(this);
			var _index = this.dataset.index;
			common.showWebview({
				id:'secondCategory',
				url:'../secondCategory/secondCategory.html',
				extras:{
					data:categoryList[_index],
					type:currentType,
					index:_index
				}
			})
		})
	}

	
})